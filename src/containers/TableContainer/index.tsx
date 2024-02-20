import React, { useCallback, useState } from 'react'

import './index.scss'

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    Row,
    useReactTable,
} from '@tanstack/react-table'

import { useVirtualizer } from '@tanstack/react-virtual'
import { makeData } from '../../helpers/makeData'
import Cell from '../../components/Cell'
import RowItem from '../../components/Row'
import { TRow, TValue } from '../../types'

export default function TableContainer() {
    const [allRows, setAllRows] = useState(0)
    const [rowsCount, setRowsCount] = useState(1)
    const onRowsCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowsCount(Number(e.target.value))
    }
    const [data, _setData] = useState(makeData(0))

    const changeCellData = useCallback((columnId: string, rowId: string, value: TValue) => {
        const newData = [...data];
        let cellNumber = Number(columnId?.slice(-1));
        if (cellNumber !== 5) {
            // сброс всех значений в ячейках после выбранной ячейки
            for (let i = cellNumber; i <= 5; i++) {
                const level = `level${i}` as string;
                const emptyObj: TValue = { id: null, parentId: null }
                newData[Number(rowId)][level as keyof TRow] = emptyObj as never;
            }
        }
        newData[Number(rowId)][columnId as keyof TRow] = { ...(newData[Number(rowId)][columnId as keyof TRow] as Record<string, unknown>), ...value } as never;
        _setData(newData)
    }, [data])


    const levelCells: { accessorKey: string, cell: (info: any) => JSX.Element }[] = [];
    for (let i = 1; i <= 5; i++) {
        levelCells.push({
            accessorKey: `level${i}`,
            cell: info => <Cell key={info?.cell?.id} isFirst={info.column.id?.slice(-1) - 1 === 0} value={info.getValue()} column={info.column.id} row={info.row.id}
                parentElement={data[info.row.id][`level${info.column.id?.slice(-1) - 1}` as never]} changeCellData={changeCellData} />
        })
    }
    const columns = React.useMemo<ColumnDef<TRow>[]>(
        () => [
            {
                accessorKey: 'count',
                cell: info => info.getValue(),
            },
            ...levelCells,
        ],
        [data]
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    })

    const { rows } = table.getRowModel()

    const tableContainerRef = React.useRef<HTMLDivElement>(null)

    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        estimateSize: () => 33,
        getScrollElement: () => tableContainerRef.current,
        measureElement:
            typeof window !== 'undefined' &&
                navigator.userAgent.indexOf('Firefox') === -1
                ? element => element?.getBoundingClientRect().height
                : undefined,
        overscan: 5,
    })
    const onAddRows = () => {
        _setData([...data, ...makeData(rowsCount, allRows)])
        // reset rows count
        setAllRows((allRows) => allRows + rowsCount)
        setRowsCount(0)
    }
    const onSaveData = () => {
        console.log(data)
    }
    return (
        <div className="app">
            <div
                className="container"
                ref={tableContainerRef}
                style={{
                    overflow: 'auto',
                    position: 'relative',
                    height: '400px',
                }}
            >
                <table style={{ display: 'grid' }}>
                    <thead
                        style={{
                            display: 'grid',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                        }}
                    >
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr
                                key={headerGroup.id}
                                style={{ display: 'flex', width: '100%' }}
                            >
                                {headerGroup.headers.map(header => {
                                    return (
                                        <th
                                            key={header.id}
                                            style={{
                                                display: 'flex',
                                                width: header.getSize(),
                                            }}
                                        >
                                            <div
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}

                                            </div>
                                        </th>
                                    )
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody
                        style={{
                            display: 'grid',
                            height: `${rowVirtualizer.getTotalSize()}px`,
                            position: 'relative',
                        }}
                    >
                        {rowVirtualizer.getVirtualItems().map(virtualRow => {
                            const row = rows[virtualRow.index] as Row<TRow>

                            return (
                                <RowItem key={row.id} virtualRow={virtualRow} id={row.id} forRef={node => rowVirtualizer.measureElement(node)} cells={row.getVisibleCells()} />
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <button type="button" onClick={onAddRows}>Add rows</button>
                <input value={rowsCount} onChange={onRowsCountChange} placeholder='rows count' type="number" min="1" />
            </div>
            <div>
                <button type="button" onClick={onSaveData}>Save</button>
            </div>
        </div>
    )
}


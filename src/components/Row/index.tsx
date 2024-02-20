import { LegacyRef, memo } from "react"

import {
  Cell,
  flexRender,
} from '@tanstack/react-table'
import { VirtualItem } from "@tanstack/react-virtual"
import { TRow } from "../../types"

type TRowItem = {
  virtualRow: VirtualItem,
  id: string,
  forRef: LegacyRef<HTMLTableRowElement> | undefined,
  cells: Cell<TRow, unknown>[]
}

const RowItem = memo(function RowItem({ virtualRow, id, forRef, cells = [] }: TRowItem) {
  return (
    <tr
      data-index={virtualRow.index} //needed for dynamic row height measurement
      ref={forRef} //measure dynamic row height
      key={id}
      style={{
        display: 'flex',
        position: 'absolute',
        transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
        width: '100%',
      }}
    >
      {cells.map(cell => {
        return (
          <td
            key={cell.id}
            style={{
              display: 'flex',
              width: cell.column.getSize(),
            }}
          >
            {flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            )}
          </td>
        )
      })}
    </tr>
  )
})

export default RowItem
export type TValue = {
    id: string | null,
    parentId: string | null
}

export type TCell = {
    isFirst: boolean,
    value: TValue,
    column: string,
    row: string,
    parentElement: TValue,
    changeCellData: (columnId: string, rowId: string, value: TValue) => void,
}

export type TRow = {
    count: number,
    level1: TValue
    level2: TValue,
    level3: TValue,
    level4: TValue,
    level5: TValue
}
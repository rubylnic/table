import { TRow } from "../types"

const range = (len: number) => {
    const arr: number[] = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const newRow = (index: number = 1): TRow => {
    return {
        count: index + 1,
        level1: {
            id: null,
            parentId: null,
        },
        level2: {
            id: null,
            parentId: null
        },
        level3: {
            id: null,
            parentId: null
        },
        level4: {
            id: null,
            parentId: null
        },
        level5: {
            id: null,
            parentId: null
        }
    }
}

export function makeData(rowsCount = 0, allRowsCount = 0) {
    const makeDataLevel = (): TRow[] => {
        return range(rowsCount).map((d): TRow => {
            return {
                ...newRow(allRowsCount + d),
            }
        })
    }

    return makeDataLevel()
}

import { memo } from "react";
import CreatableSelect from 'react-select/creatable';
import { SingleValue } from 'react-select';
import { TCell } from "../../types";

const allOptions = [
    {
        id: "1.1",
        parentId: null,
    },
    {
        id: "1.2",
        parentId: null,
    },
    {
        id: "2.1",
        parentId: "1.1"
    },
    {
        id: "2.2",
        parentId: "1.2"
    },
    {
        id: "3.1",
        parentId: "2.1"
    },
    {
        id: "3.2",
        parentId: "2.2"
    },
    {
        id: "4.1",
        parentId: "3.1"
    },
    {
        id: "4.2",
        parentId: "3.2"
    },
    {
        id: "5.1",
        parentId: "4.1"
    },
    {
        id: "5.2",
        parentId: "4.2"
    }
]

const Cell = memo(function Cell({ isFirst, value, column, row, parentElement, changeCellData }: TCell) {
    const val = {
        value: value.id,
        label: value.id
    }
    const cellNumber = column?.slice(-1);
    const filteredOptions = parentElement ? allOptions.filter(item => (item.id.slice(-1) === parentElement.id?.slice(-1)) && item.id.slice(0, 1) === cellNumber) : allOptions.filter(item => item.id.slice(0, 1) === "1");
    const options = filteredOptions.map(item => ({ value: item.id, label: item.id }))

    const onChange = (value: SingleValue<{
        value: string | null;
        label: string | null;
    }>) => {
        changeCellData(column, row, { id: value?.value || null, parentId: !isFirst ? parentElement?.id : null })
    }
    const onCreateOption = (value: string) => {
        changeCellData(column, row, { id: value, parentId: !isFirst ? parentElement?.id : null })
    }
    return (

        <>
            <CreatableSelect styles={{
                control: (baseStyles) => ({
                    ...baseStyles,
                    width: '100px',
                }),
                menu: (baseStyles) => ({
                    ...baseStyles,
                    zIndex: 9999
                })
            }} onChange={onChange} onCreateOption={onCreateOption} value={val} options={options} isSearchable closeMenuOnSelect menuPortalTarget={document.body} />
        </>
    )
})

export default Cell
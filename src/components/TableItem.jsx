import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { checkProduct } from '../redux/actions';

export default function TableItem({ items, id, checkedInit }) {
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setChecked(checked)
    }, [items])


    const onCheckboxClick = () => {
        setChecked(!checked);
        dispatch(checkProduct(id, !checked))
    }

    return (
        <tr>
            {items.map((item, index) => (
                index === 0 ?
                    <td key={index}>{item} <input type="checkbox" onChange={onCheckboxClick} checked={checked} /></td> :
                    <td key={index}>{item}</td>
            ))}
        </tr>
    )
}

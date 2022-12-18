
import Popup from './Popup'
import TableHeadings from './TableHeadings'
import TableItems from './TableItems'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setProduct, checkAllProducts } from '../redux/actions';
import axios from 'axios';
import Search from './Search';
// import data from "./data.json";


export default function Table() {
    const dispatch = useDispatch();
    const [allChecked, setAllChecked] = useState(false)
    const data = useSelector(state => state.products.products);

    useEffect(() => {
        axios.get('./data.json').then((res) => {
            // setData(res.data);
            res.data.forEach(item => {
                console.log(Object.values(item))
                dispatch(setProduct([...Object.values(item), false]))
            })
        }).catch((err) => {
            console.error(err)
        })
    }, [])


    const [openedModal, setOpenedModal] = useState(false)
    const buttonClickHandler = () => {
        setOpenedModal(true)
    }
    const onCheckAll = () => {
        setAllChecked(!allChecked);
        dispatch(checkAllProducts(!allChecked))
    }

    return (
        data.length && <div>
            <h1>Table</h1>
            <Search items={Object.keys(data[0])} />
            <table>
                <thead>
                    <tr>
                        <TableHeadings items={Object.keys(data[0])} onCheckAll={onCheckAll} allChecked={allChecked} />
                    </tr>
                </thead>
                <TableItems />
            </table>
            <button onClick={buttonClickHandler}>Аннулировать</button>
            {openedModal ? <Popup openPopup={setOpenedModal} /> : null}
        </div>

    )
}

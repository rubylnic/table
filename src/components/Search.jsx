import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../redux/actions';


export default function Search({ items }) {
    const dispatch = useDispatch();
    const searched = useSelector(state => state.products.searched);
    const [selected, setSelected] = useState('name')
    const [searchQuery, setSearchQuery] = useState('')
    const newItems = items.slice(1);
    const submitHandler = (evt) => {
        evt.preventDefault();
        dispatch(search(searchQuery, selected));
    }
    const selectHandler = (evt) => {
        evt.preventDefault();
        setSelected(evt.target.value)
    }
    return (
        <>
            <form onSubmit={submitHandler}>
                <input type="text" onChange={(evt) => { setSearchQuery(evt.target.value) }} />
                <select onChange={selectHandler}>
                    {newItems.map((item, index) => item === "name" ?
                        <option value={item} selected="selected">{item.charAt(0).toUpperCase() + item.slice(1)}</option> :
                        <option value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>
                    )
                    }
                </select>
                <input type="submit" />
            </form>
            {searched ?
                <div>
                    {searched.map(item => <div>{item.name}</div>)}
                </div> :
                <h2>Ничего не найдено по вашему запросу</h2>
            }
        </>
    )
}

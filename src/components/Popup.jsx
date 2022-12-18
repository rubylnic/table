import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from "react-redux";

export default function Popup({ openPopup }) {
  const data = useSelector(state => state.products.selected);
  const [error, setError] = useState(false)
  const names = data.map(item => {
    return item.name;
  }).join(',');

  const applyHandle = () => {
    console.log('apply');
    axios.post('/cancel', {
      items: data,
    })
      .then(function (response) {
        console.log(response);
        openPopup(false)
      })
      .catch(function (error) {
        setError(error);
        console.error(error);
        // openPopup(false)
      });
  }
  const declineHandle = () => {
    console.log('decline');
    openPopup(false)
  }

  return (
    <div>
      {openPopup ?
        <>
          {!error ? <>
            <h2>Вы уверены что хотите аннулировать товар(ы): {names} ?</h2>
            <div className='buttons'>
              <button onClick={applyHandle}>Применить</button>
              <button onClick={declineHandle}> Отклонить</button>
            </div></> : <>
            <h2>Произошла ошибка, попробуйте снова</h2>
            <button onClick={declineHandle}> Закрыть окно</button>
          </>}


        </> :
        <h2>Пока что нечего аннулировать</h2>}

    </div>
  )
}

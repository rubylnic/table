import TableItem from './TableItem';
import { useSelector } from "react-redux";

export default function TableItems() {
  const items = useSelector(state => state.products.products);
  console.log(items)
  const volume = items.reduce((acc, val) => {
    return acc + val.volume;
  }, 0)

  const qty = items.reduce((acc, val) => {
    return acc + val.qty;
  }, 0)

  items.sort((a, b) => {
    return new Date(a.delivery_date) - new Date(b.delivery_date)
  });

  return (
    <>
      <tbody>
        {items.map(item => {
          const values = Object.values(item).slice(1, -1);
          const sumQty = `${item.sum + item.qty} ${item.currency}`;
          values.push(sumQty)
          return <TableItem items={values} id={item.id} key={item.id} checkedInit={item.checked} />
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="4">Общий объем: {volume}</td>
          <td colSpan="4">Общее количество: {qty}</td>
        </tr>
      </tfoot>
    </>
  )
}

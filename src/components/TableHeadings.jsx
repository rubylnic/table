export default function TableHeadings({ items, onCheckAll, allChecked }) {
  console.log(items)
  const newItems = items.slice(1, -1);
  newItems.push('Всего');

  return newItems.map((item, index) => (
    index === 0 ?
      <th key={index}>{item} <input type="checkbox" onChange={onCheckAll} value={allChecked} /></th> :
      <th key={index}>{item}</th>
  )
  )
}

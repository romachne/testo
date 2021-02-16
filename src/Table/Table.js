const Table = (props) => {
  return (
    <table>
      <thead>
      <tr>
        <th onClick={() => props.requestSort('id')} className={props.getClassNamesFor('id')}>id</th>
        <th onClick={() => props.requestSort('firstName')} className={props.getClassNamesFor('firstName')}>firstName</th>
        <th onClick={() => props.requestSort('lastName')} className={props.getClassNamesFor('lastName')}>lastName</th>
        <th onClick={() => props.requestSort('email')} className={props.getClassNamesFor('email')}>email</th>
        <th onClick={() => props.requestSort('phone')} className={props.getClassNamesFor('phone')}>phone</th>
      </tr>
      </thead>
      <tbody>{props.data.map(item =>(
        <tr key={item.id + item.phone} onClick={() => props.onRowSelect(item)}>
          <td>{item.id}</td>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
        </tr>
      ))}</tbody>
    </table>
  )
};

export default Table;
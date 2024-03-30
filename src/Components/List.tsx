function List() {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>  
            <th>1</th>
            <td>a</td>
            <td>a</td>
            <td>a</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>2</th>
            <td>b</td>
            <td>b</td>
            <td>b</td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>3</th>
            <td>c</td>
            <td>c</td>
            <td>c</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default List;

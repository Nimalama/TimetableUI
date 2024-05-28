const TableAttend = ({
  data
}: {
  data: {
    type: string;
    name: string;
    totalAttendedClasses: number;
    totalClasses: number;
  }[];
}) => {
  return (
    <div className="table-wrapper attendance-table-wrapper my-6x">
      <table className="common-table">
        <thead>
          <tr>
            <th>UserType</th>
            <th>Full Name</th>
            <th>Classes Attended</th>
            <th>Total Classes To Attend</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.name}>
              <td>{user.type}</td>
              <td>{user.name}</td>
              <td>{user.totalAttendedClasses}</td>
              <td>{user.totalClasses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAttend;

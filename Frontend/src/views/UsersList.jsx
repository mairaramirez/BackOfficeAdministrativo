import { useEffect, useState } from 'react';
import { usersApi } from '../api/usersApi';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    usersApi
      .list()
      .then(setUsers)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Usuarios</h1>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th># Cliente</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Documento</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.clientNumber}</td>
              <td>{u.nombre} {u.apellido}</td>
              <td>{u.email}</td>
              <td>{u.documento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

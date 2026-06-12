import { useEffect } from 'react';
import { usersApi } from '../api';

export default function UsersDebug() {
  useEffect(() => {
    usersApi.list()
      .then(users => {
        console.log('USERS FROM BACKEND:', users);
      })
      .catch(err => {
        console.error('ERROR:', err.message);
      });
  }, []);

  return (
    <div>
      <h1>Users Debug</h1>
      <p>Mirá la consola</p>
    </div>
  );
}

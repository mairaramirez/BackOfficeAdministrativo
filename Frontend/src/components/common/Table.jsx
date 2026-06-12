// src/components/common/Table.jsx
import s from './Table.module.css';

export default function Table({ columns, rows, getKey }) {
  return (
    <table className={s.table}>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={col.accessor || col.header || index}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => (
          <tr key={getKey(row)}>
            {columns.map((col, index) => (
              <td key={col.accessor || col.header || index}>
                {col.render
                  ? col.render(row[col.accessor], row)
                  : row[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>

    </table>
  );
}

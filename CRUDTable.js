import React from "react";

function CRUDTable({ data, onEdit, onDelete }) {
  return (
    <table border="1" cellPadding="10" style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price (₹)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => onEdit(item)}>Edit</button>
                <button onClick={() => onDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" style={{ textAlign: "center" }}>No Data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default CRUDTable;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CRUDTable from "./CRUDTable";
import CRUDForm from "./CRUDForm";

function App() {
  const [data, setData] = useState([
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 20000 },
  ]);
  const [editingItem, setEditingItem] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) setUser(savedUser);
  }, []);

  // Create
  const addItem = (item) => {
    setData([...data, { ...item, id: Date.now() }]);
  };

  // Update
  const updateItem = (updatedItem) => {
    setData(data.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
    setEditingItem(null);
  };

  // Delete
  const deleteItem = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            user ? (
              <div style={{ padding: "20px" }}>
                <h1>Welcome, {user}</h1>
                <button onClick={logout}>Logout</button>
                <CRUDForm addItem={addItem} updateItem={updateItem} editingItem={editingItem} />
                <CRUDTable data={data} onEdit={setEditingItem} onDelete={deleteItem} />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

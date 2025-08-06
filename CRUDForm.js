import React, { useState, useEffect } from "react";

function CRUDForm({ addItem, updateItem, editingItem }) {
  const [formData, setFormData] = useState({ name: "", price: "" });

  useEffect(() => {
    if (editingItem) setFormData(editingItem);
    else setFormData({ name: "", price: "" });
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    if (editingItem) updateItem(formData);
    else addItem(formData);
    setFormData({ name: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
      <button type="submit">{editingItem ? "Update" : "Add"}</button>
    </form>
  );
}

export default CRUDForm;

import React, { useEffect, useState } from "react";
import API from "../services/api";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [filter, setFilter] = useState("");

  // Add user form state
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "user",
  });

  // Add store form state
  const [newStore, setNewStore] = useState({
    name: "",
    email: "",
    address: "",
    ownerEmail: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const dashRes = await API.get("/admin/dashboard");
    const userRes = await API.get("/admin/users");
    const storeRes = await API.get("/admin/stores");

    setDashboard(dashRes.data);
    setUsers(userRes.data);
    setStores(storeRes.data);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleStoreChange = (e) => {
    setNewStore({ ...newStore, [e.target.name]: e.target.value });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/admin/add-user", newUser);
      alert("✅ User added successfully");
      setNewUser({ name: "", email: "", address: "", password: "", role: "user" });
      fetchData();
    } catch (err) {
      alert("❌ Error: " + err.response?.data?.message || "Something went wrong");
    }
  };

  const handleStoreSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/admin/add-store", newStore);
      alert("✅ Store added successfully");
      setNewStore({ name: "", email: "", address: "", ownerEmail: "" });
      fetchData();
    } catch (err) {
      alert("❌ Error: " + err.response?.data?.message || "Something went wrong");
    }
  };

  // Filtered data
  const filteredUsers = users.filter((u) =>
    `${u.name} ${u.email} ${u.role}`.toLowerCase().includes(filter.toLowerCase())
  );

  const filteredStores = stores.filter((s) =>
    `${s.name} ${s.email} ${s.address}`.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Dashboard Stats</h2>
      <p>Total Users: {dashboard.totalUsers}</p>
      <p>Total Stores: {dashboard.totalStores}</p>
      <p>Total Ratings: {dashboard.totalRatings}</p>

      <hr />

      <h3>🔍 Filter All</h3>
      <input
        placeholder="Search by name/email/address/role"
        onChange={handleFilter}
        style={{ padding: "5px", width: "300px" }}
      />

      <hr />

      <h3>👤 Add New User</h3>
      <form onSubmit={handleUserSubmit}>
        <input name="name" value={newUser.name} onChange={handleUserChange} placeholder="Name" required />
        <input name="email" value={newUser.email} onChange={handleUserChange} placeholder="Email" required />
        <input name="address" value={newUser.address} onChange={handleUserChange} placeholder="Address" required />
        <input name="password" value={newUser.password} onChange={handleUserChange} placeholder="Password" required />
        <select name="role" value={newUser.role} onChange={handleUserChange}>
          <option value="user">User</option>
          <option value="owner">Store Owner</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Add User</button>
      </form>

      <hr />

      <h3>🏪 Add New Store</h3>
      <form onSubmit={handleStoreSubmit}>
        <input name="name" value={newStore.name} onChange={handleStoreChange} placeholder="Store Name" required />
        <input name="email" value={newStore.email} onChange={handleStoreChange} placeholder="Store Email" required />
        <input name="address" value={newStore.address} onChange={handleStoreChange} placeholder="Address" required />
        <input name="ownerEmail" value={newStore.ownerEmail} onChange={handleStoreChange} placeholder="Owner's Email" required />
        <button type="submit">Add Store</button>
      </form>

      <hr />

      <h3>👥 Users List</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Address</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h3>🏪 Stores List</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Address</th><th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>
              <td>{s.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;

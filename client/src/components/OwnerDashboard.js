import React, { useEffect, useState } from "react";
import API from "../services/api";

const OwnerDashboard = () => {
  const [store, setStore] = useState({});
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    const res = await API.get("/owner/dashboard");
    setStore(res.data.store);
    setRatings(res.data.ratings);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🏪 Store Dashboard</h2>

      <h3>Store Info</h3>
      <p><b>Name:</b> {store.name}</p>
      <p><b>Address:</b> {store.address}</p>
      <p><b>Average Rating:</b> ⭐ {store.rating}</p>

      <hr />

      <h3>🧑 Users who rated this store</h3>
      <table border="1">
        <thead>
          <tr>
            <th>User Name</th><th>Email</th><th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((r, idx) => (
            <tr key={idx}>
              <td>{r.User.name}</td>
              <td>{r.User.email}</td>
              <td>{r.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerDashboard;

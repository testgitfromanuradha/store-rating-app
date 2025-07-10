import React, { useEffect, useState } from "react";
import API from "../services/api";

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    const res = await API.get("/user/stores");
    setStores(res.data);

    // Extract user's submitted ratings
    const ratings = {};
    res.data.forEach((store) => {
      if (store.userRating) {
        ratings[store.id] = store.userRating;
      }
    });
    setUserRatings(ratings);
  };

  const handleRatingChange = (storeId, value) => {
    setUserRatings({ ...userRatings, [storeId]: value });
  };

  const handleRatingSubmit = async (storeId) => {
    const rating = userRatings[storeId];
    await API.post("/user/rate", { storeId, rating: Number(rating) });
    alert("Rating saved!");
    fetchStores(); // refresh ratings
  };

  const filteredStores = stores.filter((s) =>
    `${s.name} ${s.address}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>🏪 All Stores</h2>

      <input
        placeholder="Search store by name/address"
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", width: "300px" }}
      />

      <table border="1">
        <thead>
          <tr>
            <th>Name</th><th>Address</th><th>Avg Rating</th><th>Your Rating</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.address}</td>
              <td>{s.rating}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={userRatings[s.id] || ""}
                  onChange={(e) => handleRatingChange(s.id, e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleRatingSubmit(s.id)}>Submit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;

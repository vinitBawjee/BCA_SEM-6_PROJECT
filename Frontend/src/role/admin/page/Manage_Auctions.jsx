import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import css from './Manage_Auctions.module.css';

const Manage_Auctions = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  
  const [sellerdata, setsellerdata] = useState([]);
  const [msg, setmsg] = useState(false);
  const [filter, setFilter] = useState("");

  const fetchsellerdata = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/admin/seller-auctions`);
      setsellerdata(data);
    } catch (error) {
      console.error("Error fetching Auction data:", error);
      setmsg(true);
    }
  };

  useEffect(() => {
    fetchsellerdata();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = sellerdata.filter(item => {
    const today = new Date().toISOString().split("T")[0];
    switch (filter) {
      case "future":
        return item.start_date > today;
      case "start_today":
        return item.start_date === today && item.status === "Approved";
      case "close_today":
        return item.end_date === today && item.status === "Active";
      case "active":
        return item.status === "Active";
      case "inactive":
        return item.status === "InActive";
      case "rejected":
        return item.status === "Rejected";
      default:
        return true;
    }
  });

  const handleStatusChange = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to ${newStatus} this auction?`)) return;
    try {
      await axios.put(`${API_URL}/admin/auction-status/${id}`, { status: newStatus });
      fetchsellerdata(); 
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleComplete = async (id, status) => {
    if (!window.confirm(`Are you sure you want to complete this seller account?`)) return;
    try {
        await axios.put(`${import.meta.env.VITE_API_URL}/admin/auction-complete/${id}`);
        alert("Auction marked as completed!");
        fetchsellerdata();  
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      alert(msg);
      console.error("Error updating status:", error);
    }
};

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this auction?")) return;
    try {
      await axios.delete(`${API_URL}/admin/auction/${id}`);
      fetchsellerdata(); 
    } catch (error) {
      console.error("Error deleting auction:", error);
    }
  };

  return (
    <div className="p-5">
      <div className="border-bottom mb-3 d-flex justify-content-between w-100 align-items-center px-5" style={{ height: "50px" }}>
        <h3 className="mb-4" style={{color: "#4A90E2"}}>Manage Auction</h3>
        <select className="p-2 border-1 w-25 text-seocndary bg-white border" value={filter} onChange={handleFilterChange}>
          <option value="">All Auctions</option>
          <option value="future">Future Auctions</option>
          <option value="start_today">Today's Auctions (Bidding to Start)</option>
          <option value="close_today">Today's Auctions (Bidding to Close)</option>
          <option value="active">Active Auctions</option>
          <option value="inactive">Inactive Auctions</option>
          <option value="rejected">Rejected Auctions</option>
        </select>
      </div>

      <div className={css['auction-table']}>
        <table className="w-100">
          <thead className="border" style={{ height: "50px" }}>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Image</th>
              <th className="text-center">Product Name</th>
              <th className="text-center">Starting Price</th>
              <th className="text-center">Increment Price</th>
              <th className="text-center">Start Date</th>
              <th className="text-center">End Date</th>
              <th className="text-center">Type</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="11" className={`text-muted text-center ${css.noDataMessage}`}>
                Auction not found
              </td>
            </tr>
          ) : (
            filteredData.map((item, index) => (
              <tr key={item._id} className="border-top mt-5">
                <td className="text-secondary text-center">{index + 1}</td>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/seller/${item?.image}`}
                    alt="Auction"
                    style={{ width: "100px", height: "100px", padding: "7px" }}
                  />
                </td>
                <td className="text-secondary text-center">{item.product_name}</td>
                <td className="text-secondary text-center">{item.starting_price}</td>
                <td className="text-secondary text-center">{item.increment_price}</td>
                <td className="text-secondary text-center">{item.start_date}</td>
                <td className="text-secondary text-center">{item.end_date}</td>
                <td className="text-secondary text-center">{item.product_type}</td>
                <td className="text-secondary text-center">{item.quantity}</td>
                <td className="text-secondary text-center">{item.status}</td>
                <td className="text-center">
                  {(item.status === "Active" && item.end_date === new Date().toISOString().split("T")[0]) ? (
                    <input
                      type="submit"
                      value="Completed"
                      className={`${css.deleteButton} ms-3 w-75 btn btn-outline-secondary`}
                      onClick={() => handleComplete(item._id, "Completed")}
                    />
                  ) : (
                    <>
                      {(item.status === "Approved" || item.status === "Active" || item.status === "Inactive" || item.status === "Pending") && (
                        <input
                          type="submit"
                          value={item.status === "Active" ? "Inactive" : "Active"}
                          className={`${css.deleteButton} w-25 ms-3 btn btn-outline-success`}
                          onClick={() => handleStatusChange(item._id, item.status === "Active" ? "Inactive" : "Active")}
                        />
                      )}
                      <input
                        type="submit"
                        value="Delete"
                        className={`${css.deleteButton} ms-3 btn btn-outline-danger`}
                        onClick={() => handleDelete(item._id)}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manage_Auctions;

import css from "./Pending_Auction.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Pending_Auction = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [sellerdata, setsellerdata] = useState([]);
  const [msg, setmsg] = useState(false);
  const [rejectingAuction, setRejectingAuction] = useState(null);
  const [reason, setReason] = useState("");

  const fetchsellerdata = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/seller-pending-auction`);
      setsellerdata(response.data);
    } catch (error) {
      console.error("Error fetching Auction data:", error);
      setmsg(true);
    }
  };

  useEffect(() => {
    fetchsellerdata();
  }, []);

  const handleApprove = async (id) => {
    if (!window.confirm("Are you sure you want to Approve this auction?")) return;
    try {
      const response = await axios.put(`${API_URL}/admin/update-status/${id}`);
      alert(response.data.message);
      fetchsellerdata();
    } catch (error) {
      console.error("Error updating status", error);
      alert("Failed to update status");
    }
  };

  const handleRejectClick = (id) => {
    if (!window.confirm("Are you sure you want to Reject this auction?")) return;
    setRejectingAuction(id);
  };

  const handleCancelReject = () => {
    setRejectingAuction(null);
    setReason("");
  };

  const handleRejectConfirm = async () => {
    if (!reason.trim()) {
      alert("Please enter a reason for rejection.");
      return;
    }
    try {
      await axios.post(`${API_URL}/admin/reject-auction`, {
        auctionId: rejectingAuction,
        reason,
      });
      alert("Auction Rejected Successfully");
      fetchsellerdata();
      handleCancelReject();
    } catch (error) {
      alert("Failed to reject auction");
    }
  };  

  return (
    <div className="p-5">
      <h3 className="text-start w-100 mb-4 border-bottom" style={{color: "#4A90E2"}}>Pending Auction</h3>
      <div className={css["auction-table"]}>
        {rejectingAuction ? (
          <div style={{height: "500px"}}>

            <textarea type="text" placeholder="Enter reason" value={reason} onChange={(e) => setReason(e.target.value)} style={{height: "450px"}} className="w-100 border p-3"/>
            <div className="mt-2">
              <button className="btn btn-link me-3" style={{color: "#4A90E2"}} onClick={handleCancelReject}>Back</button>
              <button className="btn btn-outline-danger w-25" onClick={handleRejectConfirm}>Submit</button>
            </div>

          </div>
        ) : (
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
              {msg ? (
                <tr>
                  <td colSpan="11" className={`text-secondary text-center ${css.noDataMessage}`}>Auction not found</td>
                </tr>
              ) : (
                sellerdata.map((item, index) => (
                  <tr key={item._id} className="border-top mt-5">
                    <td className="text-secondary text-center">{index + 1}</td>
                    <td>
                      <img src={`http://localhost:5000/uploads/seller/${item?.image}`} alt="Auction Image" style={{ width: "100px", height: "100px", padding: "7px" }} />
                    </td>
                    <td className="text-secondary text-center">{item.product_name}</td>
                    <td className="text-secondary text-center">{item.starting_price}</td>
                    <td className="text-secondary text-center">{item.increment_price}</td>
                    <td className="text-secondary text-center">{item.start_date}</td>
                    <td className="text-secondary text-center">{item.end_date}</td>
                    <td className="text-secondary text-center">{item.product_type}</td>
                    <td className="text-secondary text-center">{item.quantity}</td>
                    <td className="text-secondary text-center">{item.status}</td>
                    <td>
                      <button className={`${css.updateButton} btn btn-outline-success`} onClick={() => handleApprove(item._id)}>Approve</button>
                      <button className={`${css.deleteButton} ms-3 btn btn-outline-danger`} onClick={() => handleRejectClick(item._id)}>Rejected</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Pending_Auction;

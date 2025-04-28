import { useState, useEffect } from "react";
import axios from "axios";
import css from "./Auction_Status.module.css"

const AuctionStatus = () => {
  const [auctionData, setAuctionData] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchAuctions = async (status) => {
    const token = localStorage.getItem("token");
    if (!token) return; 
  
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/auctions-status`,
        {
          params: { status },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAuctionData(data);
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };  

  useEffect(() => {
    fetchAuctions("All");
  }, []);

  const handleFilterChange = (status) => {
    setFilter(status);
    fetchAuctions(status);
  };

  return (
    <div className="h-100 p-5">
      <div className="w-50 m-auto d-flex justify-content-center gap-2 mb-3">
        {["All", "Active", "Inactive", "Pending", "Rejected", "Approved", "Completed"].map((status) => (
          <button
            key={status}
            style={{border: "none", width: "100px", height: "40px"}}
            className={`bg-white ${filter === status ? "text-primary" : "text-secondary"}`}
            onClick={() => handleFilterChange(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="border-bottomm b-3"></div>
      <div className={css['auction-table']}>
        <table className="w-100">
          <thead className="border">
            <tr>
              <th className="text-center">Product Name</th>
              <th className="text-center">Status</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Starting Price</th>
              <th className="text-center">Current Bid</th>
              <th className="text-center">Start Date</th>
              <th className="text-center">End Date</th>
            </tr>
          </thead>
          <tbody>
          {auctionData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted"> No auction available </td>
              </tr>
            ) : (
              auctionData.map((item) => (
                <tr key={item._id} className="border-top">
                  <td className="text-secondary text-center">{item.product_name}</td>
                  <td className="text-secondary text-center">{item.status}</td>
                  <td className="text-secondary text-center">{item.quantity}</td>
                  <td className="text-secondary text-center">{item.starting_price}</td>
                  <td className="text-secondary text-center">{item.current_bid}</td>
                  <td className="text-secondary text-center">{item.start_date}</td>
                  <td className="text-secondary text-center">{item.end_date}</td>
                </tr>
              ))
            )} 
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuctionStatus;

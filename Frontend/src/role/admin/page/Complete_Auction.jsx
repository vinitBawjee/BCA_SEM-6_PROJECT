import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import css from './Complete_Auction.module.css';

const Complete_Auction = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [sellerdata, setsellerdata] = useState([]);
  const [msg, setmsg] = useState(false);

  const fetchsellerdata = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/final-bids`);
      setsellerdata(response.data);
    } catch (error) {
      console.error("Error fetching Auction data:", error);
      setmsg(true);
    }
  };

  useEffect(() => {
    fetchsellerdata();
  }, []);

  const handleDelete = async (pid) => {
    if (!window.confirm("Are you sure you want to delete this auction?")) return;
    try {
      const id = localStorage.getItem("seller_id");
      await axios.delete(`${API_URL}/seller/${pid}`);
      fetchsellerdata(id);
    } catch (error) {
      console.error("Error deleting Auction:", error);
    }
  };

  return (
    <div className="p-5">
      <h3 className='text-start w-100 mb-4 border-bottom' style={{color: "#4A90E2"}}>Complete Auction</h3>
      <div className={css['auction-table']}>
        <table className="w-100">
          <thead className="border" style={{height: "50px"}}>
          <tr>
              <th className="text-center">#</th>
              <th className="text-center">Auction Name</th>
              <th className="text-center">Starting Price</th>
              <th className="text-center">Auction Type</th>
              <th className="text-center">Winner Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">City</th>
              <th className="text-center">Gender</th>
              <th className="text-center">Final Amount</th>
              <th className="text-center">Payment</th>
              <th className="text-center">Action</th>
          </tr>
          </thead>
          <tbody>
          {sellerdata.length === 0 ? (
            <tr>
              <td colSpan="11" className={`text-secondary text-center ${css.noDataMessage}`}>
                Auction not found
              </td>
            </tr>
          ) : (
            sellerdata.map((item, index) => (
              <tr key={item._id} className="text-secondary border-top mt-5">
                <td className="text-secondary text-center">{index + 1}</td>
                <td className="text-secondary text-center">{item?.auctionId?.product_name}</td>
                <td className="text-secondary text-center">{item?.auctionId?.starting_price}</td>
                <td className="text-secondary text-center">{item?.auctionId?.product_type}</td>
                <td className="text-secondary text-center">{item?.winnerId?.fullName}</td>
                <td className="text-secondary text-center">{item?.winnerId?.email}</td>
                <td className="text-secondary text-center">{item?.winnerId?.city}</td>
                <td className="text-secondary text-center">{item?.winnerId?.gender}</td>
                <td className="text-secondary text-center">{item?.finalAmount}</td>
                <td className="text-secondary text-center">{item?.paymentStatus}</td>
                <td>
                  <input
                    type="submit"
                    value="Delete"
                    className={`${css.deleteButton} ms-3 btn btn-outline-danger`}
                    onClick={() => handleDelete(item._id)}
                  />
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

export default Complete_Auction;

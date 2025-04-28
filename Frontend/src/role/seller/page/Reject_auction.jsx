import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import css from "./RejectAuction.module.css"; 


const Reject_auction = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [sellerdata, setsellerdata] = useState([]);
  const [msg, setmsg] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("seller_id");

    if (id) {
      fetchsellerdata(id);
    } else {
      console.error("No user ID found in localStorage.");
    }
  }, []);

  const fetchsellerdata = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/seller/auctionreg/${id}`);
      setsellerdata(response.data);
    } catch (error) {
      console.error("Error fetching Auction data:", error);
      setmsg(true);
    }
  };

  return (
    <div className="p-5">
      <h3 className='text-start w-100 mb-4 border-bottom' style={{color: "#4A90E2"}}>Rejected Auction</h3>
      <div className={css['auction-table']}>
        {msg ? ( 
          <div className={`${css.noDataMessage}`}>Auction not found</div>
        ) : (
          sellerdata.map((item) => {
            return (
              <div className={`${css['auction-container']} d-flex justify-content-between mb-3 border-top`}>
                <div style={{width: "150px", height: "100%"}} className="d-flex justify-content-center p-2">
                  <img src={`http://localhost:5000/uploads/seller/${item?.auctionId?.image}`} style={{height: "100%", width: "90%"}} alt="" />
                </div>
                <div style={{overflow: "auto"}} className="w-100 py-1"> 
                  {item?.auctionId?.product_name}
                  <p>{item.message}</p> 
                </div>
                <div className="border-start ms-2"></div>
                <div style={{width: "150px", height: "100%"}} className="d-flex align-items-center justify-content-center">
                  {new Date(item?.createdAt).toLocaleDateString("en-GB")}<br/>
                  {new Date(item?.createdAt).toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: true })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Reject_auction;

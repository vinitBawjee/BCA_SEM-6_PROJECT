import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, LineChart, Line
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [auctions, setAuctions] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [auctionStats, setAuctionStats] = useState([]);
  const [paymentStats, setPaymentStats] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      try {
        const sellerId = localStorage.getItem("seller_id"); // ya jaha se bhi seller_id mil raha ho
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/seller/dashboard-stats`,
          {
            params: { seller_id: sellerId },
            headers: {
              Authorization: `Bearer ${token}`, // agar chahiye toh
            },
          }
        );
        // Clean up product names
        const cleanedAuctions = res.data.auctions.map(item => ({
          ...item,
          product_name: item.product_name.trim()
        }));

        setAuctions(cleanedAuctions);
        setTotalEarnings(res.data.totalEarnings);
        setCompletedOrders(res.data.completedOrders);

        // Auction Status Data
        const auctionStatusData = Object.entries(res.data.auctionStats || {}).map(([status, count]) => ({
          name: status,
          count
        }));
        setAuctionStats(auctionStatusData);

        // Payment Stats Data
        const paymentStatusData = Object.entries(res.data.paymentStats || {}).map(([status, count]) => ({
          name: status,
          count
        }));
        setPaymentStats(paymentStatusData);

      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="h-100" style={{ overflow: "hidden" }}>
      <div className="w-75 mx-auto d-flex justify-content-between mt-5">
        <div className="p-2 d-flex justify-content-evenly align-items-center w-25">
          <h5>Total Auctions :</h5><h5>{auctions.length}</h5>
        </div>
        <div className="p-2 d-flex justify-content-evenly align-items-center w-25">
          <h5>Completed Orders :</h5><h5>{completedOrders}</h5>
        </div>
        <div className="p-2 d-flex justify-content-evenly align-items-center w-25">
          <h5>Total Earnings :</h5><h5>₹{totalEarnings}</h5>
        </div>
      </div>

      <div style={{ height: "867px" }}>
        <div className="h-100 p-3">
          <div className="border-top border-bottom w-100 h-50 d-flex justify-content-evenly align-items-center flex-column">
            <h5 className="text-center">Earnings Trend</h5>
            {auctions.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={auctions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="product_name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="earnings" stroke="#ff7300" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p>No earnings data available.</p>
            )}
          </div>

          <div className="w-100 d-flex h-50 gap-3">
            {/* Status Overview */}
            <div className="h-100 w-25 d-flex justify-content-evenly align-items-center flex-column">
              <h5 className="text-center">Status Overview</h5>
              {auctionStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={auctionStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#007bff" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p>No status data.</p>
              )}
            </div>

            <div className="h-100 border"></div>

            {/* Auction Distribution */}
            <div className="w-25 h-100 d-flex justify-content-evenly align-items-center flex-column">
              <h5 className="text-center">Distribution</h5>
              {auctionStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={auctionStats} dataKey="count" nameKey="name" fill="#28a745" label />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p>No distribution data.</p>
              )}
            </div>

            <div className="h-100 border"></div>

            {/* Payment Status */}
            <div className="w-25 h-100 d-flex justify-content-evenly align-items-center flex-column">
              <h5 className="text-center">Payment Status</h5>
              {paymentStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={paymentStats} dataKey="count" nameKey="name" fill="#ffc107" label />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p>No payment status data.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

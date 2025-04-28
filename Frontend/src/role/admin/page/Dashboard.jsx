import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
    PieChart, Pie, LineChart, Line
} from "recharts";

const Dashboard = () => {
    const [totalAuctions, setTotalAuctions] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [earningsData, setEarningsData] = useState([]);
    const [paymentStatusData, setPaymentStatusData] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard-stats`);
                setTotalAuctions(res.data.totalAuctions || 0);
                setCompletedOrders(res.data.completedOrders || 0);
                setTotalEarnings(res.data.totalEarnings || 0);
                setChartData(res.data.chartData || []);
                setEarningsData(res.data.earningsData || []);
                setPaymentStatusData(res.data.paymentChartData || []);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="h-100" style={{ overflow: "hidden" }}>
            {/* Summary Cards */}
            <div className="w-75 mx-auto d-flex justify-content-between mt-5">
                <div className="rounded p-2 d-flex justify-content-center align-items-center w-25 bg-light shadow-sm">
                    <div className="d-flex gap-3">
                        <h5>Total Auctions :</h5>
                        <h5>{totalAuctions}</h5>
                    </div>
                </div>
                <div className="rounded p-2 d-flex justify-content-center align-items-center w-25 bg-light shadow-sm">
                    <div className="d-flex gap-3">
                        <h5>Completed Orders :</h5>
                        <h5>{completedOrders}</h5>
                    </div>
                </div>
                <div className="rounded p-2 d-flex justify-content-center align-items-center w-25 bg-light shadow-sm">
                    <div className="d-flex gap-3">
                        <h5>Total Earnings :</h5>
                        <h5>₹{totalEarnings}</h5>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div style={{ height: "867px" }}>
                <div className="h-100 p-3">
                    
                    {/* Line Chart */}
                    <div className="border-top border-bottom w-100 h-50 d-flex justify-content-evenly align-items-center flex-column">
                        <h5 className="text-center">Earnings Trend</h5>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={earningsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="product_name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="earnings" stroke="#ff7300" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Bottom Charts */}
                    <div className="w-100 d-flex justify-content-evenly h-50 gap-3 pt-3">
                        {/* Status Overview */}
                        <div className="h-100 w-25 d-flex justify-content-evenly align-items-center flex-column bg-light rounded shadow-sm">
                            <h5 className="text-center">Status Overview</h5>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#007bff" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="h-100 border"></div>

                        {/* Distribution Pie Chart */}
                        <div className="w-25 h-100 d-flex justify-content-evenly align-items-center flex-column bg-light rounded shadow-sm">
                            <h5 className="text-center">Distribution</h5>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        dataKey="count"
                                        nameKey="name"
                                        fill="#28a745"
                                        label
                                    />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="h-100 border"></div>

                        {/* Payment Status Pie Chart */}
                        <div className="w-25 h-100 d-flex justify-content-evenly align-items-center flex-column bg-light rounded shadow-sm">
                            <h5 className="text-center">Payment Status</h5>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={paymentStatusData}
                                        dataKey="count"
                                        nameKey="name"
                                        fill="#ffc107"
                                        label
                                    />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

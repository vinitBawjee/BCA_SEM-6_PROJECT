import { useEffect, useState } from "react";
import axios from "axios";
import css from "./Bidding_History.module.css";

const BiddingHistory = () => {
    const [bids, setBids] = useState([]);

    useEffect(() => {
        const fetchBiddingHistory = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/bidding-history`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setBids(response.data);
            } catch (error) {
                console.error("Error fetching bidding history:", error);
            }
        };
    
        fetchBiddingHistory();
    }, []);    

    return (
        <div className={`${css['bid_history']} p-4`}>
            <table className="w-100">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="border-bottom p-2 text-center">#</th>
                        <th className="border-bottom p-2 text-center">Product</th>
                        <th className="border-bottom p-2 text-center">Bid Amount</th>
                        <th className="border-bottom p-2 text-center">Last Bid</th>
                        <th className="border-bottom p-2 text-center">Bid Count</th>
                        {/* <th className="border-bottom p-2 text-center">Status</th> */}
                        <th className="border-bottom p-2 text-center">Bid Date</th>
                        <th className="border-bottom p-2 text-center">Bid Time</th>
                    </tr>
                </thead>
                <tbody>
                    {bids.map((bid, index) => {
                        return (
                            <tr key={index}>
                                <td className="border-bottom p-4">{index + 1}</td>
                                <td className="border-bottom p-4">{bid.product}</td>
                                <td className="border-bottom p-4">₹{bid.amount}</td>
                                <td className="border-bottom p-4">₹{bid.lastBid}</td>
                                <td className="border-bottom p-4">{bid.bidCount}</td>
                                {/* <td className="border-bottom p-4">{bid.status}</td> */}
                                <td className="border-bottom p-4">{bid.bidDate}</td>
                                <td className="border-bottom p-4">{bid.bidTime}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default BiddingHistory;

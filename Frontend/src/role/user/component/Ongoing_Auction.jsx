import { useEffect, useState } from "react";
import axios from "axios";
import css from "./Ongoing_Auction.module.css";
import { Link } from "react-router-dom";

const Ongoing_Auction = () => {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        const fetchUserBids = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/user-bids`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setAuctions(response.data);
                
            } catch (error) {
                console.error("Error fetching user bidded auctions", error);
            }
        };

        fetchUserBids();
    }, []);

    return (
        <div className={`${css["bid_container"]} p-2`}>
            <div className={`${css["bid_container_table"]} py-3`}>
                <table className="w-100">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="border-top text-center p-2">Image</th>
                            <th className="border-top text-center p-2">Product Name</th>
                            <th className="border-top text-center p-2">Product Type</th>
                            <th className="border-top text-center p-2">Starting Price</th>
                            <th className="border-top text-center p-2">Current Bid</th>
                            <th className="border-top text-center p-2">Quantity</th>
                            <th className="border-top text-center p-2">Start Date</th>
                            <th className="border-top text-center p-2">End Date</th>
                            <th className="border-top text-center p-2">Auction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {auctions.length > 0 ? (
                            auctions.map((auction) => (
                                <tr key={auction?._id} className="text-center">
                                    <td className="border-top text-center py-2">
                                        <img src={`http://localhost:5000/uploads/seller/${auction?.image}`} alt="img" className="h-16 w-16 object-cover rounded" style={{ width: "100px", height: "100px" }}/>
                                    </td>
                                    <td className="border-top text-center py-2">{auction?.product_name}</td>
                                    <td className="border-top text-center py-2">{auction?.product_type}</td>
                                    <td className="border-top text-center py-2">₹{auction?.starting_price}</td>
                                    <td className="border-top text-center py-2 text-green-600 font-bold">₹{auction?.starting_price + auction?.current_bid}</td>
                                    <td className="border-top text-center py-2">{auction?.quantity}</td>
                                    <td className="border-top text-center py-2">{auction?.start_date}</td>
                                    <td className="border-top text-center py-2 text-red-500">{auction?.end_date}</td>
                                    <td className="border-top text-center py-2">
                                        <Link className="text-primary" to={`/auction-product/${auction?._id}`}>View</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center p-4">No auctions found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Ongoing_Auction;

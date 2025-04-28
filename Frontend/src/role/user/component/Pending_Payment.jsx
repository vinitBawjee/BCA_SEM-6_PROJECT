import css from "./Pending_Payment.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const Pending_Payment = () => {
    const user_id = localStorage.getItem("user_id");
    const navigate = useNavigate();
    const [pendingList, setPendingList] = useState([]);

    useEffect(() => {
        fetchPendingPayments();
    }, []);

    const fetchPendingPayments = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/pending-payments/${user_id}`);
            if (res.data?.success) {
                setPendingList(res.data.data);
            }
        } catch (err) {
            toast.error("Failed to fetch pending payments.");
        }
    };

    const handlePayment = async (amount, auctionId) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/order`, { amount });
            if (res.data?.data) {
                openRazorpay(res.data.data, auctionId);
            } else {
                toast.error("Order creation failed.");
            }
        } catch (err) {
            toast.error("Error creating order.");
        }
    };

    const openRazorpay = (data, auctionId) => {
        const options = {
            key: "rzp_test_b4iBWY0X70QR2V",
            amount: data.amount,
            currency: data.currency,
            name: "Sejan",
            description: "Auction Payment",
            order_id: data.id,
            handler: async (res) => {
                try {
                    const verifyRes = await axios.post(`${import.meta.env.VITE_API_URL}/user/verify`, {
                        razorpay_order_id: res.razorpay_order_id,
                        razorpay_payment_id: res.razorpay_payment_id,
                        razorpay_signature: res.razorpay_signature,
                        userId: user_id,
                        auctionId: auctionId
                    });

                    if (verifyRes.data?.success) {
                        toast.success("Payment Successful!");
                        fetchPendingPayments(); 
                    } else {
                        toast.error("Verification failed.");
                    }
                } catch (err) {
                    toast.error("Verification error.");
                }
            },
            theme: { color: "#5f63b8" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className={css.pending_payment}>
            {pendingList.length === 0 ? (
                <p>No pending payment.</p>
            ) : (
                pendingList.map((item, index) => (
                    <div key={index} className={`${css.card} border-top p-2 mb-3 d-flex`}>
                        <div style={{ width: "150px" }}>
                            <img
                                src={`http://localhost:5000/uploads/seller/${item.auctionId?.image}`}
                                alt="Product"
                                style={{ objectFit: "contain", width: "100%", height: "100%" }}
                            />
                        </div>
                        <div className="flex-grow-1 px-3" style={{ overflow: "auto" }}>
                            <strong>{item.auctionId?.product_name || "Untitled"}</strong>
                            <p className="mb-0">{item.auctionId?.description || "No description available."}</p>
                        </div>
                        <div className="d-flex justify-content-center align-items-center border-start" style={{ width: "150px" }}>
                            <button
                                onClick={() => handlePayment(item.finalAmount, item.auctionId?._id)}
                                className="btn btn-success"
                            >
                                ₹ {item.finalAmount}
                            </button>
                        </div>
                    </div>
                ))
            )}
            <Toaster />
        </div>
    );
};

export default Pending_Payment;

import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaGavel, FaHistory, FaBell, FaUserCog, FaMoneyBill, FaFileInvoice, FaShoppingCart, FaTruck } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";

const Account_Page_slidebar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem("user_id");
            if (!userId) return;
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/user-account/${userId}`);
                setUser(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
    
        fetchUserData();
    }, []);

    return (
        <div className="d-flex flex-column p-3 h-100 border">
            <Nav className="flex-column align-items-start justify-content-start p-3 vh-100">

                <h6 className="text-dark">Auctions</h6>
                <Link to="ongoin-auctions" className="text-secondary nav-link d-flex align-items-center">
                    <FaGavel className="me-2" /> Ongoing Auctions
                </Link>
                <Link to="bidding-history" className="text-secondary nav-link d-flex align-items-center">
                    <FaHistory className="me-2" /> Bidding History
                </Link>

                <h6 className="text-dark mt-3">Payments</h6>
                {/* <Link to="transaction-history" className="text-secondary nav-link d-flex align-items-center">
                    <FaMoneyBill className="me-2" /> Transaction History
                </Link>
                <Link to="download-invoices" className="text-secondary nav-link d-flex align-items-center">
                    <FaFileInvoice className="me-2" /> Download Invoices
                </Link> */}
                <Link to="pending-payment" className="text-secondary nav-link d-flex align-items-center">
                    <FaShoppingCart className="me-2" /> Pending Payments
                </Link>

                {/* <h6 className="text-dark mt-3">Orders</h6>
                <Link to="order-status" className="text-secondary nav-link d-flex align-items-center">
                    <FaTruck className="me-2" /> Status Tracking
                </Link>
                <Link to="delivery-history" className="text-secondary nav-link d-flex align-items-center">
                    <FaHistory className="me-2" /> Delivery History
                </Link> */}

                <h6 className="text-dark mt-3">Settings</h6>
                <Link to="" className="text-secondary nav-link d-flex align-items-center">
                    <IoPersonSharp className="me-2" /> Profile
                </Link>
                <Link to="update-profile" className="text-secondary nav-link d-flex align-items-center">
                    <FaUserCog className="me-2" /> Update Profile
                </Link>
                {/* <Link to="bid-notifications" className="text-secondary nav-link d-flex align-items-center">
                    <FaBell className="me-2" /> Notifications
                </Link> */}
            </Nav>
            
            <div className="mt-auto d-flex border-top align-items-center py-1">
                <img 
                    src={user?.image ? `http://localhost:5000/uploads/user/${user.image}` : ""} 
                    className="rounded-circle me-2" 
                    alt="User" 
                    style={{ width: "40px", height: "40px" }}
                />
                <div>
                    <strong>{user?.email || "User"}</strong>
                    <p className="text-muted mb-0">{user?.fullName || "No Name"}</p>
                </div>
            </div>
        </div>
    );
};

export default Account_Page_slidebar;
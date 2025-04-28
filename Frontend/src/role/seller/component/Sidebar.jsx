import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoBan, IoPersonSharp } from "react-icons/io5";
import { FaTachometerAlt, FaClipboardList, FaPlus, FaList, FaTrophy, FaShippingFast, FaInfoCircle, FaMoneyBill, FaCreditCard, FaUserCog, FaSignOutAlt, FaBell, FaTruckMoving } from "react-icons/fa";

const Sidebar = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("fullName");
        localStorage.removeItem("role");
        localStorage.removeItem("seller_id");
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="d-flex flex-column border-end border-white p-3 h-100">
            <h4 className="text-white mb-4">Seller Panel</h4>
            
            <Nav className="flex-column align-items-start justify-content-start p-3 vh-100">
                <h6 className="text-white">Main</h6>
                <Link to="dashboard" className="text-white nav-link d-flex align-items-center">
                    <FaTachometerAlt className="me-2" /> Dashboard
                </Link>
                <Link to="auction-status" className="text-white nav-link d-flex align-items-center">
                    <FaClipboardList className="me-2" /> Auction Status
                </Link>

                <h6 className="text-white mt-3">Auctions</h6>
                <Link to="add-auction" className="text-white nav-link d-flex align-items-center">
                    <FaPlus className="me-2" /> Add Auction
                </Link>
                <Link to="manage-auctions" className="text-white nav-link d-flex align-items-center">
                    <FaList className="me-2" /> Manage Auctions
                </Link>
                <Link to="reject-auctions" className="text-white nav-link d-flex align-items-center">
                    <IoBan className="me-2" /> Rejected Auctions
                </Link>
                
                {/* <h6 className="text-white mt-3">Orders & Delivery</h6>
                <Link to="winning-bids" className="text-white nav-link d-flex align-items-center">
                    <FaTrophy className="me-2" /> Winning Bids
                </Link>
                <Link to="order-status" className="text-white nav-link d-flex align-items-center">
                    <FaShippingFast className="me-2" /> Order Tracking
                </Link>
                <Link to="order-details" className="text-white nav-link d-flex align-items-center">
                    <FaInfoCircle className="me-2" /> Order Details
                </Link>
                <Link to="manage-deliveries" className="text-white nav-link d-flex align-items-center">
                    <FaTruckMoving className="me-2" /> Manage Deliveries
                </Link>
                <Link to="delivery-history" className="text-white nav-link d-flex align-items-center">
                    <FaClipboardList className="me-2" /> Delivery History
                </Link> */}

                {/* <h6 className="text-white mt-3">Payments</h6>
                <Link to="payment-status" className="text-white nav-link d-flex align-items-center">
                    <FaCreditCard className="me-2" /> Payment Status
                </Link> */}

                <h6 className="text-white mt-3">Settings</h6>
                <Link to="profile" className="text-white nav-link d-flex align-items-center">
                    <IoPersonSharp className="me-2" /> Profile
                </Link>
                <Link to="update-profile" className="text-white nav-link d-flex align-items-center">
                    <FaUserCog className="me-2" /> Update Profile
                </Link>
                {/* <Link to="notifications" className="text-white nav-link d-flex align-items-center">
                    <FaBell className="me-2" /> Notifications
                </Link> */}
            </Nav>

            <div className="mt-auto p-3 border-top border-white d-flex align-items-center">
                <Link onClick={logout} className="text-white nav-link d-flex align-items-center">
                    <FaSignOutAlt className="me-2" /> Logout
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaList, FaClock, FaCheckCircle, FaUser, FaStore, FaComments, FaSignOutAlt, FaGavel, FaChartPie, FaTruck } from "react-icons/fa";

const Sidebar = () => {
    const navigate = useNavigate();
    
    const logout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("fullName");
        localStorage.removeItem("role");
        localStorage.removeItem("admin_id");
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="d-flex flex-column border-end border-white p-3 h-100">
            <h4 className="text-white mb-4">Admin Panel</h4>
            
            <Nav className="flex-column align-items-start justify-content-start p-3 vh-100">
                <h6 className="text-white">Main</h6>
                <Link to="" className="text-white nav-link d-flex align-items-center">
                    <FaChartPie className="me-2" /> Dashboard
                </Link>
                <Link to="auction-status" className="text-white nav-link d-flex align-items-center">
                    <FaGavel className="me-2" /> Auction Status
                </Link>

                <h6 className="text-white mt-3">Auction</h6>
                <Link to="auction-manage" className="text-white nav-link d-flex align-items-center">
                    <FaList className="me-2" /> Manage 
                </Link>
                <Link to="pending-auctions" className="text-white nav-link d-flex align-items-center">
                    <FaClock className="me-2" /> Pending
                </Link>
                <Link to="complete-auctions" className="text-white nav-link d-flex align-items-center">
                    <FaCheckCircle className="me-2" /> Completed 
                </Link>

                {/* <h6 className="text-white mt-3">Delivery</h6>
                <Link to="manage-delivery" className="text-white nav-link d-flex align-items-center">
                    <FaTruck className="me-2" /> Manage Delivery
                </Link>
                <Link to="change-order-status" className="text-white nav-link d-flex align-items-center">
                    <FaList className="me-2" /> Change Order Status
                </Link> */}

                {/* <h6 className="text-white mt-3">Reports</h6>
                <Link to="view-reports" className="text-white nav-link d-flex align-items-center">
                    <FaChartPie className="me-2" /> View Order Reports
                </Link> */}

                <h6 className="text-white mt-3">Account</h6>
                <Link to="user-account" className="text-white nav-link d-flex align-items-center">
                    <FaUser className="me-2" /> User
                </Link>
                <Link to="seller-account" className="text-white nav-link d-flex align-items-center">
                    <FaStore className="me-2" /> Seller
                </Link>

                <Link to="user-query" className="text-white nav-link d-flex align-items-center">
                    <FaComments className="me-2" /> User Query
                </Link>
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

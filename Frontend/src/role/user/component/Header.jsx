import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { GoPerson } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import styles from "./Slider.module.css";

const Header = () => {
  const navigate = useNavigate();

  const [data, setdata] = useState({
    token: localStorage.getItem("token"),
    fullName: localStorage.getItem("fullName"),
    user_id: localStorage.getItem("user_id"),
    email: localStorage.getItem("email"),
    role: localStorage.getItem("role"),
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    setdata({
      token: null,
      fullName: null,
      user_id: null,
      email: null,
      role: null,
    });
    navigate("/");
  };

  return (
    <>
      <header
        className={`${styles.header} header-section d-flex justify-content-center align-items-center`}
      >
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-white">
              <Link to="/">
                <img
                  src="img/logo-removebg-preview.png"
                  alt="Logo"
                  className="logo"
                />
              </Link>
            </div>

            <nav className={` navbar navbar-expand-lg text-white `}>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav gap-3">
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/about">
                      About
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <a className="nav-link" href="./check-out.html">Blog</a>
                  </li> */}
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/contact">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            <div className="d-flex align-items-center gap-4">
              {/* <IoIosSearch className="text-muted" size={27} /> */}
              {data.token && data.role === "user" && (
                <>
                  <Link to="/user-basket" className="text-white">
                    {" "}
                    <HiOutlineShoppingBag
                      className="text-white"
                      size={25}
                    />{" "}
                  </Link>
                  <Link to="/user-account" className="text-white">
                    {" "}
                    <GoPerson className="text-white" size={25} />{" "}
                  </Link>
                </>
              )}
            </div>

            <div className="user-access d-flex align-items-center">
              {data.role !== "user" ? (
                <div className="d-flex align-items-center gap-2">
                  <Link to="/signup_user" className="text-white">
                    Sign up
                  </Link>
                  <span className="text-white">/</span>
                  <Link to="/login" className="text-white">
                    Login
                  </Link>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-3">
                  <span className="text-white">Welcome {data.fullName}</span>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="header-info my-1" style={{backgroundColor: "#081a35"}}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 d-flex align-items-center">
              <div className="header-item">
                <img
                  src="img/icons/delivery.png"
                  alt=""
                  className="text-white"
                />
                <p className="text-white">Bid. Win. Enjoy!</p>
              </div>
            </div>
            <div className="col-md-4 text-left text-lg-center d-flex align-items-center">
              <div className="header-item">
                <img
                  src="img/icons/voucher.png"
                  alt=""
                  className="text-white"
                />
                <p className="text-white">Find Amazing Dealsmin our Auctions</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="header-item d-flex justify-content-end">
                <img src="img/icons/sales.png" alt="" className="text-white" />
                {/* <button className="btn btn-info text-white">
                  Start Bidding
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

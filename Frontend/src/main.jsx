import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";



import "https://checkout.razorpay.com/v1/checkout.js";
// import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
// import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"


import App from './App.jsx';
import store from './role/store/index.js';

import Login from './role/user/page/login.jsx';
import Signup_Seller from './role/user/page/signup_seller.jsx';
import Signup_User from './role/user/page/signup_user.jsx';
import Forgot_Password from './role/user/page/forgot_password.jsx';

import Home from './role/user/page/Home.jsx';
import Contact from './role/user/page/contact.jsx';
import Auction_Page from './role/user/page/auction_page.jsx';
import Basket_Page from './role/user/page/basket_page.jsx';
import Account_Page from './role/user/page/account_page.jsx';
import Bid_Notification from './role/user/component/Bid_Notification.jsx';
import Bidding_History from './role/user/component/Bidding_History.jsx';
import Ongoing_Auction from './role/user/component/Ongoing_Auction.jsx';
import Update_Profile from './role/user/component/Update_Profile.jsx';
import UserProfile from './role/user/component/UserProfile.jsx';
import AboutUs from './role/user/component/AboutUs.jsx';
import Pending_Payment from './role/user/component/Pending_Payment.jsx';

import Seller from './role/seller/seller.jsx';
import Add_Auction from './role/seller/page/Add_Auction.jsx';
import Dashboard from './role/seller/page/Dashboard.jsx';
import Reject_auction from './role/seller/page/Reject_auction.jsx';
import Manage_Auctions from './role/seller/page/Manage_Auctions.jsx';
import Order_Management from './role/seller/page/Order_Management .jsx';
import Payments_Earnings from './role/seller/page/Payments_&_Earnings.jsx';
import Reports_Analytics from './role/seller/page/Reports_&_Analytics.jsx';
import Settings from './role/seller/page/Settings.jsx';
import Update_Auction from './role/seller/page/Update_Auction.jsx';
import Update_Profile_seller from './role/seller/page/Update_Profile.jsx';
import Profile_Seller from "./role/seller/page/UserProfile.jsx"
import Auction_Status from './role/seller/page/Auction_Status.jsx';

import Admin from './role/admin/admin.jsx';
import Admin_Dashboard from './role/admin/page/Dashboard.jsx';
import Admin_AuctionStatus from './role/admin/page/Auction_Status.jsx';
import Admin_Manage_Auctions from "./role/admin/page/Manage_Auctions.jsx";
import Admin_UserAccount from "./role/admin/page/User_Account.jsx";
import Admin_SellerAccount from "./role/admin/page/Seller_Account.jsx";
import Admin_PendingAuction from "./role/admin/page/Pending_Auction.jsx";
import Admin_CompleteAuction from "./role/admin/page/Complete_Auction.jsx";
// import Admin_Dashboard from "./role/admin/page/Dashboard.jsx";
// import UserDetails from './role/admin/pages/UserDetails.jsx';
// import SellerDetails from './role/admin/pages/SellerDetails.jsx';
// import AuctionDetails from './role/admin/pages/AuctionDetails.jsx';
// import RejectProduct from './role/admin/pages/RejectProduct.jsx';
import Payement from './role/user/component/Payement.jsx';
import UserQuery from './role/admin/page/UserQuery.jsx';


const router = createBrowserRouter([
  { path: "signup_seller", element: <Signup_Seller /> },
  { path: "signup_user", element: <Signup_User /> },
  { path: "login",  element: <Login /> },
  { path: "forgot-password",  element: <Forgot_Password /> },

  {
    path: "/", 
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "contact", element: <Contact /> },
      { path: "about", element: <AboutUs /> },
      { path: "auction-product/:id", element: <Auction_Page /> },
      { path:'user-account',element:<Account_Page/>, children: [
          { index: true, element: <UserProfile/>},
          {path:"ongoin-auctions",element:<Ongoing_Auction/>},
          { path: "bidding-history", element: <Bidding_History/> },
          { path: "bid-notifications", element: <Bid_Notification/> },
          { path: "update-profile", element: <Update_Profile/> },
          { path: "pending-payment", element: <Pending_Payment/> },
          { path: "user-payment", element:<Payement/> },
        ],
      },
      {path:'user-basket',element:<Basket_Page/>},
      
    ],
  },

  {
    path: "seller", 
    element: <Seller />,
    children: [
      {index:true, element: <Dashboard />},
      { path: "add-auction", element: <Add_Auction/> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "manage-auctions", element: <Manage_Auctions/> },
      { path: "reject-auctions", element: <Reject_auction/> },
      { path: "order-management", element: <Order_Management /> },
      { path: "payments-&-earnings", element: <Payments_Earnings /> },
      { path: "reports-&-analytics", element: <Reports_Analytics /> },
      { path: "settings", element: <Settings /> },
      { path: "profile", element: <Profile_Seller /> },
      { path: "update-profile", element: <Update_Profile_seller /> },
      { path: "auction-status", element: <Auction_Status />},
      { path: "update-auction/:id", element: <Update_Auction /> }
    ],
  },

  {
    path: "admin", 
    element: <Admin/>, 
    children: [
      { index:true, element: <Admin_Dashboard/> },
      { path: "auction-status", element: <Admin_AuctionStatus/> },
      { path: "auction-manage", element: <Admin_Manage_Auctions/>},
      { path: "user-account", element: <Admin_UserAccount/>},
      { path: "seller-account", element: <Admin_SellerAccount/> },
      { path: "user-query", element: <UserQuery/>},
      { path: "pending-auctions", element: <Admin_PendingAuction />},
      { path: "complete-auctions", element: <Admin_CompleteAuction />},
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
);

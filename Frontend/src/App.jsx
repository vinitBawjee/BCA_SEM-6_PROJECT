import { Outlet } from 'react-router-dom'
import Header from './role/user/component/Header'
import Footer from './role/user/component/Footer'
import "https://checkout.razorpay.com/v1/checkout.js";
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

export default App

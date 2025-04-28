import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const Payment = () => {

  const [amount, setAmount] = useState(350); // Amount is in INR, this is ₹350.

  const handlePayment = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/order`, { amount });
      console.log(res);
      console.log(res.data);

      // Now amount is multiplied by 100 to convert to paise (for INR)
      console.log(import.meta.env.VITE_RAZORPAY_KEY_ID);
      
      handlePaymentVerify(res.data);

    } catch (error) {
      console.error("Error Payment to user:", error);
    }
  }

  const handlePaymentVerify = async (data) => {
    const options = {
      key: "rzp_test_b4iBWY0X70QR2V",
      amount: data.amount * 100, 
       // Multiply by 100 to convert to paise (INR)
      currency: data.currency,
      name: "Sejan",
      description: "Test Mode",
      order_id: data.id,
      
      handler: async (res) => {
        console.log("Response", res);
        
        

        const obj = {
          razorpay_order_id: res.razorpay_order_id,
          razorpay_payment_id: res.razorpay_payment_id,
          razorpay_signature: res.razorpay_signature
        }

        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/verify`, { obj });

          if (res) {
            toast.success(res.message);
          }

        } catch (error) {
          console.log("Error", error);
        }
        
      },
      theme: {
        color: "5f63b8"
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  return (
    <>
      <input type="submit" onClick={handlePayment} value="Pay"></input>
      <Toaster />
    </>
  );
}

export default Payment;

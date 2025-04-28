import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import css from "./forgot_password.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Forgot_Password() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        password: "",
        confirmPassword: "",
        role: "user",
    });

    const [errors, setErrors] = useState({});
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(30);
    const [isSending, setIsSending] = useState(false); 

    useEffect(() => {
        let interval;
        if (step === 2 && timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); 
    if (!value) return;
    
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

 
    if (index < 5) document.querySelectorAll(".otp-input")[index + 1].focus();
};

const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
        let newOtp = [...otp];
        newOtp[index] = ""; 
        setOtp(newOtp);

        if (!e.target.value) {
            e.target.previousElementSibling?.focus();
        }
    }
};

    const resendOtp = async () => {
        setIsSending(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/${formData.role}/send-otp`,
                { email: formData.email }
            );
            
            if (response.data.success) {
                setIsSending(false);
                setTimer(30);
            }
        } catch (error) {
            console.error("Resend OTP failed:", error);
        }
    };

    const validate = () => {
        let newErrors = {};
        
        if (step === 1) {
            if (!formData.email) {
                newErrors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = "Invalid email format";
            }
        } else if (step === 2) {
            if (!otp || otp.length !== 4) {
                newErrors.otp = "Enter a valid 4-digit OTP";
            }
        } else if (step === 3) {
            if (!formData.password) {
                newErrors.password = "Password is required";
            } else if (formData.password.length < 6) {
                newErrors.password = "Password must be at least 6 characters";
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                if (step === 1) {
                    setIsSending(true);
                    await axios.post(`${import.meta.env.VITE_API_URL}/${formData.role}/send-otp`, { email: formData.email });
                    setIsSending(false);
                    setStep(2);
                } else if (step === 2) {
                    // Verify OTP
                    await axios.post(`${import.meta.env.VITE_API_URL}/${formData.role}/verify-otp`, { email: formData.email, otp: otp.join("") });
                    setStep(3);
                } else if (step === 3) {
                    // Reset Password
                    await axios.post(`${import.meta.env.VITE_API_URL}/${formData.role}/reset-password`, { email: formData.email, password: formData.password });
                    alert("Password updated successfully!");
                    navigate("/login");
                }
            } catch (error) {
                alert(error.response?.data?.message || "Something went wrong");
                setIsSending(false);
            }
        }
    };

    return (
        <div className={`${css.container}`}>
            <div className={`${css.login}`}>
                <div className={`${css.login_form} border bg-white px-5`}>
                    {step === 1 && (
                        <div className={`${css['forgot_password_container']} border-bottom d-flex flex-column justify-content-evenly`}>
                            <h3 className="text-center mb-3 font-weight-bold" style={{color: "#4A90E2"}}>Forgot Password</h3>
                            <form onSubmit={handleSubmit}>
                                <div className={css['login_form_field']}>
                                    <label className="form-label">Email</label>
                                    <input type="email" name="email" className={`form-control ${errors.email ? "border-danger" : ""}`} placeholder="Enter email" value={formData.email} onChange={handleChange} />
                                    {errors.email && <small className="text-danger">{errors.email}</small>}
                                </div>
                                <div className={css['login_form_field']}>
                                    <label className="form-label">Role</label>
                                    <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
                                        <option value="user">User</option>
                                        <option value="seller">Seller</option>
                                    </select>
                                </div>
                                <button type="submit" className="w-100 btn border">{isSending ? "Sending..." : "Send OTP"}</button>
                            </form>
                        </div>
                    )}

                    {step === 2 && (
                        <div className={`${css['forgot_password_container']} border-bottom bg-white d-flex flex-column justify-content-evenly`}>
                            <h3 className="text-center mb-3 font-weight-bold" style={{color: "#4A90E2"}}>OTP Verification</h3>
                            <div>
                                <p className="text-center text-dark">Enter the 4-digit OTP sent to your email.</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="d-flex justify-content-center mb-2">
                                        {Array.from({ length: 4 }).map((_, index) => (
                                            <input 
                                                key={index}
                                                type="text"
                                                maxLength="1"
                                                className="form-control text-center mx-1 otp-input"
                                                value={otp[index] || ""}
                                                onChange={(e) => handleOtpChange(e, index)}
                                                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                            />
                                        ))}
                                    </div>
                                    {errors.otp && <small className="text-danger d-block text-center">{errors.otp}</small>}

                                    <div className="text-start mb-3 d-flex justify-content-between align-items-center">
                                        <button type="button" className="btn btn-link" onClick={() => setStep(1)}>Cancel</button>
                                        {timer > 0 ? (
                                            <small style={{color: "#4A90E2"}}>
                                                Resend OTP in <strong>{timer}s</strong>
                                            </small>
                                        ) : (
                                            <button type="button" className="btn btn-link p-0" style={{color: "#4A90E2"}} onClick={resendOtp}>
                                                {isSending ? "Sending..." : "Resend Code"}
                                            </button>
                                        )}
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        
                                        <button type="submit" className="btn border w-100">Verify</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className={`${css['forgot_password_container']} border-bottom bg-white d-flex flex-column justify-content-evenly`}>
                            <h3 className="text-center mb-3 font-weight-bold" style={{color: "#4A90E2"}}>New Password</h3>
                            <form onSubmit={handleSubmit}>
                                <div className={css['login_form_field']}>
                                    <label className="form-label">Password</label>
                                    <input type="password" name="password" className={`form-control ${errors.password ? "border-danger" : ""}`} placeholder="Enter new password" value={formData.password} onChange={handleChange} />
                                    {errors.password && <small className="text-danger">{errors.password}</small>}
                                </div>
                                <div className={css['login_form_field']}>
                                    <label className="form-label">Confirm Password</label>
                                    <input type="password" name="confirmPassword" className={`form-control ${errors.confirmPassword ? "border-danger" : ""}`} placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} />
                                    {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                                </div>
                                <button type="submit" className="w-100 btn border">Update</button>
                            </form>
                        </div>
                    )}

                    <Link to="/login" className={`${css['forgot_password_link']}`} style={{color: "#4A90E2"}}>Back to login</Link>
                </div>
                <div className={`${css.login_link} border p-3 bg-white text-center`}>
                Don't have an account?  
                        <Link to="/signup_user" style={{color: "#4A90E2"}}> User</Link> |  
                        <Link to="/signup_seller" style={{color: "#4A90E2"}}> Seller</Link>
                </div>
            </div>
        </div>
    );
}

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import css from "./Update_Profile.module.css";

const Update_Profile = () => {
    const fileInputRef = useRef(null);
    const [errors, setErrors] = useState({});
    const [activeTab, setActiveTab] = useState("update");
    const [updateDetails, setUpdateDetails] = useState({
        fullName: "",
        email: "",
        address: "",
        city: "",
        pincode: "",
        mobile: "",
        gender: "",
        birthdate: null,
        image: null,
    });

    const [changePassword, setChangePassword] = useState({
        old_password: "",
        new_password: "",
        confirm_Password: "",
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            const userId = localStorage.getItem("user_id");
            if (!userId) return;
    
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/user/${userId}`);
                setUpdateDetails((prev) => ({
                    ...prev,
                    ...data,
                    birthdate: data.birthdate ? new Date(data.birthdate).toISOString().split("T")[0] : "",
                }));
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
    
        fetchUserDetails();
    }, []);    

    const handleUpdateChange = (e) => {
        const { name, value, type, files } = e.target;
        setUpdateDetails((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
        setErrors({ ...errors, [name]: "" });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setChangePassword((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors({ ...errors, [name]: "" });
    };

    const validateUpdate = () => {
        let newErrors = {};
        if (!updateDetails.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!updateDetails.email.trim()) newErrors.email = "Email is required";
        if (!updateDetails.address.trim()) newErrors.address = "Address is required";
        if (!updateDetails.city.trim()) newErrors.city = "City is required";
        if (!updateDetails.pincode.match(/^\d{6}$/)) newErrors.pincode = "Enter a valid 6-digit Pincode";
        if (!updateDetails.mobile.match(/^\d{10}$/)) newErrors.mobile = "Enter a valid 10-digit Mobile number";
        if (!updateDetails.gender) newErrors.gender = "Select Gender";
        if (!updateDetails.birthdate) newErrors.birthdate = "Select Birthdate";
        if (!updateDetails.image) newErrors.image = "Upload an Image";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePassword = () => {
        let newErrors = {};
        if (changePassword.old_password.length < 6) newErrors.old_password = "Password must be at least 6 characters";
        if (changePassword.new_password.length < 6) newErrors.new_password = "Password must be at least 6 characters";
        if (changePassword.new_password !== changePassword.confirm_Password) newErrors.confirm_Password = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdateSubmit = async () => {
        if (validateUpdate()) {
            const formDataObj = new FormData();
            for (const key in updateDetails) {
                formDataObj.append(key, updateDetails[key]);
            }
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}/user/update-user`,
                    formDataObj,
                    { 
                        headers: { 
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        } 
                    }
                );
    
                const { email, fullName, role } = res.data.user;
                localStorage.setItem("email", email);
                localStorage.setItem("fullName", fullName);
                localStorage.setItem("role", role);

                setUpdateDetails({
                    fullName: "",
                    email: "",
                    address: "",
                    city: "",
                    pincode: "",
                    mobile: "",
                    gender: "",
                    birthdate: "",
                    image: null,
                });
                if (fileInputRef.current) fileInputRef.current.value = "";
                alert(res.data.message);
            } catch (error) {
                alert(error.response?.data?.message || "Error occurred");
            }
        }
    };

    const handlePasswordSubmit = async () => {
        if (!validatePassword()) return;
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/user/change-password`, 
                changePassword, 
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            setChangePassword({ old_password: "", new_password: "", confirm_Password: "" });
            alert(res.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred while changing the password.");
        }
    };
      

    return (
        <div className={css.container}>
            <div className="d-flex justify-content-end">
                <button onClick={() => setActiveTab(activeTab === "update" ? "password" : "update")} className="btn btn-link">
                    {activeTab === "update" ? "Change Password" : "Update Details"}
                </button>
            </div>

            {activeTab === "update" && (
                <div>
                <h5 className="text-muted mb-3">Update Details</h5>
                <div>
                    <div className={`${css.signup_form_field} d-flex gap-3`}>
                        <div className="w-100">
                            <label className="form-label">Full Name</label>
                            <input type="text" name="fullName" placeholder="enter fullName" className={`form-control ${errors.fullName ? "border-danger" : ""}`} value={updateDetails.fullName} onChange={handleUpdateChange} />
                            {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                        </div>
                        <div className="w-100">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" placeholder="enter email" className={`form-control ${errors.email ? "border-danger" : ""}`} value={updateDetails.email} onChange={handleUpdateChange} />
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                        </div>
                    </div>    
                    <div className={css.signup_form_field_textarea}>
                        <label className="form-label">Address</label>
                        <textarea name="address" placeholder="enter address" className={`form-control h-75 ${errors.address ? "border-danger" : ""}`} value={updateDetails.address} onChange={handleUpdateChange}></textarea>
                        {errors.address && <small className="text-danger">{errors.address}</small>}
                    </div> 
                    <div className={`${css.signup_form_field} d-flex gap-3`}>
                        <div className="w-100">
                            <label className="form-label">City</label>
                            <input type="text" name="city" placeholder="enter city" className={`form-control ${errors.city ? "border-danger" : ""}`} value={updateDetails.city} onChange={handleUpdateChange} />
                            {errors.city && <small className="text-danger">{errors.city}</small>}
                        </div>
                        <div className="w-100">
                            <label className="form-label">Pincode</label>
                            <input type="text" name="pincode" placeholder="enter pincode" className={`form-control ${errors.pincode ? "border-danger" : ""}`} value={updateDetails.pincode} onChange={handleUpdateChange} />
                            {errors.pincode && <small className="text-danger">{errors.pincode}</small>}
                        </div>
                    </div>
                    <div className={`${css.signup_form_field} d-flex gap-3`}>
                        <div className="w-100">
                            <label className="form-label">Birthdate</label>
                            <input type="date" name="birthdate" className={`form-control ${errors.birthdate ? "border-danger" : ""}`} value={updateDetails.birthdate} onChange={handleUpdateChange} max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]} />
                            {errors.birthdate && <small className="text-danger">{errors.birthdate}</small>}
                        </div>
                        <div className="w-100">
                            <label className="form-label">Gender</label>
                            <div className={`form-control ${errors.gender ? "border-danger" : ""} border rounded p-2`}>
                                <input type="radio" name="gender" value="Male" onChange={handleUpdateChange} checked={updateDetails.gender === "Male"} /> Male
                                <input type="radio" name="gender" value="Female" className="ms-3" onChange={handleUpdateChange} checked={updateDetails.gender === "Female"} /> Female
                            </div>
                            {errors.gender && <small className="text-danger">{errors.gender}</small>}
                        </div>
                    </div>
                    <div className={`${css.signup_form_field} d-flex gap-3`}>
                        <div className="w-100">
                            <label className="form-label">Mobile</label>
                            <input type="text" name="mobile" placeholder="enter mobile" className={`form-control ${errors.mobile ? "border-danger" : ""}`} value={updateDetails.mobile} onChange={handleUpdateChange} />
                            {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
                        </div>
                        <div className="w-100">
                            <label className="form-label">Profile Image</label>
                            <input type="file" name="image" className={`form-control ${errors.image ? "border-danger" : ""}`} accept="image/*" onChange={handleUpdateChange} ref={fileInputRef} />
                            {errors.image && <small className="text-danger">{errors.image}</small>}
                        </div>
                    </div>
                    <button className="btn btn-secondary w-100 mt-1" onClick={handleUpdateSubmit}>update</button>
                </div>
                </div>
            )}
            {activeTab === "password" && (
                <div>
                <h5 className="text-muted mb-3">Change Password</h5>
                <div className={`${css.signup_form_field} d-flex gap-3`}>
                    <div className="w-100">
                        <label className="form-label">Old</label>
                        <input type="password" name="old_password" placeholder="enter password" className={`form-control ${errors.old_password ? "border-danger" : ""}`} value={changePassword.old_password} onChange={handlePasswordChange} />
                        {errors.old_password && <small className="text-danger">{errors.old_password}</small>}
                    </div>
                    <div className="w-100">
                        <label className="form-label">New</label>
                        <input type="password" name="new_password" placeholder="enter password" className={`form-control ${errors.new_password ? "border-danger" : ""}`} value={changePassword.new_password} onChange={handlePasswordChange} />
                        {errors.new_password && <small className="text-danger">{errors.new_password}</small>}
                    </div>
                    <div className="w-100">
                        <label className="form-label">Confirm</label>
                        <input type="password" name="confirm_Password" placeholder="enter new Password" className={`form-control ${errors.confirm_Password ? "border-danger" : ""}`} value={changePassword.confirm_Password} onChange={handlePasswordChange} />
                        {errors.confirm_Password && <small className="text-danger">{errors.confirm_Password}</small>}
                    </div>
                </div>
                <button className="btn btn-secondary w-100 mt-1" onClick={handlePasswordSubmit}>change</button>
            </div>
            )}
        </div>
    );
};

export default Update_Profile;

import { useEffect } from "react";
import { Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import css from "./admin.module.css";
import Sidebar from "./component/Sidebar";

export default function Seller() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "admin") {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className={css['seller_container']}>
            <div className={css['container_col']}><Sidebar /></div>
            <div className={css['container_col2']}><Outlet /></div>
        </div>
    );
}

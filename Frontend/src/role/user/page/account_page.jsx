import { useEffect } from "react";
import { Outlet } from 'react-router-dom';
import css from "./account_page.module.css";

import Account_Slidebar from "../component/Account_Slidebar";

const Account_Page = () => {

    return (
        <div className={css['user_account']}>
            <div className={css['user_account_col']}><Account_Slidebar/></div>
            <div className={css['user_account_col2']}><Outlet/></div>
        </div>
    )
}

export default Account_Page
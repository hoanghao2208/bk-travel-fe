import { memo, useEffect } from "react";
import "./style.scss";
import UserHomePageLayout from "layouts/UserHomePageLayout";

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Trang chủ';
    })
    return (
        <UserHomePageLayout>
            
        </UserHomePageLayout>
    )
})

Inner.displayName = "User HomePage Inner";

export default Inner;
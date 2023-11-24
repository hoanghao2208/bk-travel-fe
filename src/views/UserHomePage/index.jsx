import { memo } from "react";
import Inner from "views/UserHomePage/Inner";

const Wrapper = memo(() => {
    return <Inner />
})

Wrapper.displayName = "User HomePage";

const UserHomePage = Wrapper;

export default UserHomePage;
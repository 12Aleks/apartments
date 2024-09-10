import {
    LoginLink,
    LogoutLink,
    RegisterLink,
    getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@nextui-org/react";
import React from "react";
import UserProfilePanel from "./UserProfilePanel";
import {getUserById} from "@/lib/actions/user";

const signInPanel = async () => {
    const { isAuthenticated, getUser } = await getKindeServerSession();

    if (await isAuthenticated()) {
        const user = await getUser();
        console.log("User",user)
        const dbUser = await getUserById(user? user.id: '');
        return <>{dbUser!! && <UserProfilePanel user={dbUser} />}</>;
    }

    return (
        <div className="flex gap-3">
            <Button color="primary"><LoginLink>Sign In</LoginLink></Button>
            <Button color="default"><RegisterLink>Sign Up</RegisterLink></Button>
        </div>
    );
};

export default signInPanel;
import {getKindeServerSession, LoginLink, RegisterLink} from "@kinde-oss/kinde-auth-nextjs/server";
import {Button} from "@nextui-org/react";
import React from 'react';

const signInPanel = async () => {
    const { isAuthenticated, getUser } = await getKindeServerSession();
    const user = await getUser();
    console.log(user);
    if (await isAuthenticated()) {return <div>{user?.given_name}</div>}

    return (
        <div className="flex gap-3">
            <Button color="primary"><LoginLink>Sign In</LoginLink></Button>
            <Button color="default"><RegisterLink>Sign Up</RegisterLink></Button>
        </div>
    );
};

export default signInPanel;
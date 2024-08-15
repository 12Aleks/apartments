"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Dropdown, DropdownTrigger, User, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { User as PrismaUser } from "@prisma/client";
import Link from "next/link";
import React from "react";


interface IUserProfilePanelProps {
    user: PrismaUser
}

const UserProfilePanel = ({user}: IUserProfilePanelProps) => {
    return (
        <Dropdown placement="bottom-start">
            <DropdownTrigger>
                <User
                    as="button"
                    avatarProps={{
                        isBordered: true,
                        src: user.avatarUrl ?? "",
                    }}
                    className="transition-transform"
                    description={user.email}
                    name={`${user.firstName} ${user.lastName}`}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem>
                    <Link href="/user/profile">Profile</Link>
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                    <LogoutLink>
                        Log Out
                    </LogoutLink>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default UserProfilePanel;
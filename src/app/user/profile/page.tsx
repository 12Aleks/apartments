import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {getUserById} from "@/lib/actions/user";
import {KindeUser} from "@kinde-oss/kinde-auth-nextjs/types";
import PageTitle from "@/app/components/pageTitle";
import {Card} from "@nextui-org/card";
import SectionTitle from "@/app/user/profile/_components/sectionTitle";
import {Avatar, Button} from "@nextui-org/react";
import UploadAvatar from "@/app/user/profile/_components/uploadAvatar";
import Link from "next/link";
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

interface IAttribute {
    title: string
    value: React.ReactNode
}

const ProfilePage = async () => {
    const session = await getKindeServerSession();

    if (!session) {
        console.error("No session found");
        return NextResponse.json({ success: false, error: "Session not found" }, { status: 401 });
    }

    const user: KindeUser<any> | null = await session.getUser();

    if (!user) {
        console.error("No user data found in session");
        return NextResponse.json({ success: false, error: "User data missing" }, { status: 401 });
    }


    const dbUser = await getUserById(user ? user.id : '');


    const userSubscriptions = await prisma.subscriptions.findFirst({
        where: {
            userId: dbUser?.id
        },
        include: {
            plan: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div>
            <PageTitle title="My profile page" linkCaption="Return to Home page" href="/"/>
            <Card className="p-4 m-4">
                <SectionTitle title="Basic information"/>
                <div className="flex">
                    <div className="flex flex-col items-center justify-start">
                        <Avatar className="w-20 h-20 m-2" src={dbUser?.avatarUrl ?? "/profile.png"} alt="Profile"/>
                        <UploadAvatar userId={dbUser?.id!}/>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Attribute title="Name" value={`${dbUser?.firstName} ${dbUser?.lastName}`}/>
                    <Attribute title="Email" value={dbUser?.email}/>
                    <Attribute title="Registered On" value={dbUser?.createdAt?.toLocaleDateString()}/>
                    <Attribute title="Units Posted" value={1}/>
                </div>
            </Card>
            <Card className="p-4 m-4">
               <SectionTitle title="Subscription Details" />

                {
                    userSubscriptions ?(<div className="pt-10 pb-3">
                        <Attribute title="Plan" value={userSubscriptions.plan.name}/>
                        <Attribute title="Price" value={userSubscriptions.plan.price}/>
                        <Attribute title="Purchased On" value={userSubscriptions.createdAt.toLocaleDateString()}/>
                    </div>) : (<div className="flex flex-col items-center pt-10 pb-3">
                        <p className="text-center text-slate-700 text-xl">No Subscription Found!</p>
                    </div>)
                }

                <Link href="/user/subscriptions/" className="mt-5 mb-5">
                    <Button variant="bordered" className="border-blue-700 text-xl block text-blue-700
                    hover:border-blue-900 hover:text-blue-700 m-auto">Purchase Your Subscription</Button>
                </Link>
            </Card>
        </div>
    );
};

export default ProfilePage;


const Attribute = ({title, value}: IAttribute) => <div className="flex flex-col text-sx">
    <span className="text-slate-800 font-semibold">{title}</span>
    <span className="text-slate-600 ">{value}</span>
</div>

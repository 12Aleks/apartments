import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserById } from "@/lib/actions/user";
import PageTitle from "@/app/components/pageTitle";
import SectionTitle from "@/app/user/profile/_components/sectionTitle";
import { Avatar, Button, Card } from "@nextui-org/react";
import UploadAvatar from "@/app/user/profile/_components/uploadAvatar";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
    const { getUser } = await getKindeServerSession();
    const user = await getUser();

    if (!user) {
        // Redirect to home page if no user is found
        redirect("/");
    }

    const dbUser = await getUserById(user.id);

    const userSubscriptions = await prisma.subscriptions.findFirst({
        where: { userId: dbUser?.id },
        include: { plan: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <PageTitle title="My profile page" linkCaption="Return to Home page" href="/" />
            <Card className="p-4 m-4">
                <SectionTitle title="Basic information" />
                <div className="flex">
                    <div className="flex flex-col items-center justify-start">
                        <Avatar className="w-20 h-20 m-2" src={dbUser?.avatarUrl ?? "/profile.png"} alt="Profile" />
                        <UploadAvatar userId={dbUser?.id!} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Attribute title="Name" value={`${dbUser?.firstName} ${dbUser?.lastName}`} />
                    <Attribute title="Email" value={dbUser?.email} />
                    <Attribute title="Registered On" value={dbUser?.createdAt?.toLocaleDateString()} />
                    <Attribute title="Units Posted" value={1} />
                </div>
            </Card>
            <Card className="p-4 m-4">
                <SectionTitle title="Subscription Details" />

                {userSubscriptions ? (
                    <div className="pt-10 pb-3">
                        <Attribute title="Plan" value={userSubscriptions.plan.name} />
                        <Attribute title="Price" value={userSubscriptions.plan.price} />
                        <Attribute title="Purchased On" value={userSubscriptions.createdAt.toLocaleDateString()} />
                    </div>
                ) : (
                    <div className="flex flex-col items-center pt-10 pb-3">
                        <p className="text-center text-slate-700 text-xl">No Subscription Found!</p>
                    </div>
                )}

                <Link href="/user/subscriptions/" className="mt-5 mb-5">
                    <Button
                        variant="bordered"
                        className="border-blue-700 text-xl block text-blue-700 hover:border-blue-900 hover:text-blue-700 m-auto"
                    >
                        Purchase Your Subscription
                    </Button>
                </Link>
            </Card>
        </div>
    );
};

export default ProfilePage;

const Attribute = ({ title, value }: { title: string; value: ReactNode }) => (
    <div className="flex flex-col text-sx">
        <span className="text-slate-800 font-semibold">{title}</span>
        <span className="text-slate-600 ">{value}</span>
    </div>
);

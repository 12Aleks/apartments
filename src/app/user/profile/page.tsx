import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {getUserById} from "@/lib/actions/user";
import {KindeUser} from "@kinde-oss/kinde-auth-nextjs/types";
import PageTitle from "@/app/components/pageTitle";
import {Card} from "@nextui-org/card";
import SectionTitle from "@/app/user/profile/_components/sectionTitle";
import {Avatar} from "@nextui-org/react";
import UploadAvatar from "@/app/user/profile/_components/uploadAvatar";

interface IAttribute {
    title: string
    value: React.ReactNode
}

const ProfilePage = async () => {
    const {getUser} = await getKindeServerSession();

    const user: KindeUser | null = await getUser();
    const dbUser = await getUserById(user ? user.id : '');


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
                    <Attribute title="Properties Posted" value={1}/>
                </div>
            </Card>
        </div>
    );
};

export default ProfilePage;


const Attribute = ({title, value}: IAttribute) => <div className="flex flex-col text-sx">
    <span className="text-slate-800 font-semibold">{title}</span>
    <span className="text-slate-600 ">{value}</span>
</div>

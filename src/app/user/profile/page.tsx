import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {getUserById} from "@/lib/actions/user";
import {KindeUser} from "@kinde-oss/kinde-auth-nextjs/types";
import PageTitle from "@/app/components/pageTitle";
import {Card} from "@nextui-org/card";
import SectionTitle from "@/app/user/profile/_components/sectionTitle";

const ProfilePage = async () => {
    const {getUser} = await getKindeServerSession();

    const user: KindeUser | null = await getUser();
    const dbUser = await getUserById(user ? user.id : '');

    return (
        <div>
            <PageTitle title="My profile page" linkCaption="Return to Home page" href="/"/>
            <Card className="p-4 m-4">
                <SectionTitle title="Basic information"/>
            </Card>
        </div>
    );
};

export default ProfilePage;
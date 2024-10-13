import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {

   try {
      let user;
      try {
      const { getUser } = await getKindeServerSession();
      user = await getUser();

      } catch (sessionError) {
         console.error("Error retrieving user session:", sessionError);
         return NextResponse.json({ success: false, error: "Session retrieval failed" }, { status: 500 });
      }

      if (!user || !user.id) {
         throw new Error('No user found: ' + JSON.stringify(user));
      }

      const dbUser = await prisma.user.findUnique({
         where: {
            id: user.id,
         }
      }).catch(prismaError => {
         console.error("Error fetching user from database:", prismaError);
         throw new Error("Database query failed");
      });

      if (!dbUser) {
         await prisma.user.create({
            data: {
               id: user.id,
               firstName: user.given_name ?? "",
               lastName: user.family_name ?? "",
               email: user.email ?? "",
            },
         });

         return NextResponse.redirect("https://apartments-pied.vercel.app/");
      }

      // If the user already exists in the database, you can return a redirect or a success message.
      return NextResponse.redirect("https://apartments-pied.vercel.app/");

   } catch (error) {
      console.error("Error in /api/auth/success:", error);
      if (error instanceof Error) {
         return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
   }
}

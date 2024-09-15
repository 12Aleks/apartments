import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const { getUser } = await getKindeServerSession();
      const user = await getUser();

      if (!user || !user.id) {
         throw new Error('No user found: ' + JSON.stringify(user));
      }

      const dbUser = await prisma.user.findUnique({
         where: {
            id: user.id,
         }
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

         return NextResponse.redirect("http://localhost:3000/");
      }

      // If the user already exists in the database, you can return a redirect or a success message.
      return NextResponse.redirect("http://localhost:3000/");

   } catch (error) {
      console.error("Error in /api/auth/success:", error);
      if (error instanceof Error) {
         return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
   }
}

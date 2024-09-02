import {withAuth} from "@kinde-oss/kinde-auth-nextjs/middleware";
export default function middleware(req) {
    return withAuth(req);
}

//list of protected routes
export const config = {
    matcher: ["/user/profile"]
};
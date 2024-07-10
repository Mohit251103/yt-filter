import "next-auth"

declare module "next-auth"{
    interface Session{
        accessToken:String
        user:{
            id:String,
            email:String,
            image:String,
            username:String
        }& DefaultSession["user"]
    }
}
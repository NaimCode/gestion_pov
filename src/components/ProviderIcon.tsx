import { User } from "@prisma/client";
import { FcGoogle } from "react-icons/fc";
//icon GrFacebookOption
import { GrFacebookOption } from "react-icons/gr";
//icon AiOutlineGithub
import { AiOutlineGithub } from "react-icons/ai";
 const ProviderIcon= ({user}:any) => {
    switch (user.accounts[0].provider) {
        case "facebook":
        return <GrFacebookOption/>
        case "google":
        return <FcGoogle/>
        case "github":
        return <AiOutlineGithub/>
        default:
        return <></>
    }
    }

export default ProviderIcon
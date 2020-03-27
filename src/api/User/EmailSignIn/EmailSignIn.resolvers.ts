import createJWT from "../../../utils/createJWT";
import { 
    EmailSignInMutationArgs, 
    EmailSignInResponse 
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { prisma } from "../../../../generated/prisma-client";

const resolvers: Resolvers = {
    Mutation: {
        EmailSignIn: async (
            _, 
            args: EmailSignInMutationArgs
        ): Promise<EmailSignInResponse> => {
            const { email, password} = args;
            try{
                const user = await prisma.users({ where: { email } });
                console.log(user);
                if(!user[0]){
                    console.log("유저가 존재하지 않는다.")
                    return {
                        ok: false,
                        error: "No User found with that email",
                        token: null
                    };
                } 

                const checkPassword = await prisma.$exists.user({ password });

                if(checkPassword) {
                    const token = createJWT(user[0].id);
                    return {
                        ok: true,
                        error: null,
                        token: token 
                    };
                }else{
                    return {
                        ok: false,
                        error: "Wrong password",
                        token: null
                    };
                }
            }catch(error){
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }
        }
    }
}

export default resolvers;
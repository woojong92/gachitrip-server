import { Resolvers } from "../../../types/resolvers";
import { 
    EmailSignUpMutationArgs, 
    EmailSignUpResponse 
} from "../../../types/graph";

import { prisma } from "../../../../generated/prisma-client";

const resolvers: Resolvers = {
    Mutation: {
        EmailSignUp: async(
            _, 
            args: EmailSignUpMutationArgs
        ): Promise<EmailSignUpResponse> => {
            const {         
                username,
                email,
            } = args;
            try {
                const existingUser = await prisma.$exists.user({ OR: [{ username}, {email}]});
                if(existingUser) {
                    return {
                        ok: false,
                        error: "You should log in instead",
                    }
                }else {
                    const emailVerification = await prisma.$exists.verification({payload: email, verified: true})
                    if( emailVerification){
                        await prisma.createUser({
                            ...args
                        });
                        return {
                            ok: true,
                            error: null,
                        }
                    }else{
                        return {
                            ok: false,
                            error: "email is not verificated",
                        }
                    }
                }
            }catch(error){
                console.log("error")
                return {
                    ok: false,
                    error: error.message,
                };
            }
        }
    }
};

export default resolvers;
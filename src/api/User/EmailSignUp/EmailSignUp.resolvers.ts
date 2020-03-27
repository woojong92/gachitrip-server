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
            const { username, email } = args;
            try {
                const existingUser = await prisma.$exists.user({ OR: [{ username}, {email}]});
                if(existingUser) {
                    return {
                        ok: false,
                        error: "You should log in instead",
                    }
                }else {
                    await prisma.createUser({
                        ...args
                    })
                    return {
                        ok: true,
                        error: null, 
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
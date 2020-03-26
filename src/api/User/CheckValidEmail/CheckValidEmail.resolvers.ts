import { Resolvers } from "../../../types/resolvers";
import { 
    CheckValidEmailMutationArgs, 
    CheckValidEmailResponse 
} from "../../../types/graph";
import { prisma } from "../../../../generated/prisma-client";

const resolvers: Resolvers = {
    Mutation: {
        CheckValidEmail: async (
            _,
            args: CheckValidEmailMutationArgs
        ): Promise<CheckValidEmailResponse> => {
            const { email } = args;
            try{
                const existingEmail = await prisma.$exists.user({email});
                if(existingEmail){
                    return {
                        ok: false,
                        error: "email is not vaild"
                    }
                }else{
                    return {
                        ok: true,
                        error: null
                    }
                }
            }catch(error){
                return {
                    ok: false,
                    error: error.message
                }
            }
            
        }
    }
}

export default resolvers;
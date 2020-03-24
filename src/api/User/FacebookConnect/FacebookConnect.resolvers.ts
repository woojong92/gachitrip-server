import User from "../../../entities/User";
import { 
    FacebookConnectMutationArgs, 
    FacebookConnectResponse 
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Mutation: {
        FacebookConnect: async(
            _, 
            args: FacebookConnectMutationArgs
        ) : Promise<FacebookConnectResponse> => {
            const { fbId } = args;
            try{
                const existingUser = await User.findOne({fbId});
                if(existingUser) {
                    return {
                        ok: true,
                        error: null,
                        token: "Comming Soon, already"
                    };
                }
            }catch(error){
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }

            try{
                await User.create({
                    ...args, 
                    profilePhoto: `https://graph.facebook.com/${fbId}/picture?type=square`
                }).save();
                return {
                    ok: true,
                    error: null,
                    token: "Coming Soon, created"
                };
            }catch(error){
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }
        }
    }
};


export default resolvers;

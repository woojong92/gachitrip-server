import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { DeleteBoardMutationArgs, DeleteBoardResponse } from "../../../types/graph";
import { prisma } from "../../../../generated/prisma-client";


const resolvers: Resolvers = {
    Mutation: {
        DeleteBoard: privateResolver(
            async (
            _,
            args: DeleteBoardMutationArgs,
            { req }
        ): Promise<DeleteBoardResponse> => {
            const { id } = args;
            const { user } = req;
            const board = await prisma.$exists.board({ id, author: { id: user.id } });
            
            if( board ){
                try{
                    await prisma.deleteBoard({ id });
                    return {
                        ok: true,
                        error: null
                    }
                }catch(error){
                    return {
                        ok: false,
                        error: error.message
                    }
                }
            }else{
                return {
                    ok: false,
                    error: "not found"
                }
            }
        }
      )
    }
  };
  
  export default resolvers;
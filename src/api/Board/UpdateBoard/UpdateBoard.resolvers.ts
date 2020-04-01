import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { UpdateBoardMutationArgs, Board } from "../../../types/graph";
import { prisma } from "../../../../generated/prisma-client";


const resolvers: Resolvers = {
    Mutation: {
        UpdateBoard: privateResolver(
            async (
            _,
            args: UpdateBoardMutationArgs,
            { req }
        ): Promise<any> => {
            const { id, title, text } = args;
            const { user } = req;
            const board = await prisma.$exists.board({ id, author: { id: user.id } });
            if( board ){
                return prisma.updateBoard({
                    data: { title, text },
                    where: { id }
                });
            }else{
                throw Error("You can't do that");
            }
        }
      )
    }
  };
  
  export default resolvers;
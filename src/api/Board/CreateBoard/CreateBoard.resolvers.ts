import {
    CreateBoardMutationArgs,
    CreateBoardResponse
  } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateResolver";
import { prisma } from "../../../../generated/prisma-client";


const resolvers: Resolvers = {
    Mutation: {
      UpdateMyProfile: privateResolver(
        async (
          _,
          args: CreateBoardMutationArgs,
          { req }
        ): Promise<CreateBoardResponse> => {
          const user: User = req.user;
          //const notNull: any = cleanNullArgs(args);
          const { title, text, files } = args;
          const board = await prisma.createBoard({
            title,
            text,
            author: { connect: { id: user.id }}
          })
          // if(!files
          files.forEach(
            async file =>
                await prisma.createBoardFile({
                    url: file,
                    board: {
                        connect: {
                            id: board.id
                        }
                    }
                }) 
          );
          return {
              ok: true,
              error: null,
          }
        }
      )
    }
  };
  
  export default resolvers;
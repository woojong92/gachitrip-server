import { Resolvers } from "../../../types/resolvers";
import { prisma } from "../../../../generated/prisma-client";
import privateResolver from "../../../utils/privateResolver";
const resolvers: Resolvers = {
    Query: {
        ListBoard: privateResolver(
            async (
                _, 
                args
            ) => {
                return prisma.boards({orderBy: "createdAt_DESC"});
            }
        ) 
    }
};

export default resolvers;
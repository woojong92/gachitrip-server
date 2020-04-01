import { Resolvers } from "../../../types/resolvers";
import { prisma } from "../../../../generated/prisma-client";

const resolvers: Resolvers = {
    Query: {
        ReadBoard: async (_, args) => {
            const { id } = args;
            return prisma.board({ id });
        }
    }
};

export default resolvers;

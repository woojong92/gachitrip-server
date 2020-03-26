import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        following: ({ id }) => prisma.user({ id }).following(),
        followers: ({ id }) => prisma.user({ id }).followers(),
        boards: ({ id }) => prisma.user({ id }).boards(),
        boardLikes: ({ id }) => prisma.user({ id }).boardLikes(), 
        boardComments: ({ id }) => prisma.user({ id }).boardComments(),
        withs: ({ id }) => prisma.user({ id }).withs(),
        withLikes: ({ id }) => prisma.user({ id }).withLikes(),
        withComments: ({ id }) => prisma.user({ id }).withComments(),
        chats: ({ id }) => prisma.user({ id }).chats(),
        followingCount: ({ id }) =>
            prisma
            .usersConnection({ where: { followers_some: { id } } })
            .aggregate()
            .count(),
        followersCount: ({ id }) =>
            prisma
            .usersConnection({ where: { following_none: { id } } })
            .aggregate()
            .count(),
        fullName: parent => `${parent.firstName} ${parent.lastName}`,
        isFollowing: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            try {
                return prisma.$exists.user({
                AND: [
                    {
                    id: user.id
                    },
                    {
                    following_some: {
                        id: parentId
                    }
                    }
                ]
                });
            } catch {
                return false;
            }
            },
        isSelf: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        }
    }
}
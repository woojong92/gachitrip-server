import {
  CompleteEmailVerificationMutationArgs,
  CompleteEmailVerificationResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { prisma } from "../../../../generated/prisma-client";

const resolvers: Resolvers = {
  Mutation: {
    CompleteEmailVerification:
      async (
        _,
        args: CompleteEmailVerificationMutationArgs,

      ): Promise<CompleteEmailVerificationResponse> => {
        const { key, email } = args;
        
        try {
          const verification = await prisma.verifications({
            where: {
              key,
              payload: email
            }
          });
          // 해당 키와 메일을 가지고 있는지를 확인하고

          if (verification[0] ) {
            await prisma.updateVerification({
              data: {
                verified: true
              },
              where: {
                payload: email
              }
            });
            await prisma.updateUser({
              data: {
                verifiedEmail: true,
              },
              where: {
                email
              }
            });
            return {
              ok: true,
              error: null
            };
          } else {
            return {
              ok: false,
              error: "Cant verify email"
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
  }
};

export default resolvers;
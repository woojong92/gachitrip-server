import { createKey } from "../../../utils/createKey";
import { 
  RequestEmailVerificationResponse,
  RequestEmailVerificationMutationArgs
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { prisma } from "../../../../generated/prisma-client";


const resolvers: Resolvers = {
  Mutation: {
    RequestEmailVerification: async (
        _, 
        args: RequestEmailVerificationMutationArgs
      ): Promise<RequestEmailVerificationResponse> => {
        const { email } =  args;
        const key = await createKey("EMAIL");
        try {
          const oldVerification = await prisma.verifications({ where: { payload: email } });
          if( oldVerification[0] ) {
            await prisma.updateVerification({ data: { key, verified: false }, where: { payload: email } });
          }else{
            await prisma.createVerification({
              target: "EMAIL",
              payload: email,
              key,
              verified: false
            })
          }
          console.log("메일 인증을 위해 메일 전송")
          console.log("메일 전송 기능 구현 필요")
          return {
            ok: true,
            error: null
          };
        } catch ( error ) {
            return {
              ok: false,
              error: error.message
           };
        }
    }
  }
};

export default resolvers;
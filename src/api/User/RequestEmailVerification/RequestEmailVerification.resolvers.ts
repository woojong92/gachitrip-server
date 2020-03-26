// import User from "../../../entities/User";
// import Verification from "../../../entities/Verification";
import { 
  RequestEmailVerificationResponse,
  RequestEmailVerificationMutationArgs
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
// import { sendVerificationEmail } from "../../../utils/sendEmail";
import { prisma } from "../../../../generated/prisma-client";
import { createKey } from "../../../utils/createKey";

const resolvers: Resolvers = {
  Mutation: {
    RequestEmailVerification: async (
        _, 
        args: RequestEmailVerificationMutationArgs
      ): Promise<RequestEmailVerificationResponse> => {
        const { email } =  args;
        // 유저에 등록되어 있는 email인지 확인
        const isVaildEmail = await prisma.$exists.user({email});
        
        if(!isVaildEmail){
          // 이미 존재하는 이메일이면
          return {
            ok: false,
            error: "이미 존재하는 이메일 입니다."
          }
        }else{
          const key = await createKey("EMAIL");
          await prisma.createVerification({
            target: "EMAIL",
            payload: email,
            key,
            verified: false
          })
          return {
            ok: false,
            error: "error.message"
          };
        }
      }
    }
  };

        // const oldVerification = await prisma.verification({payload: email})

        // if(oldVerification){
        //   await prisma.deleteVerification({id: oldVerification.id})
        // }


        // await sendVerificationEmail(user.fullName, key);
        


        // if (user.email && !user.verifiedEmail) {
        //   try {
        //     const oldVerification = await Verification.findOne({
        //       payload: user.email
        //     });
        //     if (oldVerification) {
        //       oldVerification.remove();
        //     }
        //     const newVerification = await Verification.create({
        //       payload: user.email,
        //       target: "EMAIL"
        //     }).save();
        //     await sendVerificationEmail(user.fullName, newVerification.key);

        //   } catch (error) {
        //     return {
        //       ok: false,
        //       error: error.message
        //     };
        //   }



        // } else {
        //   return {
        //     ok: false,
        //     error: "Your user has no email to verify"
        //   };
        // }
      //  }
    // )
  // }
// };

export default resolvers;
import Verification from "../../../entities/Verification";
import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse
} from "../../../types/graph";
import { sendVerificationSMS } from "../../../utils/sendSMS";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers= {
  Mutation: {
    StartPhoneVerification: async (
      _,
      args: StartPhoneVerificationMutationArgs
    ): Promise<StartPhoneVerificationResponse> => {
      const { phoneNumber } = args;
      try {
        const existingVerification = await Verification.findOne({
          payload: phoneNumber
        });
        if (existingVerification) {
          existingVerification.remove();
        }
        const newVerification = await Verification.create({
          payload: phoneNumber,
          target: "PHONE"
        }).save();
        await sendVerificationSMS(newVerification.payload, newVerification.key);
        return {
          ok: true,
          error: null
        };
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
import Twilio from "twilio";

const twilioClient = Twilio(
    "AC5d184d8b3193aa7fffe28a9640aa844c",//process.env.TWILIO_SID, 
    "0a3e8b7d0edcecc6e7a9854892b60a1d"//process.env.TWILIO_TOKEN
);

const sendSMS = (to: string, body: string) => {
    return twilioClient.messages.create({
        body,
        to,
        from: "+12058395426"//process.env.TWILIO_PHONE
    })
}

export const sendVerificationSMS = (to: string, key: string) => 
    sendSMS(to, `Your verification key is: ${key}`);
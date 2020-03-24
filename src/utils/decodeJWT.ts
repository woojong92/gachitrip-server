import jwt from "jsonwebtoken";

const decodeJWT = async (token: string): Promise<any> => {
    try{
        const decoded = jwt.verify(token, process.env.JWT_TOKEN || "" );
        console.log(decoded)
        return;
    } catch(error) {
        return undefined;
    } 
};

export default decodeJWT;
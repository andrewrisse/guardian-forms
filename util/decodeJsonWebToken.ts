import {decode} from "jsonwebtoken";
import {JwtToken} from "../@types/auth/JwtToken";

export function decodeJsonWebToken(jwtToken: string): JwtToken {
    const decodedJwt = decode(jwtToken) as JwtToken;
    return decodedJwt;
}

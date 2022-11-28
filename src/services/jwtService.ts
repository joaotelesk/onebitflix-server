import jwt from "jsonwebtoken";

const secret = "chave-do-jwt"; //lembar de mudar
export const jwtService = {
  signToken: (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, secret, {
      expiresIn: expiration,
    });
  },
  verifyToken: (token: string, callbacjfn: jwt.VerifyCallback) => {
    jwt.verify(token, secret, callbacjfn);
  },
};

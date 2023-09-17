import { AuthService } from "../service/auth.service";
import { Strategy as JwtStr, StrategyOptions, ExtractJwt } from "passport-jwt";
import { IPayloadToken } from "../interfaces/auth.interface";
import { PassportUse } from "../utils/passport.use";

export class JwtStrategy extends AuthService {
  constructor() {
    super();
  }

  async validate(payload: IPayloadToken, done: any) {
    return done(null, payload);
  }

  get use() {
    return PassportUse<
      JwtStr,
      StrategyOptions,
      (payload: IPayloadToken, done: any) => Promise<IPayloadToken>
    >(
      "jwt",
      JwtStr,
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.TOKEN_SECRET,
        ignoreExpiration: false,
      },
      this.validate
    );
  }
}
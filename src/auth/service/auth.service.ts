
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { UserService } from "../../users/services/user.service";
import { UserEntity } from "../../users/entities/user.entity";
import { IPayloadToken } from "../interfaces/auth.interface";

export class AuthService  {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly jwtInstance = jwt
  ) { }

  public async validateUser(
    username: string,
    password: string
  ): Promise<UserEntity | null> {
    const userByEmail = await this.userService.findUserByEmail(username);
    
    if (userByEmail) {
      const isMatch = await bcrypt.compare(password, userByEmail.pass);
      if (isMatch) {
        return userByEmail;
      }
    }

    return null;
  }

  //JWT_SECRET

  sing(payload: jwt.JwtPayload, secret: any) {
    return this.jwtInstance.sign(payload, secret, { expiresIn: "1h" });
  }

  public async generateJWT(
    user: UserEntity
  ): Promise<{ accessToken: string; user: UserEntity }> {
    const userConsult = await this.userService.findUserWithRole(
      user.id,
      user.role
    );

    const payload: IPayloadToken = {
      id: userConsult!.id,
      role: userConsult!.role,
      sub: userConsult!.email
    };

    if (userConsult) {
      user.pass = "Not permission";
    }

    return {
      accessToken: this.sing(payload, process.env.TOKEN_SECRET),
      user,
    };
  }
}
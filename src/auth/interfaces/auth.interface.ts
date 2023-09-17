import { RoleType } from "../../users/dto/user.dto";

export interface IPayloadToken {
	id: number;
  role: RoleType;
  sub: string;
}
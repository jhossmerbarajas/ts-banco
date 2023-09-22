import { IsNotEmpty } from 'class-validator'
import { BaseDTO } from '../../config/base.dto'

export class UserDTO
{
	@IsNotEmpty()
	name!: string

	@IsNotEmpty()
	email!: string

	@IsNotEmpty()
	pass!: string

	@IsNotEmpty()
	role!: RoleType

	@IsNotEmpty()
	status!: StatusUser
}

export enum RoleType {
	ADMIN = "ADMIN",
	CLIENT = "CLIENT",
	EMPLOY = "EMPLOY"
}

export enum StatusUser {
	ACTIVE = "ACTIVE",
	DESACTIVE = "DESACTIVE"
}
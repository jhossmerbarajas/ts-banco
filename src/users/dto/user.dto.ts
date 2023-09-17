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
}

export enum RoleType {
	ADMIN = "ADMIN",
	CLIENT = "CLIENT",
	EMPLOY = "EMPLOY"
}
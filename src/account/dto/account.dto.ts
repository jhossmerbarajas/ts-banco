import { IsNotEmpty, IsOptional } from 'class-validator'

import { UserEntity } from '../../users/entities/user.entity'

export class AccountDTO
{
	@IsNotEmpty()
	@IsOptional()
	n_account?: number

	@IsNotEmpty()
	saldo!: number

	@IsNotEmpty()
	accounttype!: AccountType

	@IsNotEmpty()
	user_id!: UserEntity

	@IsNotEmpty()
	status!: StatusAccount

	@IsNotEmpty()
	@IsOptional()
	user_asing?: UserEntity
}

export enum AccountType {
	CORRIENTE = "CORRIENTE",
	AHORRO = "AHORRO"
}

export enum StatusAccount {
	ACTIVE = "ACTIVE",
	DESACTIVE = "DESACTIVE"
}
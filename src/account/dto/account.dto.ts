import { IsNotEmpty } from 'class-validator'

import { UserEntity } from '../../users/entities/user.entity'

export class AccountDTO
{
	@IsNotEmpty()
	n_account?: number

	@IsNotEmpty()
	saldo!: number

	@IsNotEmpty()
	accounttype!: AccountType

	@IsNotEmpty()
	user_id!: UserEntity

	@IsNotEmpty()
	user_asing!: UserEntity
}

export enum AccountType {
	CORRIENTE = "CORRIENTE",
	AHORRO = "AHORRO"
}
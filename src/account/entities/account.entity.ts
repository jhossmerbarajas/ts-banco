import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'

import { BaseEntity } from '../../config/base.entity'
import { UserEntity } from '../../users/entities/user.entity'
import { AccountType, StatusAccount } from '../dto/account.dto'


@Entity({ name: "account" })
export class AccountEntity extends BaseEntity
{
	@Column({ 
		type: "bigint",
		nullable: false 
	})
	n_account!: number

	@Column(
			"decimal",
			{ precision: 6, scale: 2, nullable: false }
		)
	saldo!: number

	@Column({
		type: "enum",
		enum: AccountType
	})
	accounttype!: AccountType

	@Column({
		type: "enum",
		enum: StatusAccount
	})
	status!: StatusAccount

	// Usuario que le asignan la cuenta
	@ManyToOne( () => UserEntity, (user) => user.account )
	@JoinColumn({ name: "user_id" })
	user_id!: UserEntity

	// Usuario que crea la cuenta (empleado o admin)
	@ManyToOne( () => UserEntity, (user_asing) => user_asing.account_asing )
	@JoinColumn({ name: "user_asing" })
	user_asing!: UserEntity
}
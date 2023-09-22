import { Column, Entity, OneToMany, OneToOne } from 'typeorm'

import { BaseEntity } from '../../config/base.entity'
import { AccountEntity } from '../../account/entities/account.entity'
import { RoleType, StatusUser } from '../dto/user.dto'

@Entity({ name: "user" })
export class UserEntity extends BaseEntity
{
	@Column({
		length: 20,
		nullable: false
	})
	name!: string

	@Column({
		length: 50,
		nullable: false,
		unique: true
	})
	email!: string

	@Column({
		nullable: false
	})
	pass!: string

	@Column({
		type: "enum",
		enum: RoleType
	})
	role!: RoleType

	@Column({
		type: "enum",
		enum: StatusUser
	})
	status!: StatusUser

	@OneToMany( () => AccountEntity, (account) => account.user_id )
	account!: AccountEntity[]

	@OneToOne( () => AccountEntity, (account_asing) => account_asing.user_asing )
	account_asing!: AccountEntity[]

	// Asignar un rol por defecto: CLIENTE
	constructor( role = RoleType.CLIENT ) {
		super()

		this.role = role
	}
}
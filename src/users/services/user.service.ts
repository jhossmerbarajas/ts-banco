import { UpdateResult, DeleteResult } from 'typeorm'
import { AppDataSource } from '../../config/data-source'
import { UserEntity } from '../entities/user.entity'
import { RoleType, UserDTO } from '../dto/user.dto'
import * as bcrypt from 'bcryptjs'

export class UserService
{
	private repository = AppDataSource

	async getUserService(): Promise<UserEntity[]> {
		return await AppDataSource.getRepository(UserEntity).find()
	}

	async getUserById (id: number): Promise<UserEntity | null> {
		return this.repository.getRepository(UserEntity).findOneBy({ id })
	}

	async findUserByEmail (email: string): Promise<UserEntity | null> {
		return this.repository.getRepository(UserEntity)
									.createQueryBuilder("user")
									.addSelect("user.pass")
									.where({ email })
									.getOne()
	}

	// async findUserWithRole(id: number, role: RoleType): Promise<UserEntity | null> {
	// 	const user = this.repository.getRepository(UserEntity)
	// 									.createQueryBuilder('user')
	// 									.where({ id })
	// 									.andWhere({ role })
	// 									.getOne()

	// 	return user;
	// }

	async findUserWithRole(id: number, role: RoleType): Promise<UserEntity | null> {
		const user = this.repository.getRepository(UserEntity)
										.createQueryBuilder('user')
										.where({ id })
										.andWhere({ role })
										.getOne()

		return user;
	}

	async createUserService (data: UserDTO): Promise<UserEntity>{
		const newUser = await AppDataSource.getRepository(UserEntity).create(data)
		const hash = await bcrypt.hash(newUser.pass, 10)
		newUser.pass = hash 
		
		return await AppDataSource.getRepository(UserEntity).save(newUser)
	}

	async updateUserService (id: number, data: UserDTO): Promise<UpdateResult> {
		return await AppDataSource
						.getRepository(UserEntity)
						.update(id, data)
	}

	async deleteUserService (id: number): Promise<DeleteResult> {
		return await AppDataSource
						.getRepository(UserEntity)
						.delete(id)
	}
}
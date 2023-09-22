import { UpdateResult, DeleteResult } from 'typeorm'
import { AppDataSource } from '../../config/data-source'

import { AccountEntity } from '../entities/account.entity'
import { AccountDTO } from '../dto/account.dto'

import { UserEntity } from '../../users/entities/user.entity'
import { UserService } from '../../users/services/user.service'

export class AccountService
{
	private repository = AppDataSource

	private min: number = 1000000000
	private max: number = 9999999999
	private cant: number = 10

	constructor(
			private readonly userService: UserService = new UserService
		) {}

	private numeroAleatorioNoRepetidos (): number {
		let numbers = Array.from(
			{ length: this.cant },
			() => Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
		)

		const number = numbers.filter( (val, ind) => numbers.indexOf( val ) === ind)
		return number[0]
	}

	async getAccountService (): Promise<AccountEntity[]> {
		return await this.repository.getRepository(AccountEntity).find()
	}

	async getAccountWithUser (id: number) {
		return await this.repository.getRepository(AccountEntity)
						.createQueryBuilder('account')
						.leftJoinAndSelect('account.user_id', 'user')
						.where({ id })
						.getMany()
	}

	async createAccountService ( data: AccountDTO): Promise<AccountEntity> {
		const id_user = Number(data.user_id)
		const id_asing = Number(data.user_asing)

		const user_id = await this.userService.getUserById(id_user)
		const user_asing = await this.userService.getUserById(id_asing)

		const newAccount = await this.repository.getRepository(AccountEntity).create(data)
		
		newAccount.n_account = this.numeroAleatorioNoRepetidos()
		newAccount.user_id = user_id as UserEntity
		newAccount.user_asing = user_asing as UserEntity

		const account = await this.repository.getRepository(AccountEntity).save(newAccount)

		return account
	}

	async getSaldoAccount (id: number): Promise <AccountEntity | null> {
		return await this.repository.getRepository(AccountEntity)
									.createQueryBuilder('account')
									.leftJoinAndSelect("account.user_id", "user")
									.where("user_id = :user_id", { user_id: id})
									.select("account.saldo")
									.getOne()
	}

	async updateSaldoAccountService (id: number, account: AccountDTO): Promise<UpdateResult> {
		
		const getSaldo = await this.getSaldoAccount(id)
		const newSaldo = account.saldo + Number(getSaldo!.saldo )
		const updateSaldo = await this.repository.getRepository(AccountEntity)
												.createQueryBuilder("account")
												.leftJoinAndSelect("account.user_id", "user")
												.where("user_id = :user_id", { user_id: id })
												.andWhere("n_account = :n_account", { n_account: account.n_account })
												.update(AccountEntity)
												.set({ saldo: newSaldo })
												.execute()
		
		return updateSaldo
	}

	async updateStatusAccount (n_account: number, account: AccountDTO): Promise<UpdateResult> {
		return await this.repository.getRepository(AccountEntity)
									.createQueryBuilder('account')
									.where("n_account = :n_account", { n_account })
									.update(AccountEntity)
									.set({ status: account.status })
									.execute()
	}

}
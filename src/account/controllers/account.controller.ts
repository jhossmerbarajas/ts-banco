import { Request, Response } from 'express'

import { HttpResponse } from '../../libs/response/http.response'
import { AccountService } from '../services/account.service'

export class AccountController
{
	constructor(
		private readonly httpResponse: HttpResponse = new HttpResponse,
		private readonly accountService: AccountService = new AccountService
	) {}

	async createAccountController (req: Request, res: Response) {
		try {

			const newAccount = await this.accountService.createAccountService(req.body)
			return this.httpResponse.Ok(res, newAccount)

		} catch (e) {
			return this.httpResponse.NotFound(res, e)
		}
	}

	async updateSaldoAccountController (req: Request, res: Response) {
		try {
			const user_id = Number(req.params.id)
						
			const upSaldo = await this.accountService.updateSaldoAccountService(user_id, req.body)
			if(!upSaldo.affected) return this.httpResponse.Error(res, 'No se actualizó el saldo')

			return this.httpResponse.Ok(res, upSaldo)
		} catch (e){
			console.error(e)
			return this.httpResponse.NotFound(res, e)
		}
	}
}
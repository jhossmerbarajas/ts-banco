import { BaseRouter } from '../config/base.router'
import { AccountController } from './controllers/account.controller'
import { AccountMiddleware } from './middleware/account.middleware'

export class AccountRouter extends BaseRouter<AccountController, AccountMiddleware>
{
	constructor() {
		super(AccountController, AccountMiddleware)
	}

	routes() {
		this.router.post(
			'/account',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdmin(req, res, next)],
			(req, res) => this.controller.createAccountController(req, res)
		)

		this.router.patch(
			'/upsaldo/:id',
			this.middleware.passAuth('jwt'),
			(req, res) => this.controller.updateSaldoAccountController(req, res)
		)
	}
}

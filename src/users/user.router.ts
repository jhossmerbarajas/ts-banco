import { BaseRouter } from '../config/base.router'
import { UserController } from './controllers/user.controller'
import { UserMiddleware } from './middleware/user.middleware'

export class UserRouter extends BaseRouter <UserController, UserMiddleware>
{
	constructor() {
		super(UserController, UserMiddleware)
	}

	routes() {
		this.router.get(
			'/users',
			// this.middleware.passAuth('jwt'),
			(req, res) => this.controller.index(req, res)
		)

		this.router.post(
			'/users',
			(req, res) => this.controller.store(req, res)
		)

		this.router.put(
			'/users/:id',
			(req, res) => this.controller.update(req,res)
		)

		this.router.delete(
			'/users/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdmin(req, res, next)],
			(req, res) => this.controller.delete(req, res)
		)
	}
}
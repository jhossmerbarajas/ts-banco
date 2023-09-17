import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'

import { UserDTO } from '../../users/dto/user.dto'
import { SharedMiddleware } from '../../libs/middlewares/shared.middleware'

export class UserMiddleware  extends SharedMiddleware
{
	constructor() {
		super()
	}

	userValidator (req: Request, res: Response, next: NextFunction) {

		const { name, email, pass } = req.body
		const valid = new UserDTO

		valid.name = name
		valid.email = email
		valid.pass = pass

		validate(valid)
			.then((err) => {
				if(err.length > 0) {
					return res.json(err)
				} else {
					next()
				}
			})
	}
}
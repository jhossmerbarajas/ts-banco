import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'

import { AccountDTO } from '../dto/account.dto'
import { SharedMiddleware } from '../../libs/middlewares/shared.middleware'

export class AccountMiddleware extends SharedMiddleware
{
	constructor() {
		super()
	}

	accountValidator (req: Request, res: Response, next: NextFunction) {

		const { saldo } = req.body
		const valid = new AccountDTO

		valid.saldo = saldo

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
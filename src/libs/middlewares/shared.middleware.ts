import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

import { UserEntity } from '../../users/entities/user.entity'
import { RoleType } from '../../users/dto/user.dto'
import { HttpResponse } from '../response/http.response'

export class SharedMiddleware
{
	constructor(
			public httpResponse: HttpResponse = new HttpResponse
		) {}

	passAuth (type: string) {
		return passport.authenticate(type, { session: false })
	}

	checkClient(req: Request, res: Response, next: NextFunction) {

		const user = req.user as UserEntity

		if(user.role !== RoleType.CLIENT) {
			return this.httpResponse.Unauthorized(res, 'No tiene permiso')
		}

		return next()
	}

	checkAdmin(req: Request, res: Response, next: NextFunction) {

		const user = req.user as UserEntity
		if(user.role !== RoleType.ADMIN) {
			return this.httpResponse.Unauthorized(res, 'No tiene permiso')
		}

		return next()
	}
}
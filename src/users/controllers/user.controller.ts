import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

import { HttpResponse } from '../../libs/response/http.response'

export class UserController 
{
	constructor(
		private userService: UserService = new UserService,
		private readonly httpResponse: HttpResponse = new HttpResponse
	) {}

	async index (req: Request, res: Response) {
		try {
			const allUsers = await this.userService.getUserService()
			return res.json(allUsers)
		} catch (e) {
			console.error(e)
		}
	}

	async getUserWithAccountController (req: Request, res: Response) {
		try {
			const id = Number(req.params.id)
			const userAccount = await this.userService.getUserWithAccount(id)

			if(!userAccount) return this.httpResponse.Error(res, 'No se encontro el Usuario')

			return this.httpResponse.Ok(res, userAccount)
		} catch(e) {
			console.error(e)
			return this.httpResponse.NotFound(res, e)
		}
	}

	async store (req: Request, res: Response) {
		try {
			const newUser = await this.userService.createUserService(req.body)
			return res.status(200).json(newUser)
		} catch(e) {
			console.error(e)
		}
	}

	async update (req: Request, res: Response) {
		try {
			const idUser = req.params.id
			const id = Number(idUser)
			
			const updateUser = await this.userService.updateUserService(id, req.body)
		} catch (e) {
			console.error(e)
		}
	}

	async updateStatusUserController (req: Request, res: Response) {
		try {
			const id = Number(req.params.id)

			const status = await this.userService.updateStatusUser(id, req.body)
			if(!status.affected) return this.httpResponse.Error(res, 'No Se actualizó el estado del usuario')

			return this.httpResponse.Ok(res, status)
		} catch (e) {
			console.error(e)
			return this.httpResponse.NotFound(res, e)
		}
	}

	async delete (req: Request, res: Response){
		try {
			const idUser = req.params.id
			const id = Number(idUser)

			const userDelete = await this.userService.deleteUserService(id)
			return res.json(userDelete)
		} catch(e){
			console.error(e)
		}
	}
}

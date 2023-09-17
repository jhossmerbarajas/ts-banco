import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

export class UserController 
{
	constructor(
		private userService: UserService = new UserService
	) {}

	async index (req: Request, res: Response) {
		try {
			const allUsers = await this.userService.getUserService()
			return res.json(allUsers)
		} catch (e) {
			console.error(e)
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
			console.log(id)
			const updateUser = await this.userService.updateUserService(id, req.body)
		} catch (e) {
			console.error(e)
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

import { Router } from 'express'

export class BaseRouter <T, U>
{
	router: Router
	controller: T
	middleware: U

	constructor( TController: { new (): T }, UMiddleware: { new (): U }) {
		this.router = Router()
		this.controller = new TController()
		this.middleware = new UMiddleware()

		this.routes()
	}

	routes(): void {}
}
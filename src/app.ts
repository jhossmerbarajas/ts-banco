import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { DataSource } from 'typeorm'

//BD
import { ConfigBD } from './config/config.bd'

// Routes
import { UserRouter } from './users/user.router'
import { AuthRouter } from './auth/auth.router'
import { AccountRouter } from './account/account.router'

// Strategy
import { LoginStrategy } from './auth/strategy/login.strategy'
import { JwtStrategy } from './auth/strategy/jwt.strategy'


export class AppServer extends ConfigBD
{
	private app: Application = express()
	private port: number = Number(process.env.PORT)

	constructor() {
		super()
		this.dbConnection()

		this.middleware()
		this.passportUse()
		this.app.use('/api', this.router())
	}

	private router(): Array<express.Router> {
		return [
			new UserRouter().router,
			new AuthRouter().router,
			new AccountRouter().router
		]
	}

	private middleware () {
		this.app.use(cors())
		this.app.use(express.urlencoded({ extended: true }))
		this.app.use(express.json())
		this.app.use(express.static(__dirname + '/../public'))
		this.app.use(morgan('dev'))
	}

	async dbConnection(): Promise<DataSource> {
		return this.initConnection
	}

	private passportUse () {
		return [
			new JwtStrategy().use,
			new LoginStrategy().use
		]
	}

	listen() {
		this.app.listen(this.port)
		console.log(`Server on port ${this.port}`)
	}
}
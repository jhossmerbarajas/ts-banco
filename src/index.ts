import 'reflect-metadata'
import { config } from 'dotenv'
config()

import { AppServer } from './app'

const bootstrap = () => {
	try {
		const app = new AppServer
		app.listen()
	} catch (e) {
		console.error(e)
	}
}


bootstrap()
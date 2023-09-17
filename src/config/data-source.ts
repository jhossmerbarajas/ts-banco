import { config } from 'dotenv'
config()

import { DataSource, DataSourceOptions } from 'typeorm'

const Config: DataSourceOptions = {
	type: "mysql",
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DATABASE,
	entities: [ __dirname + '/../**/*.entity{.ts,.js}' ],
	migrations: [__dirname + '/../migrations/*{.ts,.js}'],
	synchronize: false,
	migrationsRun: true
}

export const AppDataSource: DataSource = new DataSource(Config)
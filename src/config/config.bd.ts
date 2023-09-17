import { DataSource } from 'typeorm'
import { AppDataSource } from './data-source'

export class ConfigBD 
{
	get initConnection(): Promise<DataSource> {
		return AppDataSource.initialize()
	}
}
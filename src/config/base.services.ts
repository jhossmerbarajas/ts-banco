import { EntityTarget, Repository, ObjectLiteral } from 'typeorm'
import { ConfigBD } from './config.bd'
import { BaseEntity } from './base.entity'

export class BaseService <T extends BaseEntity> extends ConfigBD{

	executeRepository: Promise<Repository<T>>

	constructor(
		private getEntity: EntityTarget<T>
	) {
		super()
		this.executeRepository = this.initRepository(getEntity)
	}

	async initRepository <T extends ObjectLiteral> (e: EntityTarget<T>): Promise<Repository<T>> {
		const getCnx = await this.initConnection
		return getCnx.getRepository(e)
	}

}
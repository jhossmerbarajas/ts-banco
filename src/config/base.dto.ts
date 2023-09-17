import { IsDate, IsInt, IsOptional } from 'class-validator'

export class BaseDTO
{
	@IsInt()
	@IsOptional()
	id!: number

	@IsDate()
	@IsOptional()
	created_at!: Date

	@IsDate()
	@IsOptional()
	upated_at!: Date
}
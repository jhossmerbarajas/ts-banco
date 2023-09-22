import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusUserAccountToTable1695365337518 implements MigrationInterface {
    name = 'AddStatusUserAccountToTable1695365337518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`status\` enum ('ACTIVE', 'DESACTIVE') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`status\` enum ('ACTIVE', 'DESACTIVE') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`status\``);
    }

}

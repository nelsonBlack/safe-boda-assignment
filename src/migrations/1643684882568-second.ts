import {MigrationInterface, QueryRunner} from "typeorm";

export class second1643684882568 implements MigrationInterface {
    name = 'second1643684882568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "pickupLat"`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "pickupLat" numeric(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "pickupLong"`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "pickupLong" numeric(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "destinationLong"`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "destinationLong" numeric(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "destinationLat"`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "destinationLat" numeric(15,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "destinationLat"`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "destinationLat" integer`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "destinationLong"`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "destinationLong" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "pickupLong"`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "pickupLong" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "pickupLat"`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "pickupLat" integer NOT NULL`);
    }

}

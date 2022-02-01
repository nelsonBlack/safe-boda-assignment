import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1643684475830 implements MigrationInterface {
    name = 'firstMigration1643684475830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_base" ("id" SERIAL NOT NULL, "firstName" character varying(191) NOT NULL, "middleName" character varying(191), "lastName" character varying(191) NOT NULL, "phone" character varying NOT NULL, "email" character varying(191) NOT NULL, "password" character varying NOT NULL, "rememberToken" character varying(191), "otpTime" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_5fcd6a1b8d97bbe4ac2dfc2819f" UNIQUE ("email"), CONSTRAINT "PK_abddcf5bb4dde7a5fe7b85b716c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "passanger" ("id" SERIAL NOT NULL, "firstName" character varying(191) NOT NULL, "middleName" character varying(191), "lastName" character varying(191) NOT NULL, "phone" character varying NOT NULL, "email" character varying(191) NOT NULL, "password" character varying NOT NULL, "rememberToken" character varying(191), "otpTime" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_520ca4587c9058ad76e1cf9bfef" UNIQUE ("email"), CONSTRAINT "PK_ae024bbdf6411a80800ecd99451" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ride_ridestatus_enum" AS ENUM('ongoing', 'done')`);
        await queryRunner.query(`CREATE TABLE "ride" ("id" SERIAL NOT NULL, "driverId" integer NOT NULL, "passangerId" integer NOT NULL, "pickupLat" integer NOT NULL, "pickupLong" integer NOT NULL, "destinationLong" integer NOT NULL, "destinationLat" integer, "rideStatus" "public"."ride_ridestatus_enum", CONSTRAINT "PK_f6bc30c4dd875370bafcb54af1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "driver" ("id" SERIAL NOT NULL, "firstName" character varying(191) NOT NULL, "middleName" character varying(191), "lastName" character varying(191) NOT NULL, "phone" character varying NOT NULL, "email" character varying(191) NOT NULL, "password" character varying NOT NULL, "rememberToken" character varying(191), "otpTime" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "suspended" boolean DEFAULT false, CONSTRAINT "UQ_bb2050b01c92e5eb0ecee4c77fb" UNIQUE ("email"), CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "staff" ("id" SERIAL NOT NULL, "firstName" character varying(191) NOT NULL, "middleName" character varying(191), "lastName" character varying(191) NOT NULL, "phone" character varying NOT NULL, "email" character varying(191) NOT NULL, "password" character varying NOT NULL, "rememberToken" character varying(191), "otpTime" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_902985a964245652d5e3a0f5f6a" UNIQUE ("email"), CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_a212335bd593ecd23b665309e9d" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_8dbb87dab67f365384f9f1cd5e2" FOREIGN KEY ("passangerId") REFERENCES "passanger"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_8dbb87dab67f365384f9f1cd5e2"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_a212335bd593ecd23b665309e9d"`);
        await queryRunner.query(`DROP TABLE "staff"`);
        await queryRunner.query(`DROP TABLE "driver"`);
        await queryRunner.query(`DROP TABLE "ride"`);
        await queryRunner.query(`DROP TYPE "public"."ride_ridestatus_enum"`);
        await queryRunner.query(`DROP TABLE "passanger"`);
        await queryRunner.query(`DROP TABLE "user_base"`);
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBirthDateField1744890867320 implements MigrationInterface {
  name = 'AddBirthDateField1744890867320';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "birthDate" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthDate"`);
  }
}

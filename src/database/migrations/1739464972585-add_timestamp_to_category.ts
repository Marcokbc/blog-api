import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddTimestampToCategory1739464972585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "categories",
      new TableColumn({
        name: "createdAt",
        type: "timestamp",
        default: "CURRENT_TIMESTAMP",
      })
    );
    await queryRunner.addColumn(
      "categories",
      new TableColumn({
        name: "updatedAt",
        type: "timestamp",
        default: "CURRENT_TIMESTAMP",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("categories", "createdAt");
    await queryRunner.dropColumn("categories", "updatedAt");
  }
}

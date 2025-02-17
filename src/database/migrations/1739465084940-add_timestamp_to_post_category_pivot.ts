import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddTimestampToPostCategoryPivot1739465084940
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "post_categories_pivot",
      new TableColumn({
        name: "createdAt",
        type: "timestamp",
        default: "CURRENT_TIMESTAMP",
      })
    );
    await queryRunner.addColumn(
      "post_categories_pivot",
      new TableColumn({
        name: "updatedAt",
        type: "timestamp",
        default: "CURRENT_TIMESTAMP",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("post_categories_pivot", "createdAt");
    await queryRunner.dropColumn("post_categories_pivot", "updatedAt");
  }
}

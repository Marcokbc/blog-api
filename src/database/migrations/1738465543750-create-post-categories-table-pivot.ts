import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePostCategoriesTablePivot1738465543750
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "post_categories_pivot",
        columns: [
          {
            name: "postId",
            type: "int",
            isPrimary: true,
          },
          {
            name: "categoryId",
            type: "int",
            isPrimary: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "post_categories_pivot",
      new TableForeignKey({
        columnNames: ["postId"],
        referencedColumnNames: ["id"],
        referencedTableName: "posts",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "post_categories_pivot",
      new TableForeignKey({
        columnNames: ["categoryId"],
        referencedColumnNames: ["id"],
        referencedTableName: "categories",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("post_categories_pivot");
  }
}

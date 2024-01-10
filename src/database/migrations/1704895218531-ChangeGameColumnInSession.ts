import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ChangeGameColumnInSession1704895218531
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'session',
      'game',
      new TableColumn({
        name: 'gameId',
        type: 'int',
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'session',
      'gameId',
      new TableColumn({
        name: 'game',
        type: 'varchar',
        isNullable: false,
      })
    );
  }
}

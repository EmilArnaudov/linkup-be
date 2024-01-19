import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMessageTable1705484158583 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'message',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'content',
            type: 'varchar',
          },
          {
            name: 'senderId',
            type: 'int',
          },
          {
            name: 'sessionId',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'message',
      new TableForeignKey({
        columnNames: ['senderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      })
    );
    await queryRunner.createForeignKey(
      'message',
      new TableForeignKey({
        columnNames: ['sessionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'session',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('message');
  }
}

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddSessionRelationsToUser1704890380245
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adding 'hostId' column to 'session' table
    await queryRunner.addColumn(
      'session',
      new TableColumn({
        name: 'hostId',
        type: 'int',
      })
    );

    // Adding foreign key constraint for 'hostId' in 'session' table
    await queryRunner.createForeignKey(
      'session',
      new TableForeignKey({
        columnNames: ['hostId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      })
    );

    // Creating the join table for participants (many-to-many relationship)
    await queryRunner.createTable(
      new Table({
        name: 'session_participants_user',
        columns: [
          {
            name: 'sessionId',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'int',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['sessionId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'session',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the join table
    await queryRunner.dropTable('session_participants_user');

    // Drop the foreign key and 'hostId' column from 'session' table
    const table = await queryRunner.getTable('session');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('hostId') !== -1
    );
    await queryRunner.dropForeignKey('session', foreignKey);
    await queryRunner.dropColumn('session', 'hostId');
  }
}

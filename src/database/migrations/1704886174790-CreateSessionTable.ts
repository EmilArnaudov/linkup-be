import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSessionTable1704886174790 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'session',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'isLive',
            type: 'boolean',
          },
          {
            name: 'currentPlayers',
            type: 'int',
          },
          {
            name: 'maxPlayers',
            type: 'int',
          },
          {
            name: 'game',
            type: 'varchar',
          },
          {
            name: 'start',
            type: 'bigint',
          },
          {
            name: 'end',
            type: 'bigint',
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('session');
  }
}

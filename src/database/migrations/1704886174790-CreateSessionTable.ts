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
            name: 'gameId',
            type: 'int',
          },
          {
            name: 'start',
            type: 'datetime',
          },
          {
            name: 'end',
            type: 'datetime',
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

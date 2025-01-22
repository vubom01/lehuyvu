import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateResourcesTable1737536102626 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE resources
            (
                id          int auto_increment primary key,
                name        varchar(255)                        not null,
                type        int                                 not null,
                description text,
                status      int                                 not null,
                created_at  timestamp default current_timestamp not null,
                updated_at  timestamp default current_timestamp not null on update current_timestamp,
            );`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE resources`,
        )
    }
}

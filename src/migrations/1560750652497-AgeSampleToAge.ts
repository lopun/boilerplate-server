import {MigrationInterface, QueryRunner} from "typeorm";

export class AgeSampleToAge1560750652497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `ageSample` `age` int NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `age` `ageSample` int NULL");
    }

}

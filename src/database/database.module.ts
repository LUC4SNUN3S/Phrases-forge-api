import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from '@src/config/env';
import { SnakeNamingStrategy } from '@src/database/snake-naming-strategy';
import { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const connectionOptions: DataSourceOptions = {
          type: 'postgres',
          host: env.POSTGRES_HOST,
          port: env.POSTGRES_PORT,
          username: env.POSTGRES_USER,
          password: env.POSTGRES_PASSWORD,
          database: env.POSTGRES_DB,
          migrations: ['dist/database/migrations/*{.ts,.js}'],
          entities: ['dist/**/*.entity{.ts,.js}'],
          migrationsTableName: 'migrations',
          migrationsRun: true,
          namingStrategy: new SnakeNamingStrategy(),
        };
        return connectionOptions;
      },
    }),
  ],
})
export class DatabaseModule {}

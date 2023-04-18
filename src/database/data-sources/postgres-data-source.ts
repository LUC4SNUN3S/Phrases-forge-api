import '../../config/aliases';

import { env } from '@src/config/env';
import { SnakeNamingStrategy } from '@src/database/snake-naming-strategy';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
});

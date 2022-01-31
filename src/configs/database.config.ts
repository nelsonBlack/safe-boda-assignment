import * as path from 'path';
import * as dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'dev';
const dotenv_path = path.resolve(process.cwd(), `./.env`);
const result = dotenv.config({ path: dotenv_path });

if (result.error) {
  console.log(result.error);
}

export const DatabaseConfig = {
  type: 'postgres' as any,
  host: process.env.POSTGRES_HOST || 'localhost',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'safeboda_db',
  synchronize: false,
  bigNumberStrings: false,
  migrationsRun: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  cli: { migrationsDir: 'src/migrations' },
  logging: true,
};

export default DatabaseConfig;

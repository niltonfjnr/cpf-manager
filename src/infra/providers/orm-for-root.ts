import { TypeOrmModule } from '@nestjs/typeorm';

const {
  DATABASE_TYPE,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

export const OrmForRoot = () =>
  TypeOrmModule.forRoot({
    type: <any>DATABASE_TYPE || 'mysql',
    host: DATABASE_HOST || 'localhost',
    port: parseInt(DATABASE_PORT) || 3306,
    username: DATABASE_USERNAME || 'root',
    password: DATABASE_PASSWORD || 'root',
    database: DATABASE_NAME || 'cpf_manager',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
  });

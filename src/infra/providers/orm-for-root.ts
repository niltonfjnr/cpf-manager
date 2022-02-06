import { TypeOrmModule } from '@nestjs/typeorm';

export const OrmForRoot = () =>
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'cpf_manager',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
  });

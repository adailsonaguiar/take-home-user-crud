import { User } from './src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'user_crud',
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

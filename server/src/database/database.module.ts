import { Module } from '@nestjs/common';
import { Pool } from 'pg';

@Module({
  providers: [
    {
      provide: 'PG_CONNECTION',
      useFactory: async () => {
        const pool = new Pool({
          user: process.env.DB_USERNAME,
          host: process.env.DB_HOST,
          database: process.env.DB_NAME,
          password: process.env.DB_PASSWORD,
          port: 5432,
        });

        await pool.connect();

        return pool;
      },
    },
  ],
  exports: ['PG_CONNECTION'],
})
export class DatabaseModule {}

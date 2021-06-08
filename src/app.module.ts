import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { TransactionModule } from './transaction/transaction.module';
import { HelperModule } from './helper/helper.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			useFactory: async () => ({
				type: 'mysql',
				host: process.env.HOST,
				port: 3306,
				username: process.env.USER_NAME,
				password: process.env.PASSWORD,
				database: process.env.DATABASE,
				entities: ['dist/**/*.entity{.ts,.js}'],
				synchronize: true, // shouldn't be synchronized as true in production - otherwise you can lose production data.
				extra: {
					connectionLimit: 20
				}
			})
		}),
		ScheduleModule.forRoot(),
        LoggerModule,
		HelperModule,
        TransactionModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

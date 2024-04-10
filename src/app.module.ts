import { Module } from '@nestjs/common';
import { AccountModule } from './accounts/accounts.module';
import { ConfigModule } from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import { FxRatesModule } from './fx-rates/fx-rates.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 30,
      limit: 10,
    }]
  ),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal : true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AccountModule,
    FxRatesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide:APP_GUARD,
      useClass: ThrottlerModule,
    }
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AccountModule } from './accounts/accounts.module';
import { ConfigModule } from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import { FxRatesModule } from './fx-rates/fx-rates.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
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
  providers: [],
})
export class AppModule {}

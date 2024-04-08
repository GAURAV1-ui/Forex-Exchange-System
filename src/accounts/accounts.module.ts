import { Module } from '@nestjs/common';
import { AccountController } from './accounts.controller';
import { AccountService } from './accounts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from './schema/accounts.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Account', schema: AccountSchema}])],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}

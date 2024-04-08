import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './schema/accounts.schema'; 
import { AccountDto } from './dto/account.dto';

@Injectable()
export class AccountService {

    constructor(
        @InjectModel('Account')
        private accountModel: Model<Account>
    ) {}

    async topUpAccount(topUpDto: AccountDto): Promise<Account> {
        const { currency, amount } = topUpDto;
    
        let account = await this.accountModel.findOne({ currency });
    
        if (!account) {
          account = new this.accountModel({ currency, balance: 0 });
        }
    
        account.balance = Number(account.balance) + amount;
    
        return account.save();
      }
}

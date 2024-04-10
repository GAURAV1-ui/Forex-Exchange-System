import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './schema/accounts.schema'; 
import { AccountDto } from './dto/account.dto';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class AccountService {
    constructor(
        @InjectModel('Account')
        private accountModel: Model<Account>
    ) {}

    async topUpAccount(topUpDto: AccountDto, user: User): Promise<Account> {
        const { currency, amount } = topUpDto;
        
        if (!currency || !amount || isNaN(amount) || amount <= 0) {
            throw new BadRequestException('Invalid currency or amount.');
        }

        let account = await this.accountModel.findOne({ currency });
    
        if (!account) {
        const data = Object.assign({ currency, balance: 0 },{user: user._id})
          account = new this.accountModel(data);
        }
    
        account.balance = Number(account.balance) + amount;
    
        return account.save();
    }

    async getAllAccountBalance(): Promise<{ balances: { [key: string]: number } }> {
        const accounts = await this.accountModel.find();
        const balances = {};

        accounts.forEach((account) => {
            const balance = String(account.currency);
            balances[balance] = account.balance;
            return balance;
        });

        return { balances };
    }
}

import { Body, Controller, Post, Get } from '@nestjs/common';
import { AccountService } from './accounts.service';
import { Account } from './schema/accounts.schema';
import { AccountDto } from './dto/account.dto';

interface AccountBalances {
    [key: string]: number;
  }
  
  interface AccountBalanceResponse {
    balances: AccountBalances;
  }

@Controller('accounts')
export class AccountController {
    constructor(private accountService: AccountService) {}

    

@Post('topup')
async topUpAccount(
    @Body() 
    accountDto : AccountDto,
    ) : Promise<Account> {
        // const {currency, amount} = accountDto;

        // if(!currency || !amount) {
        //     throw new BadRequestException('Currency and amount are required');
        // }

        return this.accountService.topUpAccount(accountDto);
}

@Get('balance')
async getAllAccountBalance(): Promise<AccountBalanceResponse> {
    const balances = await this.accountService.getAllAccountBalance();
    // console.log(balances);
    return balances;
}

}
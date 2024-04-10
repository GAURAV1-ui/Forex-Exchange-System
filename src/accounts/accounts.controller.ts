import { Body, Controller, Post, Get, UseGuards, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { AccountService } from './accounts.service';
import { Account } from './schema/accounts.schema';
import { AccountDto } from './dto/account.dto';
import { BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/schemas/user.schema';

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
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({ transform: true })) // Apply validation pipe
  async topUpAccount(
    @Body()
     account: AccountDto,
     @Req() req,
    ): Promise<Account> {
    const { currency, amount } = account;

    if (!currency || !amount) {
      throw new BadRequestException('Currency and amount are required');
    }

    return this.accountService.topUpAccount(account, req.user);
  }

  @Get('balance')
  @UseGuards(AuthGuard())
  async getAllAccountBalance(): Promise<AccountBalanceResponse> {
    const balances = await this.accountService.getAllAccountBalance();
    return balances;
  }
}

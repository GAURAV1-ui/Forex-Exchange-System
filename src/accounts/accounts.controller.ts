import { Body, Controller, Post, Get, UseGuards, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { AccountService } from './accounts.service';
import { Account } from './schema/accounts.schema';
import { AccountDto } from './dto/account.dto';
import {  AccountBalanceResponse } from './dto/response.dto';
import { BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';



@Controller('accounts')
@ApiTags('Account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('topup')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: Account
  })
  // @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe({ transform: true })) 
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
  @ApiResponse({ status: 200, description: 'Successfully retrieved account balances', type:  AccountBalanceResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  // @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async getAllAccountBalance(): Promise< AccountBalanceResponse> {
    const balances = await this.accountService.getAllAccountBalance();
    return balances;
  }
}

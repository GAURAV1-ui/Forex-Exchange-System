import { ApiProperty } from '@nestjs/swagger';

export class AccountBalances {
    [key: string]: number;
  }
  
  export class AccountBalanceResponse {
    @ApiProperty({ type: AccountBalances })
    balances: AccountBalances;
  
    constructor(balances: AccountBalances) {
      this.balances = balances;
    }
}
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AccountDto {

    @IsNotEmpty()
    @IsString()
    currency : string

    @IsNotEmpty()
    @IsNumber()
    amount: number
}
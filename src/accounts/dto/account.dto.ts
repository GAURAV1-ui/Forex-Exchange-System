import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsEmpty } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';

export class AccountDto {
    @ApiProperty({
        description: 'The currency of the account.',
        example: 'USD',
    })
    @IsNotEmpty()
    @IsString()
    currency: string;

    @ApiProperty({
        description: 'The amount to top up the account.',
        example: 100,
    })
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsEmpty({ message: 'You cannot pass user id' })
    readonly user: User;
}

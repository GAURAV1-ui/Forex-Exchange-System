import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class FxRatesDto {
  @ApiProperty({
    description: 'The quote identifier for the currency conversion request.',
    example: 'USD_EUR',
  })
  @IsNotEmpty()
  @IsString()
  quoteId: string;

  @ApiProperty({
    description: 'The base currency for the conversion.',
    example: 'USD',
  })
  @IsNotEmpty()
  @IsString()
  fromCurrency: string;

  @ApiProperty({
    description: 'The target currency for the conversion.',
    example: 'EUR',
  })
  @IsNotEmpty()
  @IsString()
  toCurrency: string;

  @ApiProperty({
    description: 'The amount of currency to be converted.',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

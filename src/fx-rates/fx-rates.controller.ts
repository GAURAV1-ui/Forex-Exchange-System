import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { FxRatesService } from './fx-rates.service';
import { FxRatesDto } from './dto/fx-rates.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Fx-Rates')
@Controller()
export class FxRatesController {
  constructor(private fxRatesService: FxRatesService) {}

  @Post('fx-conversion')
  @UsePipes(new ValidationPipe({ transform: true }))
  async convertCurrency(@Body() fxRatesDto: FxRatesDto): Promise<{ convertedAmount: number; currency: string }> {
    const convertedAmount = await this.fxRatesService.fxConversionRate(fxRatesDto);
    if (convertedAmount === null) {
      throw new Error('Failed to convert currency. Please try again.');
    }

    return convertedAmount;
  }
}
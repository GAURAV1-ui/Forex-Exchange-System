import { Body, Controller, Get, Post } from '@nestjs/common';
import { FxRatesService } from './fx-rates.service';
import { FxRatesDto } from './dto/fx-rates.dto';


@Controller()
export class FxRatesController {
        constructor(private fxRatesService: FxRatesService) {}

        @Post('fx-conversion')
        async convertCurrency(@Body() fxRatesDto: FxRatesDto): Promise<{ convertedAmount: number; currency: string }> {
        const convertedAmount = await this.fxRatesService.fxConversionRate(fxRatesDto);
        if (convertedAmount === null) {
            throw new Error('Failed to convert currency. Please try again.');
        }
        console.log(convertedAmount);

        return convertedAmount;
    }
}
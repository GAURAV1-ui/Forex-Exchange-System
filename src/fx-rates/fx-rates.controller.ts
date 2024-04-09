import { Body, Controller, Get, Post } from '@nestjs/common';
import { FxRatesService } from './fx-rates.service';
import { FxRatesDto } from './dto/fx-rates.dto';
import {v4 as uuidv4} from 'uuid';


@Controller()
export class FxRatesController {
        constructor(private fxRatesService: FxRatesService) {}

        @Get('fx-rates')
        async getFxRates(): Promise<{ quoteId: string; expiry_at: number }> {
        
         let quoteId = uuidv4();
         const expiryAt = Date.now() + 30000;
         return { quoteId, expiry_at: expiryAt };
            
        }

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
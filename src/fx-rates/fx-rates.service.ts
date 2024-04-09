import { Injectable } from '@nestjs/common';
// import * as request from 'request';
import { FxExchangeService } from './fx-exchanges.service';
import { FxRatesDto } from './dto/fx-rates.dto';

@Injectable()
export class FxRatesService {

    constructor(private readonly fxExchangesService: FxExchangeService){}

    // private fxRates: Map<string, {rate: number; timestamp: number}> = new Map();

    async fxConversionRate(fxRatesDto: FxRatesDto): Promise<{convertedAmount: number; currency:string }> {
        const {quoteId, fromCurrency, toCurrency, amount} = fxRatesDto;

        try {
            console.log(fromCurrency, toCurrency);
            const fxRates = await this.fxExchangesService.getExchangeRate(fromCurrency, toCurrency);

            let convertedAmount = parseFloat((amount * fxRates["Realtime Currency Exchange Rate"]["5. Exchange Rate"]).toFixed(2));

            const currency = fxRates["Realtime Currency Exchange Rate"]["3. To_Currency Code"];

            return { convertedAmount: convertedAmount, currency: currency };
        }
        catch(error) {
            console.log(error);
        }
      }

// const fxRatesService = new FxRatesService();


// console.log(fxRatesService.fetchFxRates({ from_currency: "usd", to_currency: "inr" }));
    }

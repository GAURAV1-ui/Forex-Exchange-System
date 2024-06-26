import { Injectable } from '@nestjs/common';
import { FxExchangeService } from './fx-exchanges.service';
import { FxRatesDto } from './dto/fx-rates.dto';
import { fxRates } from './fx-exchanges.service';


@Injectable()
export class FxRatesService {

    constructor(private readonly fxExchangesService: FxExchangeService){}

    async fxConversionRate(fxRatesDto: FxRatesDto): Promise<{convertedAmount: number; currency:string }> {
        const {quoteId,fromCurrency, toCurrency, amount} = fxRatesDto;

        if(!fromCurrency || !toCurrency) 
            throw Error("Invalid currency value");

        
        let expiryDate = Date.now();
        let rate = 1;
        let convertedAmount = 1;
        const currency = fromCurrency;

        console.log(fxRates);

        if(fxRates.has(quoteId)) {
            if(this.isExpired(fxRates.get(quoteId).expiryDate)){
                expiryDate = fxRates.get(quoteId).expiryDate;
                rate = fxRates.get(quoteId).rate
                convertedAmount = rate *amount;

                return {convertedAmount,currency}
            }
        } else {
            fxRates.delete(quoteId);
            
        try {
            const fxRate = await this.fxExchangesService.getExchangeRate(fromCurrency, toCurrency);

            const quoteId = fxRate.quoteId;
            rate = fxRates.get(quoteId).rate;
            convertedAmount = rate*amount;

            return { convertedAmount: convertedAmount, currency: currency };
        }
        catch(error) {
            throw new Error('Failed to fetch exchange rate.');

         }
        }
      }

      async isExpired(expiryDate:number): Promise<boolean>{
        const currentDate = Date.now();

        if(currentDate<expiryDate) return true;

        return false;
    }
    }

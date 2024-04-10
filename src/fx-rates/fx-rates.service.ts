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
            throw Error("value invalid");

        
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
            console.log("abba");
            console.log(fromCurrency, toCurrency);
            const fxRate = await this.fxExchangesService.getExchangeRate(fromCurrency, toCurrency);

            console.log(fxRate,"rate");
            const quoteId = fxRate.quoteId;
            rate = fxRates.get(quoteId).rate;
            convertedAmount = rate*amount;

            return { convertedAmount: convertedAmount, currency: currency };
        }
        catch(error) {
            console.log(error);
         }
        }
      }

      async isExpired(expiryDate:number): Promise<boolean>{
        const currentDate = Date.now();

        if(currentDate<expiryDate) return true;

        return false;
    }
    }

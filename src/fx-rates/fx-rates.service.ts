import { Injectable } from '@nestjs/common';
// import * as request from 'request';
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
            console.log(fromCurrency, toCurrency);
            const fxRate = await this.fxExchangesService.getExchangeRate(fromCurrency, toCurrency);
            
            // if(fxRates)
            // const quoteId = fromCurrency + "_" + toCurrency; 
            // const expiryDate = Date.now()+3000;
            // fxRates.push()

            // const isExpired = await this.fxExchangesService.isExpired(expiryDate);
            // console.log(isExpired);
            // console.log(uuid);
            const quoteId = fxRate.quoteId;
            rate = fxRates.get(quoteId).rate;
            convertedAmount = rate*amount;
            
            // const convertedAmount = fxRates["Realtime Currency Exchange Rate"]["5. Exchange Rate"];

            // const currency = fxRates["Realtime Currency Exchange Rate"]["3. To_Currency Code"];

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

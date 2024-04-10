import { Injectable } from '@nestjs/common';
// import { Error } from 'console';
import * as request from 'request';
// import { from } from 'rxjs';
// import {v4 as uuidv4} from 'uuid';


export interface FxRate {
    rate: number;
    expiryDate: number;
  }
  
  export const fxRates: Map<string, FxRate> = new Map();

@Injectable()
export class FxExchangeService {


    async getExchangeRate(fromCurrency:string, toCurrency:string): Promise<{quoteId:string,expiryDate:number}> {
        
        const quoteId = await this.generateQuoteId(fromCurrency, toCurrency);

        const apiKey = process.env.API_KEY;
        
        const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${apiKey}`;
        return new Promise((resolve, reject) => {
            request.get(
              {
                url: url,
                json: true,
                headers: { 'User-Agent': 'request' },
              },
              (err: any, res: any, data: any) => {
                if (err) {
                  reject(err);
                } else if (res.statusCode !== 200) {
                  reject(new Error(`Status: ${res.statusCode}`));
                } else {
                const rate = 123;
                const expiryDate = Date.now();
                  fxRates.set(quoteId,{rate:rate, expiryDate: expiryDate});
                    
                  console.log(data);
                    return{quoteId,expiryDate}
                //   resolve(data);
                }
              },
            );
          });
        }

        async generateQuoteId(fromCurrency:string, toCurrency:string): Promise<string>{
            
            return fromCurrency + "_" + toCurrency;
        }
}
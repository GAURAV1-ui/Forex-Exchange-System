import { Injectable } from '@nestjs/common';
import * as request from 'request';


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

                const rate = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] || 1;
                
                const expiryDate = Date.now();
                  fxRates.set(quoteId,{rate:rate, expiryDate: expiryDate});
                    
                    const newData = {quoteId,expiryDate}
                  resolve(newData);
                }
              },
            );
          });
        }

        async generateQuoteId(fromCurrency:string, toCurrency:string): Promise<string>{
            
            return fromCurrency + "_" + toCurrency;
        }
}
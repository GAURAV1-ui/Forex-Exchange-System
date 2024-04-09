import { Injectable } from '@nestjs/common';
import { error } from 'console';
import * as request from 'request';
import {v4 as uuidv4} from 'uuid';


@Injectable()
export class FxExchangeService {
    async getExchangeRate(from_currency:string, to_currency:string): Promise<any> {
        // const {from_currency, to_currency} = fxRatesDto;

        if(!from_currency || !to_currency) 
            throw error("value invalid");

        const apiKey = process.env.API_KEY;
        
        const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from_currency}&to_currency=${to_currency}&apikey=${apiKey}`;
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
                  resolve(data);
                }
              },
            );
          });
        }

        async generateQuoteId(): Promise<string>{
            let myuid = uuidv4();
            return myuid;
        }
}
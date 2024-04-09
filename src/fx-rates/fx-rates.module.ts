import { Module } from '@nestjs/common';
import { FxRatesController } from './fx-rates.controller';
import { FxRatesService } from './fx-rates.service';
import { FxExchangeService } from './fx-exchanges.service';

@Module({
  controllers: [FxRatesController],
  providers: [FxRatesService,FxExchangeService]
})
export class FxRatesModule {}

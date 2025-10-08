import { Module } from '@nestjs/common';
import { ColumnService } from '../services/column.service';
import { ColumnRepository } from 'src/infrastructure/data/repositories/column.repository';

@Module({
  providers: [
    ColumnService,
    { provide: 'IColumnRepository', useClass: ColumnRepository },
  ],
  exports: [ColumnService],
})
export class ColumnModule {}

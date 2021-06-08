import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { HelperService } from '../helper/helper.service';
import { CreateDto } from './dto/create.dto';
import { TransactionStatusType } from '../utils/utils.enum';

@Injectable()
export class TransactionService {
    constructor(
		private readonly loggerService: LoggerService,
		private readonly helperService: HelperService
	) {}

    async create(createDto: CreateDto): Promise<{ status: string }> {
		// validation gateway and verify transation
        const transactionState = Math.floor(Math.random() * 2);
		return transactionState === 1 ? { status: 'Confirmed' } : { status: 'Declined' }
    }
}

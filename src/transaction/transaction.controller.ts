import { Controller, UseInterceptors, ClassSerializerInterceptor, Post, HttpStatus, HttpCode,
	Body, InternalServerErrorException } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { LoggerService } from '../logger/logger.service';
import { HelperService } from '../helper/helper.service';
import { CreateDto } from './dto/create.dto';
import { TransactionStatusType } from '../utils/utils.enum';
import { CreateSerializer } from './serializer/create.serializer';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
    constructor(
		private readonly transactionService: TransactionService,
		private readonly loggerService: LoggerService,
		private readonly helperService: HelperService
	) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('create')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Created Transaction' })
    @ApiCreatedResponse({})
    async create(@Body() createDto: CreateDto): Promise<CreateSerializer> {
		try {
			const createTransaction = await this.transactionService.create(createDto);
			if (createTransaction.status === TransactionStatusType.CONFIRMED) {
				return new CreateSerializer(HttpStatus.OK, 'SUCCESS', 'Transaction Created Successfully', createTransaction, []);
			} else {
				return new CreateSerializer(HttpStatus.BAD_REQUEST, 'BAD_REQUEST', 'Transaction Created Failed', createTransaction, []);
			}

		} catch (err) {
			this.loggerService.error(err.message, err.stack);
			throw new InternalServerErrorException();
		}
    }
}

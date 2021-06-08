import { IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDto {
    @ApiProperty({
        example: '12',
        description: 'order id'
    })
	@IsPositive()
    @IsNumber()
    readonly orderID: number;

    @ApiProperty({
        example: '1200',
        description: 'total payment amount'
    })
    @IsPositive()
    @IsNumber()
    readonly amount: number;

	@ApiProperty({
        example: 'df25d454h565987d54k',
        description: 'payment gateway'
    })
	@IsNotEmpty()
    @IsString()
    readonly gateway: string;
}

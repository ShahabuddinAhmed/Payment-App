import { Exclude, Type, plainToClass } from 'class-transformer';
import { AppSerializer } from '../../app.serializer';

class Create {
    status: string;
	
	@Exclude()
	id: number;
}

export class CreateSerializer extends AppSerializer {
	constructor(statusCode: number, code: string, message: string, data: Record<string, unknown>, errors: any, optional?: Record<string, unknown>) {
		super(statusCode, code, message, plainToClass(Create, data), errors);
	}
}
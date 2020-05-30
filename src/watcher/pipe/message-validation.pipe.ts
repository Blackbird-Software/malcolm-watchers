import {PipeTransform, BadRequestException, ArgumentMetadata, Injectable} from '@nestjs/common';
import {ServiceTypeValidator} from "../validator/service-type.validator";
import {UuidValidator} from "../validator/uuid.validator";

@Injectable()
export class MessageValidationPipe implements PipeTransform {

    transform(values: string[], metadata: ArgumentMetadata) {
        const service = values['service'];
        const uuid = values['id'];

        if (!ServiceTypeValidator.isValid(service)) {
            throw new BadRequestException('Invalid service type provided. ');
        }

        if (!UuidValidator.isValid(uuid)) {
            throw new BadRequestException('Invalid uuid provided. ');
        }

        return values;
    }


}
import {isUUID} from "@nestjs/common/utils/is-uuid";

export class UuidValidator {
    public static isValid(value: string): boolean {
        return isUUID(value, '4');
    }
}
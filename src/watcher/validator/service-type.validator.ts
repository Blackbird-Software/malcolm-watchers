import {ServiceType} from "../enum/service.enum";

export class ServiceTypeValidator {
    public static isValid(value: string): boolean {
        return Object.values(ServiceType).includes(value);
    }
}
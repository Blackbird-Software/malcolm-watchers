import {ServiceType} from "../enum/service.enum";

export default interface Message {
    readonly service: ServiceType,
    readonly id: string;
}
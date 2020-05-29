import {Injectable} from "@nestjs/common";
import {Socket} from "socket.io";
import {SocketStateInterface} from "./socket-state.interface";
import {Tedis} from "tedis";
import {redisClientConfig} from "../config/redis.config";

@Injectable()
export class SocketsRedis implements SocketStateInterface {

    private client = new Tedis(redisClientConfig);

    async add(resourceId: string, socket: Socket): Promise<void> {
        await this.client.hincrby(resourceId, 'amount', 1);
    }

    async remove(resourceId: string, socket: Socket): Promise<void> {
        await this.client.hincrby(resourceId, 'amount', -1);
    }

    async count(resourceId: string): Promise<number> {
        const res = await this.client.hget(resourceId, 'amount');

        return parseInt(res);
    }
}
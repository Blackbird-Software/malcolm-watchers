import {
    ConnectedSocket,
    MessageBody, OnGatewayConnection, OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {Logger} from "@nestjs/common";
import Message from "./message.interface";
import {SocketsRedis} from "./state/sockets-redis";

@WebSocketGateway()
export class WatcherGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    private readonly logger: Logger = new Logger('WatcherGateway');

    constructor(private readonly socketState: SocketsRedis) {
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: any, ...args: any[]): any {
        this.logger.log(`Client connected: ${client.id}`);
    }

    @SubscribeMessage('register')
    async register(
        @MessageBody() data: Message,
        @ConnectedSocket() socket: Socket
    ): Promise<number> {
        const resourceId = data.id;
        const res = await this.socketState.add(resourceId, socket);

        return this.countAndEmit(resourceId, 'add');
    }

    @SubscribeMessage('deregister')
    async deregister(
        @MessageBody() data: Message,
        @ConnectedSocket() socket: Socket
    ): Promise<number> {
        const resourceId = data.id;
        const res = await this.socketState.remove(resourceId, socket);

        return this.countAndEmit(resourceId, 'del');
    }

    private async countAndEmit(resourceId: string, type: string): Promise<number> {
        const amount = await this.socketState.count(resourceId);
        this.server.emit('update', {type: type, amount: amount});

        return amount;
    }
}
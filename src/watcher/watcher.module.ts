import {Module} from '@nestjs/common';
import {WatcherGateway} from "./watcher.gateway";
import {SocketsInMemory} from "./state/sockets-in-memory";
import {SocketsRedis} from "./state/sockets-redis";

@Module({
    providers: [
        WatcherGateway,
        SocketsInMemory,
        SocketsRedis
    ],
})

export class WatcherModule {
}
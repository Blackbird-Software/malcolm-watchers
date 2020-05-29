import {Injectable} from "@nestjs/common";
import {Socket} from "socket.io";
import {SocketStateInterface} from "./socket-state.interface";

@Injectable()
export class SocketsInMemory implements SocketStateInterface {
    private socketState = new Map<string, Socket[]>();

    add(resourceId: string, socket: Socket): void {
        const existingSockets = this.getByResourceId(resourceId);
        const sockets = [...existingSockets, socket];
        this.socketState.set(resourceId, sockets);
    }

    remove(resourceId: string, socket: Socket): void {
        const allSockets = this.getByResourceId(resourceId);
        const sockets = allSockets.filter(s => s.id !== socket.id);
        this.socketState.set(resourceId, sockets);
    }

    count(resourceId: string): number {
        return this.getByResourceId(resourceId).length;
    }

    private getByResourceId(resourceId: string): Socket[] {
        return this.socketState.get(resourceId) || [];
    }
}
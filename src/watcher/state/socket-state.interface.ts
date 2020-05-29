import {Socket} from "socket.io";

export interface SocketStateInterface {
    add(resourceId: string, socket: Socket): void;
    remove(resourceId: string, socket: Socket): void;
    count(resourceId: string): any;
}
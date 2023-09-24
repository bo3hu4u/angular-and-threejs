import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    private messages: string[] = [];

    getMessages(): string[] {
        return this.messages;
    }

    add(msg: string): void {
        console.log("Reg msg:" + msg)
        this.messages.push(msg);
    }

    clear(): void {
        this.messages = [];
    }
}

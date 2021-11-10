class User {
    id:number;
    name:string;
    username:string;
    email:string;
    role:string;
    messagesSent:MessageJson[];
    messagesRecieved:MessageJson[];

    constructor(id:number,name:string, username:string, email:string, role:string, messagesSent:MessageJson[], messagesRecieved:MessageJson[]) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.role = role;
        this.messagesSent = messagesSent;
        this.messagesRecieved = messagesRecieved;
    }
}
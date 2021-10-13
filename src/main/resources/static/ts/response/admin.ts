class Admin extends User {
     
    constructor(id: number, name: string, username: string, email: string) {
        super(id, name, username, email,"admin")
    }
}
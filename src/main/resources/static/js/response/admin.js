"use strict";
class Admin extends User {
    constructor(id, name, username, email) {
        super(id, name, username, email, "admin");
    }
}

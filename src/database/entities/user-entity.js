'use strict';

class User {
    constructor(id, userData = {}) {
        const { login, password, age } = userData;

        this.id = id;
        this.login = login;
        this.password = password;
        this.age = age;
        this.isDeleted = false;
    }

    update(updatedData = {}) {
        const { login, password, age } = updatedData;

        this.login = login || this.login;
        this.password = password || this.password;
        this.age = age || this.age;
    }

    delete() {
        this.isDeleted = true;
    }
}

module.exports = User;

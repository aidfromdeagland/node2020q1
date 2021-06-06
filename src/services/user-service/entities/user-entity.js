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

        if (login) this.login = login;
        if (password) this.password = password;
        if (age) this.age = age;
    }

    delete() {
        this.isDeleted = true;
    }
}

module.exports = User;

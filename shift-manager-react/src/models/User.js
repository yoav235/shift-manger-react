

class User {

    constructor({
                    username = '',
                password = '',
                isManager = false
            } ) {
        this.username = username;
        this.password = password;
        this.isManager = isManager;
    }
}

export default User;



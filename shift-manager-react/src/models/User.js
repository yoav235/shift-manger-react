

class User {
    ;
    constructor({
                    email = '',
                password = '',
                isManager = false
            } ) {
        this.email = email;
        this.password = password;
        this.isManager = isManager;
    }
}

export default User;



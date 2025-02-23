class User {
    constructor({
        name = '',
        trust = 0,
        isManager = false,
        requests = {
            sunday: [],
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: []
        }
                }) {
        this.name = name;
        this.trust = trust;
        this.isManager = isManager;
        this.requests = requests;
    }
}

export default User;



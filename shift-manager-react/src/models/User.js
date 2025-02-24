import Shifts from "./Shifts";


class User {
    constructor({
        name = '',
        trust = 0,
        isManager = false,
        shifts = new Shifts({})
                }) {
        this.name = name;
        this.trust = trust;
        this.isManager = isManager;
        this.shifts = shifts;
    }
}

export default User;



import User from "./User";

class Shifts  {
    constructor({
                    sunday = [],
                    monday = [],
                    tuesday = [],
                    wednesday = [],
                    thursday = [],
                    friday = [],
                    saturday = []
                }) {
        this.sunday = sunday;
        this.monday = monday;
        this.tuesday = tuesday;
        this.wednesday = wednesday;
        this.thursday = thursday;
        this.friday = friday;
        this.saturday = saturday;
    }
}

export default Shifts;
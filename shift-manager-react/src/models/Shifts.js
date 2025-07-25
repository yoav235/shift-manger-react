
class Shifts  {
    constructor(
        {userId = '',
            name = '',
        shifts = {
                    sunday: [],
                    monday: [],
                    tuesday: [],
                    wednesday: [],
                    thursday: [],
                    friday: [],
                    saturday: []
                }}) {
        this.userId = userId
        this.name = name
        this.shifts = shifts;
    }
}

export default Shifts;
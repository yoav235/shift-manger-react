
class Shifts  {
    constructor(
        {userId = '',
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
        this.shifts = shifts;
    }
}

export default Shifts;
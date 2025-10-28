
class Shifts  {
    constructor(
        {shiftId = '',
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
        this.shiftId = shiftId
        this.name = name
        this.shifts = shifts;
    }
}

export default Shifts;
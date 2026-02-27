
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
                },
        otherShiftHours = {
                    sunday: null,
                    monday: null,
                    tuesday: null,
                    wednesday: null,
                    thursday: null,
                    friday: null,
                    saturday: null
                }}) {
        this.userId = userId
        this.name = name
        this.shifts = shifts;
        this.otherShiftHours = otherShiftHours;
    }
}

export default Shifts;
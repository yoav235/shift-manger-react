
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
        this.shiftId = shiftId
        this.name = name
        this.shifts = shifts;
        this.otherShiftHours = otherShiftHours;
    }
}

export default Shifts;
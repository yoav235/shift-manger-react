class Scheduler {
    constructor(
        date = new Date(),
        schedule = {
            sunday: {
                morning: [],
                middle: [],
                evening: [],
                night: []
            },
            monday: {
                morning: [],
                middle: [],
                evening: [],
                night: []
            },
            tuesday: {
                morning: [],
                middle: [],
                evening: [],
                night: []
            },
            wednesday: {
                morning: [],
                middle: [],
                evening: [],
                night: []
            },
            thursday: {
                morning: [],
                middle: [],
                evening: [],
                night: []
            },
            friday: {
                morning: [],
                middle: [],
                evening: [],
                night: []
            },
            saturday: {
                morning: [],
                middle: [],
                evening: [],
                night: []
            }
        }
    ) {
    this.date = date;
    this.schedule = schedule
    };


}


export default Scheduler;
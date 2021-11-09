class Week {
    weekNumber: number;
    mondayDateStr:string;
    monday:Day;
    tuesday:Day;
    wednesday:Day;
    thursday:Day;
    friday:Day;
    saturday:Day;
    sunday:Day;
    
    constructor(weekNumber:number, mondayDateStr:string,monday:Day, tuesday:Day, wednesday:Day, thursday:Day, friday:Day, saturday:Day, sunday:Day) {
        this.weekNumber = weekNumber;
        this.mondayDateStr = mondayDateStr;
        this.monday = monday;
        this.tuesday = tuesday;
        this.wednesday = wednesday;
        this.thursday = thursday;
        this.friday = friday;
        this.saturday = saturday;
        this.sunday = sunday;
    }
}
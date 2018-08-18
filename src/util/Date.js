Date.prototype.getWeek = function(){
    // https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php#

    let d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    let dayNum = d.getUTCDay() || 7;

    d.setUTCDate(d.getUTCDate() + 4 - dayNum);

    let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
};

/**
  * @desc {date} it's expected to be less than the current object
  */
Date.prototype.getWeekDiff = function(date){
    // Monday = 1, Sunday = 7

    // Reset the hours of the dates involved
    let date1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let date2 = new Date(this.getFullYear(), this.getMonth(), this.getDate());

    // Set the date1 to the same day of the current instance
    date1.setDate(date1.getDate() + (this.getDay() - date1.getDay()));

    let diff = date2 - date1;

    return Math.round(diff/1000/60/60/24/7);
};

export const DateHelper = {
    getMonday(date)
    {
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        var day = date.getDay(),
            diff = date.getDate() - day + (day == 0 ? -6 : 1);

        return new Date(date.setDate(diff));
    },

    getDateOfISOWeek(w, y) {
        let simple = new Date(Date.UTC(y, 0, 1 + (w - 1) * 7));
        let dow = simple.getDay();
        let ISOweekStart = simple;

        if (dow <= 4)
            ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
        else
            ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());

        return ISOweekStart;
    }
};

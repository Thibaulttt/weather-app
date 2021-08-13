import moment from "moment";

const dayFormat = 'hh:mm:ss a';

const times = {
    dawnBeginning: moment('06:00:00 am', dayFormat),
    dayBeginning: moment('09:00:00 am', dayFormat),
    twilightBeginning: moment('06:00:00 pm', dayFormat),
    nightBeginning: moment('09:00:00 pm', dayFormat),
    midnightPm: moment('23:59:59 pm', dayFormat),
    midnightAm: moment('00:00:00 am', dayFormat)
};

export {
    dayFormat,
    times
};

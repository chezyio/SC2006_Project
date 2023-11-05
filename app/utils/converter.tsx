const moment = require("moment");

export const converter = (date) => {
    return moment(date, "DD/MM/YYYY");
};

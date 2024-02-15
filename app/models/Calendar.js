const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema({
   workplaceLabel: {
      type: String,
   },
   addressId: {
      type: String,
   },
   date: {
      type: String,
      unique: true,
   },
   highlightClass: {
      type: String,
   },
   userId: {
      type: String,
   },
});

const Calendar =
   mongoose.models.Calendar || mongoose.model("Calendar", calendarSchema);

module.exports = Calendar;

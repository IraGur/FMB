const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
   label: {
      type: String,
   },
   value: {
      type: String,
   },
   lat: {
      type: Number,
   },
   lng: {
      type: Number,
   },
});

const Address =
   mongoose.models.Address || mongoose.model("Address", addressSchema);

module.exports = Address;

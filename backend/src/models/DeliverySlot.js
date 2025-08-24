const mongoose = require("mongoose");

const deliverySlotSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  available: { type: Boolean, default: true },
});

const DeliverySlot = mongoose.model("DeliverySlot", deliverySlotSchema);

module.exports = DeliverySlot;

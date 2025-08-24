class DeliveryController {
  constructor(deliverySlotModel) {
    this.deliverySlotModel = deliverySlotModel;
    this.getAvailableSlots = this.getAvailableSlots.bind(this);
    this.bookSlot = this.bookSlot.bind(this);
  }

  async getAvailableSlots(req, res) {
    try {
      const slots = await this.deliverySlotModel.find({ available: true });
      res.status(200).json(slots);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving delivery slots", error });
    }
  }

  async bookSlot(req, res) {
    const { slotId } = req.body;
    try {
      const slot = await this.deliverySlotModel.findById(slotId);
      if (!slot || !slot.available) {
        return res.status(400).json({ message: "Slot not available" });
      }
      slot.available = false;
      await slot.save();
      res.status(200).json({ message: "Slot booked successfully", slot });
    } catch (error) {
      res.status(500).json({ message: "Error booking delivery slot", error });
    }
  }
}

module.exports = DeliveryController;

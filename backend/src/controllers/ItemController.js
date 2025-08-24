class ItemController {
  constructor(itemModel) {
    this.itemModel = itemModel;
    this.getAllItems = this.getAllItems.bind(this);
    this.addItem = this.addItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  async getAllItems(req, res) {
    try {
      const items = await this.itemModel.find();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: "Error fetching items", error });
    }
  }

  async addItem(req, res) {
    const newItem = new this.itemModel(req.body);
    try {
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (error) {
      res.status(400).json({ message: "Error adding item", error });
    }
  }

  async updateItem(req, res) {
    const { id } = req.params;
    try {
      const updatedItem = await this.itemModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(400).json({ message: "Error updating item", error });
    }
  }

  async deleteItem(req, res) {
    const { id } = req.params;
    try {
      await this.itemModel.findByIdAndDelete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: "Error deleting item", error });
    }
  }
}

module.exports = ItemController;

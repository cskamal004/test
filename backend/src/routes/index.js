const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const ItemController = require("../controllers/ItemController");
const DeliveryController = require("../controllers/DeliveryController");
const PaymentController = require("../controllers/PaymentController");

const UserModel = require("../models/User");
const ItemModel = require("../models/Item");
const DeliverySlotModel = require("../models/DeliverySlot");
const PaymentModel = require("../models/Payment");

const userController = new UserController(UserModel);
const itemController = new ItemController(ItemModel);
const deliveryController = new DeliveryController(DeliverySlotModel);
const paymentController = new PaymentController(PaymentModel);

router.post("/signup", userController.register);
router.post("/login", userController.login);
router.get("/users/:id", userController.getUser);

router.get("/items", itemController.getAllItems);
router.post("/items", itemController.addItem);
router.put("/items/:id", itemController.updateItem);
router.delete("/items/:id", itemController.deleteItem);

router.get("/delivery-slots", deliveryController.getAvailableSlots);
router.post("/delivery-slots/book", deliveryController.bookSlot);

router.post("/payment", paymentController.processPayment);

module.exports = router;

class PaymentController {
  constructor(paymentModel) {
    this.paymentModel = paymentModel;
    this.processPayment = this.processPayment.bind(this);
    this.simulatePaymentProcessing = this.simulatePaymentProcessing.bind(this);
  }

  async processPayment(req, res) {
    try {
      const { amount, paymentMethod, userId } = req.body;

      if (!amount || !paymentMethod || !userId) {
        return res.status(400).json({ message: "Missing payment details" });
      }

      const paymentResult = await this.simulatePaymentProcessing(
        amount,
        paymentMethod
      );

      if (paymentResult.success) {
        // Save payment to database
        const payment = new this.paymentModel({ 
          amount, 
          userId, 
          paymentMethod, 
          status: 'completed' 
        });
        await payment.save();

        return res.status(200).json({
          message: "Payment processed successfully",
          paymentId: payment._id,
        });
      } else {
        return res.status(500).json({ message: "Payment processing failed" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "An error occurred while processing payment",
          error: error.message,
        });
    }
  }

  simulatePaymentProcessing(amount, paymentMethod) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, paymentId: "123456789" });
      }, 1000);
    });
  }
}

module.exports = PaymentController;

# Grocery Delivery Application - Backend

This is the backend for the Grocery Delivery application. It provides the necessary APIs to support user registration, item listing, delivery slot selection, and payment processing.

## Features

- **User Management**: Handles user registration and authentication.
- **Item Management**: Fetches and manages grocery items.
- **Delivery Slot Management**: Allows users to select their preferred delivery time slots.
- **Payment Processing**: Manages payment transactions securely.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```
   cd grocery-delivery-app/backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the backend server, run:
```
npm start
```

The server will be running on `http://localhost:5000` (or the port specified in your configuration).

### API Endpoints

- **User Registration**: `POST /api/users/register`
- **Item Listing**: `GET /api/items`
- **Delivery Slot Selection**: `GET /api/delivery-slots`
- **Payment Processing**: `POST /api/payments`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
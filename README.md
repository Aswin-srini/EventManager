## 🧠 About the Project

This project is a **Node.js and Express.js–based backend server** designed for managing **Events, Bookings, and Users** in an event-management system.

It provides a structured API that allows clients (such as web or mobile applications) to perform key operations like:
- Creating and viewing events  
- Booking and managing event reservations  
- Handling user registration, login, and profiles  

The application connects to a database (configured in the `config/DB.js` file) and uses environment variables through the `dotenv` module for flexible configuration.

### ⚙️ System Overview
When the server starts:
1. It initializes an Express application.  
2. Connects to the database.  
3. Loads all route modules (`/Events`, `/Booking`, `/User`).  
4. Listens for API requests on port **8000** by default.  

### 🧩 Architecture
The project follows a **modular structure**, where each major feature has its own route file inside the `Routes/` directory:
- `eventRoutes.js` → Handles event-related APIs  
- `bookingRoutes.js` → Handles booking operations  
- `userRoutes.js` → Handles user management and authentication  

### 🚀 Purpose
This backend serves as the core engine for an event management platform, enabling seamless integration with frontend clients for event scheduling, booking management, and user operations.

---


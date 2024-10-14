# 🛒 Scroller's Shop

## 🚀 Project Description

**Scroller's Shop** is a modern, user-friendly e-commerce platform designed to provide a seamless shopping experience for users. The app enables sellers to list random products and buyers to explore, purchase, and manage their carts with ease. With robust authentication and profile management, Scroller's Shop offers a secure and personalized e-commerce experience.

## ✨ Key Features

- 🔐 **Secure Authentication:** JSON Web Token (JWT) for secure login and access control.
- 🔑 **Google Authentication:** Easy signup/signin using Google Auth.
- 🛍️ **Random Product Listings:** Discover random products with detailed information about who posted the item.
- 📝 **Product Info Page:** Get all relevant details for each product on dedicated product pages.
- 🛒 **Shopping Cart:** Add, remove, and edit items in your cart effortlessly.
- 🖊️ **Cart Editing:** Modify product quantities and review your cart before checkout.
- 👤 **Profile Management:** Edit your profile, update information, and track orders.
- 📦 **Product Posting:** Sellers can add products, view info, and update them as needed.
- 📊 **Real-Time Updates:** Stay updated on product availability and listings in real-time.

## 🛠 Technologies Used

- **Frontend:** React.js, TypeScript, TailwindCSS
- **Backend:** HONO (Edge-native framework)
- **ORM:** Prisma ORM (For database management)
- **API Validation:** Zod (For robust type-safe validations)
- **Edge Infrastructure:** Cloudflare Workers (Fast, distributed API deployment)
  
## ⚙️ Installation

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/YourUsername/ScrollerShop.git
   cd backend
   ```

2. Set up the environment:

   ```bash
   npm install
   ```

3. Configure Prisma and your database:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. Run the backend:

   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the frontend:

   ```bash
   npm run dev
   ```

## 🔑 Visit Our Website

Link - https://ecommerce-app-nu-beryl.vercel.app

## 🤝 Contributing

We welcome contributions to **Scroller's Shop**! Whether you're fixing bugs or adding new features, please refer to our contributing guidelines in the repository.

## 📄 License

**Scroller's Shop** is released under the MIT License. For more details, see the LICENSE file in the repository.

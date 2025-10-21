# Turbo Mart

E-commerce monorepo using [Turborepo](https://turbo.build/)

---

## 👑 Super Admin

- [x] Create/manage Admins.
- [x] Role-based permissions (define what different Admins can/can’t do).

---

## 🛠️ Admin

- [x] Manage categories & subcategories.
- [x] Define attributes per subcategory (catalogue = product blueprint).
- [ ] Create products directly (based on catalogue).
- [ ] Approve/decline seller registrations.
- [ ] Enable/disable sellers.
- [ ] Approve/decline delivery person registrations.
- [ ] Enable/disable delivery person.
- [ ] Enable/disable products.
- [ ] Approve/reject new product creation requests from sellers.
- [ ] Create offers on products.
- [ ] Manage banners / CMS content.
- [ ] View overall stock levels across all sellers.
- [ ] View seller performance metrics (sales, returns, ratings).
- [ ] Moderate customer feedback (delete inappropriate ones).

---

## 🏬 Seller

- [ ] Self-register + upload required docs (verification).
- [ ] Dashboard with:
  - [ ] Sales, revenue, payouts pending.
  - [ ] Stock levels.
  - [ ] Return rates & feedback ratings.
- [ ] Request new product creation.
- [ ] Manage stock (add/remove).
- [ ] Set return period for their products.
- [ ] Add offers/discounts.
- [ ] Update order status:
  - [ ] Shipped (stock decrements).
  - [ ] Returned (stock increments, auto refund triggers).

---

## 👤 Customer

- [ ] Self-register.
- [ ] Browse products (by category, subcategory, attributes).
- [ ] View product details (description, images, attributes, reviews).
- [ ] Add to cart (persistent across sessions/devices).
- [ ] Checkout & pay (multiple payment options).
- [ ] Track orders (status: Placed → Shipped → Delivered → Pickup → Returned).
- [ ] Request returns.
- [ ] Mark products as Favorites.
- [ ] Leave feedback with optional media (photo/video).

---

## 🚚 Delivery Person
- [ ] Self-register + upload required docs (verification).
- [ ] Confirm Delivery
- [ ] Confirm Pickup


---

### 💰 Payments & Settlement

- [ ] Payment goes to Admin.
- [ ] After seller’s return period, 95% auto-settled to seller.
- [ ] Refund auto-triggered on return approval.
- [ ] Logs for all price changes (historical price tracking).
- [ ] Sold product prices are locked at time of purchase.

---

### 📦 Order Lifecycle

1. Placed (by customer, payment collected).
2. Shipped (by seller, stock decremented).
3. Delivered (by delivery person).
4. Pickup (by delivery person, if returned).
5. Returned (by seller, stock increment, refund issued).

---

### 🗄️ Database

#### 🍃 Mongo Collections
- `admins` (including roles and permissions)
- `adminTokens` (authentication tokens for admins)
- `customers` (customer profiles and data)
- `customerRefreshTokens` (refresh tokens for customer sessions)
- `customerFavorites` (wishlists or favorite products per customer)
- `customerCarts` (shopping carts with embedded cart items)
- `customerOrders` (orders with full status history and product snapshots)
- `catalogues` (categories, subcategories, and product attribute blueprints)
- `attributes` (catalogue attributes and related data)
- `products` (product details including current top-level offers)
- `feedback` (product reviews and ratings, optionally with media)
- `cms`/banners (content management system data like banners and pages)

#### 🐬 MySQL Tables
- `sellers`
- `seller_documents`
- `seller_tokens`
- `delivery_persons`
- `delivery_person_tokens`
- `seller_products` (including current seller offers and return period)
- `seller_product_items`
- `payments` (handle both payment & settlements)
- `logs_and_metrics`

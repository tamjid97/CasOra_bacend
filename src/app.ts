import express, { Application } from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware';

// Routes
import authRoutes from './modules/auth/auth.route';
import usersRoutes from './modules/Users/Users.route';
import productsRoutes from './modules/Products/Products.route';
import categoryRoutes from './modules/Category/Category.route';
import ordersRoutes from './modules/Orders/Orders.route';
import paymentsRoutes from './modules/payments/payments.route';
import reviewsRoutes from './modules/Reviews/Reviews.route';
import adminRoutes from './modules/Admin/Admin.route';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/orders', ordersRoutes);
app.use('/api/v1/payments', paymentsRoutes);
app.use('/api/v1/reviews', reviewsRoutes);
app.use('/api/v1/admin', adminRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running successfully' });
});

app.use(errorHandler);

export default app;

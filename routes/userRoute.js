import express from "express";
const userrouter = express.Router();
import tryCatchMiddleware from "../middlewares/tryCatchMiddleware.js";
import { userRegister, Login, viewDishes, singleDish, searchDishes, Payment, createOrder, OrderDetails, allOrderDetails, updateUser, deleteAccount, singleUser } from "../controllers/userController.js";
import { sendOTP, verifyOtp } from "../otp/Otp.js";
import VerifyToken from "../middlewares/UserAuth.js";
import imageupload from "../middlewares/imageUpload/imageUpload.js";
import { addReview, deleteReview, getProductReview, updateReview } from "../controllers/reviewController.js";

// Swagger tags definition
/**
 * @swagger
 * tags:
 *   name: User API
 *   description: API endpoints for users
 */

// User registration route
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: User registration
 *     description: API to allow users to register
 *     tags: [User API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: john doe
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               phone:
 *                 type: number
 *                 example: 1111111111
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       '201':
 *         description: Successfully registered
 *       '400':
 *         description: Username already taken
 *       '500':
 *         description: Internal server error
 */
userrouter.post("/register", tryCatchMiddleware(userRegister));

// Send OTP route
/**
 * @swagger
 * /api/users/sendotp:
 *   post:
 *     summary: Send mobile OTP
 *     description: API to send OTP to user's mobile
 *     tags: [User API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: number
 *                 example: 1111111111
 *     responses:
 *       '200':
 *         description: OTP sent
 *       '400':
 *         description: Bad request
 */
userrouter.post("/sendotp", tryCatchMiddleware(sendOTP));

// Verify OTP route
/**
 * @swagger
 * /api/users/verifyotp:
 *   post:
 *     summary: Verify mobile OTP
 *     description: API to verify OTP sent to user's mobile
 *     tags: [User API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: number
 *                 example: 1111111111
 *               otp:
 *                 type: number
 *                 example: 222222
 *     responses:
 *       '200':
 *         description: OTP verified
 *       '400':
 *         description: Bad request
 */
userrouter.post("/verifyotp", tryCatchMiddleware(verifyOtp));

// User login route
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     description: API to allow users to login
 *     tags: [User API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *       '401':
 *         description: Unauthorized
 */
userrouter.post("/login", tryCatchMiddleware(Login));

// View dishes route
/**
 * @swagger
 * /api/users/dishes:
 *   get:
 *     summary: View all dishes
 *     description: API to view all dishes
 *     tags: [User API]
 *     responses:
 *       '200':
 *         description: List of dishes
 *       '500':
 *         description: Internal server error
 */
userrouter.get("/dishes", tryCatchMiddleware(viewDishes));

userrouter.use(VerifyToken);

// View single dish route
/**
 * @swagger
 * /api/users/dishes/{id}:
 *   get:
 *     summary: View single dish
 *     description: API to view a single dish
 *     tags: [User API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The dish ID
 *     responses:
 *       '200':
 *         description: Single dish details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: fetched dish by id
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 6639cdf1570edfc1da707fc7
 *                         name:
 *                           type: string
 *                           example: one
 *                         category:
 *                           type: string
 *                           example: non-veg
 *                         image:
 *                           type: string
 *                           example: https://res.cloudinary.com/djxtjxsxn/image/upload/v1715064304/q4b7nfmy0fkvq4op7cq9.jpg
 *                         price:
 *                           type: number
 *                           example: 150
 *                         description:
 *                           type: string
 *                           example: qwertyuiopasdfghjkl
 *                         createdAt:
 *                           type: string
 *                           example: 2024-05-09T10:25:48.741Z
 *                         updatedAt:
 *                           type: string
 *                           example: 2024-05-09T10:25:48.741Z
 *       '404':
 *         description: Dish not found
 *       '500':
 *         description: Internal server error
 */
 userrouter.get('/dishes/:id',tryCatchMiddleware(singleDish))
// Search dishes route
/**
 * @swagger
 * /api/users/search:
 *   get:
 *     summary: Search dishes
 *     description: API to search for dishes
 *     tags: [User API]
 *     responses:
 *       '200':
 *         description: Search results
 *       '500':
 *         description: Internal server error
 */
userrouter.get('/search', tryCatchMiddleware(searchDishes));

// Payment route
/**
* @swagger
 * /api/users/payment:
 *   post:
 *     summary: Payment processing
 *     description: API to process payments
 *     tags: [User API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 200
 *               currency:
 *                 type: string
 *                 example: INR
 *     responses:
 *       '200':
 *         description: Payment processed
 *       '500':
 *         description: Internal server error
 */
userrouter.post('/payment', tryCatchMiddleware(Payment));

// Create order route
/**
 * @swagger
 * /api/users/order:
 *   post:
 *     summary: Create order
 *     description: API to create an order
 *     tags: [User API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 60d21b4667d0d8992e610c85
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: 60d21b4867d0d8992e610c86
 *               amount:
 *                 type: number
 *                 example: 1500
 *               currency:
 *                 type: string
 *                 example: INR
 *     responses:
 *       '201':
 *         description: Order created
 *       '500':
 *         description: Internal server error
 */
userrouter.post('/order', tryCatchMiddleware(createOrder));

// View single order details route
/**
 * @swagger
 * /api/users/order/{id}:
 *   get:
 *     summary: View order details
 *     description: API to view details of a single order
 *     tags: [User API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       '200':
 *         description: Order details
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error
 */
userrouter.get('/order/:id', tryCatchMiddleware(OrderDetails));

// View all orders route
/**
 * @swagger
 * /api/users/order:
 *   get:
 *     summary: View all orders
 *     description: API to view all orders
 *     tags: [User API]
 *     responses:
 *       '200':
 *         description: List of orders
 *       '500':
 *         description: Internal server error
 */
userrouter.get('/order', tryCatchMiddleware(allOrderDetails));

// View single user details route
/**
 * @swagger
 * /api/users/user/{id}:
 *   get:
 *     summary: View user details
 *     description: API to view details of a single user
 *     tags: [User API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       '200':
 *         description: User details
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
userrouter.get('/user/:id', tryCatchMiddleware(singleUser));

// Update user profile route
/**
 * @swagger
 * /api/users/profile/{id}:
 *   put:
 *     summary: Update user profile
 *     description: API to update user profile
 *     tags: [User API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Profile updated
 *       '500':
 *         description: Internal server error
 */
userrouter.put('/profile/:id', imageupload, tryCatchMiddleware(updateUser));

// Delete user account route
/**
 * @swagger
 * /api/users/profile/{id}:
 *   delete:
 *     summary: Delete user account
 *     description: API to delete user account
 *     tags: [User API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       '200':
 *         description: Account deleted
 *       '500':
 *         description: Internal server error
 */
userrouter.delete('/profile/:id', tryCatchMiddleware(deleteAccount));

// Add review route
/**
 * @swagger
 * /api/users/review:
 *   post:
 *     summary: Add a review
 *     description: API to add a review for a product
 *     tags: [User API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Review added
 *       '500':
 *         description: Internal server error
 */
userrouter.post('/review', tryCatchMiddleware(addReview));

// Get product review route
/**
 * @swagger
 * /api/users/review/{id}:
 *   get:
 *     summary: Get product reviews
 *     description: API to get reviews for a product
 *     tags: [User API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       '200':
 *         description: List of reviews
 *       '500':
 *         description: Internal server error
 */
userrouter.get('/review/:id', tryCatchMiddleware(getProductReview));

// Update review route
/**
 * @swagger
 * /api/users/review/{id}:
 *   put:
 *     summary: Update a review
 *     description: API to update a review for a product
 *     tags: [User API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Review updated
 *       '500':
 *         description: Internal server error
 */
userrouter.put('/review/:id', tryCatchMiddleware(updateReview));

// Delete review route
/**
 * @swagger
 * /api/users/review/{id}:
 *   delete:
 *     summary: Delete a review
 *     description: API to delete a review for a product
 *     tags: [User API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review ID
 *     responses:
 *       '200':
 *         description: Review deleted
 *       '500':
 *         description: Internal server error
 */
userrouter.delete('/review/:id', tryCatchMiddleware(deleteReview));

export default userrouter;

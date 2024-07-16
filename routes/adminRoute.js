import express from 'express';
const adminroute = express.Router()
import  { adminlogin ,allProduct,alluser,blockUser,createproduct, deleteDish, singleProduct, updateDish, userById} from '../controllers/adminController.js'
import  verifyToken  from '../middlewares/adminAuthMiddleware.js';
import tryCatchMiddleware from '../middlewares/tryCatchMiddleware.js';
 import imageUpload from '../middlewares/imageUpload/imageUpload.js';
import { allOrderDetails } from '../controllers/userController.js';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoryController.js';

adminroute
/**
 * @swagger
 * tags:
 *    name:Admin API
 *    description:API endpoints for Admins  
 */

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin login
 *     description: API to allow admin to login
 *     tags: [Admin API]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 email:
 *                   type: string
 *                   example: admin@gmail.com   
 *                 password:
 *                    type: string
 *                    example: adminpassword
 *     responses:
 *        201:
 *          description: successfully logged in
 *        401:
 *           description: unauthorised   
 */
.post("/login",tryCatchMiddleware(adminlogin))
.use(verifyToken)
/**
 * @swagger
 * /api/admin/product:
 *   post:
 *     summary: add new product
 *     description: this allow admin to add new propery
 *     tags: [Admin API]
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                    title:
 *                     type: string
 *                     example: biriyani  
 *                    category:
 *                     type: string
 *                     example: veg
 *                    image:
 *                     type: string
 *                     example: https://res.cloudinary.com/djxtjxsxn/image/upload/v1715064304/q4b7nfmy0fkvq4op7cq9.jpg
 *                    price:
 *                     type: number
 *                     example: 250
 *                    description:
 *                     type: string
 *                     example: a biriyani
 *        response:
 *          201:
 *            description: product added
 *          400:
 *            description: bad request
 *          500:
 *            description: internal server error
 */
.post('/product',imageUpload,createproduct)
/**
 * @swagger
 * /api/admin/product:
 *   get:
 *     summary: Get all products
 *     description: This API retrieves a list of all products
 *     tags: [Admin API]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   title:
 *                     type: string
 *                     example: "Biriyani"
 *                   category:
 *                     type: string
 *                     example: "Veg"
 *                   image:
 *                     type: string
 *                     example: "https://res.cloudinary.com/djxtjxsxn/image/upload/v1715064304/q4b7nfmy0fkvq4op7cq9.jpg"
 *                   price:
 *                     type: number
 *                     example: 250
 *                   description:
 *                     type: string
 *                     example: "A biriyani"
 *       500:
 *         description: Internal server error
 */

.get('/Product',tryCatchMiddleware(allProduct))
/**
 * @swagger
 * /api/admin/users:
 *   get:
 *    summary: get users
 *    description: this API retrieves all users
 *    tags: [Admin API]
 *    responses:
 *       200:
 *          description: list of users
 */
.get('/users',tryCatchMiddleware(alluser))
/**
 * @swagger
 * /api/admin/users/{id}:
 *   get:
 *     summary: get user by id
 *     description: this API retrieves a user by id
 *     tags: [Admin API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error

 */
.get('/users/:id',tryCatchMiddleware(userById))
/**
 * @swagger
 * /api/admin/dishes:
 *   get:
 *     summary: Get all dishes
 *     description: This API retrieves a list of all dishes
 *     tags: [Admin API]
 *     responses:
 *       200:
 *         description: A list of dishes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   title:
 *                     type: string
 *                     example: "Biriyani"
 *                   category:
 *                     type: string
 *                     example: "Veg"
 *                   image:
 *                     type: string
 *                     example: "https://res.cloudinary.com/djxtjxsxn/image/upload/v1715064304/q4b7nfmy0fkvq4op7cq9.jpg"
 *                   price:
 *                     type: number
 *                     example: 250
 *                   description:
 *                     type: string
 *                     example: "A biriyani"
 *       500:
 *         description: Internal server error
 */

.get('/dishes',tryCatchMiddleware(allProduct))
/**
 * @swagger
 * /api/admin/dishes/{id}:
 *   get:
 *     summary: Get a dish by ID
 *     description: This API retrieves a single dish by its ID
 *     tags: [Admin API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the dish
 *     responses:
 *       200:
 *         description: A single dish
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 title:
 *                   type: string
 *                   example: "Biriyani"
 *                 category:
 *                   type: string
 *                   example: "Veg"
 *                 image:
 *                   type: string
 *                   example: "https://res.cloudinary.com/djxtjxsxn/image/upload/v1715064304/q4b7nfmy0fkvq4op7cq9.jpg"
 *                 price:
 *                   type: number
 *                   example: 250
 *                 description:
 *                   type: string
 *                   example: "A biriyani"
 *       404:
 *         description: Dish not found
 *       500:
 *         description: Internal server error
 */

.get('/dishes/:id',tryCatchMiddleware(singleProduct))
/**
 * @swagger
 * /api/admin/dishes/{id}:
 *   delete:
 *     summary: Delete a dish by ID
 *     description: This API deletes a dish by its ID
 *     tags: [Admin API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the dish to be deleted
 *     responses:
 *       200:
 *         description: Dish deleted successfully
 *       404:
 *         description: Dish not found
 *       500:
 *         description: Internal server error
 */

.delete('/dishes/:id',tryCatchMiddleware(deleteDish))
/**
 * @swagger
 * /api/admin/dishes/{id}:
 *   put:
 *     summary: Update a dish by ID
 *     description: This API updates a dish by its ID
 *     tags: [Admin API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the dish to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Biriyani"
 *               category:
 *                 type: string
 *                 example: "Veg"
 *               image:
 *                 type: string
 *                 example: "https://res.cloudinary.com/djxtjxsxn/image/upload/v1715064304/q4b7nfmy0fkvq4op7cq9.jpg"
 *               price:
 *                 type: number
 *                 example: 275
 *               description:
 *                 type: string
 *                 example: "An updated description of the biriyani"
 *     responses:
 *       200:
 *         description: Dish updated successfully
 *       404:
 *         description: Dish not found
 *       500:
 *         description: Internal server error
 */

.put('/dishes/:id',tryCatchMiddleware(updateDish))
/**
 * @swagger
 * /api/admin/users/block/{id}:
 *   patch:
 *     summary: Block or unblock a user by ID
 *     description: This API allows blocking or unblocking a user by their ID
 *     tags: [Admin API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to be blocked or unblocked
 *     responses:
 *       200:
 *         description: User blocked or unblocked successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

.patch('/users/block/:id',tryCatchMiddleware(blockUser))
/**
 * @swagger
 * /api/admin/orders:
 *   get:
 *     summary: Get all order details
 *     description: Retrieve a list of all order details
 *     tags: [Admin API]
 *     responses:
 *       200:
 *         description: A list of order details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   orderId:
 *                     type: string
 *                     example: "12345"
 *                   customerName:
 *                     type: string
 *                     example: "John Doe"
 *                   productName:
 *                     type: string
 *                     example: "Sample Product"
 *                   quantity:
 *                     type: integer
 *                     example: 2
 *                   totalAmount:
 *                     type: number
 *                     example: 199.98
 *       500:
 *         description: Internal server error
 */

.get('/orders',tryCatchMiddleware(allOrderDetails))
/**
 * @swagger
 * /api/admin/category:
 *   post:
 *     summary: Create a new category
 *     description: Endpoint to create a new category
 *     tags: [Admin API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Vegetarian"
 *               description:
 *                 type: string
 *                 example: "Vegetarian dishes"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request, invalid input data
 *       500:
 *         description: Internal server error
 */

.post('/category',tryCatchMiddleware(createCategory))
/**
 * @swagger
 * /api/admin/category:
 *   get:
 *     summary: Get all categories
 *     description: Endpoint to retrieve a list of all categories
 *     tags: [Admin API]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   name:
 *                     type: string
 *                     example: "Vegetarian"
 *                   description:
 *                     type: string
 *                     example: "Vegetarian dishes"
 *       500:
 *         description: Internal server error
 */

.get('/category',tryCatchMiddleware(getCategories))
/**
 * @swagger
 * /api/admin/category/{id}:
 *   put:
 *     summary: Update a category by ID
 *     description: Endpoint to update a category by its ID
 *     tags: [Admin API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Vegetarian"
 *               description:
 *                 type: string
 *                 example: "Updated description of Vegetarian dishes"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Bad request, invalid input data
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

.put('/category/:id',tryCatchMiddleware(updateCategory))
/**
 * @swagger
 * /api/admin/category/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     description: Endpoint to delete a category by its ID
 *     tags: [Admin API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

.delete('/category/:id',tryCatchMiddleware(deleteCategory))

export default adminroute
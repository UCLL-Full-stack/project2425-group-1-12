/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *           description: User full name.
 *           example: John Doe
 *         email:
 *           type: string
 *           description: User email.
 *           example: john.doe@mail.com
 *         password:
 *           type: string
 *           description: User password.
 *           example: password
 *         address:
 *           type: string
 *           description: User address.
 *           example: john doe avenue 25
 *         orders:
 *           type: array
 *           description: List of orders
 *           items:
 *             $ref: '#/components/schemas/Order'
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: User full name.
 *         email:
 *           type: string
 *           description: User email.
 *           example: john.doe@mail.com
 *         name:
 *           type: string
 *           description: User name.
 *           example: John Doe
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { LoginCredentials, UpdateUserInput, UserInput } from '../types';
import { extractRoleFromToken } from '../util/jwt';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            return;
        }
        const token = authHeader.split(' ')[1];
        const role = extractRoleFromToken(token);
        const users = await userService.getAllUsers(role);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id.
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserById(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Get a user by email.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The user email.
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/email/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserByEmail(String(req.params.email));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registered a user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.registerUser(userInput);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loginCredentials = <LoginCredentials>req.body;
        const response = await userService.authenticate(loginCredentials);
        res.status(200).json({ message: 'Authentication successful', ...response });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/updateUser:
 *  put:
 *      summary: Update a user's information.
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: The user's email
 *                          name:
 *                              type: string
 *                              description: The user's name (optional for update)
 *                          address:
 *                              type: string
 *                              description: The user's address (optional for update)
 *                          password:
 *                              type: string
 *                              description: The user's password (optional for update)
 *      responses:
 *          200:
 *              description: Updated user object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          401:
 *              description: Unauthorized.
 */
userRouter.put('/updateUser', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateData = <UpdateUserInput>req.body;
        const result = await userService.updateUser(updateData);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { userRouter };

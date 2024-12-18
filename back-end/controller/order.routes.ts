/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Order:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            builds:
 *              type: array
 *              description: List of builds in order
 *              items:
 *                  $ref: '#/components/schemas/Build'
 *            price:
 *              type: number
 *              description: Order price
 *              example: 800
 *            orderStatus:
 *              type: string
 *              description: Order status
 *              example: shipping
 *            orderDate:
 *              type: string
 *              format: date-time
 *              description: Order date
 *              example: 2024-12-15T14:43:50.521Z
 */
import express, { NextFunction, Request, Response } from 'express';
import orderService from '../service/order.service';

const orderRouter = express.Router();

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get a list of all orders.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Order'
 */
orderRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = req.params.role;
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /orders/{id}:
 *  get:
 *      summary: Get an order by id.
 *     security:
 *       - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The order id.
 *      responses:
 *          200:
 *              description: An order object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Order'
 */
orderRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await orderService.getOrderById(Number(req.params.id));
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
});

// /**
//  * @swagger
//  */
// orderRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const orderInput = <OrderInput>req.body;
//         const order = await orderService.createOrder(orderInput);
//         res.status(201).json(order);
//     } catch (error) {
//         next(error);
//     }
// });

/**
 * @swagger
 * /builds/user:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get a list of all builds from a user.
 *     responses:
 *       200:
 *         description: A list of builds from a user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Build'
 */
orderRouter.get('/builds/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.id);
        if (isNaN(userId)) { return res.status(400).json({ error: 'Invalid user ID. Must be a number.' })};

        const builds = await orderService.getAllBuildsByUserId({ id: userId });
        res.status(200).json(builds);
    } catch (error) {
        next(error);
    }
});

export { orderRouter };

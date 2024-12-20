/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Part:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Part name.
 *              example: RTX 3060
 *            brand:
 *              type: string
 *              description: Part brand.
 *              example: CoolBrand
 *            type:
 *              type: string
 *              description: Part type.
 *              example: GPU
 *            price:
 *              type: number
 *              description: Part price.
 *              example: 300
 */
import express, { NextFunction, Request, Response } from 'express';
import partService from '../service/part.service';

const partRouter = express.Router();

/**
 * @swagger
 * /parts:
 *   get:
 *     summary: Get a list of all parts.
 *     responses:
 *       200:
 *         description: A list of parts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Part'
 */
partRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parts = await partService.getAllParts();
        res.status(200).json(parts);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /parts/{id}:
 *  get:
 *      summary: Get a part by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The part id.
 *      responses:
 *          200:
 *              description: A part object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Part'
 */
partRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const part = await partService.getPartById(Number(req.params.id));
        res.status(200).json(part);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /parts/name/{name}:
 *  get:
 *      summary: Get a part by name.
 *      parameters:
 *          - in: path
 *            name: name
 *            schema:
 *              type: string
 *              required: true
 *              description: The part name.
 *      responses:
 *          200:
 *              description: A part object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Part'
 */
partRouter.get('/name/:name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const part = await partService.getPartByName(String(req.params.name));
        res.status(200).json(part);
    } catch (error) {
        next (error);
    }
});

export { partRouter }
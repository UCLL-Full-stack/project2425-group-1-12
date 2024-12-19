/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      BuildInput:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: Build name
 *              example: cool build
 *            preBuild:
 *              type: boolean
 *              description: Prebuilt
 *              example: false
 *            parts:
 *              type: array
 *              description: List of parts in build
 *              items:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: number
 *                          format: int64
 *      Build:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            price:
 *              type: number
 *              description: Build price
 *              example: 800
 *            preBuild:
 *              type: boolean
 *              description: Prebuilt
 *              example: false
 *            parts:
 *              type: array
 *              description: List of parts in build
 *              items:
 *                  $ref: '#/components/schemas/Part'
 */
import express, { NextFunction, Request, Response } from 'express';
import buildService from '../service/build.service';
import { BuildInput } from '../types';

const buildRouter = express.Router();

/**
 * @swagger
 * /builds:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get a list of all builds.
 *     responses:
 *       200:
 *         description: A list of builds.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Build'
 */
buildRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const builds = await buildService.getAllBuilds();
        res.status(200).json(builds);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /builds/{id}:
 *  get:
 *      security:
 *       - bearerAuth: []
 *      summary: Get a build by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The build id.
 *      responses:
 *          200:
 *              description: A build object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Build'
 */
buildRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const build = await buildService.getBuildById({ id: Number(req.params.id) });
        res.status(200).json(build);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /builds:
 *  post:
 *      security:
 *       - bearerAuth: []
 *      summary: Create a new build.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BuildInput'
 *      responses:
 *          201:
 *              description: Created a build object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Build'
 */
buildRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const buildInput = <BuildInput>req.body;
        const build = await buildService.createBuild(buildInput);
        res.status(201).json(build);
    } catch (error) {
        next(error);
    }
});

export { buildRouter };

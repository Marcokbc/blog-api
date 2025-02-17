import { Request, Response, Router } from "express";
import Category from "../entities/Category";
import categoryRepository from "../repositories/CategoryRepository";
import { ICategory } from "../interfaces/ICategory";
import { authenticateToken } from "../../middlewares/authMiddleware";

const categoryRouter = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtém todas as categorias
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 */
categoryRouter.get(
  "/",
  async (_req: Request, res: Response): Promise<Response> => {
    const categories = await categoryRepository.all();
    return res.status(200).json(categories);
  }
);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtém uma categoria pelo ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria encontrada com sucesso
 *       404:
 *         description: Categoria não encontrada
 */
categoryRouter.get(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const category = await categoryRepository.find(Number(id));

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      return res.status(200).json(category);
    } catch (error) {
      console.error("Error fetching category by ID: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
categoryRouter.post(
  "/",
  authenticateToken,
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Name is required." });
      }

      const newCategory = await categoryRepository.set({ name });
      return res.status(201).json(newCategory);
    } catch (error) {
      console.error("Error creating category:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
);

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Atualiza uma categoria existente
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       404:
 *         description: Categoria não encontrada
 */
categoryRouter.patch(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const category = await categoryRepository.find(Number(id));
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      const updatedCategory = await categoryRepository.update(
        Number(id),
        updateData
      );
      return res.status(200).json(updatedCategory);
    } catch (error) {
      console.error("Error updating category:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Remove uma categoria
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria removida com sucesso
 *       404:
 *         description: Categoria não encontrada
 */
categoryRouter.delete(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      const category = await categoryRepository.find(Number(id));
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      await categoryRepository.destroy(Number(id));
      return res.status(200).json({ message: "Category successfully deleted" });
    } catch (error) {
      console.error("Error deleting category:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default categoryRouter;

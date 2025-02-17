import { Request, Response, Router } from "express";
import Post from "../entities/Post";
import postRepository from "../repositories/PostRepository";
import { IPost } from "../interfaces/IPost";
import { authenticateToken } from "../../middlewares/authMiddleware";

const postRouter = Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtém todos os posts
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Lista de posts retornada com sucesso
 */
postRouter.get("/", async (_req: Request, res: Response): Promise<Response> => {
  const posts = await postRepository.all();
  return res.status(200).json(posts);
});

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obtém um post pelo ID
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post encontrado com sucesso
 *       404:
 *         description: Post não encontrado
 */
postRouter.get(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const post = await postRepository.find(Number(id));

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      return res.status(200).json(post);
    } catch (error) {
      console.error("Error fetching post by ID: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

/**
 * @swagger
 * /posts/showByTitle/{title}:
 *   get:
 *     summary: Obtém um post pelo título
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post encontrado com sucesso
 *       404:
 *         description: Post não encontrado
 */
postRouter.get(
  "/showByTitle/:title",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { title } = req.params;
      const post = await postRepository.findByTitle(title);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      return res.status(200).json(post);
    } catch (error) {
      console.error("Error fetching post by title: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Post]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               audioUrl:
 *                 type: string
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
postRouter.post(
  "/",
  authenticateToken,
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { title, content, imageUrl, audioUrl, categoryIds } = req.body;

      if (!title || !content) {
        return res
          .status(400)
          .json({ error: "Title and content are required." });
      }

      const newPost = await postRepository.set({
        title,
        content,
        imageUrl,
        audioUrl,
        categoryIds,
      });

      return res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
);

/**
 * @swagger
 * /posts/{id}:
 *   patch:
 *     summary: Atualiza um post existente
 *     tags: [Post]
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
 *         description: Post atualizado com sucesso
 *       404:
 *         description: Post não encontrado
 */
postRouter.patch(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const post = await postRepository.find(Number(id));
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const updatedPost = await postRepository.update(Number(id), updateData);
      return res.status(200).json(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Remove um post
 *     tags: [Post]
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
 *         description: Post removido com sucesso
 *       404:
 *         description: Post não encontrado
 */
postRouter.delete(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      const post = await postRepository.find(Number(id));
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      await postRepository.destroy(Number(id));
      return res.status(200).json({ message: "Post successfully deleted" });
    } catch (error) {
      console.error("Error deleting post:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default postRouter;

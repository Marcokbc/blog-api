import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Autenticação",
      version: "1.0.0",
      description: "Documentação da API de autenticação com JWT",
    },
    servers: [{ url: process.env.APPLICATION_URL }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Category: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
          },
        },
        Post: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            content: { type: "string" },
            imageUrl: { type: "string", nullable: true },
            audioUrl: { type: "string", nullable: true },
            categoryIds: { type: "array", items: { type: "integer" } },
          },
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: [path.resolve(__dirname, "./app/controllers/*")],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

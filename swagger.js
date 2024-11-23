import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "lineState API",
      version: "1.0.0",
      description: "API documentation for lineState",
    },
    servers: [
      {
        url: "http://localhost:8001/api", // Change to your server URL
      },
    ],
  },
  apis: ["./handlers/*.js", "./routes/*.js"], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };

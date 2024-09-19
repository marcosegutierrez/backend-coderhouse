export const info = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Ecommerce",
      version: "1.0.0",
      description: "Documentacion de API de Ecommerce",
    },
    servers: [
      {
        url: "http://localhost:8080",
      }
    ],
  },
  apis: ["./src/docs/*.yml"],
};
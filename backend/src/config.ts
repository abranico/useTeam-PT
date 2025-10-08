export const config = {
  MONGO_URI: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/kanban-xp',
  PORT: process.env.PORT ?? 3000,
  JWT_SECRET: process.env.JWT_SECRET ?? 'secret',
};

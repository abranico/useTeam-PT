export const config = {
  mongoConnectionString:
    process.env.MONGODB_URI ?? 'mongodb://localhost:27017/kanban-xp',
  port: process.env.PORT ?? 3000,
};

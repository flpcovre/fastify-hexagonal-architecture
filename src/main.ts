import { createFastifyApp } from './app/http/server';

createFastifyApp().then((app) => {
  app.listen({ port: 3333 }).then(() => {
    console.log('Server is running on http://localhost:3333');
  });
});
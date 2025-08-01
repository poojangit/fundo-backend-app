import express from 'express';
const router = express.Router();
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });

  return router;
};

export default routes;

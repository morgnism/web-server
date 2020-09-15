const {
  getHero,
  getAllHeroes,
  createHero,
  updateHero,
  deleteHero,
} = require('../controllers/heroes.controller');
const express = require('express');
const canAccess = require('../middleware/auth.middleware');

const heroesRoutes = express.Router();
/**
 * Express routes for Heroes.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all heroes. Evaluates to `/heroes/`.
 */
heroesRoutes.get('/', canAccess, getAllHeroes).post('/', canAccess, createHero);

/**
 * Routes for a hero by id. Evalutes to `/heroes/:heroId`.
 */
heroesRoutes
  .get('/:heroId', getHero)
  .post('/:heroId', updateHero)
  .delete('/:heroId', deleteHero);

module.exports = heroesRoutes;

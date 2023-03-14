const express = require('express');
const router = express.Router();

const configs = require('../util/config')

const redis = require('../redis')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const redis_added_todos = await redis.getAsync('added_todos');
  const added_todos = !redis_added_todos
    ? 0
    : redis_added_todos;
  res.json({
    added_todos: Number(added_todos)
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();

// Your route handlers here
router.get('/', async (req, res) => {
  // Get tasks logic
});

router.post('/', async (req, res) => {
  // Create task logic
});

module.exports = router;  // Make sure to export the router

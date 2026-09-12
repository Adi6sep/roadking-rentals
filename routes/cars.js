const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM cars WHERE available = TRUE';
    const params = [];
    if (category && category !== 'All') { query += ' AND category = ?'; params.push(category); }
    query += ' ORDER BY price_per_day ASC';
    const [rows] = await pool.execute(query, params);
    res.json({ success: true, cars: rows });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM cars WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Car not found' });
    res.json({ success: true, car: rows[0] });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;

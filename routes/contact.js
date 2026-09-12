const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    await pool.execute('INSERT INTO contacts (name,phone,email,message) VALUES (?,?,?,?)', [name||null, phone||null, email||null, message||null]);
    res.json({ success: true, message: 'Message received! We will contact you soon.' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;

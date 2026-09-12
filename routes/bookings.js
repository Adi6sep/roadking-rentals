const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { sendBookingEmails } = require('../config/mailer');

// POST — Create new booking
router.post('/', async (req, res) => {
  try {
    const { customer_name, customer_phone, customer_email, car_id, pickup_location, pickup_date, drop_date } = req.body;

    if (!customer_name || !customer_phone || !car_id || !pickup_location || !pickup_date || !drop_date)
      return res.status(400).json({ success: false, message: 'All required fields must be filled.' });

    const d1 = new Date(pickup_date), d2 = new Date(drop_date);
    if (d2 <= d1) return res.status(400).json({ success: false, message: 'Drop date must be after pickup date.' });

    const total_days = Math.max(1, Math.ceil((d2 - d1) / 86400000));

    const [carRows] = await pool.execute('SELECT * FROM cars WHERE id = ? AND available = TRUE', [car_id]);
    if (!carRows.length) return res.status(404).json({ success: false, message: 'Car not found or unavailable.' });
    const car = carRows[0];

    const rent_amount    = total_days * car.price_per_day;
    const deposit_amount = car.deposit;
    const total_amount   = rent_amount + deposit_amount;

    const [result] = await pool.execute(
      `INSERT INTO bookings (customer_name,customer_phone,customer_email,car_id,pickup_location,pickup_date,drop_date,total_days,rent_amount,deposit_amount,total_amount)
       VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [customer_name, customer_phone, customer_email||null, car_id, pickup_location, pickup_date, drop_date, total_days, rent_amount, deposit_amount, total_amount]
    );

    const booking_id = result.insertId;

    // Send emails (don't fail booking if email fails)
    try {
      await sendBookingEmails({
        booking_id, customer_name, customer_email, customer_phone,
        car_name: car.name, pickup_location, pickup_date, drop_date,
        total_days, rent_amount, deposit_amount, total_amount
      });
    } catch(emailErr) {
      console.error('Email error (booking still saved):', emailErr.message);
    }

    res.json({ success: true, booking_id, total_days, rent_amount, deposit_amount, total_amount, car_name: car.name });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET — All bookings (admin)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT b.*, c.name as car_name, c.category
       FROM bookings b JOIN cars c ON b.car_id = c.id
       ORDER BY b.created_at DESC`
    );
    res.json({ success: true, bookings: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

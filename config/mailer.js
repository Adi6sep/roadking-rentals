const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.OWNER_EMAIL || 'adityakhandagale87@gmail.com',
    pass: process.env.EMAIL_PASS  // Gmail App Password
  }
});

async function sendBookingEmails({
  booking_id, customer_name, customer_email, customer_phone,
  car_name, pickup_location, pickup_date, drop_date,
  total_days, rent_amount, deposit_amount, total_amount
}) {
  const bookingId = `#RK${String(booking_id).padStart(4,'0')}`;
  const ownerEmail = process.env.OWNER_EMAIL || 'adityakhandagale87@gmail.com';
  const ownerPhone = process.env.OWNER_PHONE || '8799826319';

  // ── Email to CUSTOMER ──
  if (customer_email) {
    await transporter.sendMail({
      from: `"RoadKing Rentals" <${ownerEmail}>`,
      to: customer_email,
      subject: `✅ Booking Confirmed ${bookingId} — ${car_name} | RoadKing Rentals`,
      html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0c;color:#f0ede6;border-radius:12px;overflow:hidden;">
        <div style="background:#f5c842;padding:28px;text-align:center;">
          <h1 style="margin:0;color:#0a0a0c;font-size:30px;">🚗 RoadKing Rentals</h1>
          <p style="margin:6px 0 0;color:#0a0a0c;font-size:15px;font-weight:600;">Your booking is confirmed!</p>
        </div>
        <div style="padding:32px;">
          <p style="font-size:16px;">Hi <strong>${customer_name}</strong>,</p>
          <p style="color:#9aa0b0;margin-bottom:24px;">Your car booking is confirmed. Here are your complete details:</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr style="background:#1e222c;"><td colspan="2" style="padding:12px 16px;font-weight:700;color:#f5c842;font-size:13px;letter-spacing:1px;">BOOKING DETAILS</td></tr>
            <tr style="border-bottom:1px solid #1e222c;"><td style="padding:12px 16px;color:#9aa0b0;background:#181b22;">Booking ID</td><td style="padding:12px 16px;font-weight:700;background:#181b22;">${bookingId}</td></tr>
            <tr style="border-bottom:1px solid #1e222c;"><td style="padding:12px 16px;color:#9aa0b0;background:#111318;">Car</td><td style="padding:12px 16px;font-weight:700;background:#111318;">${car_name}</td></tr>
            <tr style="border-bottom:1px solid #1e222c;"><td style="padding:12px 16px;color:#9aa0b0;background:#181b22;">Pickup Location</td><td style="padding:12px 16px;background:#181b22;">${pickup_location}</td></tr>
            <tr style="border-bottom:1px solid #1e222c;"><td style="padding:12px 16px;color:#9aa0b0;background:#111318;">Pickup Date</td><td style="padding:12px 16px;background:#111318;">${pickup_date}</td></tr>
            <tr style="border-bottom:1px solid #1e222c;"><td style="padding:12px 16px;color:#9aa0b0;background:#181b22;">Drop Date</td><td style="padding:12px 16px;background:#181b22;">${drop_date}</td></tr>
            <tr style="border-bottom:1px solid #1e222c;"><td style="padding:12px 16px;color:#9aa0b0;background:#111318;">Total Days</td><td style="padding:12px 16px;background:#111318;">${total_days} day${total_days>1?'s':''}</td></tr>
            <tr style="border-bottom:1px solid #1e222c;"><td style="padding:12px 16px;color:#9aa0b0;background:#181b22;">Rent Amount</td><td style="padding:12px 16px;background:#181b22;">₹${Number(rent_amount).toLocaleString('en-IN')}</td></tr>
            <tr style="border-bottom:1px solid #1e222c;"><td style="padding:12px 16px;color:#9aa0b0;background:#111318;">Security Deposit <span style="font-size:11px;color:#3ecfcf;">(refundable)</span></td><td style="padding:12px 16px;background:#111318;">₹${Number(deposit_amount).toLocaleString('en-IN')}</td></tr>
            <tr style="background:#1e222c;"><td style="padding:14px 16px;font-weight:800;color:#f5c842;font-size:15px;">Total Payable</td><td style="padding:14px 16px;font-weight:800;color:#f5c842;font-size:18px;">₹${Number(total_amount).toLocaleString('en-IN')}</td></tr>
          </table>
          <div style="background:#1e222c;border-left:3px solid #f5c842;border-radius:6px;padding:16px;margin-top:24px;">
            <p style="margin:0 0 8px;font-weight:700;">What happens next?</p>
            <p style="margin:0;color:#9aa0b0;font-size:14px;">Our team will call you at <strong style="color:#f0ede6;">+91 ${customer_phone}</strong> within <strong style="color:#f5c842;">30 minutes</strong> to confirm delivery details.</p>
          </div>
          <div style="margin-top:24px;padding:16px;background:#111318;border-radius:8px;text-align:center;">
            <p style="margin:0;color:#9aa0b0;font-size:13px;">Questions? Contact us anytime</p>
            <p style="margin:6px 0 0;font-weight:700;">📞 +91 ${ownerPhone} &nbsp;|&nbsp; ✉️ ${ownerEmail}</p>
          </div>
        </div>
        <div style="padding:18px;text-align:center;border-top:1px solid #1e222c;color:#6e7585;font-size:12px;">
          Made with ❤️ by <strong style="color:#f5c842;">Aditya Khandagale</strong> | RoadKing Rentals © 2026
        </div>
      </div>`
    });
  }

  // ── Email to OWNER (Aditya) — kisne car rent kiya puri detail ──
  await transporter.sendMail({
    from: `"RoadKing System" <${ownerEmail}>`,
    to: ownerEmail,   // adityakhandagale87@gmail.com
    subject: `🔔 New Booking ${bookingId} — ${car_name} | Call: ${customer_phone}`,
    html: `
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;background:#0a0a0c;color:#f0ede6;border-radius:12px;overflow:hidden;">
      <div style="background:#ff9f1c;padding:22px;text-align:center;">
        <h2 style="margin:0;color:#0a0a0c;font-size:22px;">🔔 New Car Booking!</h2>
        <p style="margin:5px 0 0;color:#0a0a0c;font-weight:700;font-size:14px;">Call the customer within 30 minutes</p>
      </div>
      <div style="padding:26px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr style="border-bottom:1px solid #1e222c;">
            <td style="padding:12px;color:#9aa0b0;width:40%;">Booking ID</td>
            <td style="padding:12px;font-weight:700;color:#f5c842;">${bookingId}</td>
          </tr>
          <tr style="border-bottom:1px solid #1e222c;background:#111318;">
            <td style="padding:12px;color:#9aa0b0;">Customer Name</td>
            <td style="padding:12px;font-weight:700;">${customer_name}</td>
          </tr>
          <tr style="border-bottom:1px solid #1e222c;">
            <td style="padding:12px;color:#9aa0b0;">📞 Phone</td>
            <td style="padding:12px;font-weight:900;color:#3ecfcf;font-size:18px;">${customer_phone}</td>
          </tr>
          <tr style="border-bottom:1px solid #1e222c;background:#111318;">
            <td style="padding:12px;color:#9aa0b0;">✉️ Email</td>
            <td style="padding:12px;">${customer_email || 'Not provided'}</td>
          </tr>
          <tr style="border-bottom:1px solid #1e222c;">
            <td style="padding:12px;color:#9aa0b0;">Car Rented</td>
            <td style="padding:12px;font-weight:700;">${car_name}</td>
          </tr>
          <tr style="border-bottom:1px solid #1e222c;background:#111318;">
            <td style="padding:12px;color:#9aa0b0;">Pickup Location</td>
            <td style="padding:12px;">${pickup_location}</td>
          </tr>
          <tr style="border-bottom:1px solid #1e222c;">
            <td style="padding:12px;color:#9aa0b0;">Pickup Date</td>
            <td style="padding:12px;">${pickup_date}</td>
          </tr>
          <tr style="border-bottom:1px solid #1e222c;background:#111318;">
            <td style="padding:12px;color:#9aa0b0;">Drop Date</td>
            <td style="padding:12px;">${drop_date}</td>
          </tr>
          <tr style="border-bottom:1px solid #1e222c;">
            <td style="padding:12px;color:#9aa0b0;">Total Days</td>
            <td style="padding:12px;">${total_days} day${total_days>1?'s':''}</td>
          </tr>
          <tr style="border-bottom:1px solid #1e222c;background:#111318;">
            <td style="padding:12px;color:#9aa0b0;">Rent</td>
            <td style="padding:12px;">₹${Number(rent_amount).toLocaleString('en-IN')}</td>
          </tr>
          <tr style="border-bottom:1px solid #1e222c;">
            <td style="padding:12px;color:#9aa0b0;">Deposit</td>
            <td style="padding:12px;">₹${Number(deposit_amount).toLocaleString('en-IN')}</td>
          </tr>
          <tr style="background:#1e222c;">
            <td style="padding:14px;font-weight:800;color:#f5c842;font-size:15px;">💰 Total</td>
            <td style="padding:14px;font-weight:900;color:#f5c842;font-size:20px;">₹${Number(total_amount).toLocaleString('en-IN')}</td>
          </tr>
        </table>
        <div style="background:#1e222c;border-left:3px solid #3ecfcf;border-radius:6px;padding:14px;margin-top:20px;">
          <p style="margin:0;font-weight:700;color:#3ecfcf;">⚡ Action Required</p>
          <p style="margin:6px 0 0;color:#9aa0b0;font-size:13px;">Call <strong style="color:#f0ede6;">${customer_name}</strong> at <strong style="color:#3ecfcf;">${customer_phone}</strong> to confirm car delivery time and location.</p>
        </div>
      </div>
      <div style="padding:14px;text-align:center;background:#1e222c;font-size:12px;color:#6e7585;">
        RoadKing Rentals | Made with ❤️ by Aditya Khandagale
      </div>
    </div>`
  });
}

module.exports = { sendBookingEmails };

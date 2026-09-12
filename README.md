# 🚗 RoadKing Rentals — Railway Deploy Guide

## Project Structure
```
roadking/
├── server.js              ← Main server
├── package.json           ← Dependencies
├── setup.sql              ← Database tables + cars data
├── .env.example           ← Environment variables template
├── config/
│   ├── db.js              ← MySQL connection
│   └── mailer.js          ← Email (customer + owner)
├── routes/
│   ├── cars.js            ← GET /api/cars
│   ├── bookings.js        ← POST /api/bookings (saves + sends email)
│   └── contact.js         ← POST /api/contact
└── public/
    └── index.html         ← Full frontend website
```

---

## 🚀 Deploy on Railway (Free — 15 min)

### Step 1 — GitHub pe upload karo
1. github.com pe account banao (free)
2. New repository banao → name: `roadking-rentals`
3. Ye poora folder upload karo

### Step 2 — Railway pe deploy karo
1. railway.app pe jao → Google se login karo
2. "New Project" → "Deploy from GitHub repo" → roadking-rentals select karo
3. Railway automatically deploy kar dega

### Step 3 — MySQL database add karo
1. Railway project mein "New" → "Database" → "MySQL" click karo
2. MySQL service create hogi
3. MySQL service pe click karo → "Variables" tab mein jaao
4. In values ko copy karo:
   - MYSQL_HOST
   - MYSQL_USER  
   - MYSQL_PASSWORD
   - MYSQL_DATABASE

### Step 4 — Environment Variables add karo
Railway project → tumhara app service → "Variables" tab:

```
DB_HOST=      (MySQL service se copy karo)
DB_PORT=3306
DB_USER=      (MySQL service se copy karo)
DB_PASSWORD=  (MySQL service se copy karo)
DB_NAME=      (MySQL service se copy karo)
DB_SSL=true

OWNER_EMAIL=adityakhandagale87@gmail.com
OWNER_PHONE=8799826319
EMAIL_PASS=   (Gmail App Password — neeche dekho)
```

### Step 5 — Database tables banao
Railway MySQL service → "Query" tab:
```sql
-- setup.sql ka poora content paste karo aur run karo
```

### Step 6 — Gmail App Password banao
1. Gmail → Google Account → Security
2. "2-Step Verification" ON karo
3. "App Passwords" → "Mail" → "Windows Computer"
4. 16-character password milega → EMAIL_PASS mein daalo

### Step 7 — Live link lo
Railway → tumhara app → "Settings" → "Domains" → public link milega!
Example: https://roadking-production.up.railway.app

---

## ✅ Kya kya kaam karega after deploy:
- Website live hogi public link pe
- Customer book karega → MySQL mein save hoga
- Customer ko confirmation email aayega
- Tumhe (Aditya) notification email aayega — customer ka phone number ke saath
- Language toggle (EN/Hindi/Marathi)
- All 17 cars with deposit system

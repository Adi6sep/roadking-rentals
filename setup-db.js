const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://roadking_db_user:v7emfoWeOg0n3imda3zIcW7bWCjJZGAs@dpg-daiggkp594qs738lsdlg-a.oregon-postgres.render.com/roadking_db',
  ssl: { rejectUnauthorized: false }
});

const sql = `
CREATE TABLE IF NOT EXISTS cars (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  category VARCHAR(20),
  price_per_day INT,
  deposit INT DEFAULT 0,
  seats INT DEFAULT 5,
  fuel VARCHAR(20),
  transmission VARCHAR(20),
  image_url TEXT,
  description TEXT,
  badge VARCHAR(50),
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(100),
  customer_phone VARCHAR(15),
  customer_email VARCHAR(100),
  car_id INT,
  pickup_location VARCHAR(200),
  pickup_date DATE,
  drop_date DATE,
  total_days INT,
  rent_amount INT,
  deposit_amount INT,
  total_amount INT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  phone VARCHAR(15),
  email VARCHAR(100),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO cars (name,category,price_per_day,deposit,seats,fuel,transmission,image_url,description,badge) VALUES
('Maruti Alto K10','Mini',699,2000,4,'Petrol','Manual','https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80','Most affordable city ride.','Best Value'),
('Maruti Swift','Hatchback',999,3000,5,'Petrol','Manual','https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80','India favourite hatchback.','Most Popular'),
('Maruti WagonR','Hatchback',899,3000,5,'Petrol','Manual','https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80','Spacious tall-boy design.',NULL),
('Hyundai i20','Hatchback',1199,3500,5,'Petrol','Automatic','https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80','Premium hatchback with sunroof.','Premium'),
('Maruti Baleno','Hatchback',1099,3000,5,'Petrol','Automatic','https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80','Feature-loaded premium hatchback.',NULL),
('Tata Tiago','Hatchback',849,2500,5,'Petrol','Manual','https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80','Safe and stylish. 5-star safety.','5★ Safety'),
('Maruti Dzire','Sedan',1099,3500,5,'Petrol','Manual','https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80','Perfect compact sedan.',NULL),
('Honda City','Sedan',1799,4000,5,'Petrol','Automatic','https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80','Premium sedan legendary reliability.','Best Sedan'),
('Hyundai Verna','Sedan',1599,4000,5,'Diesel','Automatic','https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80','Sporty powerful sedan.',NULL),
('Tata Nexon','SUV',1599,4500,5,'Petrol','Automatic','https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80','Compact SUV 5-star safety.','5★ Safety'),
('Hyundai Creta','SUV',1899,5000,5,'Petrol','Automatic','https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80','India bestselling SUV.','Top Seller'),
('Mahindra XUV700','SUV',2499,6000,7,'Diesel','Automatic','https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80','Most feature-loaded SUV.','Best SUV'),
('Toyota Fortuner','SUV',3499,8000,7,'Diesel','Automatic','https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80','The road king.','Road King'),
('Maruti Ertiga','MUV',1499,4000,7,'Petrol','Automatic','https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80','Perfect family MUV. 7 seats.','Family Pick');
`;

async function run() {
  await client.connect();
  console.log('Connected!');
  await client.query(sql);
  console.log('Tables + Cars data created!');
  await client.end();
}

run().catch(e => console.log('Error:', e.message));
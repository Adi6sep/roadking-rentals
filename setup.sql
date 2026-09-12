CREATE DATABASE IF NOT EXISTS roadking_db;
USE roadking_db;

DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS contacts;

CREATE TABLE cars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category ENUM('Mini','Hatchback','Sedan','SUV','MUV') NOT NULL,
  price_per_day INT NOT NULL,
  deposit INT NOT NULL DEFAULT 0,
  seats INT DEFAULT 5,
  fuel VARCHAR(20) DEFAULT 'Petrol',
  transmission ENUM('Manual','Automatic') DEFAULT 'Manual',
  image_url TEXT,
  description TEXT,
  badge VARCHAR(50) DEFAULT NULL,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(15) NOT NULL,
  customer_email VARCHAR(100),
  car_id INT NOT NULL,
  pickup_location VARCHAR(200) NOT NULL,
  pickup_date DATE NOT NULL,
  drop_date DATE NOT NULL,
  total_days INT NOT NULL,
  rent_amount INT NOT NULL,
  deposit_amount INT NOT NULL,
  total_amount INT NOT NULL,
  status ENUM('pending','confirmed','cancelled','completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (car_id) REFERENCES cars(id)
);

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  phone VARCHAR(15),
  email VARCHAR(100),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO cars (name,category,price_per_day,deposit,seats,fuel,transmission,image_url,description,badge) VALUES
('Maruti Alto K10','Mini',699,2000,4,'Petrol','Manual','https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80','Most affordable city ride. Zippy, fuel-efficient, easy to park.','Best Value'),
('Maruti S-Presso','Mini',799,2000,4,'Petrol','Manual','https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80','Compact SUV-styled mini. High seating with small footprint.',NULL),
('Maruti Swift','Hatchback',999,3000,5,'Petrol','Manual','https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80','India favourite hatchback. Peppy engine, great mileage.','Most Popular'),
('Maruti WagonR','Hatchback',899,3000,5,'Petrol','Manual','https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80','Tall-boy design, spacious interiors. Great for city family trips.',NULL),
('Hyundai i20','Hatchback',1199,3500,5,'Petrol','Automatic','https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80','Premium hatchback with sunroof and sporty styling.','Premium'),
('Maruti Baleno','Hatchback',1099,3000,5,'Petrol','Automatic','https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80','Feature-loaded premium hatchback. Large boot, smooth ride.',NULL),
('Tata Tiago','Hatchback',849,2500,5,'Petrol','Manual','https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80','Safe and stylish. 5-star safety rating, great practicality.','5★ Safety'),
('Maruti Dzire','Sedan',1099,3500,5,'Petrol','Manual','https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80','Perfect compact sedan. Excellent fuel economy, big boot.',NULL),
('Honda City','Sedan',1799,4000,5,'Petrol','Automatic','https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80','Premium sedan with legendary reliability. Business or family.','Best Sedan'),
('Hyundai Verna','Sedan',1599,4000,5,'Diesel','Automatic','https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80','Sporty powerful sedan. Turbo engine, highway performance.',NULL),
('Skoda Slavia','Sedan',1999,5000,5,'Petrol','Automatic','https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80','European sophistication with turbocharged punch.','European'),
('Tata Nexon','SUV',1599,4500,5,'Petrol','Automatic','https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80','Compact SUV, 5-star safety. Great off-road clearance.','5★ Safety'),
('Hyundai Creta','SUV',1899,5000,5,'Petrol','Automatic','https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80','India bestselling SUV. Premium cabin, smooth ride.','Top Seller'),
('Mahindra XUV700','SUV',2499,6000,7,'Diesel','Automatic','https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80','India most feature-loaded SUV. ADAS, panoramic roof.','Best SUV'),
('Volkswagen Taigun','SUV',1899,5000,5,'Petrol','Automatic','https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80','German engineering, compact SUV body. Precise and fun.','German'),
('Toyota Fortuner','SUV',3499,8000,7,'Diesel','Automatic','https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80','The road king. No terrain too tough for the Fortuner.','Road King'),
('Maruti Ertiga','MUV',1499,4000,7,'Petrol','Automatic','https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80','Perfect family MUV. 7 seats, great mileage, easy to drive.','Family Pick');

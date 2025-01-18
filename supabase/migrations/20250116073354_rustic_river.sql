/*
  # Restaurant System Schema

  1. New Tables
    - `menu_items`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `category` (text)
      - `image_url` (text)
      - `is_special` (boolean)
      - `available` (boolean)
      - `created_at` (timestamptz)
    
    - `reservations`
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text)
      - `date` (date)
      - `time` (time)
      - `guests` (integer)
      - `status` (text)
      - `created_at` (timestamptz)
    
    - `orders`
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text)
      - `total` (numeric)
      - `status` (text)
      - `created_at` (timestamptz)
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `menu_item_id` (uuid, foreign key)
      - `quantity` (integer)
      - `price` (numeric)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin access
    - Add policies for public read access to menu items
*/

-- Create menu_items table
CREATE TABLE menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  category text NOT NULL,
  image_url text,
  is_special boolean DEFAULT false,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create reservations table
CREATE TABLE reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  guests integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  total numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id),
  menu_item_id uuid REFERENCES menu_items(id),
  quantity integer NOT NULL,
  price numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policies for menu_items
CREATE POLICY "Menu items are viewable by everyone" ON menu_items
  FOR SELECT USING (true);

CREATE POLICY "Menu items are editable by admin" ON menu_items
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for reservations
CREATE POLICY "Reservations can be created by anyone" ON reservations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Reservations are viewable by admin" ON reservations
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Reservations are editable by admin" ON reservations
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for orders
CREATE POLICY "Orders can be created by anyone" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Orders are viewable by admin" ON orders
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Orders are editable by admin" ON orders
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for order_items
CREATE POLICY "Order items can be created by anyone" ON order_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Order items are viewable by admin" ON order_items
  FOR SELECT TO authenticated
  USING (true);
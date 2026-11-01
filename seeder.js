import { Pool } from 'pg';
import bcrypt from 'bcrypt';

async function seed() {
  const hashedPassword = await bcrypt.hash('halo1234', 12);
  const pool = new Pool();
  const client = await pool.connect();

  try {
    console.log('seeding started...');
    await client.query('begin');
    await client.query('truncate table users, items restart identity cascade');
    await client.query(`
        insert into users (name, email, password)
        values ('ricky', 'ricky@gmail.com', '${hashedPassword}');`);
    await client.query(`
    insert into items (name, description, price, stock)
    values
    ('Mechanical Keyboard', 'Keyboard mekanik dengan lampu RGB', 750000, 10),
    ('Wireless Mouse', 'Mouse ergonomis tanpa kabel', 250000, 20),
    ('Gaming Headset', 'Headset gaming dengan suara surround', 550000, 15),
    ('USB-C Hub', 'Adaptor USB-C dengan 7 port tambahan', 350000, 12),
    ('Monitor 24 Inch', 'Monitor IPS dengan resolusi Full HD', 1800000, 8),
    ('Laptop Stand', 'Dudukan laptop aluminium yang dapat disesuaikan', 200000, 25),
    ('Webcam HD', 'Kamera web USB dengan resolusi 1080p', 400000, 18),
    ('Mechanical Numpad', 'Keyboard numerik eksternal berukuran ringkas', 300000, 10),
    ('Mouse Pad', 'Alas mouse gaming berukuran besar', 100000, 30),
    ('USB Flash Drive', 'Flashdisk USB 3.0 dengan kapasitas 64GB', 85000, 40),
    ('Gaming Chair', 'Kursi gaming ergonomis dengan sandaran yang dapat disesuaikan', 1850000, 12),
    ('Mechanical Keyboard 60%', 'Keyboard mekanik ringkas dengan layout 60 persen', 650000, 15),
    ('Bluetooth Speaker', 'Speaker Bluetooth portabel dengan suara jernih dan bass kuat', 450000, 20),
    ('Power Bank 20000mAh', 'Power bank berkapasitas 20000mAh dengan dukungan pengisian cepat', 350000, 25),
    ('Wireless Earbuds', 'Earbuds nirkabel dengan kualitas suara jernih dan desain minimalis', 550000, 18),
    ('Portable SSD 1TB', 'SSD eksternal berkapasitas 1TB dengan kecepatan transfer tinggi', 1250000, 8),
    ('Gaming Monitor 27 Inch', 'Monitor gaming 27 inci dengan refresh rate 144Hz', 3200000, 6),
    ('Laptop Backpack', 'Tas ransel laptop dengan banyak kompartemen dan bahan tahan air', 275000, 22),
    ('USB Microphone', 'Mikrofon USB untuk streaming, podcast, dan meeting online', 680000, 10),
    ('Smartwatch', 'Jam tangan pintar dengan fitur pemantauan aktivitas dan notifikasi', 850000, 14),
    ('HDMI Cable 2M', 'Kabel HDMI sepanjang 2 meter dengan dukungan resolusi 4K', 75000, 40),
    ('Wireless Charger', 'Pengisi daya nirkabel yang kompatibel dengan perangkat pendukung Qi', 225000, 16),
    ('Laptop Cooling Pad', 'Alas pendingin laptop dengan kipas untuk membantu menjaga suhu perangkat', 180000, 20),
    ('Webcam 4K', 'Kamera web beresolusi 4K untuk kebutuhan meeting dan streaming', 950000, 9),
    ('Drawing Tablet', 'Tablet gambar digital untuk ilustrasi dan desain grafis', 1100000, 7),
    ('USB-C Cable', 'Kabel USB-C dengan dukungan pengisian cepat dan transfer data', 65000, 50),
    ('RGB LED Strip', 'Lampu LED RGB dengan berbagai pilihan warna untuk dekorasi ruangan', 125000, 30),
    ('External DVD Drive', 'Drive DVD eksternal untuk membaca dan menulis keping DVD', 320000, 11),
    ('Gaming Controller', 'Kontroler gaming nirkabel yang nyaman digunakan untuk bermain game', 475000, 13),
    ('Desk Organizer', 'Tempat penyimpanan perlengkapan meja kerja agar lebih rapi dan teratur', 95000, 28);`);
    await client.query('commit');
    console.log('seeding success!');
  } catch (error) {
    await client.query('rollback');
    console.log('seeding failed!');
    console.error(error);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();

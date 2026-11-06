# Luma Skin — Product QR Management System

ระบบจัดการข้อมูลสินค้าและ QR Code

## 1. Installation & Running

**Requirements:** PHP 8.2+, MariaDB, MySQLi

```bash
git clone https://github.com/wattanamaysook/yes-dev-test.git
cd yes-dev-test
```

1. สร้างฐานข้อมูลและ Import `database/schema.sql`
2. ตั้งค่าการเชื่อมต่อใน `backend/config/database.php`
3. สร้างบัญชี Super Admin ในตาราง `users`
4. เปิดเซิร์ฟเวอร์

```bash
php -S 127.0.0.1:8000 backend/server.php
```

เปิดใช้งาน: `http://127.0.0.1:8000/frontend/login.html`

**Test Account**
- Email: `wattanamaysook@gmail.com`
- Password: ติดต่อผู้พัฒนา

## 2. Technology Stack

- **PHP Native:** พัฒนา Backend โดยไม่ใช้ Framework
- **MariaDB:** จัดเก็บข้อมูลระบบ
- **MySQLi Prepared Statements:** เชื่อมต่อฐานข้อมูลอย่างปลอดภัย
- **PHP Session & CSRF:** จัดการ Authentication และความปลอดภัย
- **HTML, CSS, JavaScript:** พัฒนา Frontend
- **Fetch API:** เชื่อมต่อ Backend API

เลือกใช้เทคโนโลยีที่เรียบง่าย ลด Dependencies และเหมาะกับขอบเขตโครงการ

## 3. Features

**Completed**
- Database Schema
- Database Connection
- Login API
- Session และ CSRF Protection
- หน้า Login
- Super Admin Account

**Not Completed**
- Dashboard
- Product Management
- QR Code Generation
- Scan Logs
- Excel Import / Export
- Admin Management

## 4. Changes from Original Plan

- พัฒนา Authentication และ Backend พื้นฐานก่อนฟังก์ชันอื่น เนื่องจากมีเวลาจำกัด
- แยกงาน Frontend และ Backend เพื่อให้พัฒนาได้ชัดเจน
- ใช้ Mock Data ในหน้า Style Guide ระหว่างเตรียมเชื่อมต่อ API จริง

## 5. AI Usage

ใช้ AI เป็นเครื่องมือช่วยในการพัฒนาโปรเจกต์ ได้แก่

- **Claude AI:** ช่วยออกแบบและพัฒนา Frontend เช่น HTML, CSS และ JavaScript
- **ChatGPT:** ช่วยวางโครงสร้าง Backend, Database Schema, API และระบบ Authentication
- ช่วยตรวจสอบข้อผิดพลาด (Debugging) และแนะนำแนวทางแก้ไขโค้ด
- ช่วยจัดทำเอกสารและ README.md


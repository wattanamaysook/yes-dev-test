
# ระบบ QR สินค้า

## Flow
-Login Admin
-ตรวจสอบสิทธิ
-Import Excel
-บันทึกการสแกน
-สร้าง QR
-admin มีสิทธิเข้าถึง แก้ไขข้อมูลสินค้า หากข้อมูลไม่ถูกต้อง 



## โครงสร้างdata  ข้อมูลที่ต้องเก็บ
-user
sku
name
category
price
size
description
how_to_use
status

-สินค้า
sku
name
category
price
size
description
status

-scan_log
id
สินค้า
scan

ลำดับงานที่จะทำ
## ลำดับงานที่จะทำ
-ออกแบบ database ระบบหลังบ้าน
จัดการข้อมูล




## ถ้าเวลาไม่พอ 
เชิญ Admin ทางอีเมล: Super Admin เพิ่ม Admin ใหม่ ระบบส่งอีเมลให้ผู้ถูกเชิญยืนยันและตั้งรหัสผ่านเอง (ใช้ Mailtrap หรือบันทึกอีเมลลง log แทนการส่งจริงได้)

## สมมติฐาน





## stack
html โครงสร้างเว็ป
css หน้าต่าง
java script 
php  backend
mysql database
pdo 
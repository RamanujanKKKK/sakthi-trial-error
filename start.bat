pg_ctl -D "C:\Program Files\PostgreSQL\14\data" restart & ^
pm2 delete all & ^
pm2 start ./backend/index.js & ^
pm2 serve ./frontend/build 80 --spa & ^
pm2 save
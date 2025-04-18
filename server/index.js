require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Импортиране на маршрути
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const creditsRoutes = require('./routes/creditsRoutes');

// Инициализиране на app
const app = express();

// Свързване с базата данни
connectDB();

// Middleware
app.use(express.json());

// CORS настройки
app.use(cors({
    origin: 'http://localhost:5173',  // URL на React приложението
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Маршрути
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/credits', creditsRoutes);

// Обикновен маршрут за тестване
app.get('/', (req, res) => {
    res.json({ message: 'Технофолио API работи!' });
});

// Middleware за обработка на неналичен маршрут
app.use((req, res, next) => {
    res.status(404).json({ message: 'Маршрутът не е намерен!' });
});

// Middleware за глобална обработка на грешки
app.use((error, req, res, next) => {
    console.error(error.stack);
    const status = error.statusCode || 500;
    const message = error.message || 'Възникна грешка в сървъра';
    res.status(status).json({ message });
});

// Стартиране на сървъра
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Сървърът работи на порт ${PORT}`));
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export let isDatabaseConnected = false;

const sqlConnection = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE
});

sqlConnection.connect((error) => {
    if (error) {
        isDatabaseConnected = false;
        console.log("Error al conectar con la base de datos: " + error);
        return;
    }
    isDatabaseConnected = true;
    console.log('¡Conectado a la Base de Datos!');
});

export default sqlConnection;
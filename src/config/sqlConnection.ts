import mysql from 'mysql2';

const sqlConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
});

sqlConnection.connect((error) => {
    if (error) {
        console.log("Error al conectar con la base de datos: " + error);
        return;
    }
    console.log('¡Conectado a la Base de Datos!');
});

export default sqlConnection;
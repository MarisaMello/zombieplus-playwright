const { Pool } = require('pg')

const DbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'zombieplus',
    password: 'pwd123',
    port: 5432
}
   
export async function executeSQL(sqlScript) {

    try {

        const pool = new Pool(DbConfig)
        const client = await pool.connect()
        
        const result = await client.query(sqlScript)
       console.log(result.rows)
    } catch (error) {
        console.log('Erro ao executar SQL ' + error)
    }
}

// const { Pool } = require('pg');

// const DbConfig = {
//     user: 'postgres',
//     host: 'localhost',
//     database: 'zombieplus',
//     password: 'pwd123',
//     port: 5432
// };

// async function executeSQL(sqlScript) {
//     const pool = new Pool(DbConfig);

//     try {
//         const client = await pool.connect();
//         const result = await client.query(sqlScript);
//         console.log(result.rows);
//         return result.rows; // Retorne o resultado, se necessário
//     } catch (error) {
//         console.log('Erro ao executar SQL: ' + error);
//     } finally {
//         // Garanta que o cliente seja liberado após a execução
//         pool.end();
//     }
// }

// // Exporte a função com `module.exports`
// module.exports = { executeSQL };


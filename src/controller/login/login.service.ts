import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login';
import { connectToDatabase } from 'src/db/Connection';
import * as sql from 'mssql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {

    constructor(private jwtService: JwtService) { }

    //METODO PARA LA AUTENTICACION DE LOS USUARIOS 
    /*  async login(loginDto: LoginDto) {
 
         const pool = await connectToDatabase();
         try {
             const result = await pool.request()
                 .input('Email', sql.VarChar(100), loginDto.email)
                 .input('Password', sql.VarChar(100), loginDto.password)
                 .execute('sp_UserLogin');
 
             const user = result.recordset[0];
             const payload = { email: user.email, sub: user.id };
             const token = this.jwtService.sign(payload);
 
             return {
                 status: true,
                 token: token,
                 value: result.recordset[0],
                 message: ''
             }
         } catch (err) {
             return {
                 status: false,
                 value: null,
                 message: err.message
             }
         }
     } */

    async login(loginDto: LoginDto) {
        console.log(loginDto.email)

        const pool = await connectToDatabase();
        try {

            const queryVulnerable = `SELECT * FROM users2 WHERE correo = '${loginDto.email}' AND contraseña = '${loginDto.password}'`;
            const result = await pool.request().query(queryVulnerable);





            if (result.recordset.length == 0) {
                return {
                    status: false,
                    value: null,
                    message: 'Invalid email or password'
                }
            }
            const user = result.recordset[0];
            const payload = { email: user.email, sub: user.id };
            const token = this.jwtService.sign(payload);

            return {
                status: true,
                token: token,
                value: result.recordset[0],
                message: ''
            }
        } catch (err) {
            return {
                status: false,
                value: null,
                message: err.message
            }
        }
    }
    async GetUser(idUser: Number) {
        const pool = await connectToDatabase();

        // Inyección SQL posible
        const query = `
            SELECT * FROM users2 WHERE id = ${idUser}
        `;

        // Ejecutar la consulta
        const result = await pool.request()
            .query(query);

        return result.recordset;
    }



}

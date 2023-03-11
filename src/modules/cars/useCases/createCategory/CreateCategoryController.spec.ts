import { app } from '@shared/infra/http/app';
import { Connection } from 'typeorm';
import createConnection from '@shared/infra/typeorm';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import request from 'supertest';

let connection: Connection;
describe("Create Category Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const password = await hash("admin", 8);
        const id = uuidv4();
        await connection.query(
            `INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at)
        values(
            '${id}', 'admin', 'admin@rentx.com.br', '${password}', 'ABC123', true, 'now()'
        )`
        );
    })
    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();

    })

    it("should be able to create a new category", async () => {
        const responseToken = await await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin"
        });

        console.log(responseToken.body.token);
        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category supertest"
            }).set({
                Authorization: `Bearer ${token}`
            })

        expect(response.status).toBe(201);
    })

    it("should not be able to create a new category if name already existis", async () => {
        const responseToken = await await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin"
        });

        console.log(responseToken.body.token);
        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category supertest"
            }).set({
                Authorization: `Bearer ${token}`
            })

        expect(response.status).toBe(400);
    })
})
import { app } from '@shared/infra/http/app';
import { Connection } from 'typeorm';
import createConnection from '@shared/infra/typeorm';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import request from 'supertest';

let connection: Connection;
describe("List categories", () => {

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

    it("should be able to list all categories", async () => {
        const responseToken = await await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin"
        });

        const { token } = responseToken.body;

        await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category supertest"
            }).set({
                Authorization: `Bearer ${token}`
            })

        const response = await request(app).get("/categories");

        console.log(response.body);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("Category Supertest");
    })

})
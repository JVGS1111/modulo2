import { v4 as uuidv4 } from "uuid";
import { hash } from "bcrypt";
import { createConnection } from "typeorm";

async function create() {
    const connection = await createConnection();

    const id = uuidv4();
    const password = await hash("123456", 8);

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at)
        values(
            '${id}', 'admin', 'admin@rentapi.com.br', '${password}', 'ABC123', true, 'now()'
        )`
    );

    await connection.close();
}

create().then(() => console.log("user admin created by seed"));
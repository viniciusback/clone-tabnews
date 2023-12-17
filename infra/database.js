import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.HOST,
    port: process.env.POSTGRES_POR,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  const result = await client.query(queryObject);
  await client.end();
  return result;
}

export default {
  query: query,
};

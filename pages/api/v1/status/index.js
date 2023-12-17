import database from "../../../../infra/database.js";

async function status(request, response) {
  const resultado = await database.query("SELECT 1 + 1 as sum");
  console.log(resultado.rows);
  response.status(200).json({ chave: "Frase de teste" });
}

export default status;

function status(request, response) {
  response.status(200).json({ chave: "Frase de teste" });
}

export default status;

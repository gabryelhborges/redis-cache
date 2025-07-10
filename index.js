import express from "express";
import BancoDadosExemplo from "./bancodadosexemplo.js";

const app = express();
const porta = 7777;

const getPessoas = async () => {
  const intervalo = Math.random() * 4000 + 1000; //simulando tempo de resposta de 1 a 5 segundos
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(BancoDadosExemplo.getPessoas());
    }, intervalo);
  });
};

app.get("/", async (req, res) => {
  const pessoas = await getPessoas();
  res.status(200).send(pessoas);
});

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
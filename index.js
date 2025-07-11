import express from "express";
import BancoDadosExemplo from "./bancodadosexemplo.js";
import { createClient } from "redis";

const app = express();
const porta = 7777;

const redisClient = createClient({
  url: "redis://localhost:6379",
});

const getPessoas = async () => {
  const intervalo = Math.random() * 4000 + 1000; //simulando tempo de resposta de 1 a 5 segundos
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(BancoDadosExemplo.getPessoas());
    }, intervalo);
  });
};

app.get("/", async (req, res) => {
  const cachePessoas = await redisClient.get("key_pessoas");//pegando do cache Redis
  if(cachePessoas){
    return res.status(200).send(JSON.parse(cachePessoas));//se existir no cache, retornar os dados
  }
  const pessoas = await getPessoas();//se não há nada na cache, buscar no banco de dados
  await redisClient.set("key_pessoas", JSON.stringify(pessoas));//armazenando no redis
  res.status(200).send(pessoas);
});

const startup = async () => {
  await redisClient.connect();
  app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
  });
};
startup();
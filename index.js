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

// rota GET para simular que foi feita alguma alteração na base de dados
app.get("/alterar-pessoa", async (req, res) => {
  // algum cliente foi alterado, logo a cache está desatualizada
  await redisClient.del("key_pessoas"); //deletando o cache
  res.status(200).send("Pessoa 'alterada'");
});

app.get("/", async (req, res) => {
  const cachePessoas = await redisClient.get("key_pessoas"); //pegando do cache Redis
  if (cachePessoas) {
    return res.status(200).send(JSON.parse(cachePessoas)); //se existir no cache, retornar os dados
  }
  const pessoas = await getPessoas(); //se não há nada na cache, buscar no banco de dados
  await redisClient.set("key_pessoas", JSON.stringify(pessoas)); //armazenando no redis
  //await redisClient.set("key_pessoas", JSON.stringify(pessoas), { EX: 60 });//armazenando no redis com expiração de 60 segundos
  res.status(200).send(pessoas);
});

const startup = async () => {
  await redisClient.connect();
  app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
  });
};
startup();

//para usar cacheamento é necessário entender onde está o problema, qual operação está consumindo mais recursos
//apos isso, será possivel entender que tipo de cache será mais favorável para solucionar isso

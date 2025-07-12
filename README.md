# Redis Cache

Projeto para entender como a utilização de cacheamento impacta uma aplicação

## 📋 Objetivo

Este projeto demonstra na prática como implementar um sistema de cache utilizando **Redis** em uma aplicação Node.js com Express. O objetivo é mostrar:

- Como o cache pode melhorar significativamente a performance de uma aplicação
- A diferença de tempo de resposta entre requisições com e sem cache
- Como invalidar o cache quando os dados são alterados
- Gerenciamento de keys no Redis

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Redis** - Sistema de cache em memória
- **Docker** - Para criar uma instância do Redis
- **Redis Insight** - Ferramenta de gerenciamento e visualização das keys do Redis

## 📦 Instalação e Configuração
### Instale as dependências
```bash
npm install
```

### Configure o Redis com Docker
Para executar uma instância do Redis, utilize o Docker:

```bash
# Baixar e executar o Redis
docker run -d --name redis-cache -p 6379:6379 redis:latest

# Verificar se o container está rodando
docker ps
```

### (Opcional) Configure o Redis Insight
Para uma melhor visualização e gerenciamento das chaves Redis:

1. Baixe o [Redis Insight](https://redis.com/redis-enterprise/redis-insight/)
2. Conecte-se ao Redis local: `localhost:6379`
3. Visualize as chaves e dados em tempo real

## 🎯 Como Executar
- `npm start` - Executa a aplicação
- `npm run dev` - Executa em modo de desenvolvimento com hot reload

O servidor estará disponível em: `http://localhost:7777`

## 📖 Como Usar

### 1. Buscar pessoas (com cache)
```
GET http://localhost:7777/
```
- **Primeira requisição**: Busca no "banco de dados" (simulado com delay de 1-5 segundos)
- **Requisições seguintes**: Retorna dados do cache Redis (resposta 'instantânea')

### 2. Simular alteração de dados
```
GET http://localhost:7777/alterar-pessoa
```
- Invalida o cache atual
- Próxima requisição à rota principal buscará novamente no "banco de dados"

## 🔍 Funcionalidades

- **Cache Automático**: Os dados são automaticamente armazenados no Redis após a primeira consulta
- **Invalidação de Cache**: Simula cenários reais onde dados são alterados
- **Simulação de Latência**: A função [`getPessoas`](index.js) simula delays de banco de dados reais
- **Dados de Exemplo**: Utiliza a classe [`BancoDadosExemplo`](bancodadosexemplo.js) com dados fictícios

## Imagens

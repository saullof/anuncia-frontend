# AnuncIA Frontend

Frontend do AnuncIA preparado para hospedagem no EasyPanel com Docker.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Produção

O `Dockerfile` gera uma aplicação Next.js standalone na porta `3000`.

As credenciais do n8n devem ser configuradas apenas nas variáveis de ambiente do EasyPanel. Nunca coloque chaves reais em arquivos versionados.

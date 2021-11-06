# O comando FROM diz ao container qual imagem base usar, nesse
# caso usaremos a imagem do NodeJS versão estável (LTS)
FROM node:lts

# O comando WORKDIR declara em qual pasta estaremos trabalho no
# container. Aqui estamos trabalhando dentro de uma pasta
# chamada app
WORKDIR /app

# O comando copy faz exatamente o que ele sugere, copia os
# arquivos da máquina local para o container, aqui estamos
# copiando ambos index.js e package.json para a pasta atual
# dentro do container.
COPY package.json ./

RUN npm install -g npm@8.1.3

COPY . .

# O comando ENV é usado para declarar variáveis de ambiente
# Aqui estamos declarando uma variável NAME com valor 'John'

ENV NODE_ENV 'production'
ENV PORT 8001
ENV DATABASE_URL 'postgres://pctibpfoxkzlgd:001c04685d7f315dfa0af4b25ea8e3d8717bf1dab43b5aad76cb85da180b023b@ec2-44-196-244-150.compute-1.amazonaws.com:5432/dacsqj61hh3dos'

# O comando CMD é usado para declarar o que o container fará
# quando for executado. Nele separamos cada parte do comando
# em um item de um array. Em nosso caso ele executará o
# comando npm run start

RUN npm run build
CMD ["npm", "run", "start"]
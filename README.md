
# BrightEnergy ☀️

Aplicativo mobile desenvolvido para facilitar o acesso a informações sobre energia solar, simular possíveis economias na conta de luz e conectar consumidores a empresas de energia solar de Santa Cruz do Sul e região.

## 1. Problema identificado

Pessoas interessadas em instalar sistemas de energia solar podem ter dificuldades para compreender os benefícios dessa tecnologia, estimar a economia possível e encontrar empresas especializadas.

O BrightEnergy reúne informações, uma calculadora de estimativas e um catálogo de empresas em um único aplicativo.

## 2. Objetivo

Desenvolver uma aplicação mobile que permita consultar informações sobre energia solar, realizar simulações financeiras e localizar empresas que trabalham com instalação de sistemas fotovoltaicos.

## 3. Público-alvo

- Pessoas interessadas em energia solar.
- Proprietários de residências e estabelecimentos comerciais.
- Consumidores que desejam conhecer alternativas para reduzir gastos com energia elétrica.
- Empresas que desejam divulgar seus serviços.

## 4. Funcionalidades

- Apresentação de informações sobre energia solar.
- Calculadora de estimativa de economia.
- Listagem de empresas aprovadas.
- Solicitação de cadastro de empresas.
- Cadastro e login de usuários.
- Formulário de contato.
- Painel administrativo.
- Aprovação, edição e exclusão de empresas.
- Visualização e exclusão de mensagens.
- Controle de acesso por nível de usuário.

## 5. Tecnologias utilizadas

### Aplicativo mobile
- React Native
- Expo
- JavaScript
- React Navigation
- AsyncStorage

### Backend
- Node.js
- Express
- JavaScript
- JWT
- bcryptjs

### Banco de dados
- MySQL
- mysql2

## 6. Estrutura do projeto

```text
projeto_pi/
├── api/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   └── routes/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── app/
│   ├── components/
│   ├── context/
│   ├── navigation/
│   ├── screens/
│   └── services/
├── assets/
├── database/
│   └── brightenergy.sql
├── App.js
├── app.json
├── eas.json
├── index.js
├── package.json
├── .env.example
└── README.md
```

## 7. Banco de dados

O projeto utiliza MySQL.

O script para criação do banco e das tabelas está em:

`database/brightenergy.sql`

Tabelas principais:

- `usuarios`: dados dos usuários e níveis de acesso.
- `empresas`: informações das empresas e situação de aprovação.
- `mensagens`: mensagens enviadas pelo formulário de contato.

## 8. Autenticação e níveis de acesso

O sistema possui dois níveis de acesso.

### Usuário comum
- Realizar cadastro e login.
- Consultar empresas aprovadas.
- Solicitar cadastro de empresas.
- Enviar mensagens pelo formulário de contato.

### Administrador
- Visualizar empresas cadastradas.
- Aprovar solicitações.
- Editar e excluir empresas.
- Consultar e excluir mensagens.

A autenticação utiliza JSON Web Token (JWT). As senhas dos usuários são protegidas com hash usando bcryptjs.

## 9. Calculadora

A calculadora apresenta estimativas simplificadas de economia com energia solar.

Fórmulas utilizadas:

**Economia mensal**

Economia mensal = Valor da conta × Percentual de economia / 100

**Tempo de retorno**

Payback = Custo estimado do sistema / Economia mensal

**Economia em cinco anos**

Economia mensal × 60 meses

**Economia em dez anos**

Economia mensal × 120 meses

Os resultados são estimativas e não substituem um orçamento técnico. A economia real depende do consumo, localização, dimensionamento, condições do imóvel e regras aplicáveis.

## 10. Instalação e execução

### Pré-requisitos

- Node.js e npm.
- MySQL.
- Visual Studio Code.
- Emulador Android ou celular com Expo Go.

### 10.1. Clonar o repositório

```bash
git clone https://github.com/pedrofa07/projeto_aplicativo.git
cd projeto_aplicativo
```

Entre na pasta que contém o `package.json` do aplicativo, caso o repositório tenha uma pasta interna para o projeto.

### 10.2. Instalar as dependências do aplicativo

Na pasta principal do aplicativo:

```bash
npm install
```

### 10.3. Configurar o banco de dados

1. Abra o MySQL Workbench.
2. Abra `database/brightenergy.sql`.
3. Execute o script.
4. Confira se o banco `brightenergy` e as tabelas foram criados.

### 10.4. Configurar a API

Entre na pasta `api`:

```bash
cd api
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` a partir do modelo:

```bash
copy .env.example .env
```

Configure os dados reais no arquivo `api/.env`:

- Porta do servidor.
- Host do MySQL.
- Usuário e senha do MySQL.
- Nome do banco.
- Chave secreta do JWT.
- Login e senha do administrador.

Inicie a API:

```bash
npm run dev
```

O servidor utiliza a porta 3000 por padrão.

### 10.5. Configurar o aplicativo

Na raiz do aplicativo, crie o arquivo `.env` a partir do modelo:

```bash
copy .env.example .env
```

Para emulador Android, utilize:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000/api
```

Para celular físico, utilize o endereço IPv4 do computador na mesma rede Wi-Fi.

### 10.6. Executar o aplicativo

Abra outro terminal na raiz do aplicativo:

```bash
npx expo start
```

Para iniciar diretamente no Android:

```bash
npx expo start --android
```

## 11. Testes realizados

Foram realizados testes manuais de funcionamento envolvendo:

- Login administrativo.
- Restauração da sessão ao reabrir o aplicativo.
- Encerramento da sessão ao sair da conta.

Também devem ser conferidos os fluxos de cadastro de usuário, cadastro e aprovação de empresas, edição e exclusão, envio e exclusão de mensagens, calculadora e permissões de usuário comum.

## 12. Geração do APK

O projeto utiliza EAS Build para preparar a versão Android.

Antes de gerar o APK:

1. A API precisa estar hospedada em um servidor acessível pela internet.
2. O endereço público da API deve ser configurado em `EXPO_PUBLIC_API_URL`.
3. O projeto precisa estar configurado no EAS.

Com o EAS CLI instalado e a conta autenticada:

```bash
eas build:configure
```

Para gerar um APK de teste:

```bash
eas build --platform android --profile preview
```

O APK poderá ser baixado pelo link apresentado ao final da compilação.

## 13. Versionamento

O projeto utiliza Git e GitHub para controle de versão.

Repositório:

https://github.com/pedrofa07/projeto_aplicativo


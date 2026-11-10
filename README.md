
# BrightEnergy ☀️

Aplicativo mobile desenvolvido para facilitar o acesso a informações sobre energia solar, simular possíveis economias na conta de luz e conectar pessoas a empresas de energia solar de Santa Cruz do Sul - RS.

## 1. Problema identificado

Pessoas interessadas em instalar sistemas de energia solar podem encontrar dificuldades para compreender os benefícios dessa tecnologia, estimar a economia possível e localizar empresas especializadas.

O BrightEnergy busca reunir essas informações em um único aplicativo, facilitando o acesso à informação e o contato entre consumidores e empresas.

## 2. Objetivo

Desenvolver uma aplicação mobile que permita consultar informações sobre energia solar, realizar simulações financeiras e localizar empresas que trabalham com instalação de sistemas fotovoltaicos.

## 3. Público-alvo

- Pessoas interessadas em energia solar.
- Proprietários de residências e estabelecimentos comerciais.
- Consumidores que desejam conhecer alternativas para reduzir os gastos com energia elétrica.
- Pessoas que procuram empresas de instalação de sistemas fotovoltaicos em Santa Cruz do Sul e região.
- Empresas que desejam divulgar seus serviços.

## 4. Justificativa

A energia solar representa uma alternativa de geração de eletricidade a partir de uma fonte renovável.

Entretanto, muitas pessoas ainda possuem dúvidas sobre os custos, a economia possível e a contratação de empresas especializadas.

O BrightEnergy foi desenvolvido para facilitar o acesso a essas informações, oferecendo uma calculadora de estimativas, um catálogo de empresas e canais de contato.

## 5. Requisitos funcionais

- RF01: O aplicativo deve apresentar informações sobre energia solar.
- RF02: O aplicativo deve permitir simulações de economia.
- RF03: O aplicativo deve apresentar empresas aprovadas.
- RF04: O usuário deve poder solicitar o cadastro de uma empresa.
- RF05: O usuário deve poder realizar cadastro e login.
- RF06: O usuário deve poder enviar mensagens pelo formulário de contato.
- RF07: O administrador deve poder visualizar solicitações de empresas.
- RF08: O administrador deve poder aprovar ou rejeitar solicitações.
- RF09: O administrador deve poder editar e excluir empresas.
- RF10: O administrador deve poder visualizar e excluir mensagens.

## 6. Requisitos não funcionais

- RNF01: A aplicação mobile deve utilizar React Native com Expo.
- RNF02: O servidor deve utilizar Node.js e Express.
- RNF03: Os dados devem ser armazenados em banco de dados MySQL.
- RNF04: A autenticação deve utilizar JWT.
- RNF05: As senhas devem ser armazenadas utilizando hash com bcryptjs.
- RNF06: As rotas administrativas devem exigir autenticação e autorização.
- RNF07: A comunicação entre aplicativo e API deve utilizar requisições HTTP.

## 7. Funcionalidades e telas

### Início
Apresenta o projeto e informações sobre energia solar.

### Calculadora
Permite informar o valor da conta de luz, o custo estimado do sistema e o percentual de economia desejado.

### Empresas
Apresenta as empresas que foram aprovadas pelo administrador.

### Contato
Permite enviar mensagens à equipe responsável pelo projeto.

### Cadastro
Permite criar uma conta de usuário.

### Login
Permite autenticar usuários e administradores.

### Cadastro de empresa
Permite solicitar a inclusão de uma empresa no catálogo.

### Administração
Permite gerenciar empresas, solicitações e mensagens.

## 8. Tecnologias utilizadas

### Aplicativo
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

## 9. Estrutura do projeto

```text
projeto_pi/
├── api/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   └── routes/
│   ├── server.js
│   └── package.json
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
├── index.js
├── package.json
└── README.md
```

## 10. Banco de dados

O sistema utiliza MySQL.

O arquivo `database/brightenergy.sql` contém o script para criação do banco de dados e das tabelas.

As tabelas principais são:

- usuarios: armazena os dados dos usuários e seus níveis de acesso.
- empresas: armazena os dados das empresas e suas situações de aprovação.
- mensagens: armazena as mensagens enviadas pelo formulário de contato.

## 11. Autenticação e níveis de acesso

O sistema possui dois níveis de acesso:

**Usuário comum**
- Realizar cadastro e login.
- Consultar empresas aprovadas.
- Solicitar cadastro de empresas.
- Enviar mensagens.

**Administrador**
- Visualizar todas as empresas.
- Aprovar solicitações.
- Editar empresas.
- Excluir empresas.
- Consultar e excluir mensagens.

A autenticação utiliza JSON Web Token (JWT), e as senhas dos usuários são protegidas com bcryptjs.

## 12. Calculadora: metodologia e premissas

A calculadora apresenta estimativas simplificadas, não um orçamento técnico de instalação.

As fórmulas utilizadas são:

**Economia mensal**

Economia mensal = Valor da conta × Percentual de economia / 100

**Tempo de retorno**

Payback = Custo estimado do sistema / Economia mensal

**Economia em cinco anos**

Economia mensal × 60 meses

**Economia em dez anos**

Economia mensal × 120 meses

O percentual inicial de 80% é uma premissa editável para simulação, não uma garantia de economia nem um índice estatístico universal.

A estimativa considera valores constantes durante o período. Não calcula inflação, reajustes tarifários, degradação dos módulos, custos de manutenção, taxas de disponibilidade ou variações de geração.

Para um projeto real, devem ser considerados o consumo, a localização, a irradiação solar, o telhado, o dimensionamento do sistema e as regras aplicáveis à compensação de energia.

### Fontes de consulta

- EPE - Balanço Energético Nacional 2026: https://dashboard.epe.gov.br/apps/livro-ben/livro/pt/capitulo_1.html
- ANEEL - Relatórios e indicadores de geração: https://www.gov.br/aneel/pt-br/centrais-de-conteudos/relatorios-e-indicadores/geracao
- INPE - Atlas Brasileiro de Energia Solar: https://www.gov.br/pt-br/servicos/obter-dados-do-atlas-brasileiro-de-energia-solar-atlas-solar
- EPE - Dashboard de Energia Solar: https://www.epe.gov.br/pt/publicacoes-dados-abertos/publicacoes/dashboard-de-energia-solar-geracao-centralizada-e-distribuida-no-brasil

Como referência estatística nacional, o Balanço Energético Nacional 2026 informa que a geração de eletricidade por fonte solar atingiu 88,1 TWh em 2025, com crescimento de 24,7% em relação a 2024.

Esse dado contextualiza a relevância da energia solar, mas não é utilizado como percentual de economia na calculadora.

## 13. Instalação e execução

### Pré-requisitos

- Node.js e npm.
- MySQL.
- Visual Studio Code.
- Expo.
- Um emulador Android ou dispositivo com Expo Go.

### 13.1. Instalar dependências do aplicativo

Na pasta principal do projeto:

```bash
npm install
```

### 13.2. Configurar o banco de dados

1. Abra o MySQL Workbench.
2. Abra o arquivo `database/brightenergy.sql`.
3. Execute o script.
4. Confira se o banco `brightenergy` e suas três tabelas foram criados.

### 13.3. Configurar a API

Entre na pasta da API:

```bash
cd api
```

Instale as dependências:

```bash
npm install
```

Crie seu arquivo `.env` a partir do modelo:

```bash
copy .env.example .env
```

Edite o arquivo `api/.env` com os dados reais do MySQL e as configurações de autenticação.

Inicie o servidor:

```bash
npm run dev
```

A API estará disponível na porta 3000, caso nenhuma outra porta seja configurada.

### 13.4. Configurar o aplicativo

Na raiz do projeto, crie um `.env` a partir do `.env.example` e configure a URL da API.

Para emulador Android, o endereço padrão é:

```text
http://10.0.2.2:3000/api
```

Para celular físico, utilize o endereço IPv4 do computador na mesma rede Wi-Fi.

### 13.5. Executar o aplicativo

Em outro terminal, na pasta principal:

```bash
npx expo start
```

Para abrir no Android:

```bash
npx expo start --android
```

## 14. Testes recomendados

- Testar cadastro de usuário.
- Testar login de usuário.
- Testar login administrativo.
- Testar acesso às rotas protegidas.
- Testar cadastro de empresa com CNPJ válido e inválido.
- Testar aprovação de empresas.
- Testar edição e exclusão de empresas.
- Testar envio e exclusão de mensagens.
- Testar comunicação com MySQL.
- Testar a aplicação em emulador e celular físico.

## 15. Versionamento

O projeto utiliza Git e GitHub para controle de versão.

Repositório:

https://github.com/pedrofa07/Aplicativo_pi
```

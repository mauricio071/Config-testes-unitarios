<div align="center"> <h1>Configuração de Ambiente para Testes Unitários</h1> </div>

Este guia detalha os passos para configurar um ambiente de testes unitários em um projeto React utilizando **Vite**, **Jest** e **React Testing Library**.

## 🛠 Tecnologias utilizadas

- **React.js** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Ferramenta de build rápida para desenvolvimento front-end
- **JavaScript** - Linguagem de programação para desenvolvimento web
- **TypeScript** - Extensão do JavaScript que adiciona tipos estáticos para maior segurança
- **Jest** - Framework de testes unitários.
- **React Testing Library** - Biblioteca para testes de componentes React, focada em usabilidade.
- **Babel** - Compilador para usar ES6+ e JSX no ambiente de testes.

## ⚙️ Configuração passo a passo:

## 1. Instalações Necessárias

Execute os comandos abaixo para instalar as dependências necessárias. **Caso esteja utilizando `yarn`**, substitua `npm install` por `yarn add`.

#### Instalar o Jest:

```bash
npm install -D jest jest-environment-jsdom
```

#### Instalar o React Testing Library:

```bash
npm install -D @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

#### Instalar o Babel (para suporte a ES6+ e JSX):

```bash
npm install -D @babel/core @babel/preset-env @babel/preset-react babel-jest
```

#### TypeScript (se o projeto utilizar):

```bash
npm install -D @types/jest @types/react @types/react-dom @babel/preset-typescript ts-node
```

### Mock para estilos e arquivos estáticos:

```bash
npm install -D identity-obj-proxy
```

---

## 2. Configurando o Arquivo de Setup

Crie um arquivo chamado `setup.ts` (ou `.js`) (localização recomendada: `/src/test`) e adicione o seguinte código para configurar o Jest com a React Testing Library:

```javascript
import "@testing-library/jest-dom";
```

---

## 3. Configuração do Jest

### A. Gerar o arquivo de configuração com o comando:

```bash
npx jest --init
```

Ou crie manualmente o arquivo `jest.config.ts` (ou `.js`) na raiz do projeto e adicione a seguinte configuração:

```javascript
export default {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"], // Caminho do arquivo de setup
  collectCoverageFrom: ["<rootDir>/src/**/*.{js,ts,jsx,tsx}"],
  moduleNameMapper: {
    ".(gif|ttf|eot|svg|png)$": "<rootDir>/src/test/mocks/fileMock.ts",
    ".(css|less|sass|scss)$": "identity-obj-proxy",
  },
};
```

### B. Alternativa: Configuração no `package.json`

Adicione o seguinte bloco ao `package.json`:

```json
"jest": {
  "testEnvironment": "jest-environment-jsdom",
  "setupFilesAfterEnv": ["<rootDir>/src/test/setup.ts"], // Caminho do arquivo de setup
  "collectCoverageFrom": ["<rootDir>/src/**/*.{js,ts,jsx,tsx}"],
  "moduleNameMapper": {
    "\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/test/mocks/fileMock.ts",
    "\.(css|less|sass|scss)$": "identity-obj-proxy"
  }
}
```

---

## 4. Configuração do Babel

Crie o arquivo `babel.config.js` ou `babel.config.json` na raiz do projeto:

### Usando `babel.config.js`:

```javascript
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { esmodules: true } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
};
```

### Usando `babel.config.json`:

```json
{
  "presets": [
    ["@babel/preset-env", { "targets": { "esmodules": true } }],
    ["@babel/preset-react", { "runtime": "automatic" }],
    "@babel/preset-typescript"
  ]
}
```

> **Nota**: Se precisar de lógica personalizada, prefira o formato `babel.config.js` (em vez de `babel.config.json`).

---

## 5. Mock para Arquivos Estáticos

Crie uma pasta chamada `mocks` dentro da pasta `/test` e adicione o arquivo `fileMock.ts` (ou `.js`) com o seguinte conteúdo:

```javascript
module.exports = "test-file-stub";
```

## 6. Configurações no `package.json`

Certifique-se de ajustar o arquivo `package.json` para evitar conflitos e facilitar a execução dos testes.

1. **Remova a propriedade `type: "module"`** (caso exista), pois ela pode causar conflitos com o Jest.

2. **Adicione o script para executar os testes**. Inclua a seguinte linha na seção `scripts`:

```json
"scripts": {
    "test": "jest"
}
```

Execute os testes com o comando:

```bash
npm run test
```

ou

```bash
yarn test
```

## 🧐 Caso queira que o Jest observe os arquivos do seu projeto

Você pode configurar o Jest para executar os testes automaticamente sempre que houver mudanças no código-fonte. Para isso, basta adicionar o seguinte comando ao seu script de testes no `package.json`:

```json
"scripts": {
    "test": "jest --watchAll"
}
```

Com essa configuração, o Jest ficará "observando" todas as alterações no projeto e executará os testes novamente assim que uma mudança for detectada.

### Ativar a cobertura de testes durante a observação:

Para ver relatórios de cobertura enquanto os testes estão sendo executados em modo de observação, você pode adicionar o parâmetro `--coverage`:

```bash
npm run test --watchAll --coverage
```

Isso fará com que o Jest gere um relatório de cobertura no terminal sempre que os testes forem executados, fornecendo informações sobre a eficácia da cobertura do código à medida que você faz alterações no projeto.

---

## Exemplo Básico de Teste

Aqui está um exemplo simples de como escrever um teste utilizando o React Testing Library:

No arquivo `App.spec.tsx`:

```javascript
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("Renderiza o título da aplicação", () => {
    render(<App />);
    const titleElement = screen.getByText(/Minha Aplicação/i);
    expect(titleElement).toBeInTheDocument();
  });
});
```

> Após o primeiro uso, esses métodos estarão disponíveis automaticamente para importação nos outros arquivos de teste.

---

Agora você tem um ambiente de testes unitários totalmente configurado para React com suporte a TypeScript, estilos e arquivos estáticos. 🎉

## ⚙️ Configuração do MSW (Mock Service Worker)

O **MSW** é usado para interceptar chamadas de API e retornar dados simulados. Seguem os passos para configurar corretamente no seu projeto.

## 1 - Instalar o msw

Execute o comando abaixo para instalar o MSW:

```bash
npm install msw@latest --save-dev
```
---

## 2 - Instalar o jest-fixed-jsdom

O **Jest-Fixed-JSDOM** corrige problemas relacionados ao ambiente de execução no Jest. Instale-o com o comando:

```bash
npm install jest-fixed-jsdom
```
---

## 3 - Atualizar a Configuração do Jest

No arquivo `jest.config.ts` (ou `.js`), substitua a propriedade `testEnvironment` para utilizar o `jest-fixed-jsdom`:

```javascript
export default {
  testEnvironment: "jest-fixed-jsdom",
};
```
---

## 4 - Criar o Servidor MSW

Crie uma pasta chamada `mocks` dentro da pasta `src` e adicione um arquivo `server.ts` com o seguinte conteúdo:

```javascript
import { handlers } from "./handler";
import { setupServer } from "msw/node";

export const server = setupServer(...handlers);
```
---

## 5 - Configurar os Handlers

Na mesma pasta `mocks`, crie um arquivo chamado `handler.ts` para interceptar e mockar as respostas de APIs. 

Exemplo de configuração:

```javascript
import { http, HttpResponse } from "msw";

export const handlers = [
  // Colcoar a api que queira interceptar
  http.get("https://dummyjson.com/todos", () => {
    return HttpResponse.json(
      {
        todos: [
          {
            id: 1,
            todo: "todo",
            completed: false,
            userId: 1,
          },
          {
            id: 2,
            todo: "todo2",
            completed: false,
            userId: 2,
          },
          {
            id: 3,
            todo: "todo2",
            completed: false,
            userId: 2,
          },
        ],
      },
      {
        status: 200,
      }
    );
  }),
];

```
---

## 6. Atualizar o Arquivo `setup.ts`

No arquivo `setup.ts` (configurado inicialmente para a React Testing Library), adicione o suporte ao MSW com o seguinte código:

```javascript
import "@testing-library/jest-dom";
import { server } from "../mocks/server";

// configurção para msw
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
```
Agora seu ambiente de testes está configurado para interceptar chamadas de API e mockar dados utilizando o MSW. 🎉

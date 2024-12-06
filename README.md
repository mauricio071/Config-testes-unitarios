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

---

## Exemplo Básico de Teste

Um exemplo simples de como escrever um teste utilizando o React Testing Library:

```javascript
import { render, screen } from "@testing-library/react";
import App from "../App";

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

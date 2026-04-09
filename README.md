# To-Do List

Aplicação web para gerenciamento de tarefas do dia a dia, desenvolvida como parte do meu portfólio em DevOps. Este projeto serve como base para práticas de containerização, CI/CD e automação.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue)](https://github.com/R-TENORIO/todo-list/actions)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)

---

## Funcionalidades

- Adicionar nova tarefa
- Marcar tarefa como concluída
- Remover tarefa
- Layout responsivo
- Persistência local com localStorage

## Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla)
- Docker (nginx:alpine)
- GitHub Actions (CI/CD)

---

## Como rodar localmente

```bash
git clone https://github.com/R-TENORIO/todo-list.git
cd todo-list
```

Basta abrir o arquivo `index.html` no seu navegador.

## Rodar com Docker

```bash
# Construir a imagem
docker build -t todo-list .

# Executar o container
docker run -d -p 8080:80 todo-list
```

Acesse em: http://localhost:8080

## Pipeline CI/CD

O projeto possui um pipeline automatizado com GitHub Actions que:

1. **Validação de código** - Verifica a existência dos arquivos HTML, CSS e JavaScript
2. **Build do Docker** - Constrói a imagem Docker automaticamente em cada push

O workflow é acionado automaticamente em:
- Push para a branch `main`
- Pull requests para a branch `main`

---

## Estrutura do Projeto

```
todo-list/
├── .github/
│   └── workflows/
│       └── ci.yml          # Pipeline CI/CD
├── index.html              # Estrutura HTML
├── styles.css              # Estilos CSS
├── script.js               # Lógica JavaScript
├── Dockerfile              # Configuração Docker
├── LICENSE                 # Licença MIT
└── README.md               # Documentação
```

## Próximos passos

- [x] Containerizar com Docker
- [x] Pipeline CI/CD com GitHub Actions
- [x] Adicionar testes automatizados
- [x] Deploy automatizado para GitHub Pages
<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rodrigo-tenorio/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/R-TENORIO)

</div>

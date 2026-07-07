VoteLive — Real-Time Voting Dashboard
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-3b82f6)
![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F)
![React](https://img.shields.io/badge/React-TypeScript-61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-database-336791)
![WebSocket](https://img.shields.io/badge/WebSocket-real--time-7c3aed)
📌 Sobre o projeto
VoteLive é uma aplicação Full Stack de votação em tempo real, desenvolvida com Java + Spring Boot, PostgreSQL, React + TypeScript e WebSocket/STOMP.
O sistema permite criar usuários, cadastrar enquetes com múltiplas opções, votar em enquetes abertas, visualizar resultados com gráficos interativos e acompanhar atualizações em tempo real no dashboard e na tela de resultado individual.
O projeto foi desenvolvido com foco em arquitetura, boas práticas, experiência visual moderna e funcionalidades reais de um produto SaaS.
---
🚀 Funcionalidades
Usuários
Cadastro de usuários
Listagem de usuários cadastrados
Seleção de usuário ao criar enquete
Seleção de usuário ao votar
Enquetes
Criação de enquetes pelo frontend
Adição dinâmica de opções de voto
Listagem de enquetes
Status de enquete:
`ABERTA`
`ENCERRADA`
`CANCELADA`
Encerramento manual de enquetes
Bloqueio de votos em enquetes encerradas
Votação
Registro de votos por usuário
Validação para impedir voto duplicado na mesma enquete
Validação para impedir voto em opção inválida
Validação para impedir voto em enquete encerrada
Atualização automática dos resultados após cada voto
Dashboard
Cards com resumo geral
Total de usuários
Total de enquetes
Total de votos
Enquetes abertas
Enquetes encerradas
Gráfico de status das enquetes
Ranking global das opções mais votadas
Atualização manual e automática
Tempo real
Comunicação em tempo real com WebSocket/STOMP
Resultado individual da enquete atualiza automaticamente
Dashboard principal atualiza automaticamente
Indicador visual de conexão em tempo real
---
🧱 Tecnologias utilizadas
Backend
Java 21
Spring Boot 3
Spring Web
Spring Data JPA
Spring Validation
Spring WebSocket
PostgreSQL
Hibernate
Maven
Frontend
React
TypeScript
Vite
Axios
React Router DOM
Recharts
STOMP.js
SockJS Client
CSS modularizado
Banco de dados
PostgreSQL
---
🖥️ Screenshots
> Adicione aqui os prints do projeto.
```text
screenshots/
├── dashboard.png
├── enquetes.png
├── criar-enquete.png
├── resultado.png
├── votar.png
└── usuarios.png
```
Exemplo em Markdown:
```md
![Dashboard](./screenshots/dashboard.png)
```
---
📁 Estrutura do projeto
```text
votelive/
├── votelive-api/       # Backend Spring Boot
└── votelive-web/       # Frontend React + TypeScript
```
Backend
```text
votelive-api/
├── src/main/java/com/brunno/votelive/
│   ├── config/
│   ├── controller/
│   ├── dto/
│   ├── entity/
│   ├── exception/
│   ├── repository/
│   └── service/
└── pom.xml
```
Frontend
```text
votelive-web/
├── src/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── types/
│   ├── App.css
│   ├── App.tsx
│   └── main.tsx
└── package.json
```
---
🗄️ Modelo de dados
Usuário
```text
usuarios
- id
- nome
- email
- data_criacao
```
Enquete
```text
enquetes
- id
- titulo
- pergunta
- status
- data_criacao
- data_encerramento
- usuario_id
```
Opção de voto
```text
opcoes_voto
- id
- texto
- quantidade_votos
- enquete_id
```
Voto
```text
votos
- id
- usuario_id
- enquete_id
- opcao_id
- data_voto
```
---
🔌 Principais endpoints da API
Usuários
```http
POST /api/usuarios
GET /api/usuarios
GET /api/usuarios/{id}
```
Enquetes
```http
POST /api/enquetes
GET /api/enquetes
GET /api/enquetes/{id}
PATCH /api/enquetes/{id}/encerrar
GET /api/enquetes/{id}/resultado
```
Votos
```http
POST /api/enquetes/{enqueteId}/votos
```
Exemplo de payload:
```json
{
  "usuarioId": 1,
  "opcaoId": 2
}
```
Dashboard
```http
GET /api/dashboard/resumo
GET /api/dashboard/status-enquetes
GET /api/dashboard/ranking-opcoes
```
WebSocket
```text
/ws
```
Canais utilizados:
```text
/topic/enquetes/{id}/resultado
/topic/dashboard/atualizar
```
---
⚙️ Como executar localmente
Pré-requisitos
Antes de começar, tenha instalado:
Java 21
Node.js
PostgreSQL
IntelliJ IDEA ou outra IDE
Git
---
Backend — Spring Boot
Entre na pasta do backend:
```bash
cd votelive-api
```
Configure o arquivo:
```text
src/main/resources/application.properties
```
Exemplo local:
```properties
spring.application.name=votelive-api

spring.datasource.url=jdbc:postgresql://localhost:5432/votelive_db
spring.datasource.username=postgres
spring.datasource.password=SUA_SENHA

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```
Execute o backend:
```bash
./mvnw spring-boot:run
```
No Windows:
```bash
./mvnw.cmd spring-boot:run
```
A API ficará disponível em:
```text
http://localhost:8080
```
---
Frontend — React
Entre na pasta do frontend:
```bash
cd votelive-web
```
Instale as dependências:
```bash
npm install
```
Execute o frontend:
```bash
npm run dev
```
O frontend ficará disponível em:
```text
http://localhost:5173
```
---
🌐 Configuração de CORS
Durante o desenvolvimento local, o backend libera requisições do frontend em:
```text
http://localhost:5173
```
A configuração fica em:
```text
votelive-api/src/main/java/com/brunno/votelive/config/CorsConfig.java
```
---
🔄 Funcionamento do tempo real
O fluxo em tempo real funciona assim:
```text
Usuário registra voto
↓
Backend salva voto no PostgreSQL
↓
Backend recalcula resultado da enquete
↓
Backend publica evento WebSocket
↓
Frontend recebe evento
↓
Gráficos e cards são atualizados automaticamente
```
---
📌 Regras de negócio implementadas
Usuário não pode votar duas vezes na mesma enquete
Usuário só pode votar em enquete aberta
Opção escolhida precisa pertencer à enquete
Enquete encerrada não aceita votos
Resultado calcula total de votos, percentual e vencedor
Dashboard atualiza dados em tempo real após novo voto
---
🧪 Exemplos de teste
Criar usuário:
```bash
curl -X POST http://localhost:8080/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"Brunno","email":"brunno@email.com"}'
```
Criar enquete:
```bash
curl -X POST http://localhost:8080/api/enquetes \
  -H "Content-Type: application/json" \
  -d '{
    "titulo":"Linguagem preferida",
    "pergunta":"Qual linguagem você escolheria?",
    "usuarioId":1,
    "opcoes":["Java","Python","JavaScript","C#"]
  }'
```
Votar:
```bash
curl -X POST http://localhost:8080/api/enquetes/1/votos \
  -H "Content-Type: application/json" \
  -d '{"usuarioId":1,"opcaoId":1}'
```
---
🚧 Melhorias futuras
Agendamento automático para encerramento de enquetes
Autenticação e login de usuários
Controle de permissões
Testes automatizados no backend
Testes no frontend
Docker Compose com backend, frontend e PostgreSQL
Deploy em ambiente cloud
Tema claro/escuro alternável
Paginação e filtros de enquetes
Documentação Swagger/OpenAPI
---
💼 Destaque para portfólio
Este projeto demonstra conhecimentos em:
Desenvolvimento Full Stack
APIs REST com Spring Boot
Integração com PostgreSQL
Relacionamentos JPA/Hibernate
Validações de regras de negócio
React com TypeScript
Componentização de interface
Gráficos interativos
WebSocket/STOMP em tempo real
Organização de CSS modularizado
Boas práticas de arquitetura
---
👨‍💻 Autor
Desenvolvido por Brunno Xavier de Oliveira.
> Projeto criado como aplicação Full Stack para portfólio, estudos e demonstração prática de integração entre backend, frontend, banco de dados e comunicação em tempo real.

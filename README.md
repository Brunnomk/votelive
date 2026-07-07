# MesaLivre — Sistema de Reservas para Restaurantes

https://img.shields.io/badge/status-em%20desenvolvimento-blue?style=for-the-badge
https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white
https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white
https://img.shields.io/badge/Angular-17%2B-DD0031?style=for-the-badge&logo=angular&logoColor=white
https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
https://img.shields.io/badge/API-REST-7B42BC?style=for-the-badge
https://img.shields.io/badge/Layout-Responsivo-00C853?style=for-the-badge

Sistema full stack para gerenciamento de reservas em restaurantes, desenvolvido com foco em controle de mesas, clientes, horários, disponibilidade em tempo real e prevenção de conflitos de reserva.

O projeto permite cadastrar restaurantes, mesas, clientes e reservas, além de acompanhar dados pela dashboard e consultar a disponibilidade das mesas de forma prática e organizada.

---

## Tecnologias Utilizadas

### Frontend

- Angular
- Angular Standalone Components
- TypeScript
- SCSS
- HTML5
- Consumo de API REST
- Design responsivo

### Backend

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Maven Wrapper
- API REST
- Validações de regras de negócio

### Banco de Dados

- PostgreSQL
- Modelo relacional
- Persistência real dos dados
- Relacionamentos entre restaurantes, mesas, clientes e reservas

### Ferramentas e Conceitos

- Git
- GitHub
- Arquitetura REST
- Operações CRUD
- Integração frontend/backend
- Organização em camadas
- Responsividade
- Regras de negócio
- Projeto full stack

---

## Sobre o Projeto

O **MesaLivre** é um sistema de reservas para restaurantes desenvolvido para substituir controles manuais de agendamento por uma solução digital mais organizada, prática e eficiente.

A aplicação permite que restaurantes gerenciem mesas, clientes, reservas e disponibilidade em tempo real, evitando conflitos de horários e facilitando o acompanhamento das reservas cadastradas.

O sistema possui frontend em Angular, backend em Spring Boot e banco de dados PostgreSQL, com comunicação realizada através de uma API REST.

---

## Funcionalidades

### Dashboard

A dashboard apresenta uma visão geral do sistema com dados reais vindos do backend.

Funcionalidades disponíveis:

- Total de restaurantes cadastrados
- Total de mesas cadastradas
- Total de clientes cadastrados
- Total de reservas registradas
- Listagem de reservas recentes
- Resumo de disponibilidade
- Cards informativos com dados atualizados
- Interface adaptada para desktop, tablet e celular

---

### Gestão de Restaurantes

Permite cadastrar e listar restaurantes no sistema.

Funcionalidades:

- Cadastro de restaurantes
- Listagem de restaurantes
- Integração com banco de dados
- Associação de restaurantes com mesas
- Estrutura preparada para futuras expansões

Dados principais:

- Nome
- Endereço
- Telefone

---

### Gestão de Mesas

Permite cadastrar mesas ou salas associadas a um restaurante.

Funcionalidades:

- Cadastro de mesas
- Listagem de mesas
- Associação da mesa a um restaurante
- Definição de capacidade máxima
- Definição do tipo: mesa ou sala
- Controle de status ativo/inativo

Dados principais:

- Restaurante
- Número da mesa
- Capacidade
- Tipo
- Status

---

### Gestão de Clientes

Permite gerenciar clientes cadastrados no sistema.

Funcionalidades:

- Cadastro de clientes
- Listagem de clientes
- Exclusão de clientes
- Integração real com backend
- Persistência dos dados no PostgreSQL

Dados principais:

- Nome
- Telefone
- E-mail

---

### Gestão de Reservas

Funcionalidade principal do sistema, responsável por registrar e acompanhar reservas.

Funcionalidades:

- Criação de reservas
- Listagem de reservas
- Associação entre cliente, mesa e restaurante
- Controle de data e horário
- Controle de quantidade de pessoas
- Controle de status da reserva
- Validação para evitar conflitos de horário
- Conversão e exibição amigável de status no frontend
- Integração real entre frontend, backend e banco de dados

Dados principais:

- Cliente
- Mesa
- Data da reserva
- Hora de início
- Hora de fim
- Quantidade de pessoas
- Status
- Observações

---

### Disponibilidade em Tempo Real

O sistema calcula a disponibilidade das mesas com base nas reservas existentes.

Funcionalidades:

- Consulta de disponibilidade por restaurante
- Filtro por data
- Filtro por horário inicial
- Filtro por horário final
- Identificação de mesas disponíveis
- Identificação de mesas ocupadas
- Prevenção de reservas sobrepostas

Exemplo:

Uma mesa reservada das `19:00` às `21:00` não poderá receber outra reserva no mesmo intervalo ou em horário sobreposto.

---

### Status das Reservas

O sistema possui controle de status para acompanhar o ciclo de vida de uma reserva.

Status disponíveis:

- `AGENDADA`
- `CONFIRMADA`
- `CANCELADA`
- `FINALIZADA`
- `NO_SHOW`

Fluxo esperado:

1. Cliente realiza uma reserva
2. Reserva é criada como agendada
3. Restaurante confirma a reserva
4. Cliente comparece ao restaurante
5. Reserva é finalizada
6. Caso o cliente não compareça, a reserva pode ser marcada como no-show

---

### Histórico de Reservas

O sistema possui estrutura preparada para registrar alterações realizadas nas reservas.

Informações previstas:

- Reserva alterada
- Ação realizada
- Status anterior
- Novo status
- Observação
- Data da alteração
- Usuário responsável

Essa funcionalidade é importante para auditoria, rastreabilidade e controle operacional.

---

## Regras de Negócio

O sistema foi desenvolvido considerando regras essenciais para o funcionamento real de restaurantes.

Principais regras:

- Um restaurante pode possuir várias mesas ou salas
- Cada mesa ou sala possui uma capacidade máxima
- Um cliente pode fazer uma reserva para uma data e horário específicos
- Uma mesa não pode ter duas reservas no mesmo intervalo de horário
- Não é possível criar reserva em horário já ocupado
- A reserva possui controle de status
- O restaurante pode confirmar, cancelar ou finalizar uma reserva
- A disponibilidade das mesas é calculada em tempo real
- É possível visualizar próximas reservas e histórico
- As operações principais são persistidas no banco de dados

---

## Modelo de Dados

O projeto utiliza um modelo relacional com entidades bem definidas.

### Restaurantes

Representa os restaurantes cadastrados no sistema.

Campos principais:

- `id`
- `nome`
- `endereco`
- `telefone`

---

### Mesas

Representa mesas ou salas disponíveis em um restaurante.

Campos principais:

- `id`
- `restaurante_id`
- `numero`
- `capacidade`
- `tipo`
- `ativo`

---

### Clientes

Representa os clientes que realizam reservas.

Campos principais:

- `id`
- `nome`
- `telefone`
- `email`

---

### Reservas

Representa as reservas feitas pelos clientes.

Campos principais:

- `id`
- `cliente_id`
- `mesa_id`
- `data_reserva`
- `hora_inicio`
- `hora_fim`
- `pessoas`
- `status`
- `observacao`
- `criado_em`

---

### Histórico de Reservas

Representa o histórico de alterações feitas nas reservas.

Campos principais:

- `id`
- `reserva_id`
- `acao`
- `status_anterior`
- `status_novo`
- `observacao`
- `criado_em`
- `usuario_id`

---

### Usuários

Representa usuários administrativos do sistema.

Campos principais:

- `id`
- `nome`
- `email`
- `senha_hash`
- `perfil`

Perfis previstos:

- `ADMIN`
- `ATENDENTE`

---

## API REST

O backend expõe endpoints REST para integração com o frontend.

### Restaurantes

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `POST` | `/restaurantes` | Criar restaurante |
| `GET` | `/restaurantes` | Listar restaurantes |
| `GET` | `/restaurantes/{restauranteId}/mesas` | Listar mesas de um restaurante |

---

### Mesas

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `POST` | `/mesas` | Cadastrar mesa ou sala |
| `GET` | `/mesas` | Listar mesas |

---

### Clientes

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `POST` | `/clientes` | Cadastrar cliente |
| `GET` | `/clientes` | Listar clientes |
| `DELETE` | `/clientes/{clienteId}` | Excluir cliente |

---

### Reservas

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `POST` | `/reservas` | Criar reserva |
| `GET` | `/reservas` | Listar reservas com filtros |
| `GET` | `/reservas/{reservaId}` | Detalhar reserva |
| `PATCH` | `/reservas/{reservaId}/confirmar` | Confirmar reserva |
| `PATCH` | `/reservas/{reservaId}/cancelar` | Cancelar reserva |
| `PATCH` | `/reservas/{reservaId}/finalizar` | Finalizar reserva |

---

### Disponibilidade

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/restaurantes/{restauranteId}/disponibilidade` | Consultar disponibilidade das mesas |

Exemplo de consulta:

```http
GET /restaurantes/1/disponibilidade?data=2026-06-12&inicio=19:00&fim=21:00
```

---

## Exemplo de Payload

### Criar reserva

```json
{
  "clienteId": 1,
  "mesaId": 12,
  "data": "2026-06-12",
  "horaInicio": "19:30",
  "horaFim": "21:30",
  "pessoas": 4
}
```

---

## Arquitetura do Projeto

O projeto segue uma arquitetura full stack separada entre frontend e backend.

```text
MesaLivre
├── frontend
│   ├── src
│   ├── app
│   ├── components
│   ├── pages
│   ├── services
│   └── styles
│
├── backend
│   ├── src
│   ├── main
│   ├── java
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   └── dto
│
└── database
    └── PostgreSQL
```

---

## Responsividade

A interface foi ajustada para funcionar corretamente em diferentes tamanhos de tela.

Dispositivos suportados:

- Desktop
- Notebook
- Tablet
- Smartphone

Recursos responsivos:

- Menu lateral em telas grandes
- Menu mobile em telas menores
- Cards adaptáveis
- Tabelas e listas responsivas
- Melhor experiência em dispositivos móveis

---

## Como Executar o Projeto

### Pré-requisitos

Antes de iniciar, é necessário ter instalado:

- Java 21
- Node.js
- Angular CLI
- PostgreSQL
- Git

---

### Executando o Backend

Acesse a pasta do backend:

```bash
cd backend
```

Execute o projeto com Maven Wrapper:

```bash
./mvnw spring-boot:run
```

No Windows:

```bash
mvnw.cmd spring-boot:run
```

A API ficará disponível em:

```text
http://localhost:8080
```

---

### Configuração do Banco de Dados

Crie um banco PostgreSQL para o projeto.

```sql
CREATE DATABASE mesalivre;
```

Configure o arquivo `application.properties` ou `application.yml` com os dados do banco:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/mesalivre
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

### Executando o Frontend

Acesse a pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
ng serve
```

A aplicação ficará disponível em:

```text
http://localhost:4200
```

---

## Fluxo de Uso

1. Cadastrar restaurante
2. Cadastrar mesas ou salas
3. Cadastrar clientes
4. Criar uma reserva
5. Consultar disponibilidade
6. Confirmar reserva
7. Finalizar ou cancelar reserva
8. Acompanhar dados pela dashboard

---

## Diferenciais do Projeto

- Projeto full stack completo
- Integração real entre frontend, backend e banco de dados
- API REST estruturada
- Regras de negócio aplicadas
- Controle de conflitos de reserva
- Dashboard com dados reais
- Interface moderna e responsiva
- Organização em camadas
- Código preparado para evolução
- Projeto com potencial de uso real
- Excelente para portfólio profissional
- Separação clara entre frontend e backend
- Uso de banco de dados relacional
- Estrutura preparada para autenticação e controle de usuários
- Fluxo de reserva próximo de um cenário real de restaurante

---

## Status do Projeto

Projeto em desenvolvimento/evolução.

Funcionalidades já implementadas:

- Backend integrado ao PostgreSQL
- Listagem e cadastro de restaurantes
- Listagem e cadastro de mesas
- Listagem, cadastro e exclusão de clientes
- Listagem e criação de reservas
- Dashboard com dados reais
- Responsividade em desktop, tablet e celular
- Menu mobile funcional
- Integração entre frontend Angular e backend Spring Boot

---

## Melhorias Futuras

Funcionalidades planejadas para evolução do sistema:

- Autenticação com login real
- Controle de permissões por perfil
- Modo demonstração com dados fictícios
- Envio de notificações por e-mail
- Envio de lembretes por WhatsApp
- Política de cancelamento configurável
- Avaliação de atendimento
- Relatórios avançados
- Cupons e promoções
- Integração com pedidos
- Integração com comandas
- Deploy em ambiente cloud
- Página pública para clientes realizarem reservas
- Filtros avançados por restaurante, data, status e cliente
- Melhoria na validação de horários disponíveis
- Histórico completo de ações realizadas pelos usuários
- Painel administrativo com permissões por tipo de usuário

---

## Autor

Desenvolvido por **Brunno Xavier de Oliveira**

GitHub: https://github.com/Brunnomk

LinkedIn: adicione aqui o link do seu perfil

---

## Licença

Este projeto está sob a licença MIT.

Sinta-se livre para utilizar, estudar e adaptar este projeto.

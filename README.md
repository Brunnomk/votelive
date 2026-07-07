# MesaLivre — Sistema de Reservas para Restaurantes

https://img.shields.io/badge/status-em%20desenvolvimento-blue?style=for-the-badge
https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white
https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white
https://img.shields.io/badge/Angular-17%2B-DD0031?style=for-the-badge&logo=angular&logoColor=white
https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
https://img.shields.io/badge/API-REST-7B42BC?style=for-the-badge
https://img.shields.io/badge/Layout-Responsivo-00C853?style=for-the-badge

Sistema full stack para gerenciamento de reservas em restaurantes, com controle de mesas, clientes, horários, disponibilidade em tempo real e prevenção de conflitos.

---

## Sobre o Projeto

O **MesaLivre** é um sistema de reservas para restaurantes desenvolvido com foco em organização, praticidade e controle operacional.

A aplicação permite gerenciar restaurantes, mesas, clientes e reservas através de uma interface moderna, responsiva e integrada a uma API REST com persistência em banco de dados PostgreSQL.

O objetivo do projeto é substituir controles manuais de reservas por uma solução digital capaz de evitar conflitos de horários, organizar mesas disponíveis e acompanhar o fluxo de reservas de forma clara e eficiente.

---

## Funcionalidades

### Dashboard

A dashboard apresenta uma visão geral do sistema com dados reais vindos do backend.

- Total de restaurantes cadastrados
- Total de mesas cadastradas
- Total de clientes cadastrados
- Total de reservas registradas
- Listagem de reservas recentes
- Resumo de disponibilidade
- Cards informativos com dados atualizados
- Interface responsiva para desktop, tablet e celular

---

### Gestão de Restaurantes

Permite cadastrar e listar restaurantes no sistema.

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

- Criação de reservas
- Listagem de reservas
- Associação entre cliente, mesa e restaurante
- Controle de data e horário
- Controle de quantidade de pessoas
- Controle de status da reserva
- Validação para evitar conflitos de horário
- Conversão e exibição amigável de status no frontend

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

O sistema calcula a disponibilidade das mesas com base nas reservas já existentes.

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

O sistema possui controle de status para acompanhar o ciclo de vida da reserva.

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

O sistema possui estrutura preparada para registrar alterações feitas nas reservas.

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

- Um restaurante pode possuir várias mesas ou salas
- Cada mesa ou sala possui uma capacidade máxima
- Um cliente pode fazer uma reserva para uma data e horário específicos
- Uma mesa não pode ter duas reservas no mesmo intervalo de horário
- Não é possível criar reserva em horário já ocupado
- A reserva possui controle de status
- O cliente pode cancelar uma reserva dentro das regras definidas
- O restaurante pode confirmar, cancelar ou finalizar uma reserva
- A disponibilidade é calculada em tempo real
- É possível visualizar próximas reservas e histórico

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

Representa o histórico de alterações realizadas nas reservas.

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

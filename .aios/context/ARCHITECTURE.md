Client
  │
  ▼
React Frontend
  │
  │ HTTP
  ▼
Spring Boot REST API
  │
  ├── Controller
  │
  ▼
Service
  │
  ▼
Repository
  │
  ▼
PostgreSQL

# Backend boundaries

Controller:
- HTTP request/response
- Request validation
- Delegates business logic

Service:
- Business logic
- Transactions
- Coordinates repositories

Repository:
- Database access only

Entity:
- Persistence representation

DTO:
- API input/output
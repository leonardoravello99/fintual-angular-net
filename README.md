# 📊 Fintual Variaciones Mensuales
Aplicación web desarrollada con **Angular 16** y **C# .NET** que consume la API pública de Fintual para calcular y visualizar la variación mensual de fondos de inversión.
---

## 🚀 Funcionalidades

- Consumo de la API pública de Fintual
- Cálculo de variación mensual (%)
- Gráfico interactivo con Chart.js
- Filtro por:
  - Tipo de fondo
  - Rango de fechas
- Manejo de errores cuando no existen datos históricos

---
## 🛠️ Tecnologías usadas
### Backend
- .NET 8
- ASP.NET Core Web API
- HttpClient
- Swagger

### Frontend
- Angular 16
- Chart.js
- TypeScript
- HTML / CSS

---
## 📂 Estructura del proyecto
ProjectFintual/
│
├── Fintual/ # Backend (.NET)
│ ├── Controllers/
│ ├── Services/
│ ├── Models/
│ └── Program.cs
│
├── fintual-frontend/ # Frontend (Angular)
│ ├── src/
│ ├── angular.json
│ └── package.json
│
└── README.md

---
## 🚀 Cómo ejecutar el proyecto
### 1️⃣ Backend (.NET)
#### Requisitos:
- .NET SDK 6 o superior
- Visual Studio / VS Code

#### Pasos:
```bash
cd Fintual
dotnet restore
dotnet run

La API se ejecutara en:
https://localhost:7144

Swagger disponible en:

https://localhost:7144/swagger

### 2️⃣ Frontend (Angular)
Requisitos:

Node.js (v18 recomendado)

Angular CLI

Pasos para instalar:

cd fintual-frontend
npm install
ng serve

La aplicación estará disponible en:
http://localhost:4200

📊 Funcionalidades principales

✔ Consulta de variaciones mensuales
✔ Cálculo automático del porcentaje de variación
✔ Visualización en tabla
✔ Visualización en gráfico de líneas
✔ Filtro por rango de fechas
✔ Filtro por tipo de fondo

📈 Ejemplo de respuesta de la API
[
  {
    "anio": 2023,
    "mes": 1,
    "varacionInicial": 1149.36,
    "variacionFinals": 1160.57,
    "variacionPorcentaje": 0.97
  }
]

🔐 Consideraciones técnicas

El backend valida la estructura de la respuesta externa antes de procesarla

Manejo de errores mediante try-catch

Separación de responsabilidades (Controller / Service)

Comunicación frontend-backend vía HTTP

👨‍💻 Autor

Leonardo Ravello
Proyecto desarrollado como prueba técnica y ejercicio académico.

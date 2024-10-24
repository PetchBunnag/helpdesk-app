
# Helpdesk Support Ticket Management Application

This is a helpdesk ticket management application that provides a backend service for managing support tickets and a frontend for interacting with the system. The project follows a RESTful API design for managing ticket data. The application can be easily set up and run using Docker.
## Documentation

[API Reference](http://localhost:3000/api-docs)


## Features

- **Frontend:** User interface to create, view, and manage tickets.
- **Backend:** REST API to handle ticket create, read, and update operations.
- **Persistent Data Storage:** Uses JSON files to store ticket data.
- **Dockerized Setup:** Easy installation with Docker Compose.

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd helpdesk-app
```

Start the application with Docker Compose

```bash
  docker-compose up --build
```

**Access the services:**

- **Frontend:** http://localhost:80
- **Backend API:** http://localhost:3000
## Running Tests

To run tests, run the following command

```bash
  cd backend
  npx jest
```


## Tech Stack

**Client:** React, Material UI

**Server:** Node, Express

**Unit testing:** Jest

**API Documentation:** Swagger

**Containerization:** Docker
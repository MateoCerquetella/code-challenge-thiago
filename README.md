# Task Management API

A simple REST API for managing tasks.

## Getting Started

### Prerequisites

- Node.js installed on your system
- npm (Node Package Manager)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Get All Tasks

- **URL:** `/`
- **Method:** `GET`
- **Response:** List of all tasks

### Create a Task

- **URL:** `/tasks`
- **Method:** `POST`
- **Body:**

```json
{
    "title": "Your task title",
    "completed": boolean
}
```

### Modify a Task

- **URL:** `/tasks/:id`
- **Method:** `PUT`
- **URL Parameters:** `id=[integer]`
- **Body:**

```json
{
    "title": "Updated task title",
    "completed": boolean
}
```

### Delete a Task

- **URL:** `/tasks/:id`
- **Method:** `DELETE`
- **URL Parameters:** `id=[integer]`

## Example Usage

You can test the API using the provided Postman collection. Import the `Code Challenge.postman_collection.json` file into Postman to get started.

### Sample Request (Create Task)

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "New task", "completed": false}'
```

# Classifier API

A REST API that classifies names by gender using the Genderize API.

## Stack

- Node.js
- Express
- Axios

## Endpoint

### Classify Name

GET /api/classify?name={name}

### Success Response (200)

```json
{
  "status": "success",
  "data": {
    "name": "john",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 1234,
    "is_confident": true,
    "processed_at": "2026-04-16T12:00:00.000Z"
  }
}
```

### Error Responses

**400** — Missing or empty name parameter

**422** — Name is not a string

**500/502** — Upstream or server failure

```json
{
  "status": "error",
  "message": "<error message>"
}
```

## Live URL

https://name-classifier-production-0f70.up.railway.app

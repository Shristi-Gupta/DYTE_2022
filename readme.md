# dyte - Solution (Backend)

- Developed using Express and Molecular. 
- Supports 5 operations (register, list, update, delete and trigger) on webhooks. 
- Data persisted on MongoDB
- Webhooks are triggered in batchs of 10

## Instructions
Install dependencies

npm install

Start node server

node app.js

## API Spec
1. POST: /register

Request Body:

{
    "targetUrl": "https://example.com"
}

Example Response:

{
    "id": "60f2f2cf9c3fb741820e8653"
}



2. GET: /list
Example Response:

[
    {
        "id": "60f2f2cf9c3fb741820e8653",
        "targetUrl": "https://example.com"
    }
]


3. PUT: /update
Request Body:

{
    "id": "60f2f2cf9c3fb741820e8653",
    "newTargetUrl": "https://new-example.com"
}

Example Success Response:

{
    "status": "OK"
}

Example Error Response:

{
    "status": "error",
    "error": "Webhook not found."
}


4. DELETE: /delete
Request Body:

{
    "id": "60f2f2cf9c3fb741820e8653"
}

Example Success Response:

{
    "status": "OK"
}

Example Error Response:

{
    "status": "error",
    "error": "Webhook not found."
}


5. GET: /trigger
Example Response:

{
    "status": "OK"
}

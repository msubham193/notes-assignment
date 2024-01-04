
# NOTES - REST API 




## Technologies Used

- **Node.js**: JavaScript runtime used for server-side development.
- **Express.js**: Web application framework for building RESTful APIs.
- **MongoDB**: NoSQL database used for data storage.
- **JsonWebToken (JWT)**: Authentication mechanism for securing API endpoints.
- **Jest**: JavaScript testing framework for unit and integration tests.
- **bcrypt**: Library for hashing and salting passwords.



### Choice of Technologies

- **Node.js**: Chosen for its non-blocking, event-driven architecture, which makes it suitable for building scalable and efficient server-side applications.

- **Express.js**: A lightweight and flexible framework that simplifies the development of RESTful APIs. Its middleware support and ease of use make it a popular choice for web applications.

- **MongoDB**: A NoSQL database chosen for its flexibility, scalability, and ability to handle unstructured data. It provides a JSON-like document structure and is suitable for the dynamic nature of web applications.

- **JsonWebToken (JWT)**: A compact, URL-safe means of representing claims to be transferred between two parties. Chosen for its simplicity and suitability for stateless authentication.

- **Jest**: A JavaScript testing framework chosen for its simplicity, speed, and ease of integration with Node.js projects. It supports unit testing as well as integration testing.

- **bcrypt**: Chosen for its robust and secure password hashing algorithm, suitable for storing user credentials securely.

## Installation

Clone the repository

```bash
  git clone https://github.com/msubham193/notes-assignment.git
```
```bash
  cd notes-assignment
```

```bash
  npm install
```

```bash
  npm run dev  or  npm start
```





## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATA_BASE_URL` - MONGO_DB URL

`JWT_SECRET` - Json web token secret

`PORT` - Local Host PORT
## Running Tests

To run tests, run the following command

```bash
  npm test
```


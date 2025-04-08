# mongoose-try

A simple starter project using **Express**, **Mongoose**, and **dotenv** to build Node.js applications with MongoDB integration and environment variable support.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

## Introduction

This project is a boilerplate for creating a RESTful API with Node.js, Express 5, and Mongoose 8. It includes support for environment variables using `dotenv` and is structured to be easy to scale as your application grows.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/mongoose-try.git
   cd mongoose-try
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Create a `.env` file in the root of your project with the following content:

   ```env
   MONGODB_URI=mongodb://localhost:27017/mydatabase
   PORT=3000
   ```

2. Start the server:

   ```bash
   node index.js
   ```

3. Open your browser or API tool (like Postman) and go to:

   ```
   http://localhost:3000
   ```

## Features

- ⚡️ Fast and lightweight setup using Express 5
- 🛠 MongoDB integration via Mongoose 8
- 🔒 Environment variable management with dotenv
- 📦 Simple and customizable structure for quick development

## Dependencies

| Package   | Version    | Description                       |
|-----------|------------|-----------------------------------|
| express   | ^5.1.0     | Web framework for Node.js         |
| mongoose  | ^8.13.1    | MongoDB object modeling tool      |
| dotenv    | ^16.4.7    | Loads environment variables       |

## Configuration

Set your environment variables in a `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/mydatabase
PORT=3000
```

These values are accessed in your code like this:

```js
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;
```

## Project Structure

```bash
mongoose-try/
├── index.js          # Entry point
├── package.json
└── .env              # Environment variables (not committed)
```

## Examples

```js
// index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

## Troubleshooting

- **MongoDB Connection Errors**: Make sure your MongoDB server is running and accessible.
- **.env Not Loaded**: Ensure you call `dotenv.config()` at the beginning of your entry file.
- **Port Already in Use**: Change the `PORT` value in your `.env` file if the default is occupied.

## Contributors

Feel free to open issues or submit pull requests to contribute to this project.

## License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

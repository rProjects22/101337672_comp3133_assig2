import './models/Employee.js';
import './models/User.js';
import express from 'express';
import mongoose from 'mongoose';
import './config/db.js';
import './config/config.js';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolver.js';
import { ApolloServer } from 'apollo-server-express';
import { errorHandler } from './middleware/errorMiddleware.js';
import { requestLogger } from './middleware/otherMiddleware.js';
import { authService } from './services/authService.js'; 
import { employeeService } from './services/employeeService.js'; 

// Start my Server
const serverStart = async () => {
  const app = express();
  const DB = process.env.DATABASE;
  console.log(DB);

  // Create Apollo Server instance
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  server.applyMiddleware({ app });

  app.use(requestLogger); // Middleware to log requests
  // Connect to the MongoDB database  
  await mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log('DB CONNECTED');

  app.use(errorHandler); // Error handling middleware

  // Use the authentication service
  app.use('/api/auth', authService);

  // Use the employee service
  app.use('/api/employees', employeeService);

  const SERVER_PORT = process.env.PORT || 3000;
  app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}/`);
  });
};

serverStart();



/*
// Imports for node modules
import './models/Employee.js';
import './models/User.js';
import express from 'express';
import mongoose from 'mongoose';
import './config/config.js';
//const { graphqlHTTP } = require('express-graphql');
//const { makeExecutableSchema } = require('graphql-tools');
//const { mergeSchemas } = require('graphql-tools');
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolver.js';
import { ApolloServer } from 'apollo-server-express';

//Start my Server
const serverStart = async () => {
  const app = express();
  const DB = process.env.DATABASE;
  console.log(DB);

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  server.applyMiddleware({ app });

  await mongoose.connect(DB, {
     useNewUrlParser: true,
     useUnifiedTopology: true
   });
 
   console.log('DB CONNECTED');
 
   const SERVER_PORT = process.env.PORT || 3000;
   app.listen(SERVER_PORT, () => {
     console.log(`Server running at http://localhost:${SERVER_PORT}/`);
   });
 };
 

serverStart();


import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/types';
import { resolvers } from './graphql/resolvers';

// Load environment variables
import 'dotenv/config';

const serverStart = async () => {
  const app = express();
  const DB = process.env.DATABASE;
  const PORT = process.env.PORT || 3000;

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

  await mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('DB CONNECTED');

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
};

serverStart();
*/
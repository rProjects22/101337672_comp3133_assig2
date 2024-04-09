import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  input EmployeeInput {
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type Query {
    getAllEmployees: [Employee]
    getEmployee(id: ID): Employee
    login(username: String!, password: String!): User
  }

  type Mutation{
    signUp(username: String!, email: String!, password: String!): User
    addEmployee(firstName: String!, lastName: String!, email: String!, gender: String!, salary: Float!): Employee
    updateEmployee(id: ID!, firstName: String!, lastName: String!, email: String!, gender: String!, salary: Float!): Employee
    deleteEmployee(id: ID!): String
  }
`;
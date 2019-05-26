const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

// GraphQL Schema
const schema = buildSchema(`
  type Query {
    task(id:Int!): Task
    tasks: [Task]
  }
  type Mutation {
    updateTaskStatus(id: Int!): Task
  }
  type Task {
    id: Int
    title: String
    description: String
    status: Boolean
  }
`);

// Array of Tasks
let taskArray = [
  {
    id: 1,
    title: 'Task #1',
    description:  'Lorem Ipsum',
    status: false
  },
  {
    id: 2,
    title: 'Task #2',
    description:  'Lorem Ipsum',
    status: false
  },
  {
    id: 3,
    title: 'Task #3',
    description:  'Lorem Ipsum',
    status: false
  },
  {
    id: 4,
    title: 'Task #4',
    description:  'Lorem Ipsum',
    status: false
  }
];

/**
 * Get a specific task by ID
 * @param {*} args 
 */
const getTask = (args) => {
  const id = args.id;
  return taskArray.filter(task => task.id == id)[0];
};

/**
 * Get all task
 */
const getTasks = () => taskArray;

/**
 * Update task by ID
 * @param {*} param0 
 */
const updateTaskStatus = async ({id}) => {
  await taskArray.map(task => {
    if (task.id == id) {
      return task.status = !task.status;
    }
  });
  return taskArray.filter(task => task.id === id)[0];
}

/**
 * Root resolver
 */
const root = {
  task: getTask,
  tasks: getTasks,
  updateTaskStatus
};

/**
 * Create an express server on port 4000
 */
const app = express();
const port = 4000;

app.use(cors());

app.use('/graphql', express_graphql({
  schema,
  rootValue: root,
  graphiql:true
}));

app.listen(port, () => console.log(`Server running on http://localhost:${port}/graphql`));

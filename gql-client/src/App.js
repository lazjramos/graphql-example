import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

function App (props) {
  return (
    <div>
      <ul>
        {
          props.data.loading
            ? "loading"
            : props.data.tasks.map(task => (<li key={task.id}>{task.title}</li>))
        }
      </ul>
    </div>
  );
}

const queryAllTasks = gql`
  query {
    tasks {
      id
      title
      description
    }
  }
`;

const appWithData = graphql(queryAllTasks)(App);

export default appWithData;

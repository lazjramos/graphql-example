import React from 'react';
import gql from 'graphql-tag';
import { graphql, Mutation } from 'react-apollo';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

function App (props) {
  const classes = useStyles();

  return (
    <div>
      {
        props.data.loading
          ? "loading"
          : (
            <Container>
              <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center"># ID</TableCell>
                      <TableCell align="center">Title</TableCell>
                      <TableCell align="center">Description</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.data.tasks.map(row => (
                      <Mutation
                        mutation={TOOGLE_STATUS}
                        key={row.id}
                        refetchQueries={() => {
                          return [{
                            query: GET_ALL_TASKS
                          }];
                        }}
                      >
                        {(toogleStatus) => (
                          <TableRow key={row.id}>
                            <TableCell align="center">{row.id}</TableCell>
                            <TableCell align="center">{row.title}</TableCell>
                            <TableCell align="center">{row.description}</TableCell>
                            <TableCell align="center">{row.status ? "Completed" : "Uncompleted"}</TableCell>
                            <TableCell align="center">
                              <Button
                                variant="outlined"
                                className={classes.button}
                                onClick={e => {
                                  e.preventDefault();
                                  toogleStatus({
                                    variables: {
                                      id: row.id
                                    }
                                  });
                                }}
                              >
                                Toogle status
                              </Button>
                            </TableCell>
                          </TableRow>
                        )}
                      </Mutation>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Container>
          )
      }
    </div>
  );
}

const GET_ALL_TASKS = gql`
  query {
    tasks {
      id
      title
      description
      status
    }
  }
`;

const TOOGLE_STATUS = gql`
  mutation ($id: Int!){
    updateTaskStatus(id: $id) {
      id
      title
      description
      status
    }
  }
`;

const appWithData = graphql(GET_ALL_TASKS)(App);

export default appWithData;

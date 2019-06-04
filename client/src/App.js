// Dependencies 
// !^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import getCurrentUser from './utils/API';
// !^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// Components
// !^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
import Home from './pages/Home';
import Login from './pages/Login';
import UserCreate from './pages/UserCreate';
// !^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// import API from './utils/test';
const theme = createMuiTheme({
  pallete: {
    primary: { main: "#546E7A" },
    secondary: { main: "#FF8A80" }
  },
  typography: {
    useNextVariants: true,
  }, 
  overrides: {
    MuiButton: {
      root: {
        color: 'white',
        '&:hover': {
          backgroundColor: 'purple'
        }
      }
    }
  },
})

class App extends Component {
  state = {
    data: [],
    string: "test",
    loggedIn: false,
    username: null,
   };

   componentDidMount() {
     this.getUser();
   };

   getUser() {
    getCurrentUser.getUser()
    .then(res => {
      console.log('Get user response: ');
      console.log(res.data);
      if (res.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        this.setState({
          loggedIn: true,
          username: res.data.user.username
        });
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        });
      };
    });
   };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Grid>
          <Router>
            <Switch>
              <Route path="/" exact render={() => <Home {...this.state} />} />
              <Route path="/Login" render={() => <Login {...this.state} />} />
              <Route path="/UserCreate" component={UserCreate} />
            </Switch>
          </Router>
        </Grid>
      </MuiThemeProvider>
    )
  };
};

export default App;

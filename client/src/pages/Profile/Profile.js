import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import api from '../../utils/API';

export class Profile extends Component {
    state = {
        bio: "",
        data: [],
        _id: "",
    };
    componentDidMount() {
        this.getUser();
        this.loadBio();
    };
    updateInput = event => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    };
    getUser() {
        api.getUser()
        .then(res => {
            console.log('Get user response: ');
            console.log(res.data);
            if (res.data.user) {
                console.log('Get User: There is a user saved in the server session: ')
                this.setState({
                  loggedIn: true,
                  username: res.data.user.username,
                  _id: res.data.user._id,
                });
            } else {
                console.log('Get user: no user');
                this.setState({
                  loggedIn: false,
                  username: null,
                });
            };
        });
    };
    loadBio() {
        api.getBio(this.state._id)
        .then(res => {
            console.log("Get user bio: ");
            console.log(res.data);
        })
    };
    render() {
        console.log(this.state)
        const bioExample = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    spacing={0}
                >
                    <Grid
                        item
                        xs={2}
                    >
                        <Grid 
                            container
                            direction="column"
                        >
                            <Grid
                                item
                            >
                                <img src="https://via.placeholder.com/300" alt="profile pic"/>
                            </Grid>
                            <Grid
                                item
                            >
                                <Paper style={{padding: 3}}>
                                    <Typography variant="h5" component="h3">
                                        This is a Bio:
                                    </Typography>
                                    {this.state.bio ? (
                                        <Typography component="p">
                                            {this.state.bio}
                                        </Typography>
                                    ) : (
                                        <Typography component="p">{bioExample}</Typography>
                                    )}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={9}
                    >   
                         <Grid 
                            container
                            direction="column"
                        >
                            <Grid
                                item
                            >
                                <Paper style={{margin: 8}}>
                                    <TextField
                                        id="bio"
                                        label="Bio:"
                                        fullWidth
                                        multiline
                                        rows="4"
                                        value={this.state.bio}
                                        style={{marginLeft: 1,
                                                marginRight: 1}}
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.updateInput.bind(this)}
                                    />
                                <Button
                                    style={{margin: "1em"}}
                                    disabled={(!this.state.bio)}
                                    onClick={this.submitBio}
                                >
                                    Save
                                </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid> 
                </Grid>
            </div>
        )
    };
};

export default Profile;

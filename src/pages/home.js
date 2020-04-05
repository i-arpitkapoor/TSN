import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'

import Scream from '../components/Scream'
import Profile from '../components/Profile'

//my code
const styles = theme => ({
    gridPadding: {
        // marginLeft: "50px"
    },
});

class home extends Component {

    state = {
        screams: null
    }



    componentDidMount() {
        axios.get('/screams')
            .then(res => {
                console.log(res.data)
                this.setState({
                    screams: res.data
                })
            })
            .catch(err => console.log(err))
    }
    render() {
        const { classes } = this.props
        let recentScreamsMarkup = this.state.screams ? (
            this.state.screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
        ) : (
                <p> Loading ...</p>
            )
        return (
            <Grid container>
                <Grid container item sm={8} xs={12} >
                    {recentScreamsMarkup}
                </Grid>
                <Grid container item sm={4} xs={12}>
                    <Profile></Profile>
                </Grid>
            </Grid >
        )
    }
}

export default home

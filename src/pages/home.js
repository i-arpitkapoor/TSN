import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import PropTypes from 'prop-types'

import Scream from '../components/Scream'
import Profile from '../components/Profile'

import { connect } from 'react-redux'
import { getScreams } from '../redux/actions/dataActions'

//my code
const styles = theme => ({
    gridPadding: {
        // marginLeft: "50px"
    },
});

class home extends Component {
    componentDidMount() {
        this.props.getScreams()
    }
    render() {
        const { screams, loading } = this.props.data
        // const { classes } = this.props
        let recentScreamsMarkup = !loading ? (
            screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
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

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getScreams })(home);

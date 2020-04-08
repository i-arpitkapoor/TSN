import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton';
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton'



//MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

//icons
import ChatIcon from '@material-ui/icons/Chat'


//redux
import { connect } from 'react-redux'

const styles = {
    card: {
        position: "relative",
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 20,
        objectFit: 'cover'
    }


}

class Scream extends Component {


    render() {
        console.log(this.props)
        dayjs.extend(relativeTime)
        const { classes, scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount },
            user: {
                authenticated, credentials: {
                    handle
                }
            } } = this.props  // const classes = this.props.classes, const body = this.props.screams.body


        console.log(createdAt)
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId} />
        ) : null
        return (
            // added this outer div to adjust width. wasnt actually done
            <div style={{ width: "97%" }}>
                <Card className={classes.card}>
                    <CardMedia
                        image={userImage}
                        title="Profile Image"
                        className={classes.image} />
                    <CardContent className={classes.content}>
                        <Typography variant="h5"
                            component={Link}
                            to={`/users/${userHandle}`}
                            color="primary">
                            {userHandle}
                        </Typography>
                        {deleteButton}
                        <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                        <Typography variant="body1">{body}</Typography>
                        <LikeButton screamId={screamId} />
                        <span>{likeCount} Likes</span>
                        <MyButton tip="Comments">
                            <ChatIcon color="primary" />
                        </MyButton>
                        <span>{commentCount} comments</span>
                        <ScreamDialog screamId={screamId} userHandle={userHandle} />
                    </CardContent>
                </Card >

            </div>
        )
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})


export default connect(mapStateToProps)(withStyles(styles)(Scream))

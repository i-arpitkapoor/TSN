import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
// MUI Stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    ...theme.styles,
    commentImage: {
        maxWidth: "100%",
        height: 100,
        objectFit: 'cover',
        borderRadius: "50"
    },
    commentData: {
        marginLeft: 20
    }
})

class Comments extends Component {
    render() {
        let key = 1;
        const { comments, classes } = this.props
        console.log('{from comments.js }', comments)
        return (
            <Grid container>
                {comments.map((comment, index) => {
                    const { body, createdAt, userImage, userHandle } = comment;
                    return (
                        // assuming createdAt will be unique always
                        <Fragment key={key++}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img src={userImage} alt="comment" className={classes.commentImage} />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography
                                                variant="h5"
                                                component={Link}
                                                to={`/users/${userHandle}`}
                                                color="primary">
                                                {userHandle}
                                            </Typography>
                                            <Typography varaint="body2" color="textSecondary">
                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator} />
                                            <Typography variant="body1">{body}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* {index !== comments.length - 1 && (
                                <hr className={classes.visibleSeparator} />
                            )} */}
                            <hr className={classes.visibleSeparator} />

                        </Fragment>
                    )
                })}
            </Grid>
        )

    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments)
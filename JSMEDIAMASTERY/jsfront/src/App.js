
import React, { useEffect } from 'react'
import { AppBar, Container, Grid, Grow, Typography } from '@material-ui/core'
import memo from './images/memo.png'
import Posts from './components/Posts/Posts'
import Form from './components/form/Form'
import useStyles from './Styles.js'
import { useDispatch } from 'react-redux'
import {getPosts} from './redux/actions/Posts'

const App = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getPosts())
  },[dispatch])
  return (
    <Container maxWidth='lg' >
      <AppBar className={classes.appBar} position='static' color='inherit' >
        <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
        <img className={classes.image} src={memo} alt="memories" height="60"  />
      </AppBar>
      <Grow in >
        <Container>
          <Grid container spacing={3} justify='space-between' alignItems='stretch' >
            <Grid item xs={12} sm={7}>
              <Posts/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App
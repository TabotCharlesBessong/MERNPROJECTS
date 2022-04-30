
import { Paper, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import useStyles from './Styles.js'
import FileBase from 'react-file-base64'

const Form = () => {
  const [postData,setPostData] = useState({
    creator:'',
    title:'',
    message:'',
    tags:'',
    selectedFile:''
  })
  const classes = useStyles()

  const handleSubmit = ()=>{

  }

  const handleChange  = ()=>{

  }
  return (
    <Paper className={classes.paper} >
      <form autocomplete='off' noValidate className={classes.form}  onSubmit={handleSubmit}>
        <Typography variant='h6' >
          Creating a post
        </Typography>
        <TextField className={classes.input} name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={(e)=> setPostData({...postData,creator:e.target.value}) } />
        <TextField className={classes.input} name='title' variant='outlined' label='Memory Title' fullWidth value={postData.title} onChange={(e)=> setPostData({...postData,title:e.target.value}) } />
        <TextField className={classes.input} name='message' variant='outlined' label='memory content' fullWidth value={postData.message} onChange={(e)=> setPostData({...postData,message:e.target.value}) } />
        <TextField className={classes.input} name='tags' variant='outlined' label='Tag people' fullWidth value={postData.tags} onChange={(e)=> setPostData({...postData,tags:e.target.value}) } />
        {/* <TextField name='selectedFile' variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={(e)=> setPostData({...postData,creator:e.target.value}) } /> */}
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({base64}) => setPostData({...postData,selectedFile:base64}) }
          />
        </div>
      </form>
    </Paper>
  )
}

export default Form
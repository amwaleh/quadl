import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

export default function DatePickers (props) {
  return (
    <Grid container item spacing={2} justify='center' xs={12}>
      {/* <Grid container item xs={12} md={6} justify='space-between'> */}

        <Grid item xs={12} md={3}>
          <TextField
            id='date'
            label='Start Date '
            type='date'
            name='start'
            variant = 'outlined'
            value={props.values['start']||'1970'}
            onChange={props.onChange}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3} >
          <TextField
            id='end-date'
            label='End Date '
            type='date'
            name='end'
            variant = 'outlined'
            value={props.values['end']}
            onChange={props.onChange}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
        </Grid>
        <Grid container alignItems="center"  item xs={12} lg={2} md={3} justify="flex-end" >
          <Button variant='contained' color='primary' onClick={props.onClick} style={{marginRight: "6px"}}>
            Apply
          </Button>

        </Grid>
      {/* </Grid> */}
    </Grid>
  )
}

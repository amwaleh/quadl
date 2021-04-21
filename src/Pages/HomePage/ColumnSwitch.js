import React from 'react'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Switch from '@material-ui/core/Switch'

export default function SwitchesGroup (props) {
  const column_names = props.headers.slice(1)
  const dataLines = column_names.reduce((obj, header) => {
    obj[header] = false
    return obj
  }, {})

  const defaultData = { Open: true, Low: true }
  const [state, setState] = React.useState({ ...dataLines, ...defaultData })
  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked })
    props.onSwitchChanged({ ...state, [event.target.name]: event.target.checked })

  }

  return (

    <FormControl component='fieldset'>
      <FormLabel component='legend'>Choose columns:</FormLabel>
      <FormGroup row>
        {column_names.map(x => {
          return (
            <FormControlLabel
              control={
                <Switch checked={state[x]} size="small" onChange={handleChange} name={x} />
              }
              label={x}
            />
          )
        })}
      </FormGroup>
    </FormControl>
  )
}

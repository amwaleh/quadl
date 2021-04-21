import React, { useState, useEffect } from 'react'
import Autocomplete from 'react-autocomplete'
import {
  List as Vlist,
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import AccountCircle from '@material-ui/icons/AccountCircle'
import InputAdornment from '@material-ui/core/InputAdornment'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    "input[role='combobox']": {
      backgroundColor: 'red'
    }
  },
  inline: {
    display: 'inline'
  }
}))

const renderMenu = (items, _, autocompleteStyle) => {
  // cellHeightCache.clearAll()
  const cellHeightCache = new CellMeasurerCache({
    defaultHeight: 42,
    fixedWidth: true
  })

  const rowRenderer = ({ key, index, parent, style }) => {
    const Item = items[index]
    const onMouseDown = e => {
      if (e.button === 0) {
        Item.props.onClick(e)
      }
    }
    return (
      <CellMeasurer
        cache={cellHeightCache}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {React.cloneElement(Item, {
          style: style,
          key: key,
          onMouseEnter: null,
          onMouseDown: onMouseDown
        })}
      </CellMeasurer>
    )
  }
  return (
    <Paper
      component={Vlist}
      rowHeight={cellHeightCache.rowHeight}
      height={207}
      rowCount={items.length}
      rowRenderer={rowRenderer}
      width={autocompleteStyle.minWidth || 0}
      style={{
        width: '300px',
        height: 'auto',
        maxHeight: '500px',
        paddingLeft: '5px',
        zIndex: '9999',
        position: 'absolute'
      }}
    />
  )
}

const renderItem = item => {
  return (
    <Grid
      component={List}
      style={{ width: '200px' }}
      container
      justify='center'
    >
      <Grid
        item
        component={ListItemText}
        primary={item.code}
        secondary={item.name}
      />
    </Grid>
  )
}

export default function AutocompleteComponent (props) {
  const classes = useStyles()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(props.data)
  const [filteredData, setfilteredData] = useState(props.data)
  const [searchingFor, setSearchingFor] = useState()

  const onSelect = val => {
    setSearchingFor(val)
    props.onSelect(val)
  }
  const handleCHange = (e, val) => {

    setSearchingFor(val)
    props.onChange(e)
  }

  const filter = (fn, a) => {
    const f = []
    for (let i = 0; i < a.length; i++) {
      if (fn(a[i])) {
        f.push(a[i])
      }
    }
    setLoading(false)
    setfilteredData(f)
    return f
  }
  useEffect(() => {
    setLoading(true)

    filter(
      item => item.code.toLowerCase().includes(searchingFor?.toLowerCase()),
      data
    )
  }, [searchingFor])
 const ref = React.createRef()
  return (
    <Autocomplete
      ref={ref}
      items={filteredData || data}
      value={searchingFor}
      renderItem={renderItem}
      renderMenu={renderMenu}
      getItemValue={item => item.code}
      onChange={(e, value) => handleCHange(e, value)}
      onSelect={onSelect}
      renderInput={props => (
        <TextField
        onKeyDown={()=>{}}

          name="company"
          label='Insert company'
          {...props}
          variant='outlined'
          fullWidth
          InputProps={{
            onKeyDown : () => {},
            startAdornment: (
              <InputAdornment position='start'>
                {loading && <CircularProgress size={15} />}
              </InputAdornment>
            )
          }}
        />
      )}
      wrapperStyle={{ width: '100%' }}
    />
  )
}

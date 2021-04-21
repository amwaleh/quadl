import React from 'react'
import ReactDOM from 'react-dom'
import Chart from 'react-google-charts'
import { store } from '../../utils/datastore'
import Headers from './ColumnSwitch'
import Grid from '@material-ui/core/Grid'
import pickBy from 'lodash/pickBy'
import CircularProgress from '@material-ui/core/CircularProgress'

const formatData = store => {
  const dataRes = store.dataset
  const headers = dataRes.column_names
  const values = dataRes.data.map(x => {
    x[0] = new Date(x[0])
    return x
  })
  const data = [headers, ...values]
  return data
}

const options = props => ({
  title: props?.data.dataset?.name || '',
  curveType: 'function',
  legend: { position: 'bottom' },
  explorer: {
    keepInBounds: true,
    axis: 'horizontal',
    maxZoomIn: 2,
    actions: ['dragToZoom', 'rightClickToReset']
  }
})

export default function Graph (props) {
  const { data } = props
  const formattedData = formatData(data)
  const headers = formattedData[0]
  const [columns, setColumns] = React.useState([1, 2, 3])

  const handleHeaders = state => {
    const pickedHeaders = Object.keys(pickBy(state, x => x))
    const new_h = pickedHeaders.map(h => headers.indexOf(h))
    new_h.length ? setColumns(new_h) : setColumns([1])
  }

  return (
    <Grid container>
      <Grid item xs={12} lg={10}>
        <Chart
          key={columns.join('-') + headers.join('_')}
          loader={
            <div>
              <CircularProgress size={30} /> working on data ....
            </div>
          }
          chartType='LineChart'
          width='100%'
          height='500px'
          data={formattedData}
          options={options(props)}
          chartWrapperParams={{
            view: { columns: [0, ...columns] }
          }}
          getChartWrapper={chartWrapper => {
            console.log(chartWrapper)
            chartWrapper.draw()
          }}
        />
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={12}
        lg={2}
        flexFlow='column'
        alignItems='center'
        style={{ backgroundColor: '#9e9e9e', paddingLeft: '20px' }}
      >
        <Headers onSwitchChanged={handleHeaders}  headers={headers} item />
      </Grid>
    </Grid>
  )
}

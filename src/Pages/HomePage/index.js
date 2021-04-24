import React, { useEffect } from 'react'
import Chart from './Graph'
import Datebar from '../../components/Datebar'
import { getQuadlEODStock, getQuandlFutures } from '../../services/quadl'
import Layout from '../../components/Layout'
import Typography from '@material-ui/core/Typography'
import Autocomplete from '../../components/Autocomplete'
import IntroCard from '../../components/IntroCard'
import Grid from '@material-ui/core/Grid'
import { tickers } from '../../utils/helpers'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import { useSnackbar } from 'notistack'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'


const AntSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex'
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main
      }
    }
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none'
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white
  },
  checked: {}
}))(Switch)


const HomePage = props => {
  const [loading, setLoading] = React.useState(false)
  const [showStocks, setShowStocks] = React.useState(false)
  const [showFutures, setShowFutures] = React.useState(false)
  const [showIntro, setShowIntro] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [values, setValues] = React.useState({})
  const [data, setData] = React.useState({})
  const [company, setCompany] = React.useState()
  const [tickerData, setTickers] = React.useState()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [page, setPage] = React.useState(0)

  const handlePage = (event, newValue) => {
    setPage(newValue)
  }

  const tickerResult = result => {
    setTickers(result)
  }

  const getEODStock = async company_code => {
    try {
      let params = {}
      if (values.end) params['start_date'] = values.start
      if (values.start) params['end_date'] = values.end

      const res = await getQuadlEODStock(company_code, params, showFutures)
      setData(res.data)
      setCompany(company_code)
      setLoading(false)

    } catch (error) {

      setLoading(false)
      const message =
        error?.response?.data.quandl_error.message || error.message

      enqueueSnackbar(`Error occured ${message}`, 'warning')
      setError(error.message)
    }
  }

  const fetchFuture = async () => {
    try {
      let params = {}
      if (values.end) params['start_date'] = values.start
      if (values.start) params['end_date'] = values.end

      const res = await getQuandlFutures(params)
      setData(res.data)
      setLoading(false)

    } catch (error) {
      setLoading(false)
      const message =
        error?.response?.data.quandl_error.message || error.message
      enqueueSnackbar(`Error occured ${message}`, 'warning')
      setError(error.message)
    }
  }

  const handleSelect = val => {
    setLoading(true)
    console.log({ val })
    getEODStock(val)
  }

  const handleSubmit = () => {
    setLoading(true)
    console.log({ values })
    if (showFutures) {
      fetchFuture()
    }
    if (values.company && showStocks) {
      getEODStock(values.company)
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
    console.log(values)
  }

  const handleShowStocks = show => {
    setShowStocks(show)
    setShowIntro(false)
  }

  const handleShowFutures = show => {
    setShowFutures(show)
    setValues({...values, company:null})
    setShowIntro(false)
    fetchFuture()
  }

  const handlePageChange = () => {
    handleShowFutures(!showFutures)
    handleShowStocks(showFutures)
  }

  useEffect(() => {
    tickers(tickerResult)
  }, [])

  return (
    <Layout>

      <Grid
        item
        container
        xs={12}
        justify={showStocks & !values.company ? 'center' : 'space-between'}
        style={{ marginBottom: '2em' }}
        alignItems='center'
      >
        {showIntro && (
          <Grid container justify='center' xs={12}>
            <IntroCard
              handleFutures={() => handleShowFutures(true)}
              handleStocks={() => handleShowStocks(true)}
            />
          </Grid>
        )}

        {tickerData && showStocks && (
          <Grid item xs={12} md={!values.company ? 8 : 4}>
            <Autocomplete
              data={tickerData}
              onChange={handleChange}
              onSelect={handleSelect}
              style={{ heigh: '500px' }}
            />
          </Grid>
        )}
        {(showFutures || values.company) && (
          <Grid item xs={12} md={8}>
            <Datebar
              onChange={handleChange}
              values={values}
              onClick={handleSubmit}
            />
          </Grid>
        )}
      </Grid>
{
  !showIntro && (
    <Grid
      container
      item
      xs={12}
      md={12}
      justify={values.company || showFutures ? 'start' : 'start'}
    >
      <FormGroup row>
        <Typography component='div'>
          <Grid component='label' container alignItems='center' spacing={3}>
            <Grid item >Stocks{'  '} </Grid>
            <Grid item>

                  <AntSwitch
                    checked={showFutures}
                    onChange={handlePageChange}
                    name='checkedA'
                  />

            </Grid>

            <Grid item > Futures </Grid>


          </Grid>
        </Typography>
      </FormGroup>
    </Grid>
  )
}

      <Grid item xs={12}>
        <Typography variant='subtitle1' gutterBottom style={{ color: 'red' }}>
          {/* {error && `An Error occured while fechting Data ${company}: ${error}`} */}
        </Typography>
        {loading && <CircularProgress size={30} fetching data />}
        {!!data?.dataset?.data.length && (
          <>
            <Chart data={data} company={company} values={values} item />
            <Grid component={Paper}>
              <Grid item md={6}></Grid>
              <Grid item md={6}></Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Layout>
  )
}

HomePage.propTypes = {}

export default HomePage

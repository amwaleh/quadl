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
      setValues({ ...values, start: start_date })
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
      setValues({ ...values, start: start_date })
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
    setShowIntro(false)
    fetchFuture()
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
        justify={showStocks & ! values.company ? 'center': 'space-between'}
        style={{ marginBottom: '2em' }}
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
          <Grid item xs={12} md={4}>
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

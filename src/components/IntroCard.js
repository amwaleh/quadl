import React from 'react'
import cx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded'
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered'
import TimelineIcon from '@material-ui/icons/Timeline'


const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    minWidth: 400,
    textAlign: 'center'
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 'auto',
    backgroundColor: "green"
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
    marginBottom: '0.875em'
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: "10px 0 0"
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px'
  },
  green:{
    backgroundColor:"green",
   " &:hover":{
      backgroundColor:"#2a6407",
    }

  }
}))

export const ProfileCardDemo = React.memo(function ProfileCard (props) {
  const styles = useStyles()
  const shadowStyles = useFadedShadowStyles()
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%'
  })
  return (
    <Card className={cx(styles.card, shadowStyles.root)}>
      <CardContent>
        <Avatar className={styles.avatar}>
          <TimelineIcon />
        </Avatar>

        <h4 className={styles.heading}>
          Welcome to Stocks & Futures Viewer
        </h4>
        <span className={styles.subheader}>Please choose your next step</span>
      </CardContent>
      <Divider light />
      <Box display={'flex'}>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <Button variant='outlined' size='small' color='default' onClick={props.handleFutures}>
            Futures
          </Button>
          <p className={styles.statLabel}>
            View 30 Day Federal <br />
            Funds Futures (<b>FF</b>)
          </p>
        </Box>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <Button variant='contained' size='small' color='primary' className={styles.green}  onClick={props.handleStocks}>
            stocks
          </Button>
          <p className={styles.statLabel}>
            Search For <b>EOD</b> <br />
            Stock Price
          </p>
        </Box>
      </Box>
    </Card>
  )
})

export default ProfileCardDemo

import papa from 'papaparse'
import csvFile from './EOD_metadata.csv'


const rows2object = (rows) =>{
  const headers = rows.shift()
// then build the json for each row
return rows.map(function (row) {
  const jsonRow = {}
  row.forEach(function (cellValue, cellIndex) {
    jsonRow[headers[cellIndex]] = cellValue
  })
  return jsonRow
})

}
const getResults = cb => {
  // convert tickers to Json
  const papaConfig = {
    complete: (rows, file) => {
      // debugger
      const result = rows2object(rows.data)
      cb(result)
    },
    download: true,
    error: (error, file) => {
      console.log('Error while parsing:', error, file)
    }
  }
  papa.parse(csvFile, papaConfig)
}
export const tickers = getResults

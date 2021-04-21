import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import {store} from "./datastore"
// Ref : https://developers.google.com/chart/interactive/docs/gallery/histogram
const dataRes = store.dataset_data
const headers = dataRes.column_names
const values = dataRes.data.map(x => {

  x[0]=new Date(x[0])
  return x
})//.splice(0,1500)
const data = [headers, ...values]

const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
  explorer: {
    keepInBounds: true,
    axis: 'horizontal',
    maxZoomIn: 2 ,
   actions: ['dragToZoom', 'rightClickToReset'] }
};
export default class App extends React.Component {
  render() {
    return (
      <div >
        <Chart
          loader={<div>Loading Chart</div>}
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
          chartWrapperParams={{ 
            view: { columns: [0,1,2,3,4] }, 
        }}
        />
      </div>
    );
  }
}


import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './Pages/HomePage/index';
import { SnackbarProvider } from 'notistack'


const App = (props) => {
  const notistackRef = React.createRef()

  return <SnackbarProvider
            ref={notistackRef}
            color="inherit"
            maxSnack={3}
          >
            <Demo/>
            </SnackbarProvider>
}


ReactDOM.render(<App />, document.querySelector('#root'));

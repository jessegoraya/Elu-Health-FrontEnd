
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router';
import PatientApp from './app.js';

/*ReactDOM.render((
<BrowserRouter>
    <PatientApp /> 
</BrowserRouter>), document.getElementById('main')
);*/

ReactDOM.render(
    <PatientApp /> , document.getElementById('main')
  ); 
  


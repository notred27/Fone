import React from 'react';
import ReactDOM from 'react-dom/client';
import './Index.css';
import reportWebVitals from './reportWebVitals';

import ChatPane from './ChatPane';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
{/* <div style = {{height:"30vh"}}/> */}
<div style={{width:"8cm", height:"15cm", overflow:"hidden", marginLeft:"auto", marginRight:"auto", backgroundColor:"white"}}>

  <ChatPane/>
</div>
  


  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

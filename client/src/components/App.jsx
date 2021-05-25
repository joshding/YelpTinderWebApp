import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Business from './Business.jsx';
import Search from "./Search.jsx";
import Title from './Title.jsx';
import FormPractice from './Form2.jsx';


function App(props) {
  const [businesses, setBusinesses] = useState([]);
  const [location, setLocation] = useState('');
  useEffect(() => {
    let loc = prompt('please enter your zip code: ');
    axios.get(`/yelp/${loc}`).then(businesses => {
      setBusinesses(businesses.data)
    })
  }, [])
  function getLocation(loc) {
    axios.get(`/yelp/${loc}`).then(businesses => {
      setBusinesses(businesses.data);
      setLocation(loc);
    })
  }
    document.body.style.backgroundSize = `${window.outerHeight} ${window.outerWidth} `
  return (
    <ul style={{"textAlign": "center"}}>
        <Search getLocation = {getLocation}/>
        <Title />
        <FormPractice />
     {businesses.length ? businesses.map(business => <Business business={business}/>): <div>{"loading...please wait"}</div>}
     </ul>
  );
}

export default App;
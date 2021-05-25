import React, {useEffect, useState} from 'react';

export default function Search(props) {
  const [isGoing, setIsGoing] = useState(true);
  const [location, setLocation] = useState("");
  const [stars, setStars] = useState(1);
  const [category, setCategory] = useState("");

  useEffect(() => {
    let timeoutId = setTimeout(() => props.getLocation(location), 2000);
    return () => {
      clearTimeout(timeoutId);
    }
  }, [location])
  function handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setLocation(value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    alert('A name was submitted: ' + location);
  }
    return (
       <form onSubmit={handleSubmit} style={{border:'solid', position: 'absolute', position:'fixed', right: 0,  backgroundColor:'white',zIndex:100}}>
        <label>
          Change location:
          <input
            name="location"
            type="string"
            value={location}
            onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Category:
          <input
            name="category"
            type="string"
            value={category}
            onChange={handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
}
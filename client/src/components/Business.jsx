import React from "react";
const PATH_TO_STARS = "/assets/yelpMainLg3x/";
const DOMAIN = ".png";
let mainPicStars = {
  "1": "one",
  "1.5": "one_and_half",
  "2": "two",
  "2.5": "two_and_half",
  "3": "three",
  "3.5": "three_and_half",
  "4": "four",
  "4.5": "four_and_half",
  "5": "five"

}

function Business({ business }) {
  return (
    <li
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "30px",
      }}
    >
      <a href={business.yelpURL} target="_blank">
        <img
          src={business.images[0]}
          style={{
            height: "400px",
            width: "400px",
            boxShadow: "-10px 5px 5px gray",
          }}
        />
      </a>
      <div>
      <img
      src={PATH_TO_STARS + mainPicStars[business.rating] + DOMAIN}
      style = {{
        height:"30px"
      }}
      />{business.reviewCount + " reviews"}
      </div>
      <div>{business.name}</div>
      <div>{business.address}</div>
    </li>
  );
}

export default Business;

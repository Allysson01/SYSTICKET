import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

export default (props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const renderImg = () => {
    const lstPros = props.lstt;  
    let key = 0;
    return lstPros.map((filter64) => (      
      <Carousel.Item key={key = key + 1}>
        <img alt="" src={"data:image/png;base64," + filter64}></img>
      </Carousel.Item>
    ));
  };

  

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {renderImg()}
    </Carousel>
  );
};

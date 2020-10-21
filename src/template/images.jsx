import React from "react";

export default (props) => {  
  const imges = props.img;
  const classMenu = props.class || 'imgMenu';

  return (
    <div>
      <img src={imges} className={classMenu} alt="LogoTg" title="TeleGestao"/>
    </div>
  );
};

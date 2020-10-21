import React, {useContext} from "react";
import StoreContext from '../store/Context';
import PageHeader from "../template/pageHeader";
// import Menu from '../template/menu';
import Login from '../login/login'

export default (props) => {

  const { token } = useContext(StoreContext);
 return token? (<div className="container">
    {/* <Menu></Menu>  */}
    <PageHeader name='Sistema' isHidden="false" icon="fa fa-laptop" isColor="#1C86EE"></PageHeader>
    <h2>Finalidade</h2>
    <p className="inpLabel">
      Esse sistema foi desenvolvido para organizar as demandas da TI e melhorar a experiência ao abrir um chamado.
    </p>
    <h2>Exemplos</h2>
    <p className="inpLabel">Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio quis distinctio atque deserunt saepe, possimus facilis repellat? Eos illo voluptatibus commodi ad odit laboriosam quae dolor quam aliquid enim?</p>
    
  </div>):(<Login/>)
};

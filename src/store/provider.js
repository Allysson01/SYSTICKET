import React from 'react';
import Context from './Context';
import useStorage from '../utils/useStorage';

const StoreProvider = ({ children, childrens }) => {    
  const [token, setToken] = useStorage('token');
  const [name, setName] = useStorage('name');
  const [id, setId] = useStorage('id');    
  const [isManager, setManager] = useStorage('isManager');  
  return (
    <Context.Provider     
      value={{
        token,
        setToken,
        name,
        setName,
        id,
        setId,
        isManager,
        setManager            
      }}
    >
      {children}{ childrens}
    </Context.Provider>
  )
}


export default StoreProvider;

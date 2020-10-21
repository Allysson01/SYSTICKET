import { createContext } from "react";

const StoreContext = createContext({
  token: false,
  id: 0,
  name: "",  
  isManager: false,
  setToken: () => {},
  setName: () => {},
  setId: () => {},
  setManager: () => {}   
});

export default StoreContext;

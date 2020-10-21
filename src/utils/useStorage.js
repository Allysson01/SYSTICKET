import {useCallback, useState} from "react";
import storage from "./storage";

function useStorage(key) {  
  
  const [state, setState] = useState(() => storage.get(key));
  const set = useCallback(    
    (key,newValue) => {     
      storage.set(key, newValue);
      setState(newValue);
    },
    []
  );

  const remove = useCallback(() => {
    storage.remove(key);
    setState(undefined);
  }, [key]);
key = null;
  return [state, set, remove];
}

export default useStorage;

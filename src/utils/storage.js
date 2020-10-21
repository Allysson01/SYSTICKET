import Cookie from 'js-cookie';

const storage = {};

// Safari em modo anônimo tem armazenamento local, mas tamanho 0
// Este sistema usa cookies nessa situação
try {
  if (!window.sessionStorage) {
    throw Error('no local sessionStorage');
  }

  // Configure o wrapper de armazenamento local simples 
  storage.set = (key, value) =>{ sessionStorage.setItem(key, JSON.stringify(value))};
  storage.get = (key) => {
    const item = sessionStorage.getItem(key);   
    try {
      return JSON.parse(item);
    } catch (e) {
      return null;
    }
  };

  storage.remove = key => sessionStorage.removeItem(key);
} catch (e) {
  storage.set = Cookie.set;
  storage.get = Cookie.getJSON;
  storage.remove = Cookie.remove;
}

export default storage;

import axios from 'axios'

export default async function conex(url, data){
    let resul = [];
   await axios
    .get(url, data)
    .then((resp) => {              
        resul.push(resp.data);
    })
    .catch(function(err) {
        resul.push(err.data);
    });
    return resul;
}

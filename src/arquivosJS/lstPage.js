import axios from "axios";

const lstFilter = async (props) => { 
  let list = [];
  const URL = "https://localhost:44318/api/tickets/ticketget";

  await axios.post(URL, props).then((resp) => {    
    list = resp.data;
  });
 return list;
};

export default lstFilter;

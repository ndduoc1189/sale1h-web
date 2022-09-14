import axios from "axios";

let apiService = {};
const httpRequest = axios.create({
    baseURL: 'http://localhost:8989/',
    timeout: 8000
  });

apiService.getSearchHint = async (key) =>{
    var res = await httpRequest.get('search-hint',{
        params:{
            key : key,
        }});
    return res.data;
}
apiService.getProducts = async (searchParams) =>{
    var res = await httpRequest.get('search-product',{
        params:searchParams});
    return res.data;
}

export default apiService;
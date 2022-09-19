import config from "~/Config"

const productServices ={
    getLogo: (source) =>{
        let res;
        config.dataSources.map((item)=>{
            if(item.name.toLocaleLowerCase() === source){
                res = item.thumb;
            }
        });
        return res;
    }
}

export default productServices;


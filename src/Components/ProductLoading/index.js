import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ProductLoading({numItem}) {
    return  Array(numItem)
            .fill(0)
            .map((item,index)=>(
                <div key={index} className="col-xl-3 col-sm-6">
                    <Skeleton height={150} />
                    <Skeleton count={3} />
                </div>
            ));
}

export default ProductLoading;
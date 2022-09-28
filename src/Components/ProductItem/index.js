import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { productServices} from "~/services";
import LazyLoad  from 'react-lazyload';
import config from "~/Config";
const cx = classNames.bind(styles);


function ProductItem({data}) {

    function GeneratedLink(link){
        return  config.afUrl+link;
    }

    return (
    <div className="col-xl-3 col-sm-6">
        <div className={cx('product-item')}>
            <div className={cx('product-image')}>
                <a rel="nofolow" title={data.name} href={GeneratedLink(data.itemUrl)} >
                    <LazyLoad height={150} >    
                    <img className={cx('item-img')} src= { data.image} alt="item" />
                    </LazyLoad >

                </a>
                <div className={cx('btn-source')}>
                    <img className="img-fluid" src={productServices.getLogo(data.source_type)} alt={data.source_type}/>
                    <span>{data.shop_location}</span>
                </div>
            </div>
            <div className="p-3 pt-4">
                <div className={cx('product-card-item')}>
                    <h5 className="mb-3"><a rel="nofolow" title={data.name} href={GeneratedLink(data.itemUrl)} className="text-gray-900">{data.name}</a></h5>
                    <p className="text-gray-500"><i className="icofont-clock-time"></i> Đã bán: {data.historical_sold}</p>
                </div>
                {/* <div className="custom-card-footer d-flex align-items-center">
                    <span className="text-danger"><i className="icofont-sale-discount"></i> 50 % OFF</span><a className="btn btn-sm btn-white ml-auto" href="/">Get Offer</a>
                </div> */}
            </div>
        </div>
    </div>
    );
}

export default ProductItem;
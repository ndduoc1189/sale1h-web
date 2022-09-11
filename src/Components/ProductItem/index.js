import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import images from '~/assets/images';
import cf from "~/Config/GlobalConfig.json";
const cx = classNames.bind(styles);


function ProductItem({data}) {

    function GeneratedLink(source_type, link){
        switch(source_type){
            case cf.SOURCE_TYPE.SHOPEE:
                return encodeURI(cf.AF_LINK +"https://shopee.vn/"+link);
            default:
                return "/";
            
        }
    }

    return (
    <div className="col-xl-3 col-sm-6">
        <div className={cx('product-item')}>
            <div className={cx('product-image')}>
                <a href={GeneratedLink(data.source_type,data.name+data.shopid+"."+data.itemid)} >
                    <img className={cx('item-img')} src= { `https://cf.shopee.vn/file/${data.image}`} alt="item" />
                </a>
                <div className={cx('btn-source')}>
                    <img className="img-fluid" src={images.logoShoppe} alt="brand" />
                    <span>{data.source_type}</span>
                </div>
            </div>
            <div className="p-3 pt-4">
                <div className="custom-card-body">
                    <h5 className="mb-3"><a className="text-gray-900" href="/Search">{data.name}</a></h5>
                    <p className="text-gray-500"><i className="icofont-clock-time"></i> Ends in 18 days</p>
                </div>
                <div className="custom-card-footer d-flex align-items-center">
                    <span className="text-danger"><i className="icofont-sale-discount"></i> 50 % OFF</span><a className="btn btn-sm btn-white ml-auto" href="/">Get Offer</a>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ProductItem;
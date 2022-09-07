import classNames from "classnames/bind";
import styles from './Home.module.scss';
import BoxSearch from "~/Components/BoxSearch";

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('container')}>
            <div className={cx('search-row')}>
                <div className="col-lg-8 mx-auto pt-lg-5">
                    <div className='text-center'>
                        <h1>Tìm sản phẩm nhiều ưi đãi nhất</h1>
                        <h5>So sánh nhanh giá, ưu đãi trên các sàn Shopee, Tiki, Lazada, sendo,...</h5>
                    </div>

                    <BoxSearch />
                </div>

            </div>

        </div>

    );

}

export default Home;
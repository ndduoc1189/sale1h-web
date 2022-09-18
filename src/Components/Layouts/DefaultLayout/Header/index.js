import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { Link,useLocation } from 'react-router-dom';
import BoxSearch from '~/Components/BoxSearch';

const cx = classNames.bind(styles);

function Header() {
    const location = useLocation();
    return (
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('logo')}>
                     <Link to='/'> <img src={images.logo} alt='sale1h' /></Link>
                </div>
                {(location.pathname === '/search')&&(<BoxSearch ></BoxSearch>)}
                <div className={cx('navbar')}>
                    <ul>
                        <li>
                            <a href='/'>Flase sale</a>
                        </li>
                        <li><a href='/ma-giam-gia' title='Mã giảm giá'>Mã giảm giá</a></li>
                    </ul>
                </div>
            </div>

        </header>
    )
}

export default Header;
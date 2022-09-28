import {useEffect} from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { apiService } from '~/services';    
const cx = classNames.bind(styles);

function Footer() {

    useEffect(() => {
       apiService.checkService();
      }, []);

    
    return (
        <div className={cx('footer')}>
            <div className={cx('container')}>
                <div className={cx('coppy-right')}>
                Copyright © Sale1h.com 2022
                </div>

            </div>
        </div>

    )
}

export default Footer;
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('footer')}>
            <div className={cx('container')}>
                <div className={cx('coppy-right')}>
                Copyright © Sale1h.com 2020
                </div>

            </div>
        </div>

    )
}

export default Footer;
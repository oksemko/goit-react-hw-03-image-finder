import { Watch } from 'react-loader-spinner';

import styles from './Loader.module.css';

export const Loader = () => {
  <div className={styles.Loader}>
    <Watch
    height="80"
    width="80"
    radius="48"
    color="#4fa94d"
      ariaLabel="watch-loading"
    />
  </div>
}

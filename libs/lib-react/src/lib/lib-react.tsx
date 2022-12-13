import styles from './lib-react.module.css';

/* eslint-disable-next-line */
export interface LibReactProps {}

export function LibReact(props: LibReactProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to LibReact!</h1>
    </div>
  );
}

export default LibReact;

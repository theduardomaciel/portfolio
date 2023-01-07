import styles from './button.module.css';

type Props = {
    children?: React.ReactNode;
    scheme?: 'light_background' | 'dark_background' | 'disable_invert';
    style?: React.CSSProperties;
    onClick?: () => void;
}

export default function Button({ children, style, scheme = "light_background", onClick }: Props) {
    return (
        <button onClick={onClick} className={`${styles.button} ${scheme ? styles[scheme] : ""}`} type='button' style={style} >
            {children}
        </button>
    );
}
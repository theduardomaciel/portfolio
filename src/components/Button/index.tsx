import styles from './button.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    classes?: string;
    scheme?: 'light_background' | 'dark_background' | 'disable_invert';
}

export default function Button({ classes, children, style, scheme = "light_background", onClick, ...rest }: Props) {
    return (
        <button {...rest} onClick={onClick} className={`${styles.button} ${classes} ${scheme ? styles[scheme] : ""}`} type='button' style={style} >
            {children}
        </button>
    );
}
import React, { PropsWithChildren } from 'react';

type Props = {
    theme?: "primary" | "secondary"
}
const Button: React.FC<PropsWithChildren<Props>> = ({ children, theme = "primary" }) => {
    return <button>{children}</button>
}

export default Button;
import React, { PropsWithChildren } from 'react';

const Button: React.FC<PropsWithChildren> = ({children}) => {
    return <button>{children}</button>
}

export default Button;
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { PropsWithChildren } from 'react';

type Props = {
  theme?: 'primary' | 'secondary';
  width?: string | number;
  style?: React.CSSProperties;
  onClick?: () => void;
};

const Button: React.FC<PropsWithChildren<Props>> = ({
  children,
  theme = 'primary',
  width,
  style,
  onClick,
}) => {
  return (
    <button
      css={[defaultStyle, themes[theme], { width }]}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const themes = {
  primary: css`
    background: #20c997;
    color: white;

    &:hover {
      background: #38d9a9;
    }
    &:active {
      background: #12b886;
    }
    &:disabled {
      background: #aed9cc;
    }
  `,
  secondary: css`
    background: #e9ecef;
    color: #343a40;
    &:hover {
      background: #f1f3f5;
    }
    &:active {
      background: #dee2e6;
    }
    &:disabled {
      color: #c6d3e1;
    }
  `,
};

const defaultStyle = css`
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  box-sizing: border-box;
  height: 2rem;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  background: #20c997;
  color: white;
  border-radius: 0.25rem;
  line-height: 1;
  font-weight: 600;
  &:focus {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
  &:hover {
    background: #38d9a9;
  }
  &:active {
    background: #12b886;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

export default Button;

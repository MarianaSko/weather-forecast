import type { Theme } from '@emotion/react';
import { Card, type SxProps } from '@mui/material';
import { type ReactNode } from 'react';

interface CardElementProps {
  onClick?: () => void;
  sx?: SxProps<Theme>;
  children: ReactNode;
}

const CardElement: React.FC<CardElementProps> = ({ onClick, sx, children }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 2,
        color: '#ced4dd',
        backgroundColor: '#1e3f67',
        boxShadow:
          ' rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;',
        ...sx,
      }}
      onClick={onClick}
    >
      {children}
    </Card>
  );
};

export default CardElement;

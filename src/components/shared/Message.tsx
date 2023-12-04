import React, { ReactNode, CSSProperties } from 'react';

interface MessageProps {
  text_color: string;
  children: ReactNode;
  style?: CSSProperties;
}

const Message: React.FC<MessageProps> = ({ text_color, children, style }) => {
  return (
    <span className={text_color} style={style}>
      {children}
    </span>
  );
};

export default Message;
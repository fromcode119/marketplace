import React from 'react';
import { BlockStyle } from '../types';

interface BlockWrapperProps {
  style?: BlockStyle;
  children: React.ReactNode;
  id?: string;
  type?: string;
}

export const BlockWrapper: React.FC<BlockWrapperProps> = ({ style = {}, children, id, type }) => {
  const inlineStyle: React.CSSProperties = {
    marginTop: style.margin?.top,
    marginRight: style.margin?.right,
    marginBottom: style.margin?.bottom,
    marginLeft: style.margin?.left,
    paddingTop: style.padding?.top,
    paddingRight: style.padding?.right,
    paddingBottom: style.padding?.bottom,
    paddingLeft: style.padding?.left,
    backgroundColor: style.background,
    color: style.textColor,
    borderRadius: style.borderRadius,
    backdropFilter: style.backdropBlur ? `blur(${style.backdropBlur})` : undefined,
    WebkitBackdropFilter: style.backdropBlur ? `blur(${style.backdropBlur})` : undefined,
    boxShadow: style.boxShadow,
  };

  const visibilityClass = {
    all: '',
    desktop: 'hidden md:block',
    mobile: 'block md:hidden',
  }[style.visibility || 'all'];

  const animationClass = style.animation ? `animate-${style.animation}` : '';

  return (
    <div 
      id={id}
      data-block-type={type}
      className={`cms-block-wrapper relative transition-all duration-300 ${visibilityClass} ${animationClass} ${style.customClass || ''}`}
      style={inlineStyle}
    >
      {children}
    </div>
  );
};

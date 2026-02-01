import React from 'react';

export interface Block {
  id: string;
  type: string;
  layout: string;
  data: Record<string, any>;
  style?: BlockStyle;
}

export interface BlockStyle {
  margin?: { top?: string; right?: string; bottom?: string; left?: string };
  padding?: { top?: string; right?: string; bottom?: string; left?: string };
  background?: string;
  textColor?: string;
  borderRadius?: string;
  visibility?: 'all' | 'desktop' | 'mobile';
  customClass?: string;
  animation?: string;
  backdropBlur?: string;
  boxShadow?: string;
}

export interface BlockDefinition {
  id: string;
  name: string;
  icon: React.ReactNode;
  layouts: string[];
  renderSettings: (props: { 
    data: Record<string, any>, 
    updateData: (key: string, val: any) => void,
    layout: string,
    updateLayout: (layout: string) => void,
    theme: string,
    style?: BlockStyle,
    updateStyle?: (style: BlockStyle) => void
  }) => React.ReactNode;
}

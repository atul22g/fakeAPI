import React from 'react';
import * as Feather from 'react-feather';

export default ({name, size = 18, ...rest}) => {
  const Icon = Feather[name] || Feather.AlertTriangle;
  return <Icon strokeWidth={3} size={size} {...rest} />;
};

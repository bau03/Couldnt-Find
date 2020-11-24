import React from 'react';
import { Button } from '../Button';

export const ContentLike = ({ children, ...props }) => {
  return (
    <Button className="rounded-circle ml-2 mt-2 btn-sm m-md-1" variant="outline-dark" {...props}>
      {children}{' '}
    </Button>
  );
};

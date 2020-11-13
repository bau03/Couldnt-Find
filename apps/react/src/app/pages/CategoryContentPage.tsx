import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Contents } from './ContentsView';
export const CategoryContentPage = () => {
  const { categoryName } = useParams();

  return (
    <Container>
      <Contents categoryName={categoryName} />
    </Container>
  );
};

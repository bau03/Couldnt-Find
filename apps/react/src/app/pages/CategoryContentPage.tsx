import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Contents } from './ContentsView';
export const CategoryContentPage = () => {
  const { categoryName } = useParams();

  return (
    <Container>
      <h3>{categoryName}</h3>
      <Contents categoryName={categoryName} />
    </Container>
  );
};

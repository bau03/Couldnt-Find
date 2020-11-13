import React from 'react';
import { Container } from 'react-bootstrap';
import { ContentMore } from './ContentsView';
import { useParams } from 'react-router-dom';

export const ContentMorePage = () => {
  const { contentId } = useParams();
  return (
    <Container>
      <ContentMore contentId={contentId} />
    </Container>
  );
};

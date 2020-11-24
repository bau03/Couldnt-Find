import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CategoryView, ContentMore } from './ContentsView';
import { useParams } from 'react-router-dom';

export const ContentMorePage = () => {
  const { contentId } = useParams();
  return (
    <Container>
      <div>
        <hr />
      </div>
      <Row>
        <CategoryView />
        <Col sm={8}>
          <ContentMore contentId={contentId} />
        </Col>

      </Row>
    </Container>
  );
};

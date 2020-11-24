import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CategoryView, Contents } from './ContentsView';
export const ContentViewingPage = () => {
  return (
    <Container>
      <div>
        <hr />
      </div>
      <Row>
        <CategoryView />
        <Col sm={8}>
          <Contents categoryName={null} />
        </Col>
      </Row>
    </Container>
  );
};

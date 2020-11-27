import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { CategoryView, Contents } from './ContentsView';
export const CategoryContentPage = () => {
  const { categoryName } = useParams();

  return (
    <Container>
      <div>
        <hr />
      </div>
      <Row>
        <CategoryView />
        <Col sm={8}>
          <Contents categoryName={categoryName} contentHeaders={null} />
        </Col>
      </Row>
    </Container>
  );
};

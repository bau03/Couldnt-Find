import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CategoryView, Contents } from './ContentsView';
import { useParams } from 'react-router-dom';
export const SearchPage = () => {
  const { contentHeaders } = useParams();
  return (
    <Container>
      <div>
        <hr />
      </div>
      <Row>
        <CategoryView />
        <Col sm={8}>
          <Contents categoryName={null} contentHeaders={contentHeaders} />
        </Col>
      </Row>
    </Container>
  );
};

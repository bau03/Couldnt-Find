import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CategoryView , TrendContentView } from './ContentsView';
export const MainPage = () => {
  return (

      <Container>
        <div>
          {' '}
          <h4 className="mt-3 text-md-center display-4">
            <p>Trend Konular</p>
          </h4>
          <hr />
        </div>
        <Row>
          <CategoryView />
          <Col sm={9}>
            <TrendContentView/>
          </Col>
        </Row>
      </Container>


  );
};

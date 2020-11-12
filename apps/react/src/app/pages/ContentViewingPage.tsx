import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Contents } from './ContentsView';
import { api, CategoryDetailResponse } from '@internship/shared/api';
import { Link } from 'react-router-dom';
export const ContentViewingPage = () => {
  const [detail, setDetail] = useState<CategoryDetailResponse[]>();
  useEffect(() => {
    api.auth
      .categoryPage()
      .then((r) => setDetail(r))
      .catch((e) => console.error(e));
  }, []);
  return (
    <Container>
      <div>
        <hr />
      </div>
      <Row>
        <Col sm={3}>
          <div className="card">
            <div className="card-header">
              <h4>
                <b className="text-black-50">Category</b>
              </h4>
            </div>

            {detail?.map((d, key) => (
              <ul className="list-group list-group-flush">
                <li key={key} className="list-group-item ">
                  <Link className="nav-link" to={'/category/' + d.id}>
                    {' '}
                    {d.categoryName}
                  </Link>
                </li>
              </ul>
            ))}
          </div>
        </Col>
        <Col sm={8}>
          <Contents categoryName={null} />
        </Col>
      </Row>
    </Container>
  );
};

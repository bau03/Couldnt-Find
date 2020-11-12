import { Col, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { api, ContentDetailResponse } from '@internship/shared/api';
import { Button } from '@internship/ui';
import { Link } from 'react-router-dom';
type ContentsProps = {
  categoryName;
};

export const Contents: React.FC<ContentsProps> = ({ categoryName }) => {
  const [detail, setDetail] = useState<ContentDetailResponse>();
  const [page, setPage] = useState({ number: 0 });
  console.log(categoryName);
  useEffect(() => {
    if (categoryName) {
      api.auth
        .categoryContentPage(categoryName, page.number)
        .then((r) => setDetail(r))
        .catch((e) => console.error(e));
    } else {
      api.auth
        .contentPage(page.number)
        .then((r) => setDetail(r))
        .catch((e) => console.error(e));
    }
  }, [page.number]);
  return (
    <div>
      {detail?.content?.map((content) => {
        return (
          <div key={content.id}>
            <div className="card mt-1">
              <div className="card-header">
                <Row>
                  <Col sm={10}>
                    <h4>
                      <b className="text-black-50">Konu Başlığı</b>
                    </h4>
                  </Col>
                  <b className="text-black-50">{content.category.categoryName}</b>
                </Row>
                <Row>
                  <Col sm={10}>
                    <b className="text-black-50">{content.user.username}</b>
                  </Col>
                  <b className="text-black-50">Beğeni Bilgisi</b>
                </Row>
                <Row className="justify-content-md-center">
                  <b className="text-black-50">{content.timestap}</b>
                </Row>
              </div>
              <div className="p-1">{content.content}</div>
              <Link className="btn btn-sm mt-2" variant="outline-primary" to={'/content'}>
                {' '}
                <b>Daha Fazlası..</b>
              </Link>
            </div>
          </div>
        );
      })}
      <Row className="justify-content-md-center">
        <Col xs lg="1">
          {!detail?.first ? (
            <Button className="btn btn-sm mt-2" variant="outline-primary" onClick={() => setPage({ number: page.number - 1 })}>
              {'<'}
            </Button>
          ) : null}
        </Col>
        <Col xs lg="1">
          {!detail?.last ? (
            <Button className="btn btn-sm mt-2 " variant="outline-primary" onClick={() => setPage({ number: page.number + 1 })}>
              {'>'}
            </Button>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};
export default Contents;

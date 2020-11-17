import { Col, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { api, ContentDetailResponse } from '@internship/shared/api';
import { Button } from '@internship/ui';
import { Link } from 'react-router-dom';
import {format} from 'timeago.js';
type ContentsProps = {
  categoryName;
};

export const Contents: React.FC<ContentsProps> = ({ categoryName }) => {
  const [detail, setDetail] = useState<ContentDetailResponse>();
  const [page, setPage] = useState({ number: 0 });
  useEffect(() => {
    if (categoryName) {
      api.auth
        .categoryContentPage(categoryName, page.number)
        .then((r) => setDetail(r))
        .catch((e) => console.error(e));
    } else {
      api.auth
        .contentsPage(page.number)
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
                    <Link className="btn  mt-2" to={'/content/' + content.id}>
                      <h4 className="ml-n4">
                        <b>{content.contentHeader}</b>
                      </h4>
                    </Link>
                  </Col>
                  <Link className="nav-link" to={'/category/' + content.category.id}>
                    <b className="text-primary ml-n3">{content.category.categoryName}</b>
                  </Link>
                </Row>
                <Row>
                  <Col sm={10}>
                    <b className="text-black-50 ml-n3">{content.user.name} </b>
                    <b className="text-black-50">{content.user.lastname} </b>
                  </Col>
                  <b className="text-black-50">Beğeni Bilgisi</b>
                </Row>
                <Row className="justify-content-md-center">
                  <b className="text-black-50">{format(content.timestap)}</b>
                </Row>
              </div>
              <div className="p-1">{content.content}</div>
              <Link className="btn btn-sm mt-2" variant="outline-primary" to={'/content/' + content.id}>
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

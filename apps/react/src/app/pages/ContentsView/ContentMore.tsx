import React, { useEffect, useState } from 'react';
import { api, ContentsDetailResponse } from '@internship/shared/api';
import { Col, Row } from 'react-bootstrap';

type ContentMoreProps = {
  contentId;
};

export const ContentMore: React.FC<ContentMoreProps> = ({ contentId }) => {
  const [detail, setDetail] = useState<ContentsDetailResponse[]>();
  useEffect(() => {
    api.auth
      .contentPage(contentId)
      .then((r) => setDetail(r))
      .catch((e) => console.error(e));
  }, []);
  console.log(detail);
  return (
    <div>
      {detail?.map((d, key) => (
        <div key={key} className="card mt-1">
          <div className="card-header">
            <Row>
              <Col sm={10}>
                <h4>
                  <b className="text-black-50">Konu Başlığı</b>
                </h4>
              </Col>
              <b className="text-black-50">{d.category.categoryName}</b>
            </Row>
            <Row>
              <Col sm={10}>
                <b className="text-black-50">{d.user.username}</b>
              </Col>
              <b className="text-black-50">Beğeni Bilgisi</b>
            </Row>
            <Row className="justify-content-md-center">
              <b className="text-black-50">{d.timestap}</b>
            </Row>
          </div>
          <div className="p-1">{d.content}</div>
        </div>
      ))}
    </div>
  );
};
export default ContentMore;

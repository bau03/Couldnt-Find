import React, { useEffect, useState } from 'react';
import { api, ContentsDetailResponse } from '@internship/shared/api';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {format} from 'timeago.js';
import { Button } from '@internship/ui';
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

  const onClickLike=()=>{
    api.auth.like(contentId);
  };

  const onClickDislike=()=>{
    api.auth.dislike(contentId);
  };

  console.log(detail);
  return (
    <div>
      {detail?.map((d, key) => (
        <div key={key} className="card mt-1">
          <div className="card-header">
            <Row>
              <Col sm={10}>
                <h4 className="ml-n3">
                  <b className="text-black-50">{d.contentHeader}</b>
                </h4>
              </Col>
              <Link className="nav-link" to={'/category/' + d.category.id}>
                <b className="text-primary ml-n3">{d.category.categoryName}</b>
              </Link>
            </Row>
            <Row>
              <Col sm={10}>
                <b className="text-black-50 ml-n3">{d.user.name} </b>
                <b className="text-black-50 ">{d.user.lastname} </b>
              </Col>
              <b className="text-black-50">Beğeni Bilgisi</b>
            </Row>
            <Row className="justify-content-md-center">
              <b className="text-black-50">{format(d.timestap)}</b>
            </Row>
          </div>
          <div className="p-1">{d.content}</div>
        </div>
      ))}
      <Button onClick={onClickLike}>Beğen</Button>
      <Button onClick={onClickDislike}>Beğenme</Button>
    </div>
  );
};
export default ContentMore;

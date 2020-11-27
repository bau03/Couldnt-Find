import { Col, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { api, ContentDetailResponse } from '@internship/shared/api';
import { Button } from '@internship/ui';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { faComment, faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTemporary } from '@internship/shared/hooks';
import { useDispatch } from 'react-redux';
type ContentsProps = {
  categoryName;
  contentHeaders;
};

export const Contents: React.FC<ContentsProps> = ({ categoryName, contentHeaders }) => {
  const [detail, setDetail] = useState<ContentDetailResponse>();
  const [page, setPage] = useState({ number: 0 });
  const { isSuccessRequired, isErrorRequired } = useTemporary();
  const dispatch = useDispatch();
  console.log(isErrorRequired);
  useEffect(() => {
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    if (categoryName) {
      api.auth
        .categoryContentPage(categoryName, page.number)
        .then((r) => setDetail(r))
        .catch((e) => console.error(e));
    } else if (contentHeaders) {
      api.auth
        .searchContentHeaders(contentHeaders, page.number)
        .then((r) => setDetail(r))
        .catch((e) => console.error(e));
    }
    else {
      api.auth
        .contentsPage(page.number)
        .then((r) => setDetail(r))
        .catch((e) => console.error(e));
    }
  }, [page.number, categoryName, contentHeaders]);
  return (
    <div>
      {isSuccessRequired === 'searchSuccess' ? (
        <div className="alert alert-primary" role="alert">
          <b className="h3 text-capitalize">{contentHeaders}</b> konu başlığı hakkında bulunan sonuçlar.
        </div>
      ) : null}
      {isErrorRequired === 'searchFail' ? (
        <div className="alert alert-danger" role="alert">
          <b className="h3 text-capitalize">{contentHeaders}</b> konu başlığı hakkında herhangi bir sonuç bulunamadı.
        </div>
      ) : (
        <>
          {detail?.content?.map((content) => {
            return (
              <div key={content.id}>
                <div className="card mt-3">
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
                      <b className="text-black-50 ">
                        <FontAwesomeIcon className="small" icon={faHeart} /> {content.contentLikeNumber}{' '}
                      </b>
                      <b className="text-black-50 ml-2">
                        <FontAwesomeIcon className="small" icon={faHeartBroken} /> {content.content_dislike_number}
                      </b>
                      <b className="text-black-50 ml-2 ">
                        <FontAwesomeIcon className="small" icon={faComment} /> {content.comment_number}
                      </b>
                    </Row>
                    <Row className="justify-content-md-center">
                      <b className="text-black-50">{format(content.timestap)}</b>
                    </Row>
                  </div>
                  <div className={content.content.length > 100 ? 'p-1 text-truncate' : 'p-1'}>{content.content}</div>
                  <Link className="btn btn-sm mt-2" variant="outline-primary" to={'/content/' + content.id}>
                    {' '}
                    <b>Daha Fazlası..</b>
                  </Link>
                </div>
              </div>
            );
          })}
        </>
      )}
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

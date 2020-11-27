import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { api, ContentDetailResponse } from '@internship/shared/api';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

export const TrendContentView = () => {
  const [detail, setDetail] = useState<ContentDetailResponse>();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    api.auth
      .trendContent()
      .then((r) => setDetail(r))
      .catch((e) => console.error(e));
  }, []);
  console.log(detail);
  return (
    <Container>

          <Carousel className={'mt-5 bg-dark'}>
            {detail?.content?.map((content) => {
              return (
                <Carousel.Item key={content.id}>
                  <div key={content.id}>
                    <Row className="justify-content-lg-center">
                      <div className="card mt-4 w-75 m-md-5">
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
                        <div className={content.content.length > 60 ? 'p-1 text-truncate' : 'p-1'}>{content.content}</div>
                        <Link className="btn btn-sm mt-2" variant="outline-primary" to={'/content/' + content.id}>
                          {' '}
                          <b>Daha Fazlası..</b>
                        </Link>
                      </div>
                    </Row>
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>

    </Container>
  );
};
export default TrendContentView;

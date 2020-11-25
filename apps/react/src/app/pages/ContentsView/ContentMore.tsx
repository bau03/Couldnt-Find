import React, { useEffect, useState } from 'react';
import { api, ContentsDetailResponse } from '@internship/shared/api';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { ContentLike } from '@internship/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { getUserName } from '@internship/shared/utils';
import { useAuthentication, useTemporary } from '@internship/shared/hooks';
import { CommentView, CreateComment } from '../Comment';
import { useDispatch } from 'react-redux';
type ContentMoreProps = {
  contentId;
};

export const ContentMore: React.FC<ContentMoreProps> = ({ contentId }) => {
  const [detail, setDetail] = useState<ContentsDetailResponse[]>();
  const { isAuthenticated } = useAuthentication();
  const { isSuccessRequired } = useTemporary();
  const dispatch = useDispatch();
  const [past, setPast] = useState({ content: [], last: true });
  const [page, setPage] = useState({ number: 0 });
  useEffect(() => {
    api.auth
      .contentPage(contentId)
      .then((r) => setDetail(r))
      .catch((e) => console.error(e));
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
  }, [isSuccessRequired === 'contentlike', isSuccessRequired === 'commentSuccess', isSuccessRequired === 'contentdislike']);

  const onClickLike = () => {
    api.auth.like(contentId);
  };
  const onClickDislike = () => {
    api.auth.dislike(contentId);
  };

  const createComment = (buttonClick, commentlikebutton, commentbackbutton) => {
    buttonClick && setPage({ number: page.number = 0 });
    api.auth
      .commentPage(contentId, page.number, 3)
      .then((r) =>
        setPast((previous) => ({
          ...r,
          content: buttonClick
            ? [...r?.content]
            : commentlikebutton
            ? [...r?.content]
            : commentbackbutton
            ? [...r?.content]
            : [...previous?.content, ...r?.content],
        }))
      )
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    createComment(null, null, null);
  }, []);

  const onClickNextComment = () => {
    setPage({ number: page.number = page.number + 1 });
    createComment(null, null, null);
  };
  const onClickBackComment = () => {
    setPage({ number: page.number = 0 });
    createComment(null, null, true);
  };

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
              <b className="text-black-50">{d.userLike.username}</b>
              <Row>
                <b className="text-black-50">
                  <FontAwesomeIcon icon={faHeart} /> {d.content_like_number}{' '}
                </b>
                <b className="text-black-50 ml-2">
                  <FontAwesomeIcon icon={faHeartBroken} /> {d.content_dislike_number}
                </b>
                <b className="text-black-50 ml-2">
                  <FontAwesomeIcon className="small" icon={faComment} /> {d.comment_number}
                </b>
              </Row>
            </Row>
            <Row className="justify-content-md-center">
              <b className="text-black-50">{format(d.timestap)}</b>
            </Row>
          </div>
          <div className="p-1">{d.content}</div>
          <hr />
          {isAuthenticated ? (
            <Row className="ml-1 mt-2">
              {d.userLike.some((element) => element.username === getUserName()) ||
              d.userDislike.some((element) => element.username === getUserName()) ? (
                <>
                  <ContentLike
                    onClick={onClickLike}
                    disabled={d.userDislike.some((element) => element.username === getUserName())}
                    variant={d.userLike.some((element) => element.username === getUserName()) ? 'outline-danger' : 'outline-dark'}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </ContentLike>
                  <ContentLike
                    onClick={onClickDislike}
                    disabled={d.userLike.some((element) => element.username === getUserName())}
                    variant={d.userDislike.some((element) => element.username === getUserName()) ? 'outline-danger' : 'outline-dark'}
                  >
                    <FontAwesomeIcon icon={faHeartBroken} />
                  </ContentLike>
                </>
              ) : (
                <>
                  <ContentLike onClick={onClickLike}>
                    <FontAwesomeIcon icon={faHeart} />
                  </ContentLike>
                  <ContentLike onClick={onClickDislike}>
                    <FontAwesomeIcon icon={faHeartBroken} />
                  </ContentLike>
                </>
              )}
              <CommentView
                past={past}
                onClickNextComment={onClickNextComment}
                onClickBackComment={onClickBackComment}
                createComment={createComment}
              />
              <CreateComment contentId={contentId} handleCreateComment={createComment} />
            </Row>
          ) : null}
        </div>
      ))}
    </div>
  );
};
export default ContentMore;

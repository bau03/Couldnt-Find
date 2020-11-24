import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ContentLike } from '@internship/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { api } from '@internship/shared/api';
import { getUserName } from '@internship/shared/utils';
import { useTemporary } from '@internship/shared/hooks';

type CommentViewProps = {
  past;
  onClickNextComment;
  createComment;
  onClickBackComment;
};

export const CommentView: React.FC<CommentViewProps> = ({ past, onClickNextComment, createComment, onClickBackComment }) => {
  const { isSuccessRequired } = useTemporary();
  console.log(isSuccessRequired);

  const onClickLike = (commentid) => {
    api.auth.commentlike(commentid);
  };
  if (isSuccessRequired === 'like') {
    createComment(null, true);
  } else if (isSuccessRequired === 'dislike') {
    createComment(null, true);
  }

  const onClickDislike = (commentid) => {
    api.auth.commentdislike(commentid);
    createComment(null, true);
  };
  return (
    <Container className="mt-2 mr-3">
      {past.first ? null : (
        <b className="btn btn-sm mt-2" onClick={onClickBackComment}>
          Önceki yorumları gör
        </b>
      )}
      {past?.content?.map((d, key) => (
        <div key={key} className="alert alert-secondary mr-3">
          <Row className="ml-0">
            <Col className="ml-md-n1">
              <b className="mr-2">{d?.user?.name}</b>
              <b>{d?.user?.lastname}</b>
            </Col>
            <Col>
              <b>{d?.timestap}</b>
            </Col>
            <hr/>
          </Row>
          <Row className="ml-0">
            <Col className="ml-md-n1">
            <b className="text-black-50">
              <FontAwesomeIcon icon={faThumbsUp} /> {d.comment_like_number}
            </b>
            <b className="text-black-50 ml-2">
              <FontAwesomeIcon icon={faThumbsDown} /> {d.comment_dislike_number}
            </b>
            </Col>
          </Row>
          <Row className="ml-0">
            <Col>
              <b className="text-black-50">{d.comment}</b>
            </Col>

          </Row>
          <Row className="justify-content-center">
            {d?.userLike?.some((element) => element.username === getUserName()) ||
            d?.userDislike?.some((element) => element.username === getUserName()) ? (
              <>
                <ContentLike
                  onClick={() => onClickLike(d.id)}
                  disabled={d?.userDislike?.some((element) => element.username === getUserName())}
                  variant={d?.userLike?.some((element) => element.username === getUserName()) ? 'outline-primary' : 'outline-dark'}
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                </ContentLike>
                <ContentLike
                  onClick={() => onClickDislike(d.id)}
                  disabled={d.userLike.some((element) => element.username === getUserName())}
                  variant={d.userDislike.some((element) => element.username === getUserName()) ? 'outline-primary' : 'outline-dark'}
                >
                  <FontAwesomeIcon icon={faThumbsDown} />
                </ContentLike>
              </>
            ) : (
              <>
                <ContentLike onClick={() => onClickLike(d.id)}>
                  <FontAwesomeIcon icon={faThumbsUp} />
                </ContentLike>
                <ContentLike onClick={() => onClickDislike(d.id)}>
                  <FontAwesomeIcon icon={faThumbsDown} />
                </ContentLike>
              </>
            )}
          </Row>
        </div>
      ))}
      {past.last ? null : (
        <b className="btn btn-sm mt-2" onClick={onClickNextComment}>
          Diğer yorumları gör
        </b>
      )}
    </Container>
  );
};
export default CommentView;

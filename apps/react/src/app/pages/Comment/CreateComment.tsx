import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Button, Input } from '@internship/ui';
import { useForm } from 'react-hook-form';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { commentAsync } from '@internship/store/authentication';
import { useTemporary } from '@internship/shared/hooks';

type CreateCommentProps = {
  contentId;
  handleCreateComment;
};

export const CreateComment: React.FC<CreateCommentProps> = ({ contentId, handleCreateComment }) => {
  const { handleSubmit, register, errors, reset } = useForm();
  const dispatch = useDispatch();
  const { isSuccessRequired } = useTemporary();
  const onSubmit = (values) => {
    values = { ...values, "content_id": contentId };
    dispatch(commentAsync.request(values));

    reset();
  };
  if (isSuccessRequired === 'commentSuccess') {
    handleCreateComment(true);
  }
  return (
    <Container className="mt-3 mr-3">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="content">
          <Row>
            <Col>
              <Input
                className="form-control rounded-pill"
                placeholder={'Create Comment'}
                name="comment"
                ref={register({ required: true })}
                errors={errors}
              />
            </Col>
            <Button className="rounded-circle mb-md-5 mr-2" variant={'outline-dark'} type="submit">
              <FontAwesomeIcon icon={faShare} />
            </Button>
          </Row>
        </Form.Group>
      </Form>
    </Container>
  );
};

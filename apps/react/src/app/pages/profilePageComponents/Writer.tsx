import { Accordion, Alert, Card, Col, Container, Form, Row } from 'react-bootstrap';
import React  from 'react';
import { Button, Input } from '@internship/ui';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { writerAsync } from '@internship/store/authentication';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTemporary } from '@internship/shared/hooks';
import { BsTextarea } from 'react-icons/all';

export const Writer = () => {
  const { handleSubmit, register, errors } = useForm();
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(writerAsync.request(values));
  };

  return (
    <Container>
      <Row>
        <h3>Be a Writer</h3>
      </Row>
      <Row>
        <Accordion>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            <FontAwesomeIcon icon={faInfoCircle} />
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Merhaba yazar olmak için mesleğinizi, eğitiminizi ve kısa biyografiniz ile başvuru yapabilirsiniz.</Card.Body>
          </Accordion.Collapse>
        </Accordion>
      </Row>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Row} controlId="job">
          <Form.Label column sm={2}>
            Job
          </Form.Label>
          <Col sm={4}>
            <Input  type="text" name="job"  ref={register({ required: true,
              maxLength: { value: 50, message: 'Job cannot exceed 50 characters' }, })} errors={errors}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="education">
          <Form.Label column sm={2}>
            Education
          </Form.Label>
          <Col sm={4}>
            <Input type="text" name="education"  ref={register({ required: true,
              maxLength: { value: 50, message: 'Education cannot exceed 50 characters' }})} errors={errors}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="biography">
          <Form.Label column sm={2}>
            Biography
          </Form.Label>
          <Col sm={4}>
            <Input type="textarea" name="biography"  ref={register({ required: true,
              maxLength: { value: 250, message: 'Biography cannot exceed 250 characters' }})} errors={errors}/>
          </Col>
        </Form.Group>
        <Row className="justify-content-center">
          <Button type="submit">
            Submit
          </Button>
        </Row>
      </Form>
      {isSuccessRequired ? <Alert variant="success">{isSuccessRequired}</Alert> : null}
    </Container>
  );
};
export default Writer;

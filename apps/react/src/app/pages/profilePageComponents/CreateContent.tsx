import { Accordion, Alert, Card, Col, Container, Form, Row } from 'react-bootstrap';
import React from 'react';
import { Button } from '@internship/ui';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { contentAsync } from '@internship/store/authentication';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTemporary } from '@internship/shared/hooks';
import { CgSelect, GiSelect } from 'react-icons/all';

export const CreateContent = () => {
  const { handleSubmit, register, getValues } = useForm();
  const { isSuccessRequired } = useTemporary();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    const firstPassword = getValues()['categoryId'];
    console.log(firstPassword);
    dispatch(contentAsync.request(values));
  };

  return (
    <Container>
      <Row>
        <h3>Create Content</h3>
      </Row>
      <Row>
        <Accordion>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            <FontAwesomeIcon icon={faInfoCircle} />
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Yeni bir içerik oluşturmak için ilgili kategoriyi şeçiniz.</Card.Body>
          </Accordion.Collapse>
        </Accordion>
      </Row>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Row} controlId="categoryId">
          <Form.Label column sm={2}>
            Category
          </Form.Label>
          <Col sm={4}>
            <Form.Control as="select" name="categoryId" ref={register({ required: true })}>
              <option value="1">Sağlık</option>
              <option value="2">Bilim</option>
              <option value="3">Teknoloji</option>
              <option value="4">Oyun</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="content">
          <Form.Label column sm={2}>
            Content
          </Form.Label>
          <Col sm={4}>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={5} name="content" ref={register({ required: true })} />
          </Col>
        </Form.Group>
        <Row className="justify-content-center">
          <Button type="submit">Submit</Button>
        </Row>
      </Form>
      {isSuccessRequired ? <Alert variant="success">{isSuccessRequired}</Alert> : null}
    </Container>
  );
};
export default CreateContent;

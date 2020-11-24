import { Accordion, Alert, Card, Col, Container, Form, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import { Button, Input, Popup} from '@internship/ui';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { contentAsync } from '@internship/store/authentication';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTemporary } from '@internship/shared/hooks';

type CreateContentProps = {
  setWriterInfo;
};

export const CreateContent: React.FC<CreateContentProps> = ({ setWriterInfo }) => {
  const { handleSubmit, register, getValues, errors } = useForm();
  const { isSuccessRequired } = useTemporary();
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    const firstPassword = getValues()['categoryId'];
    console.log(firstPassword);
    dispatch(contentAsync.request(values));
    setShow(false);
    setWriterInfo(false);
  };

  const handleClose = () => {
    setWriterInfo(false);
    setShow(false);
  };

  return (
    <Container>
      <Popup show={show} onHide={handleClose}>
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
          <Row>
            <Form.Group as={Row} controlId="categoryId">
              <Col>
                <Form.Label column sm={2} className="ml-3">
                  Category
                </Form.Label>
              </Col>
              <Col>
                <Form.Control className="form-control mt-2" as="select" name="categoryId" ref={register({ required: true })}>
                  <option value="1">Bilim</option>
                  <option value="2">Teknoloji</option>
                  <option value="3">Oyun</option>
                  <option value="4">Eğitim</option>
                  <option value="5">Sağlık</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </Row>

          <Form.Group controlId="contentHeader">
            <Row>
              <Col>
                <Form.Label column sm={0}>
                  Content Header
                </Form.Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Input className="ml-3 mt-2" type="text" name="contentHeader" ref={register({ required: true })} errors={errors} />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="content">
            <Row>
              <Col>
                <Form.Label column sm={2}>
                  Content
                </Form.Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <textarea
                  className="form-control ml-3"
                  rows={5}
                  cols={100}
                  id="exampleFormControlTextarea1"
                  name="content"
                  ref={register({ required: true })}
                />
              </Col>
            </Row>
          </Form.Group>
          <Row className="justify-content-center">
            <Button type="submit">Submit</Button>
          </Row>
        </Form>
        {isSuccessRequired ? <Alert variant="success">{isSuccessRequired}</Alert> : null}
      </Popup>
    </Container>
  );
};
export default CreateContent;

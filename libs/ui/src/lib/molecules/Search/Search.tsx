import React, { useState } from 'react';
import { Col, Form, FormControl, Row } from 'react-bootstrap';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Input } from '../../atoms/Input';
import { useForm } from 'react-hook-form';
import { Button } from '../../atoms/Button';
import { useHistory } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Search = () => {
  const [contentHeaders, setContentHeaders] = useState('');
  const { handleSubmit, register, errors, reset } = useForm();
  const history = useHistory();

  const onSubmit = (values) => {
    history.push('/search/' + contentHeaders);
    reset();
  };
  return (
    <Form inline className="mr-sm-4" onSubmit={handleSubmit(onSubmit)}>
      <Row className="mt-2">
        <Col className="p-md-0">
          <Input
            placeholder="Search"
            type="text"
            name="search"
            className="mr-sm-2 "
            onChange={(event) => setContentHeaders(event.target.value)}
            ref={register({ required: true })}
            errors={errors}
          />
        </Col>
        <Col>
          <Button className="border-0 rounded-pill" variant={'outline-light'} type="submit">
            <FontAwesomeIcon className="ml-2" icon={faSearch} style={{ marginRight: '10px' }} />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

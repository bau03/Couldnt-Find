import { Container, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { api, WriterDetailResponse } from '@internship/shared/api';
import { Button } from '@internship/ui';
import { useDispatch } from 'react-redux';
import { roleupdateAsync } from '@internship/store/authentication';

export const AdminWriterConfirmation = () => {
  const [detail, setDetail] = useState<WriterDetailResponse>();
  const [page, setPage] = useState({ number: 0 });
  const dispatch = useDispatch();
  const usersid = {
    id: detail?.user?.['id'],
  };
  useEffect(() => {
    api.auth
      .writerDetail()
      .then((r) => setDetail(r[page.number]))
      .catch((e) => console.error(e));
  }, [page.number]);

  const onClick = () => {
    setPage({ number: page.number + 1 });
  };
  const onClickBack = () => {
    setPage({ number: page.number - 1 });
  };
  const onClickSuccess = () => {
    dispatch(roleupdateAsync.request(usersid));
  };
  const onClickDanger = () => {
    console.log('kullanıcı yazar isteği iptal');
  };
  return (
    <Container>
      <h3>Yazarlık Başvurusu</h3>
      <div>
        <Row>
          <i className="text-black-50 ml-4"> Başvuru Yapan Kullanıcı Id: {detail?.user?.['id']}</i>
        </Row>
        <Row>
          <i className="text-black-50 ml-4"> Başvuru Yapan Kullanıcı: {detail?.user?.['username']}</i>
        </Row>
        <Row>
          <i className="text-black-50 ml-4"> Meslek: {detail?.job}</i>
        </Row>
        <Row>
          <i className="text-black-50 ml-4"> Eğitim:{detail?.education}</i>
        </Row>
        <Row>
          <i className="text-black-50 ml-4"> Başvuru Zamanı: {detail?.timestap}</i>
        </Row>
      </div>

      {page.number === 0 ? null : <Button onClick={onClickBack}>{'<'}</Button>}

      {detail ? <Button onClick={onClick}>{'>'}</Button> : null}

      <Button className="btn btn-success" onClick={onClickSuccess}>
        Onay
      </Button>
      <Button className="btn btn-danger" onClick={onClickDanger}>
        {'İptal'}
      </Button>
    </Container>
  );
};
export default AdminWriterConfirmation;

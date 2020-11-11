import { Alert, Container, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { api, WriterDetailResponse } from '@internship/shared/api';
import { Button } from '@internship/ui';
import { useDispatch } from 'react-redux';
import { roleupdateAsync } from '@internship/store/authentication';
import { useTemporary } from '@internship/shared/hooks';

export const AdminWriterConfirmation = () => {
  const [detail, setDetail] = useState<WriterDetailResponse>();
  const [page, setPage] = useState({ number: 0 });
  const { isSuccessRequired } = useTemporary();
  const dispatch = useDispatch();
  const updateusersid = {
    id: detail?.user?.['id'],
    writerid: detail?.id,
  };
  const deleteuserid = {
    id: null,
    writerid: detail?.id,
  };
  useEffect(() => {
    api.auth
      .writerDetail()
      .then((r) => setDetail(r[page.number]))
      .catch((e) => console.error(e));
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
  }, [page.number]);
  const onClickNext = () => {
    setPage({ number: page.number + 1 });
  };
  const onClickBack = () => {
    setPage({ number: page.number - 1 });
  };
  const onClickSuccess = () => {
    dispatch(roleupdateAsync.request(updateusersid));
    if(detail){
      setPage({ number: page.number + 1 });
    }
  };
  const onClickDanger = () => {
    dispatch(roleupdateAsync.request(deleteuserid));
    if(detail){
      setPage({ number: page.number + 1 });
    }

  };
  return (
    <Container>
      <h3>Yazarlık Başvuruları</h3>
      <div>
        {detail ? (
    <>
      <Row>
        <i className="text-black-50 ml-4"> Başvuru Yapan Kullanıcı Id: {detail?.user?.['id']}</i>
      </Row>
      <Row>
        <i className="text-black-50 ml-4"> Başvuru Yapan Kullanıcı Adı: {detail?.user?.['username']}</i>
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
    </>
        ) : <Alert variant="warning">Henüz bir başvuru bulunmuyor</Alert> }

      </div>

      {page.number === 0 ? null : (
        <Button variant="outline-primary" onClick={onClickBack}>
          {'<'}
        </Button>
      )}
      <Button variant="outline-success ml-2 " disabled={!detail} onClick={onClickSuccess}>
        Onay
      </Button>
      <Button variant="outline-danger ml-2"  disabled={!detail} onClick={onClickDanger}>
        İptal
      </Button>
      {detail ? (
        <Button variant="outline-primary ml-2" onClick={onClickNext}>
          {'>'}
        </Button>
      ) : null}
      {isSuccessRequired ? <Alert variant="success">{isSuccessRequired}</Alert> : null}
    </Container>
  );
};
export default AdminWriterConfirmation;

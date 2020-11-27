import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { api, CategoryDetailResponse } from '@internship/shared/api';
import { Link } from 'react-router-dom';

export const CategoryView = () => {
  const [detail, setDetail] = useState<CategoryDetailResponse[]>();
  useEffect(() => {
    api.auth
      .categoryPage()
      .then((r) => setDetail(r))
      .catch((e) => console.error(e));
  }, []);
  return (
    <Col sm={3} className="mt-2">
      <div className="card">
        <div className="card-header">
          <h4>
            <b className="text-black-50">Category</b>
          </h4>
        </div>

        {detail?.map((d, key) => (
          <div key={key}>
          <ul className="list-group list-group-flush">
            <li key={key} className="list-group-item ">
              <Link className="nav-link" to={'/category/' + d.id}>
                {' '}
                {d.categoryName}
              </Link>
            </li>
          </ul>
          </div>
        ))}
      </div>
    </Col>
  );
};
export default CategoryView;

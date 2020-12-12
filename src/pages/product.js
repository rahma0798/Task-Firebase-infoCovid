import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { productService } from '../services';
import './Page.css';

const Product = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [productLoading, setProductLoading] = useState(false);

  useEffect(() => {
    document.title = 'Task DTI';
  });

  useEffect(() => {
    setProductLoading(true);
    productService
      .product(limit, searchKey.length > 0 ? 0 : offset, searchKey)
      .then((res) => {
        // console.log(res.data);
        setDataProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setProductLoading(false);
      });
  }, [offset, searchKey]);

  const listProduct = dataProduct.map((data) => {
    return (
      <div key={data.id} className="gallery">
        <img src={data.variants[0].images[0].product_url} alt="Not Found" />
        <div>{data.name}</div>
        <div>
          Rp.
          {data.display_unit_price}
          ,-
        </div>
        <section className="desc">
          <div className="title">
            &quot;
            {data.description}
            &quot;
          </div>
        </section>
      </div>
    );
  });
  return (
    <div>
      <input
        id="input-search"
        type="text"
        placeholder="Search"
        onChange={(e) => {
          setSearchKey(e.target.value);
        }}
      />
      {productLoading ? <p className="load">Loading...</p> : listProduct}
      <ReactPaginate
        previousLabel="<<"
        nextLabel=">>"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={4}
        onPageChange={(e) => {
          setOffset(limit * e.selected);
        }}
        containerClassName="pagination-product"
        // subContainerClassName="pages pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default Product;

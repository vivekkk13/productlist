import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import "./App.css";
import { getProductList } from "./services/ApiCalls";
import Offcanvas from "react-bootstrap/Offcanvas";

function App() {
  let [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  let [cartCount, setCartCount] = useState([]);
  const [newcartCount, setNewCartCount] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ProductList = async (searchProduct) => {
    const ans = await getProductList(searchProduct);
    setProducts(ans?.data.products);
    console.log("serchhh===>", searchProduct);
  };

  useEffect(() => {
    ProductList(searchProduct);
  }, [searchProduct]);

  const cart = (item) => {
    setNewCartCount(item);
    console.log("carttsssss===>", newcartCount);
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light ">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Product List
          </a>
          <div className="icon" onClick={handleShow}>
            <i className="fas fa-shopping-cart">{cartCount}</i>
          </div>
        </div>
      </nav>

      <h1 className="products">Products</h1>
      <div class="input-group rounded">
        <input
          type="search"
          class="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setSearchProduct(e.target.value)}
          aria-describedby="search-addon"
        />
      </div>
      {/* <div class="card mb-3" style="max-width: 540px;"> */}
      <Row>
        {products && products.length > 0 ? (
          products.map((item, id) => (
            <Col md={6}>
              <div class="card mb-3">
                <div class="row g-0">
                  <div class="col-md-4" key={id}>
                    <img src={item.thumbnail} />
                  </div>

                  <div class="col-md-8">
                    <div class="col-md-8">
                      <div class="card-body">
                        <div>
                          <h5 class="card-title">{item.title}</h5>
                          {/* <p class="card-text">{item.description}</p> */}
                          <p class="card-text">{item.brand}</p>
                          <p class="card-text">{item.category}</p>

                          <p class="card-text">${item.price}</p>
                          <button
                            type="button"
                            class="btn btn-outline-secondary"
                            onClick={() => {
                              cart(item);
                            }}
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <>
            <div className="">No Data Found</div>
          </>
        )}
      </Row>
      <Offcanvas placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart Items</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body></Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default App;

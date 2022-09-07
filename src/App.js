import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { getProductList } from "./services/ApiCalls";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Pagination1 } from "./common/Pagination";
function App() {
  let [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  let [cart, setCart] = useState([]);
  let [showCartItem, setShowCartItem] = useState([]);
  const [show, setShow] = useState(false);
  const [showPerPage, setShowPerPage] = useState(20);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ProductList = async (searchProduct) => {
    const ans = await getProductList(searchProduct);
    setProducts(ans?.data.products);
  };

  useEffect(() => {
    ProductList(searchProduct);
    console.log("ProductList====>", products);
  }, [searchProduct]);

  useEffect(() => {
    console.log("cart====>", cart);
  }, [cart]);

  let addToCart = (item) => {
    setCart([...cart, item]);
    setShowCartItem(cart);
  };

  const handeRemove = (item) => {
    let newCart = cart.filter((value) => value.id !== item.id);
    setCart(newCart);
  };

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light ">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Product List
          </a>
          <div className="icon" onClick={handleShow}>
            <i className="fas fa-shopping-cart">{cart.length}</i>
          </div>
        </div>
      </nav>
      <h1 className="products">Products</h1>

      <div className="searchinput">
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
      </div>
      {/* <div class="card mb-3" style="max-width: 540px;"> */}
      <Container>
        <Row className="g-4">
          {products && products.length > 0 ? (
            products.slice(pagination.start, pagination.end).map((item, id) => (
              <Col md={6}>
                <div class="shadow-lg p-3 mb-5 bg-white rounded">
                  <div class="product_card mb-3">
                    <div class="row g-0">
                      <div class="col-md-5" key={id}>
                        <div className="thumImg">
                          <img src={item.thumbnail} />
                        </div>
                      </div>

                      <div class="col-md-7">
                        <div class="card-body">
                          <h5 class="card-title">{item.title}</h5>
                          {/* <p class="card-text">{item.description}</p> */}
                          <p class="card-text">{item.brand}</p>
                          <p class="card-text">{item.category}</p>

                          <p class="card-text">${item.price}</p>
                          <button
                            type="button"
                            class="btn btn-outline-secondary"
                            onClick={() => addToCart(item)}
                          >
                            Add to cart
                          </button>
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
      </Container>
      <Offcanvas placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart Items</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          {cart.map((item) => {
            return (
              <div>
                <div class="card w-90">
                  <div class="card-body1">
                    <h5 class="card-title1">{item.title}</h5>
                    <img src={item.thumbnail} className="imgs" />
                    <div className="removebutton">
                      <button
                        type="button"
                        class="btn btn-outline-info"
                        onClick={() => handeRemove(item)}
                      >
                        Remove item
                      </button>
                    </div>
                    <div className="offcanvascardtext">
                      <p class="card-text">{item.brand}</p>
                    </div>
                    <div className="offcanvascardtext1">
                      <p class="card-text">{item.category}</p>
                    </div>
                    <div className="offcanvascardtext2">
                      <p class="card-text">${item.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Offcanvas.Body>
      </Offcanvas>
      <Pagination1
        showPerPage={showPerPage}
        onPaginationChange={onPaginationChange}
        total={products.length}
      />
    </>
  );
}

export default App;

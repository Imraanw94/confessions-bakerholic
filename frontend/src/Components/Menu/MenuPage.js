import { useEffect, useState } from "react";
import { Card, Container, Row, Stack } from "react-bootstrap";
import { getCookie } from "../../cookieService";
import AddProduct from "./Products/AddProduct";
import Product from "./Products/Product";
import AddRecommendedProduct from "./Recommended/AddRecommendedProduct";
import RecommendedProduct from "./Recommended/RecommendedProduct";

// This page is where users can view products for sale by the business
// Or they can recommend products to sell
function MenuPage(props) {
  /**
   * @type {array}
   * productsData is used to store the data received from the API call
   */
  const [productsData, setProductsData] = useState([]);
  /**
   * @type {array}
   * recommendedData is used to store the data received from the API call
   */
  const [recommendedData, setRecommendedData] = useState([]);
  /**
   * @type {boolean}
   * tokenExists is used to indicate whether there is a token or not
   */
  const [tokenExists, setTokenExists] = useState(false);
  /**
   * @type {string}
   * token is used to store the token cookie
   */
  const [token, setToken] = useState(getCookie("token"));
  /**
   * @type {boolean}
   * tokenExists is used to indicate whether the user is an admin or not
   */
  const [isAdmin, setIsAdmin] = useState(false);

  // UserId used to perform CRUD operations
  const userId = getCookie("user");

  // This function gets the cookies of admin and token and sets the boolean value of each
  function checkCookie() {
    let isAdminCheck = getCookie("admin");
    setIsAdmin(isAdminCheck === "true");
    let tokenCheck = getCookie("token");
    setTokenExists(tokenCheck !== "");
  }

  // This function is used to fetch the Products in the DB
  async function fetchProducts() {
    const response = await fetch("/allproducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setProductsData(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  // This function is used to fetch the Recommended Products in the API
  // We use a POST instead of a GET because we have to pass the user ID to fetch the relevant Product Recommendations
  async function fetchRecommendedProducts() {
    const response = await fetch("/allrecommended", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: userId }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setRecommendedData(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  // Asynchronous function for adding a Product
  async function addProductHandler(product) {
    const response = await fetch("/addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setProductsData(data);
        alert("Added information of a new product");
      });
  }

  // Asynchronous function for editing a Product
  async function editProductHandler(product) {
    const response = await fetch("/editproduct", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setProductsData(data);
      });
  }

  // Asynchronous function for deleting a Product
  async function deleteProductHandler(id) {
    const response = await fetch("/deleteproduct", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: id.value, userId: userId }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setProductsData(data);
      });
  }

  // Asynchronous function for adding a Product Recommendation
  async function addRecommendationHandler(recommended) {
    const response = await fetch("/addrecommended", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recommended),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setRecommendedData(data);
      });
  }

  // Asynchronous function for editing a Product Recommendation
  async function editRecommendationHandler(recommended) {
    const response = await fetch("/editrecommended", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recommended),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setRecommendedData(data);
      });
  }

  // Asynchronous function for deleting a Product Recommendation
  async function deleteRecommendationHandler(id) {
    const response = await fetch("/deleterecommended", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ recommendedId: id.value, userId: userId }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setRecommendedData(data);
      });
  }

  // Since this is a functional component, we can use the useEffect hook to
  // fetch the data.
  // Empty array indicates to call the fetch function on initial load of the
  // page
  // Reviewers often tell me to check for warnings, but this is the cause of those warnings
  // This is intended functionality
  useEffect(() => {
    fetchProducts();
    checkCookie(); // Check cookies on initial load
    if (tokenExists) {
      fetchRecommendedProducts();
    }
  }, []);

  return (
    <Container style={{ marginTop: "15px" }}>
      <Card body className="mb-3 menu-header header text-center">
        <h1 style={{ fontStyle: "italic" }}>
          These are some of the delicious baked goods we're selling
        </h1>
      </Card>

      {isAdmin && (
        <Row>
          <AddProduct onAddProduct={addProductHandler}></AddProduct>
        </Row>
      )}

      <hr />
      <Row>
        <Stack direction="horizontal" gap={2} className="products grid-stack">
          {productsData.map((product, index) => (
            <Product
              key={product._id}
              id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              userId={userId}
              isAdmin={isAdmin}
              onEditProduct={editProductHandler}
              onDeleteProduct={deleteProductHandler}
            />
          ))}
        </Stack>
      </Row>

      <hr />
      {tokenExists && (
        <AddRecommendedProduct
          onAddRecommendedProduct={addRecommendationHandler}
        />
      )}

      <hr />
      <Row>
        <Stack
          direction="horizontal"
          gap={2}
          className="recommended grid-stack"
        >
          {recommendedData.map((recommended, index) => (
            <RecommendedProduct
              key={recommended._id}
              id={recommended._id}
              name={recommended.name}
              recipe={recommended.recipe}
              picture={recommended.picture}
              userId={userId}
              isAdmin={isAdmin}
              onEditRecommendedProduct={editRecommendationHandler}
              onDeleteRecommendedProduct={deleteRecommendationHandler}
            />
          ))}
        </Stack>
      </Row>
    </Container>
  );
}

export default MenuPage;

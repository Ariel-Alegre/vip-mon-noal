/* import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./CardCatalogo.module.css";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useSelector, useDispatch } from "react-redux";
import { AllProducts } from "../../redux/action";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";

export default function CardCatalogo() {
  const dispatch = useDispatch();
  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Camisetas");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const allProducts = useSelector((state) => state.allProducts);
  const location = useLocation();

  useEffect(() => {
    dispatch(AllProducts());
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageParam = params.get("page");
    setCurrentPage(pageParam ? parseInt(pageParam) : 1);
  }, [location.search]);

  // Ordenar los productos por la marca de tiempo 'createdAt' en orden descendente
  const sortedProducts = allProducts.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Obtener todas las categorías y subcategorías únicas de los productos
  const categories = [...new Set(allProducts.map((product) => product.category))];
  const subcategories = selectedCategory
    ? [...new Set(allProducts.filter((product) => product.category === selectedCategory).map((product) => product.subcategory))]
    : [];

  // Filtrar los productos por categoría y subcategoría seleccionadas
  const filteredProducts = currentProducts.filter((product) => {
    if (selectedCategory && selectedSubcategory) {
      return product.category === selectedCategory && product.subcategory === selectedSubcategory;
    } else if (selectedCategory) {
      return product.category === selectedCategory;
    } else {
      return true;
    }
  });

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  return (
    <div className={`bg-black ${styles.Catalogo_container}`}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className={styles.select_category}>
          <div className="mt-2.5">
            <select
              className={` ${styles.select_border}  block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6`}
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2.5">
            <select
              className={` ${styles.select_border}  block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6`}
              onChange={handleSubcategoryChange}
              value={selectedSubcategory}
            >
              <option value="">Seleccionar subcategoría</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>
        </div>
        <h2 className={`${styles.text_destacado} font-bold tracking-tight`}>
          Productos
        </h2>
        <div className={styles.data_complete}>
          <div className={styles.ul_container}>
            {filteredProducts.map((product) => (
              <ul key={product.id}>
                <li>
                  {product.subcategory}{" "}
                </li>
              </ul>
            ))}
          </div>
          <div
            className={`mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ${styles.card}`}
          >
            {filteredProducts.map((product) => (
              <div key={product.id}>
                <Link
                  to={`/detalles/${product.id}?page=${currentPage}`}
                  key={product.id}
                >
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        src={product.imageFile[0]}
                        alt="Imagen de producto"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.product}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          €{product.price}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <Pagination
          count={Math.ceil(filteredProducts.length / productsPerPage)}
          sx={{ marginTop: "16px" }}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`${location.pathname}?page=${item.page}`}
              {...item}
              style={{ color: "#ffc400", fontSize: "20px" }}
            />
          )}
        />
      </div>
    </div>
  );
}
 */
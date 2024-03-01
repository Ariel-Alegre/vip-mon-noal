import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './DeletePost.module.css';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useSelector, useDispatch } from 'react-redux';
import { AllProducts, deleteProduct } from '../../redux/action';
import Button from '@mui/material/Button';
export default function DeletePost() {
  const dispatch = useDispatch();
  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const allProducts = useSelector((state) => state.allProducts);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
    dispatch(AllProducts());
      
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageParam = params.get('page');
    setCurrentPage(pageParam ? parseInt(pageParam) : 1);
  }, [location.search]);
  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

  const offset = (currentPage - 1) * productsPerPage;

  const filteredProducts = selectedCategory
    ? allProducts.filter((product) => product.category === selectedCategory)
    : allProducts;

    const sortedProducts = allProducts.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // Obtener todas las categorías únicas de los productos
  const categories = [...new Set(allProducts.map((product) => product.category))];
  const handleDeleteProduct = (productId) => {
    try {
      dispatch(deleteProduct(productId)); 
      
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(async () => {
        window.location.reload()
      }, 1000);
    }
  };
  return (
    <div className={`bg-white ${styles.Catalogo_container}`}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className={styles.select_category}>
          <div className="mt-2.5">
            <select
              className={` ${styles.select_border}  block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6`}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">seleccionar categoria</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={`mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ${styles.card}`}>

          {currentProducts.map((product) => (
            <div>

            <Link to={`/detalles/${product.id}`} key={product.id}>
              <div className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img src={product.imageFile[0]} alt={product.imageAlt} style={{ backgroundColor: product.backgroundColor }} />
                </div>

                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <label className={styles.text_title}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.product}
                      </label>
                    </h3>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <label className={styles.text_title}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        €{product.price}
                      </label>
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
            <Button variant="contained" sx={{backgroundColor: 'red', ':hover': {backgroundColor: 'red'}}} onClick={() => handleDeleteProduct(product.id)}>Eliminar</Button> {/* Botón para eliminar un producto */}
            </div>
          ))}
        </div>

        <Pagination
          count={Math.ceil(allProducts.length / productsPerPage)}
          sx={{ marginTop: '16px' }}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`${location.pathname}?page=${item.page}`}

              {...item}
              style={{ color: 'black', fontSize: '20px' }} // Personaliza el color de los números
            />
          )}
        />
      </div>
    </div>
  );
}

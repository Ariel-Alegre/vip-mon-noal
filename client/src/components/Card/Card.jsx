import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import styles from './Card.module.css'
import West from './West'
import { AllProducts } from '../../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function CardCatalog() {
  const dispatch = useDispatch();
  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const allProducts = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(AllProducts());
  }, [dispatch]);

 
  const offset = (currentPage - 1) * productsPerPage;

  // Aplicar el filtro según la categoría seleccionada
 
  const currentProducts = allProducts.slice(offset, offset + productsPerPage);

  return (
    <div className="bg-black">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className={`${styles.text_destacado } font-bold tracking-tight `}>Lo mas destacado</h2>

        <div className={`mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ${styles.card}`}>
        {currentProducts.map((product) => (
            <Link to={`/detalles/${product.id}?page=${currentPage}`} key={product.id}>
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
          ))}
        </div>
            <West/>
      </div>
    </div>
  )
}

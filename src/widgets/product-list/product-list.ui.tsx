import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const ProductList = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      image:
        'https://i.pinimg.com/736x/10/f8/14/10f81413b3ea7e86c19b604bacfe1184.jpg',
      title: 'Чехол для iPhone',
      price: '1,500 сом',
    },
    {
      id: 2,
      image:
        'https://i.pinimg.com/736x/8f/c2/33/8fc233a0a643da38ac421038f3b49359.jpg',
      title: 'Чехол для Samsung',
      price: '1,800 сом',
    },
    {
      id: 3,
      image:
        'https://i.pinimg.com/736x/e6/f8/96/e6f896b726a7fe83a306673b2c5c4a18.jpg',
      title: 'Универсальные аксессуары',
      price: '2,000 сом',
    },
    {
      id: 4,
      image:
        'https://i.pinimg.com/736x/f9/80/c6/f980c6f2aa1e2abcaf1a4bcaecca5d56.jpg',
      title: 'Зарядное устройство',
      price: '1,200 сом',
    },
    {
      id: 5,
      image:
        'https://i.pinimg.com/736x/c6/cd/4c/c6cd4c602f2b23e28e1707cecc60e92c.jpg',
      title: 'Наушники Bluetooth',
      price: '3,500 сом',
    },
    {
      id: 6,
      image:
        'https://i.pinimg.com/736x/cb/90/77/cb90774f15d99a17d025178ea06d514e.jpg',
      title: 'Силиконовые чехлы',
      price: '1,000 сом',
    },
    {
      id: 7,
      image:
        'https://i.pinimg.com/736x/35/48/db/3548db6a1c370785734b58de5a6b1403.jpg',
      title: 'Кабель Type-C',
      price: '800 сом',
    },
    {
      id: 8,
      image:
        'https://i.pinimg.com/736x/13/a0/27/13a0277c206f54eec4e1c33893c9d649.jpg',
      title: 'Портативный аккумулятор',
      price: '4,500 сом',
    },
  ];

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fav) => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  return (
    <div className="w-full flex flex-wrap  px-4 py-8 gap-5">
      {products.map((product) => (
        <div
          key={product.id}
          className="relative w-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow md:w-64 h-70"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-40 object-cover"
          />
          <div className="p-4 flex flex-col gap-2 flex-1">
            <h3 className="text-sm font-semibold text-[black]/80">
              {product.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{product.price}</p>
            <div className="mt-auto flex items-center justify-between">
              <button className="px-4 py-1 bg-blue-600 border  text-violet border-violet rounded-lg flex items-center gap-2">
                <ShoppingCartIcon fontSize="small" className='text-violet' />В корзину
              </button>
              <button
                className="border border-violet p-1 rounded-lg "
                onClick={() => toggleFavorite(product.id)}
              >
                {favorites.includes(product.id) ? (
                  <FavoriteIcon fontSize="small" className='text-violet' />
                ) : (
                  <FavoriteBorderIcon fontSize="small"  className='text-violet' />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

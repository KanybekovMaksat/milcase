import React, { useState, useRef, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { getCookie } from 'typescript-cookie';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export function Header() {
  const isAuth = getCookie('access');
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cartQuantity, setCartQuantity] = useState(0); // To store the total cart quantity
  const navigate = useNavigate();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuOpen(!menuOpen);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
    setAnchorEl(null);
  };

  const calculateCartQuantity = () => {
    // Retrieve cart data from localStorage
    const cartData = JSON.parse(localStorage.getItem('CARTStorage') || '{}');
    // Calculate the total quantity of items in the cart
    return Object.values(cartData).reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  };

  useEffect(() => {
    // Set initial cart quantity
    setCartQuantity(calculateCartQuantity());

    // Listen for changes in localStorage and update cart quantity
    const handleStorageChange = () => {
      setCartQuantity(calculateCartQuantity());
    };

    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      className="bg-white shadow font-medium px-1 md:px-20 border-b border-milk "
    >
      <Toolbar className="flex justify-between w-full">
        <div className="">
          <IconButton
            edge="end"
            color="inherit"
            ref={menuButtonRef}
            onClick={handleMenuClick}
          >
            <MenuIcon className="text-black" />
          </IconButton>
        </div>
        <Link to={pathKeys.home()} className="flex items-center gap-2">
          <img src="/logo.png" className="h-[50px] rounded-full" alt="Logo" />
        </Link>
        <div className="flex items-center gap-1">
          <Tooltip title="Избранное">
            <IconButton onClick={() => navigate('/favorites')} color="inherit">
              <FavoriteRoundedIcon className="text-violet" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Корзина">
            <IconButton onClick={() => navigate('/cart')} color="inherit">
              <Badge
                badgeContent={cartQuantity} // Set the badge content to the cart quantity
                color="secondary"
              >
                <ShoppingCartIcon className="text-violet" />
              </Badge>
            </IconButton>
          </Tooltip>
          {isAuth ? (
            <Tooltip title="Личный кабинет">
              <IconButton onClick={() => navigate('/profile')} color="inherit">
                <PersonRoundedIcon className="text-violet" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Войти">
              <IconButton onClick={() => navigate('/login')} color="inherit">
                <LoginIcon className="text-violet" />
              </IconButton>
            </Tooltip>
          )}
        </div>
        <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleCloseMenu}>
          <Link to={pathKeys.catalog()} className="no-underline">
            <MenuItem
              onClick={handleCloseMenu}
              className="text-dove hover:text-milk font-semibold text-[16px]"
            >
              Каталог
            </MenuItem>
          </Link>
          <Link to={pathKeys.about()} className="no-underline">
            <MenuItem
              onClick={handleCloseMenu}
              className="text-dove hover:text-milk font-semibold text-[16px]"
            >
              О нас
            </MenuItem>
          </Link>
          <Link to={pathKeys.loyalty()} className="no-underline">
            <MenuItem
              onClick={handleCloseMenu}
              className="text-dove hover:text-milk font-semibold text-[16px]"
            >
              Программа лояльности
            </MenuItem>
          </Link>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

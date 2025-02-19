import React, { useState, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { getCookie } from 'typescript-cookie';

export function Header() {
  const isAuth = getCookie('access');
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  return (
    <AppBar
      position="fixed"
      className="bg-white  shadow font-medium px-1 md:px-20 border-b border-milk "
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
            <IconButton onClick={() => navigate('/my-cart')} color="inherit">
              <LocalMallRoundedIcon className="text-violet" />
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
          <MenuItem onClick={handleCloseMenu}>
            <Link
              to={pathKeys.ranking()}
              className="text-dove hover:text-milk font-semibold text-[16px]"
            >
              Каталог
            </Link>
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            <Link
              to={pathKeys.course.root()}
              className="text-dove hover:text-milk font-semibold text-[16px]"
            >
              О нас
            </Link>
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            <Link
              to={pathKeys.loyalty()}
              className="text-dove hover:text-milk font-semibold text-[16px]"
            >
              Программа лояльности
            </Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

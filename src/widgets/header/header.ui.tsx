import { AppBar, Avatar, IconButton, InputBase, Toolbar, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import { pathKeys } from '~shared/lib/react-router';

export function Header() {
  return (
    <AppBar position="static" className="bg-white shadow font-medium px-6 md:px-20">
      <Toolbar className="flex justify-between">
        <Link to={pathKeys.home()} className="flex items-center gap-2">
          <Typography className="font-semibold text-[20px] text-tundora">Milcase</Typography>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to={pathKeys.ranking()}
            className="text-dove hover:text-blue font-semibold text-[16px]"
          >
            Каталог
          </Link>
          <Link
            to={pathKeys.course.root()}
            className="text-dove hover:text-blue font-semibold text-[16px]"
          >
            О нас
          </Link>
          <Link
            to={pathKeys.profile.badges()}
            className="text-dove hover:text-blue font-semibold text-[16px]"
          >
           Программа лояльности
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-alto px-3 py-1 rounded-full">
            <SearchIcon className="text-dove" />
            <InputBase
              placeholder="Поиск..."
              className="ml-2 text-sm  text-dove focus:outline-none"
            />
          </div>
          <Tooltip title="Корзина">
            <IconButton color="inherit">
              <ShoppingCartIcon className="text-dove" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Войти">
            <IconButton color="inherit">
              <LoginIcon className="text-dove" />
            </IconButton>
          </Tooltip>
          <div className="md:hidden">
            <IconButton edge="end" color="inherit">
              <MenuIcon className="text-gray-600" />
            </IconButton>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { pathKeys } from "~shared/lib/react-router";
import SchoolIcon from "@mui/icons-material/School";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";

export function Footer() {
  return (
    <Box component="footer" className="bg-tundora text-white py-6 px-40">
      <div className="container mx-auto px-4 pb-7 flex flex-col sm:flex-row items-center justify-around">
        <Link to={pathKeys.home()} className="flex items-center mb-4 sm:mb-0">
          <Typography variant="h6" component="div" className="ml-2 text-center sm:text-left">
            Milcase
          </Typography>
        </Link>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link to="/about" className="text-gray-300 hover:text-white text-sm">
            О платформе
          </Link>
          <Link to="/privacy" className="text-gray-300 hover:text-white text-sm">
            Политика конфиденциальности
          </Link>
          <Link to="/terms" className="text-gray-300 hover:text-white text-sm">
            Условия использования
          </Link>
        </div>

        <div className="mt-4 sm:mt-0 flex space-x-4">
          <a target="_blank" href="" className="text-gray-300 hover:text-white">
            <TelegramIcon />
          </a>
          <a target="_blank" href="" className="text-gray-300 hover:text-white">
            <InstagramIcon />
          </a>
        </div>
      </div>

      <Typography
        variant="body2"
        className="text-gray-400 text-center mt-4 text-sm  flex items-center justify-center gap-3"
      >
       Developed by Malika
      </Typography>
    </Box>
  );
}

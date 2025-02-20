import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useState } from 'react';
import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import { IconButton } from '@mui/material';

export const CartButton = () => {
  const [quantity, setQuantity] = useState(0);
  return (
    <div>
      {quantity === 0 ? (
        <button
          className="px-4 py-1 border text-violet hover:bg-violet transition-all duration-300 hover:text-white border-violet rounded-lg flex items-center gap-2"
          onClick={() => setQuantity(1)}
        >
          <ShoppingCartIcon className="text-inherit" /> В корзину
        </button>
      ) : (
        <div className="flex items-center gap-2 rounded border border-violet">
          <IconButton
            className="border border-milk p-1 rounded-lg "
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 0))}
            aria-label="В Избранное"
          >
            <IndeterminateCheckBoxRoundedIcon className="text-milk" />
          </IconButton>

          <span className="text-lg font-semibold text-violet">{quantity}</span>
          <IconButton
            className=" p-1 rounded-lg "
            onClick={() => setQuantity((prev) => Math.max(prev + 1, 0))}
            aria-label="В Избранное"
          >
            <AddBoxIcon className="text-milk" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

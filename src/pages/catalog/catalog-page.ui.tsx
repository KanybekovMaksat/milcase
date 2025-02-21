import { useState } from 'react'; 
import {   CircularProgress,   TextField,   InputAdornment,   MenuItem,   Checkbox,   FormControlLabel, } from '@mui/material'; 
import { Search, ExpandMore } from '@mui/icons-material'; 
import { productQueries } from '~entities/product'; 
import { Title } from '~shared/ui/title'; 
import ProductCard from './../../entities/product/ui/Card';  

export function CatalogPage() {   
  const {     
    data: productData,     
    isLoading,     
    isError,   
  } = productQueries.useGetProducts();   

  const [selectedCategory, setSelectedCategory] = useState('');   
  const [selectedModel, setSelectedModel] = useState('');   
  const [openDropdown, setOpenDropdown] = useState(false);   
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [     
    { name: 'iPhone', models: ['iPhone 13', 'iPhone 14', 'iPhone 15'] },     
    { name: 'Samsung', models: ['Galaxy S21', 'Galaxy S22', 'Galaxy S23'] },   
  ];   

  if (isLoading) {     
    return (       
      <div className="flex flex-col items-center gap-4">         
        <CircularProgress className="text-milk w-10 h-10" />         
        <h3 className="text-milk font-semibold text-lg opacity-75">           
          Загружаем данные...         
        </h3>       
      </div>     
    );   
  }   

  if (isError) {     
    return (       
      <div className="flex flex-col items-center gap-4">         
        <h3 className="text-milk font-semibold text-lg opacity-75">           
          Произошла ошибка при загрузке данных!         
        </h3>       
      </div>     
    );   
  }   

  const filteredProducts = productData.data.results.filter((product) => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (     
    <div className="min-h-screen w-full p-4">       
      <Title>Каталог чехлов</Title>       
      <div className="flex flex-col md:flex-row md:justify-between gap-[50px] mt-10">         
        <div className="w-full md:w-64 p-4 bg-white shadow-md rounded-lg">           
          <TextField             
            fullWidth             
            variant="outlined"             
            placeholder="Поиск..."             
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{               
              startAdornment: (                 
                <InputAdornment position="start">                   
                  <Search />                 
                </InputAdornment>               
              ),             
            }}           
          />            
          <div className="mt-4">             
            {categories.map((category) => (               
              <div key={category.name}>                 
                <div                   
                  className="flex items-center justify-between cursor-pointer py-2"                   
                  onClick={() =>                     
                    setOpenDropdown(                       
                      openDropdown === category.name ? '' : category.name                     
                    )                   
                  }                 
                >                   
                  <span className="font-semibold">{category.name}</span>                   
                  <ExpandMore                     
                    className={`transition-transform ${                       
                      openDropdown === category.name ? 'rotate-180' : ''                     
                    }`}                   
                  />                 
                </div>                 
                {openDropdown === category.name && (                   
                  <div className="pl-4">                     
                    {category.models.map((model) => (                       
                      <FormControlLabel                         
                        key={model}                         
                        control={                           
                          <Checkbox                             
                            checked={selectedModel === model}                             
                            onChange={() => setSelectedModel(model)}                           
                          />                         
                        }                         
                        label={model}                       
                      />                     
                    ))}                   
                  </div>                 
                )}               
              </div>             
            ))}           
          </div>         
        </div>         
        <div className="md:w-[900px] flex flex-wrap gap-[10px]">           
          {filteredProducts.map((product) => (             
            <ProductCard key={product.id} product={product} />           
          ))}         
        </div>       
      </div>     
    </div>   
  ); 
}

import Logo from '../assets/Images/logo.svg'
import Basket from '../assets/Images/basket.svg'
import React, { useEffect, useState } from 'react'
import Vector from '../assets/Images/Vector.svg'
import axios from 'axios'
import { Button, Popover } from 'antd'
import {ProductCard} from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import {getProduct} from '../store/reducer'
import { useNavigate } from 'react-router-dom'

interface CategoryType {
  id: string,
  title: string
}

interface PizzaType extends CategoryType {
  title: string;
  imageUrl: string;
  types: Array<number>;
  sizes: Array<number>;
  price: number;
  category: number;
  rating: number;
  count: number;
}
interface getObjetStore {
  id: string | undefined;
  img: string | undefined;
  title: string | undefined;
  size: string[];
  type: string[];
  price: number | undefined;
  count: number;
}
interface storeType {
  orderProduct: Array<getObjetStore>
}


function Product() {
  const orderProduct = useSelector((state: storeType) => state.orderProduct)
  const BuyList = useSelector((state:storeType) => state.orderProduct)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [category, setCategory] = useState<CategoryType[]>([])
  const [productList, setProduct] = useState<PizzaType[]>([])
  const [type, setType] = useState("тонкое")
  const [size, setSize] = useState("26 см.")

  const [sortValue, setSortValue] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [categoryId, setCategoryId] = useState<string>("")


  useEffect(() => {
    axios.get('http://localhost:3000/category').then(res => {
    setCategory(res.data)      
  })
}, [])

  useEffect(() => {
  axios.get('http://localhost:3000/pizza').then(res => {
    setProduct(res.data)      
})
}, [])

useEffect(() => {
  axios.get(`http://localhost:3000/pizza?category=${categoryId}&_sort=${sortValue}`).then(res => {
      setIsLoading(false)
      setProduct(res.data)
  })
},[sortValue, categoryId])

const handleChangeSelect = (evt: React.ChangeEvent<HTMLSelectElement>) => {
  setIsLoading(true)
  setTimeout(() => {
      setSortValue(evt.target.value);
  },800)
  
}
const content = (
  <select className='outline-none' onChange={handleChangeSelect}>
    <option value="rating" className='p-2 transition-all duration-300 hover:bg-[#FE5F1E0D] hover:rounded-md hover:text-[#FE5F1E] font-bold text-[14px] leading-[17.05px] cursor-pointer'>популярности</option>
    <option value="price" className='p-2 transition-all duration-300 hover:bg-[#FE5F1E0D] hover:rounded-md hover:text-[#FE5F1E] font-bold text-[14px] leading-[17.05px] cursor-pointer'>по цене</option>
    <option value="title" className='p-2 transition-all duration-300 hover:bg-[#FE5F1E0D] hover:rounded-md hover:text-[#FE5F1E] font-bold text-[14px] leading-[17.05px] cursor-pointer'>по алфавиту</option>
  </select>
);
const buyClicked = (evt: React.MouseEvent<HTMLButtonElement>) => {
  const clickId = ((evt.target as HTMLButtonElement).id);
  const orderData:PizzaType | undefined = productList.find(item => item.id === clickId)
  const data: any = {
    id: orderData?.id,
    img: orderData?.imageUrl,
    title: orderData?.title,
    size: size,
    type: type,
    price: orderData?.price,
    count: 1
  }
  dispatch(getProduct(data))
}

function totalPrice() {
  return BuyList.reduce((sum: number, value: getObjetStore) => {
    return sum += (value.price !== undefined) ? value.price : 0;
  }, 0);
}

return (
  <div>

  <div className="pt-[49px] pl-[77px] pr-[38px] pb-[40px] flex items-center justify-between">
  <a href="">
  <img src={Logo} alt="Site logo" width={316} height={48} />
  </a>
  <button onClick={() => navigate('/buy')} className='flex items-center justify-center gap-[13px] bg-[#FE5F1E] rounded-[30px] py-[12.5px] w-[150px]'>
  <span className='text-white text-[16px] font-bold leading-[19.49px]'>{totalPrice()} ₽</span>
  <span className='bg-[#FFFFFF40] block w-[1px] h-[25px]'></span>
  <div className='flex items-center gap-[8px]'>
  <img src={Basket} alt="Basket icon" width={16} height={16} />
  <span className='text-white text-[16px] font-bold leading-[19.49px]'>{orderProduct.length}</span>
  </div>
  </button>
  </div>
  <div className='pl-[12px]'>
  <span className='h-[1px] bg-[#F6F6F6] block '></span>
  </div>
  <div className='pt-[40px] pl-[67px] pr-[48px] pb-[32px] flex items-center justify-between'>
  <ul className=' flex items-center gap-[8.95px]'>
  {
    category.length > 0 && category.map(item => (
      <button onClick={() => {
        if(item.id == "0"){
          setCategoryId('');
        }
        else{
          setCategoryId(item.id);
        }
      }} className='rounded-[30px] cursor-pointer px-[25px] text-[#2C2C2C] text-[16px] leading-[19.49px] font-bold pt-[13.94px] pb-[16.74px] bg-[#F9F9F9] transition-all duration-300 hover:bg-[#282828] hover:text-white' key={item.id}>
       {item.title}
      </button>
    ))
  }
  </ul> 
  <Popover placement="bottomRight" content={content}>
    <Button className='flex items-center gap-[7px]'>
      <img src={Vector} alt="icon" width={10} height={6} />
      <p className="text-[#2C2C2C] text-[14px] leading-[17.05px] font-bold"> Сортировка по: 
      <span className="text-[#FE5F1E] text-[14px] leading-[17.05px] font-normal"> популярности</span>
      </p>
    </Button>
  </Popover>
  </div>
  <div className="pl-[67px] pr-[48px] pb-[31px]">
    <h2 className="text-[#000000] text-[32px] font-bold leading-[39px] mb-[35px]">Все пиццы</h2>
  <ul className='flex items-center justify-between flex-wrap'>
    {
       isLoading ? <h2 className="text-center text-[30px] mt-10">Loading...</h2> : productList.length > 0 && productList.map((item:PizzaType) => (
         <ProductCard id={item.id} buyClicked={buyClicked} setSizevalue={setSize} setTypevalue={setType} key={item.id} sizes={item.sizes} types={item.types} rating={item.rating} imageUrl={item.imageUrl} price={item.price} title={item.title}  category={item.category}/>
       ))
    }
  </ul>
  </div>
  </div>
)
}

export default Product
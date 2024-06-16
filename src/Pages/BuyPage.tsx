
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { incOrder, decOrder } from '../store/reducer';

import Logo from '../assets/Images/logo.svg'
import Empty from '../assets/Images/empty.svg'
import BasketInner from '../assets/Images/Basket-inner.svg'
import Trash from '../assets/Images/trash.svg'
import xImages from '../assets/Images/x.svg'
import  Arrow from '../assets/Images/arrow.svg'

interface getObjetStore {
  id: string;
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

function BuyPage() {
  const BuyList = useSelector((state:storeType) => state.orderProduct)
 const navigate = useNavigate() 
 const dispatch = useDispatch()

 function totalPrice(){
  return BuyList.reduce((sum:number, value:getObjetStore) => {
    return sum += (value.price !== undefined ) ? (value.price * value.count) : 0;
  }, 0)
 }
  return (
    <>
    <div className="pt-[49px] pl-[77px] pr-[38px] pb-[40px] flex items-center justify-between">
  <a href="/">
  <img src={Logo} alt="Site logo" width={236} height={48} />
  </a>
  </div>
  <div className='pl-[12px]'>
  <span className='h-[1px] bg-[#F6F6F6] block '></span>
  </div>
  <div>
    {
      BuyList.length ? 
      <>
      <div className='pt-[94px] pb-[131px] w-[821px] mx-auto'>
         <div className='flex items-center justify-between  mb-[30px]'>
          <div className='flex items-center gap-[17px]'>
          <img src={BasketInner} alt="Basket icon" width={29} height={29} />
          <h2 className='text-[32px] leading-[39px] font-bold'>Корзина</h2>
          </div>
          <button onClick={() => window.location.reload()} className='flex items-center gap-[7px]'>
          <img src={Trash} alt="Basket icon" width={29} height={29} />
          <span className='text-[#B6B6B6] text-[16px] leading-[19.49px] font-normal'>Очистить корзину</span>
          </button>
         </div>
          <span className='bg-[#F4F4F4] block w-full h-[1px]'></span>
        <div className='mb-[40px]'>
          {
            BuyList.map((item:any) => (
              <>
              <div key={item.id} className='flex items-center py-[30px]'>
             <div className='w-[375px] flex items-center gap-[15px] mr-[68px]'>
              <img src={item.img} alt="Pizza img" width={80} height={80} />
              <div className='flex flex-col space-y-[3px]'>
                <h3 className='text-[22px] font-bold leading-[26.8px]'>{item.title}</h3>
                <p className='text-[#8D8D8D] text-[18px] leading-[21.92px]'>{item.type}   тесто, <span> {item.size}</span></p>
              </div>
             </div>
               <div className='flex items-center gap-[12px] mr-[70px]'>
                <button id={item.id} onClick={() => item.count !=1 && item.id && dispatch(decOrder(item.id))} className='w-[32px] h-[32px] border-[#FE5F1E] border-[2px] rounded-[50%] text-[#FE5F1E] text-center font-bold'>-</button>
                 <p className='text-[22px] font-bold leading-[26.8px]'>{item.count}</p>
                <button id={item.id} onClick={() => item.id && dispatch(incOrder(item.id))}  className='w-[32px] h-[32px] border-[#FE5F1E] border-[2px] rounded-[50%] text-[#FE5F1E] text-center font-bold'>+</button>
               </div>
               <div className='mr-[90px]'>
                <strong className='text-[22px] font-bold leading-[26.8px]'>{item.price * item.count} ₽ </strong>
               </div>
               <button>
                <img src={xImages} alt="X icon" width={32} height={32} />
               </button>
              </div>
              <span className='bg-[#F4F4F4] block w-full h-[1px]'></span>
              </>
            ))
          }
        </div>

        <div className='flex items-center justify-between mb-[40px]'>
          <p className='text-[22px] leading-[26.8px]'> Всего пицц: <span className='text-[22px] leading-[26.8px] font-bold'>{BuyList.length}  шт.</span> </p>
          <p className='text-[22px] leading-[26.8px]'>Сумма заказа: {totalPrice()} ₽</p>
        </div>

          <div className='flex items-center justify-between'>
            <button onClick={() => navigate('/')} className='flex items-center gap-[12px] justify-center py-[17px] border-[1px] border-[#D3D3D3] w-[211px] rounded-[30px]'>
              <img src={Arrow} alt="Arrow icon" width={6} height={12} />
              <span className='text-[#CACACA] text-[16px] leading-[19.49px]'> Вернуться назад</span>
            </button>
            <button className='bg-[#FE5F1E] text-[16px] leading-[19.49px] font-bold rounded-[30px] w-[211px] text-white py-[17px] transition-all duration-300 hover:opacity-60'>Оплатить сейчас</button>
          </div>
        </div>
      </>
      : 
      (
        <div className='w-[547px] mx-auto'>
        <div className='flex items-center justify-center flex-col py-[163px]'>
            <h2 className=' text-[#000000] text-[32px] font-bold leading-[39px]'>Корзина пустая 😉</h2>
            <p className='text-[#777777] text-[18px] leading-[26.17px] mt-[10px] mb-[47px] text-center'>Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать пиццу, перейди на главную страницу.</p>
            <img src={Empty} alt="Empty image" width={300} height={255} />
            <button onClick={() => navigate('/')} className='w-[215px] mt-[74px] transition-all duration-300 hover:opacity-60 font-bold text-[16px] leading-[19.49px] bg-[#282828] rounded-[30px] text-[white] text-center py-[15px]'>Вернуться назад</button>
        </div>
        </div>
      )
    }
  </div>
    </>
  )
}

export default BuyPage
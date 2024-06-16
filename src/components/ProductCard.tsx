import { Segmented } from "antd";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

interface PizzaType {
    id:string;
    imageUrl: string;
    title: string;
    types?: Array<number>;
    sizes?: Array<number>;
    price: number;
    category?: number;
    rating?: number;
    setTypevalue:(value:string) => void;
    setSizevalue:(value:string) => void;
    buyClicked:(event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ProductCard:React.FC<PizzaType> = ({id, imageUrl, title, price, setSizevalue, setTypevalue, buyClicked}) => {

    const handleBuyClick = () => {
        toast.success("Your pizza has been added to the cart!");
    }

return (
            <li className="w-[280px] mb-[65px] " key={id}>
                <Toaster position="top-center"
  reverseOrder={false}
/>
            <img src={imageUrl} alt="Pizza img" width={260} height={260} />
            <h3 className="text-[#000000] font-extrabold text-[20px] mt-[11px] mb-[22px] leading-[24.36px] text-center">{title}</h3>
            <div>
            <Segmented<string>
            options={['тонкое', 'традиционное']}
            onChange={(value) => {
                setTypevalue(value);
            }}
            className="w-full p-2"
            />
            <Segmented<string>
            options={['26 см.', '30 см.', '40 см.']}
            onChange={(value) => {
               setSizevalue(value); 
            }}
            className="w-full p-2"
            />
            </div>
            <div className="mt-[17px] flex items-center justify-between">
                <p className="text-[#000000] text-[22px] leading-[26.8px] font-bold">от {price} ₽</p>
                <div onClick={handleBuyClick}>
                <button id={id} onClick={buyClicked} className="border-[1px] text-[#EB5A1E] transition-all duration-300 hover:bg-[#EB5A1E] hover:text-white rounded-[30px] border-[#EB5A1E] w-[132px] flex items-center gap-[7px] justify-center pt-[11px] pb-[14px]">
                    <svg id={id} width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="currentColor"/>
                    </svg>
                    <span id={id} className=" font-bold text-[16px] leading-[19.49px] ">Добавить</span>
                </button>
                </div>
                </div>
            </li>
)
}


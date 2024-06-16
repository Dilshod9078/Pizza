
import {lazy} from 'react'

const Product = lazy(() => import("./Product"))
const BuyProduct = lazy(() => import("./BuyPage"))

export { Product, BuyProduct }
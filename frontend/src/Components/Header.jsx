import ProductCarousel from "../Pages/Products/ProductCarousel"
import SmallProduct from "../Pages/Products/SmallProduct"
import { useGetTopProductsQuery } from "../Redux/api/productApiSlice"
import Loader from "./Loader"

const Header=()=>{
    const {data,isLoading,error}=useGetTopProductsQuery()
    
    if(isLoading){
        return <Loader/>
    }
    
    if(error){
        return <h1>ERROR</h1>
    }

    return <>
     <div className="flex flex-wrap text-white">
        <div className="xl:block lg:hidden md:hidden:sm:hidden">
            <div className="grid grid-cols-3">
               {data.map((product)=>(
                 <div key={product._id}>
                    <SmallProduct product={product}/>
                 </div>
               ))}
            </div>
        </div>
        <div className="ml-[30rem] pt-[5rem]">
            <ProductCarousel/>
        </div>
     </div>
    </>
}

export default Header;
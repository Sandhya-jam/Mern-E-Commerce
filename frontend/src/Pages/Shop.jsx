import { useEffect,useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useGetFilteredProductsQuery } from "../Redux/api/productApiSlice"
import { setCategories,setProducts,setChecked, setSelectedBrand } from "../Redux/features/shop/shopSlice"
import Loader from "../Components/Loader"
import { useFetchCategoriesQuery } from "../Redux/api/CategoryApiSlice"
const Shop = () => {
    const dispatch=useDispatch()
    const {categories,products,checked,radio}=useSelector(
        (state)=>state.shop
    );
    const categoriesQuery=useFetchCategoriesQuery()
    const [priceFilter,setPriceFilter]=useState('')

    const filteredProductsQuery=useGetFilteredProductsQuery({
        checked,
        radio,
    });

    useEffect(()=>{
       if(!categoriesQuery.isLoading){
          dispatch(setCategories(categoriesQuery.data))
       }
    },[categoriesQuery.data,dispatch])
    
    useEffect(()=>{
        if(!checked.length || !radio.length){
            if(!filteredProductsQuery.isLoading){
                //filter products based on both checked categories and price filter
                const filterProducts=filteredProductsQuery.data.filter((product)=>{
                    //check if product price includes the entered price filter value
                    return(
                        product.price.toString().includes(priceFilter) 
                        || product.price===parseInt(priceFilter,10) 
                    )
                });

                dispatch(setProducts(filterProducts));
            }
        }
    },[checked,radio,filteredProductsQuery.data,dispatch,priceFilter]);

    const handleBrand=(brand)=>{
        const productsByBrand=filteredProductsQuery.data?.filter(
            (product)=>product.brand===brand
        );
        dispatch(setProducts(productsByBrand))
    }

    const handleCheck=(value,id)=>{
        const updatedCheck=value?[...checked,id]:checked.filter((c)=>
        c!==id);
        dispatch(setChecked(updatedCheck))
    };

    //Add all brands options to uniqueBrands
    const uniqueBrands=[
        ...Array.from(
            new Set(filteredProductsQuery.data?.map((product)=>
            product.brand).filter((brand)=>
            brand!==undefined))
        ),
    ];

    const handlePriceChange=e=>{
        setPriceFilter(e.target.value)
    }
  return (
    <div className="container mx-auto text-white">
      <div className="flex md:flex-row">
          <div className="bg-[#151515] p-3 mt-2 mb-2">
            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
               Filter my Categories
            </h2>
            <div className="p-5 w-[15rem]">
                {categories?.map((c)=>(
                    <div key={c._id} className="mb-2">
                       <div className="flex items-center mr-4">
                          <input type="checkbox" 
                          id='red-checkbox'
                          onChange={(e)=>handleCheck(e.target.checked,c._id)}/>
                          <label htmlFor="pink-checkbox"
                          className="ml-2 text-sm font-medium text-white
                          dark:text-gray-300">
                            {c.name}
                          </label>
                       </div>
                    </div>
                ))}
            </div>
          </div>
      </div> 
    </div>
  )
}

export default Shop
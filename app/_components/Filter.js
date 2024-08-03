 "use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function Filter(){

    const searchParam=useSearchParams()
    const router=useRouter()
    const pathname=usePathname()

   const activeFilter=searchParam.get('capacity') ?? 'all'

    function handleFilter(filter){
        const params=new URLSearchParams(searchParam)
        params.set('capacity',filter)
        router.replace(`${pathname}?${params.toString()}`,{scroll:false})
    }
  
     return(
        <div className="border border-primary-800 flex">
            <Button handleFilter={handleFilter} filter='all' activeFilter={activeFilter}>
                All Cabins
            </Button>
            <Button handleFilter={handleFilter} filter='small' activeFilter={activeFilter}>
              1&mdash;3 Guests
            </Button>
            <Button filter='medium' handleFilter={handleFilter} activeFilter={activeFilter}>
              4&mdash;7 Guests
            </Button>
            <Button filter='large' handleFilter={handleFilter} activeFilter={activeFilter}>
              8&mdash;12 Guests
            </Button>
        </div>
     )
}

function Button({filter,handleFilter,activeFilter,children}){
  return <button className={`px-5 py-2 hover:bg-primary-700 ${filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''}`} onClick={()=>handleFilter(filter)}>
          {children}
   </button>
}
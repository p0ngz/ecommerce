import React from 'react'

const typeProduct = [
    {
        type: "Earring",
        imgSrc: "https://wpbingo-adena.myshopify.com/cdn/shop/collections/4.jpg?crop=center&height=450&v=1729845890&width=450"
    },
    {
        type: "Necklace",
        imgSrc: "https://wpbingo-adena.myshopify.com/cdn/shop/collections/2.jpg?crop=center&height=450&v=1729846016&width=450"
    },
    {
        type: "Rings",
        imgSrc: "https://wpbingo-adena.myshopify.com/cdn/shop/collections/1.jpg?crop=center&height=450&v=1729845853&width=450"
    },
    {
        type: "Bracelets",
        imgSrc: "https://wpbingo-adena.myshopify.com/cdn/shop/collections/cate-1.jpg?crop=center&height=450&v=1729845833&width=450"
    },
]
const TypeProducts = () => {
  return (
    <div id="type-products-container" className='w-full px-3 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5 lg:gap-7'>
      {typeProduct.map((item, index) => (
        <div key={index} className='flex flex-col items-center'>
          <img src={item.imgSrc} alt={item.type} className='w-full h-auto object-cover rounded-md' />
          <span className='mt-2 text-center'>{item.type}</span>
        </div>
      ))}
    </div>
  )
}

export default TypeProducts

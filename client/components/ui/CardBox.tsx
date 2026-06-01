import React from "react";

interface CardBoxProps{
  children: React.ReactNode;
  imageUrl?: string; 
}

export function CardBox({children, imageUrl}: CardBoxProps){
  return (
    <div className="group relative rounded-3xl overflow-hidden border border-neutral-800 flex flex-col h-[32rem] transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/50 hover:shadow-[0_0_25px_rgba(234,179,8,0.18)]">

      {/* image container */}
      <div className="absolute inset-0 w-full h-full">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
          src={imageUrl}
          alt="Card visual" 
          className="w-full h-full object-cover grayscale-[20%] opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
          />
        ):(
          // eslint-disable-next-line @next/next/no-img-element
          <img 
          src='/img/no-img-people.jpg'
          alt="Card visual" 
          className="w-full h-full object-cover grayscale-[20%] opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent-950/30 to-transparent"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 pt-4 space-y-4 border-t rounded-b-3xl border-neutral-800/60 bg-neutral-900/1 backdrop-blur-sm backdrop-saturate-[160%] ">
        {children}
      </div>
      
    </div>
  )  
}
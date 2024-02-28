import Image from "next/image";

export const CardPerson = ({ name, content, image }) => {
  const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${image}`;
  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-8 w-9/12 md:w-full">
      { 
        image
          ? <div className='min-w-36 min-h-36'><Image src={imgSrc} width={150} height={150} alt={image} className='rounded-full w-36 h-36 grayscale object-contain'/></div>
          : <div className='min-w-36 min-h-36'><Image src={'/image/userDefault.png'} width={150} height={150} alt='Avatar por defecto' className='rounded-full object-contain'/></div>
      }
      <div className="w-auto self-center">
        <p className="text-sm md:text-justify">{content}</p>
        <p className="text-sm font-semibold mt-5">{name}</p>
      </div>
    </div>
  );
};

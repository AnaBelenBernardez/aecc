import Image from "next/image";

export const CardPerson = ({ name, content, image }) => {
  const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${image}`;
  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-8 w-9/12">
      { 
        image
          ? <Image src={imgSrc} width={150} height={150} alt={image} className='rounded-full'/>
          : <Image src={'/image/userDefault.png'} width={150} height={150} alt='Avatar por defecto' className='rounded-full'/>
      }
      <div>
        <p className="text-sm">{content}</p>
        <p className="text-sm font-semibold mt-5">{name}</p>
      </div>
    </div>
  );
};

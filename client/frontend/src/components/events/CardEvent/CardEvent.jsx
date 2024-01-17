import Image from "next/image";
import Link from "next/link";

export const CardEvent = ({ title, description, image , location, link }) => {
  const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${image}`
  return (
    
    <div className="w-96 shadow-xl bg-secondLightGray overflow-hidden fade-in">
      <Image
        src={imgSrc}
        alt={title}
        width={384}
        height={233}
        className="w-full h-60 block object-cover rounded-xl"
      />
      <div className="mt-2 mx-3">
        <h2 className="font-bold text-lg mb-2">{title}</h2>
        <p>{description}</p>
        <div className="flex justify-end mt-3">
          <p className="border-2 border-primaryGreen rounded-xl text-xs font-semibold px-2 py-1">
            {location}
          </p>
        </div>
      </div>
      <Link href={link} target='_blank'>
        <button className="border-2 border-primaryGreen bg-primaryGreen rounded-2xl text-sm font-bold px-6 py-2 ml-3 mb-3 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen">
        PARTICIPA
      </button>
      </Link>
    </div>
  );
};

import Image from "next/image";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const CardEvent = ({
  title,
  description,
  image,
  location,
  link,
  warning,
}) => {
  const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${image}`;
  return (
    <div className="w-80 md:w-96 h-[520px] md:h-[500px] shadow-xl bg-secondLightGray overflow-hidden fade-in relative mx-4">
      {warning ? (
        <Link className="cursor-pointer" href="/noticias">
        <div className="flex bg-[#FF3C37] py-2 px-4 gap-2 items-center justify-center absolute top-3 left-3 rounded-full">
          <Image
            src={"/image/warning.svg"}
            width={24}
            height={24}
            alt="Aviso"
          />
          <p className="text-white">Aviso importante</p>
        </div>
        </Link>
      ) : null}
      <div className="w-full h-64">
        <LazyLoadImage
          src={imgSrc}
          alt={title}
          className="w-80 md:w-full h-64 block object-cover object-top rounded-xl"
          width={384}
          height={233}
          effect="opacity"
        />
      </div>
      
      <div className="mt-2 mx-3">
        <h2 className="font-bold text-lg h-12 md:h-10 mb-2 line-clamp-2">{title}</h2>
        <p className="h-24 line-clamp-4">{description}</p>
        <div className="flex justify-end mt-3">
          <p className="border-2 border-primaryGreen rounded-xl text-xs font-semibold px-2 py-1">
            {location}
          </p>
        </div>
      </div>
      <Link href={link} target="_blank">
        <button className="border-2 border-primaryGreen bg-primaryGreen rounded-2xl text-sm font-bold px-6 py-2 ml-3 mb-3 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen">
          PARTICIPA
        </button>
      </Link>
    </div>
  );
};

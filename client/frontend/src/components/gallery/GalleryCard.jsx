import Image from "next/image";
import { Location } from "../../lib/svg";

export const GalleryCard = ({ title, location, image }) => {
  const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${image}`;
  return (
    <div className="max-w-sm mx-auto relative shadow-md cursor-pointer rounded-xl">
      <Image
        src={imgSrc}
        alt="nature"
        className="w-[286px] h-[365px] object-cover object-top rounded-xl"
        width={500}
        height={500}
      />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-black bg-opacity-50 backdrop-blur text-white p-4 flex flex-col items-center gap-2 rounded-b-xl">
        <h1 className="text-2xl font-semibold h-16 line-clamp-2">{title}</h1>
        <div className="flex items-center gap-2">
          <Location />
          <p className="text-lg">{location}</p>
        </div>
      </div>
    </div>
  );
};

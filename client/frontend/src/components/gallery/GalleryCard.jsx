import Image from "next/image";
import { Location } from "../../lib/svg";

export const GalleryCard = ({ title, location, image }) => {
  const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${image}`
  return (
    <div className="max-w-sm mx-auto relative shadow-md rounded-lg cursor-pointer">
      <Image
        src={imgSrc}
        alt="nature"
        className="w-[300px] h-[300px] object-cover rounded-lg"
        width={500}
        height={500}
      />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-black bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg flex flex-col items-center gap-2">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="flex items-center gap-2">
          <Location />
          <p className="text-lg">{location}</p>
        </div>
      </div>
    </div>
  );
};

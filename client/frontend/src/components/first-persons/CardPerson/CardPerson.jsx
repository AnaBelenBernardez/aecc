import Image from "next/image";

export const CardPerson = ({ image, texto, name }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-8 w-9/12">
      <Image src={image} width={150} height={150} />
      <div>
        <p className="text-sm">{texto}</p>
        <p className="text-sm font-semibold mt-5">{name}</p>
      </div>
    </div>
  );
};

import Image from "next/image";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useLanguageStore } from "../../../store/language/language.store";


export const CardEvent = ({
  date,
  title,
  description,
  image,
  location,
  link,
  warning,
}) => {
  const language = useLanguageStore((state) => state.language);
  const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${image}`;
  return (
    <div className="min-w-[300px] md:max-w-[300px] h-[520px] shadow-xl bg-secondLightGray overflow-hidden fade-in relative md:mx-4 rounded-t-xl">
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
      <div className="w-[300px] h-64 rounded-t-lg">
        <Link href={link} target="_blank">
          <LazyLoadImage
            src={image ? imgSrc : '/image/NotImage.svg'}
            alt={image ? title : 'Todavía no hay imagen del evento para mostrar'}
            className="w-[300px] h-64 block object-cover object-top rounded-xl"
            effect="opacity"
          />
        </Link>
      </div>
      
      <div className="mt-2 mx-3">
        <h2 className="font-bold text-lg h-12 md:h-12 mb-2 line-clamp-2">{title}</h2>
        <p className="h-24 line-clamp-4">{description}</p>
        <div className="flex justify-end mt-3">
          <p className="border-2 border-primaryGreen rounded-xl text-xs font-semibold px-2 py-1">
            {language === "es" ? new Date(date).toLocaleDateString("es-ES", {
              day: "numeric",
              year: "numeric",
              month: "short"
            })
          : new Date(date).toLocaleDateString("es-ES", {
            day: "numeric",
            year: "numeric",
            month: "short"
          }).replace(/ene|feb|mar|abr|may|jun|jul|ago|sep|nov|dic/gi, match => {
            switch (match.toLowerCase()) {
                case 'ene':
                    return 'xan';
                case 'feb':
                    return 'feb';
                case 'mar':
                    return 'mar';
                case 'abr':
                    return 'abr';
                case 'may':
                    return 'mai';
                case 'jun':
                    return 'xuñ';
                case 'jul':
                    return 'xul';
                case 'ago':
                    return 'ago';
                case 'sep':
                    return 'sep';
                case 'nov':
                    return 'nov';
                case 'dic':
                    return 'dec';
                default:
                    return match;
            }
            }
            )
          }
          </p>
        </div>
      </div>
      <Link href={link} target="_blank">
        <button className="border-2 border-primaryGreen bg-primaryGreen rounded-2xl text-sm font-bold px-6 py-2 ml-3 mb-3 mt-2 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen">
          APÚNTATE
        </button>
      </Link>
    </div>
  );
};

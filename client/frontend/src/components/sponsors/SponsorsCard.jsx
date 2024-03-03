import Image from 'next/image';
import Link from 'next/link';

const SponsorsCard = ({ logo, name, description, link, important }) => {
  const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${logo}`;
  return (
    <article>
      <div className='h-[100px] w-[200px]'>
        <Link href={link} target='_blank'>
          <Image src={imgSrc} width={200} height={100} alt='Logo patrocinadores' className='h-[100px] w-[200px] object-contain'/>
        </Link>
      </div>
    </article>
  )
};

export default SponsorsCard;
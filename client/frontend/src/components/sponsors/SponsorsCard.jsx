import Image from 'next/image';

const SponsorsCard = ({ logo, name, description, link, important }) => {
  const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${logo}`;
  return (
    <article>
      <div className='h-[100px] w-[200px]'>
        <Image src={imgSrc} width={200} height={100} alt='Logo patrocinadores' className='h-[100px] w-[200px] object-contain'/>
      </div>
    </article>
  )
};

export default SponsorsCard;
import Image from 'next/image';

const Loading = () => {
  return (
    <main className='flex'>
      <div className='flex justify-center items-center flex-1'>
        <Image src={'/image/loading.svg'} height={150} width={150} alt='Cargando...'/>
      </div>
    </main>
  );
};

export default Loading;
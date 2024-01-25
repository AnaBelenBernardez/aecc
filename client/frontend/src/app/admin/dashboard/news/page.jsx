"use client"

import Loading from '../../../../components/loading/Loading';
import useGetAllNews from '../../../../hooks/useGetAllNews';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLoginStore } from '../../../../store';
import { deleteNewService } from '../../../../service';

const dashboardNews = () => {
  const router = useRouter();
  const token = useLoginStore((state) => state.token);
  if (!token) {
    router.push("/admin");
  }

  const { news, loading, error, refetch } = useGetAllNews();

  const handleClickDelete = async (id, token) => {
    await deleteNewService(id, token);
    refetch();
  }

  if (loading) return <Loading/>;

  return (
    <main className='flex flex-col my-4 px-4'>
      <button className='self-end border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 mb-6 lg:self-end lg:mb-2 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'>
        AÑADIR NOTICIA
      </button>
      {
        news.length > 0
          ? news.map((newItem) => {
            const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${newItem.photo}`
            return (
              <article className='flex flex-col justify-between p-8 items-center shadow-md' key={newItem.title}>
              <div>
                <div className='flex items-center'>
                  <p className='w-[52px] text-center flex items-center text-lightPink font-bold'>{new Date(newItem.news_date || newItem.create_date).toLocaleDateString('es-ES', { month: 'short', day: '2-digit', year: 'numeric' }).toLocaleUpperCase()}</p>
                  <h2 className='font-bold px-6 line-clamp-2 w-[240px]'>{newItem.title}</h2>
                </div>
                {
                  newItem.photo !== null
                    ? <div className='self-center hidden lg:block'>
                        <Image src={imgSrc} width={150} height={150} alt='Imagen de la noticia'/>
                      </div>
                    : <div className='self-center hidden lg:block'>
                        <Image src={'/image/newsDefault.png'} width={150} height={150} alt='Imagen de la noticia'/>
                      </div>
                }
              </div>
              <div className='self-end flex gap-4'>
                <button>
                  EDITAR
                </button>
                <button onClick={() => handleClickDelete(newItem.id, token)}>
                  ELIMINAR
                </button>
              </div>
              </article>
            )
            })
          : <div className='flex flex-col lg:flex-row lg:items-center lg:gap-8'>
              <Image src={'/image/noNewsYet.svg'} width={300} height={300} alt='Noticias'/>
              <p className='mt-2 font-bold text-center'>Todavía no hay noticias</p>
            </div>
      }
    </main>
  )
};

export default dashboardNews;
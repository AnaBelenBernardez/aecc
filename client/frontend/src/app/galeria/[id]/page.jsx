"use client"

import Loading from '../../../components/loading/Loading';
import useGetEvent from '../../../hooks/useGetEvent';
import { useParams, notFound } from 'next/navigation';
import PreviewImageModal from '../../../components/modals/images/PreviewImageModal';
import { useState } from 'react';
import Image from 'next/image';
import BlockScroll from '../../../components/blockScroll/BlockScroll';
import { useLanguageStore } from '../../../store';

const EventPhotos = () => {
  const [modalIndex, setModalIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {id} = useParams();
  const { event, loading, error } = useGetEvent(id);
  const [slideDirection, setSlideDirection] = useState(null);
  const language = useLanguageStore((state) => state.language);

  const openModal = (index) => {
    setIsModalOpen(true);
    setModalIndex(index);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalIndex(0);
  };

  const showPrevImage = () => {
    setModalIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setSlideDirection('right');
  };
  
  const showNextImage = () => {
    setModalIndex((prevIndex) => (prevIndex + 1) % images.length);
    setSlideDirection('left');
  };

  const images = event?.event_photos.map((photo) => {
    return process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${photo.photo}`
  })

  if (loading) return <Loading/>;

  if (error) {
    notFound();
  }

  const imgLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <main className='my-4'>
      {
        event 
          ? <>
              { 
                language
                  ? <h1 className='font-bold text-primaryGreen text-xl pt-4 pl-6 lg:text-3xl lg:pt-6 lg:pb-6 lg:pl-0 lg:ml-20'>{event.title}</h1>
                  : <h1 className='font-bold text-primaryGreen text-xl pt-4 pl-6 lg:text-3xl lg:pt-6 lg:pb-6 lg:pl-0 lg:ml-20'>{event.galician_title}</h1>
              }
              <div className="flex flex-col lg:grid lg:auto-rows-[240px] lg:grid-cols-4 gap-4 mx-20">
                {event.event_photos.slice(1).map((photo, i) => {
                  return (
                    <div
                      key={i}
                      className={`row-span-1 
                      ${i===2||i===5||i===8||i===16||i===20||i===26||i===30||i===33||i===40||i===46||i===50||i===56||i===60||i===63||i===70||i===76||i===80
                        ||i===86||i===90||i===96||i===100||i===106||i===110||i===113||i===120||i===126||i===130||i===136||i===140||i===146||i===150||i===156
                        ||i===160||i===163||i===170||i===176||i===180||i===186||i===190||i===196||i===200||i===206||i===210||i===216||i===220||i===226||i===230
                        ||i===233||i===240||i===246||i===250||i===256||i===260||i===266||i===270||i===273||i===280||i===286||i===290||i===296||i===300||i===306
                        ||i===310||i===313||i===320||i===326||i===330||i===336||i===340||i===346||i===350||i===356||i===360||i===363||i===370||i===376||i===380
                        ||i===386||i===390||i===396||i === 398 || i=== 400 ? "col-span-2 row-span-2" : ""}`}
                    >
                      <button onClick={() => openModal(i) } className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all ease-in-out duration-1000 rounded-xl">
                        <Image
                          width={400}
                          height={400}
                          loader={imgLoader}
                          alt={photo.photo}
                          src={process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${photo.photo}`}
                          className='w-full h-full object-cover grayscale hover:grayscale-0 transition-all ease-in-out duration-1000 rounded-xl'
                        />
                      </button>
                      
                    </div>
                  )
                  })}
              </div>
            </>
          : null
      }
      {isModalOpen && <PreviewImageModal
        images={images}
        currentIndex={modalIndex}
        onClose={closeModal}
        onPrev={showPrevImage}
        onNext={showNextImage}
        slideDirection={slideDirection}
        setSlideDirection={setSlideDirection}
        />
      }
      <BlockScroll isModalOpen={isModalOpen}/>
    </main>
  )
};

export default EventPhotos;
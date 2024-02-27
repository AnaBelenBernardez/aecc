"use client";

import Loading from "../../../../components/loading/Loading";
import useGetAllNews from "../../../../hooks/useGetAllNews";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLoginStore } from "../../../../store";
import { deleteNewService, addNewService, editNewService } from "../../../../service";
import { useState, useEffect } from "react";
import { useToast } from '../../../../components/ui/use-toast';
import { Toaster } from '../../../../components/ui/toaster';
import AddNewModal from "../../../../components/modals/news/AddNewModal";
import EditNewModal from "../../../../components/modals/news/EditNewModal";
import BlockScroll from "../../../../components/blockScroll/BlockScroll";
import DeleteNewModal from "../../../../components/modals/news/DeleteNewModal";

const dashboardNews = () => {
  const router = useRouter();
  const token = useLoginStore((state) => state.token);
  if (!token) {
    router.push("/admin");
  }
  const { toast } = useToast();

  const { news, loading, refetch, setNews } = useGetAllNews();
  const [idNewOpen, setIdNewOpen] = useState();
  const [deleteModalOpen, setDeleteModalOpen] = useState();
  const [addNewModalOpen, setAddNewModalOpen] = useState();
  const [editNewModalOpen, setEditNewModalOpen] = useState();
  const [singleNew, setSingleNew] = useState();
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    link: '',
    galician_title: '',
    galician_content: '',
    photo: '',
    news_date: ''
  });
  const [formValuesEdit, setFormValuesEdit] = useState({
    title: singleNew?.title || "",
    content: singleNew?.content || "",
    link: singleNew?.link || "",
    galician_title: singleNew?.galician_title || "",
    galician_content: singleNew?.galician_content || "",
    photo: singleNew?.photo || "",
    news_date: singleNew?.news_date ? new Date(singleNew?.news_date).toISOString().slice(0, 10)
    : ""
  })

  useEffect(() => {
    if (singleNew) {
      setFormValuesEdit({
        title: singleNew.title,
        content: singleNew.content,
        link: singleNew.link,
        galician_title: singleNew.galician_title,
        galician_content: singleNew.galician_content,
        news_date: new Date(new Date(singleNew.news_date).getTime() + 86400000).toISOString().slice(0, 10)
      })
    }
  }, [singleNew])
  
  const openModalDelete = async (idNew) => {
    setIdNewOpen(idNew);
    setDeleteModalOpen(true);
  };

  const handleClickDelete = async () => {
    await deleteNewService(idNewOpen, token);
    setNews([]);
    refetch();
    setDeleteModalOpen(false);
    toast({
      variant: "succes",
      title: "Noticia eliminada correctamente",
      className: "bg-primaryGreen text-white text-lg font-bold"
    })
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();

    try {
      await addNewService(token, formValues);
      setAddNewModalOpen(false);
      refetch();
      toast({
        variant: "succes",
        title: "Noticia añadida correctamente",
        className: "bg-primaryGreen text-white text-lg font-bold"
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.message,
        className: "bg-secondRed text-white text-lg font-bold"
      })
    }
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    try {
      await editNewService(formValuesEdit, singleNew.id, token);
      setEditNewModalOpen(false);      
      refetch();
      toast({
        variant: "success",
        title: "Noticia editada correctamente",
        className: "bg-primaryGreen text-white text-lg font-bold"
      })
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: error.message,
        className: "bg-secondRed text-white text-lg font-bold"
      })
    }
  }

  const openModalAddNew = async () => {
    setAddNewModalOpen(true);
  };

  const openModalEdit = async (notice) => {
    setSingleNew(notice);
    setEditNewModalOpen(true);
  };

  if (loading) return <Loading />;

  return (
    <main className="flex flex-col my-4 px-4 items-center">
      <BlockScroll
        isModalOpen={addNewModalOpen || deleteModalOpen || editNewModalOpen}
      />
      <button
        onClick={openModalAddNew}
        className="border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 
        mb-6 lg:mb-6 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen"
      >
        AÑADIR NOTICIA
      </button>
      {addNewModalOpen && (
        <AddNewModal
          setAddNewModalOpen={setAddNewModalOpen}
          formValues={formValues}
          setFormValues={setFormValues}
          handleSubmitAdd={handleSubmitAdd}
        />
      )}
      {deleteModalOpen && (
        <DeleteNewModal
          handleClickDelete={handleClickDelete}
          setDeleteModalOpen={setDeleteModalOpen}
        />
      )}
      {editNewModalOpen && (
        <EditNewModal
          currentNew={singleNew}
          setEditNewModalOpen={setEditNewModalOpen}
          handleSubmitEdit={handleSubmitEdit}
          setFormValuesEdit={setFormValuesEdit}
          formValuesEdit={formValuesEdit}
        />
      )}
      {news.length > 0 ? (
        news.sort((a, b) => new Date(b.news_date ? b.news_date : b.create_date) - new Date(a.news_date ? a.news_date : a.create_date)).map((newItem) => {
          const imgSrc =
            process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${newItem.photo}`;
          return (
            <article
              className="flex flex-col justify-between p-8 items-center shadow-md md:flex-row lg:w-[80%]"
              key={newItem.title}
            >
              <div className="lg:flex lg:w-[70%] lg:justify-evenly">
                <div className="flex items-center">
                  <p className="w-[52px] text-center flex items-center text-primaryGreen font-bold">
                    {new Date(newItem.news_date || newItem.create_date)
                      .toLocaleDateString("es-ES", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })
                      .toLocaleUpperCase()}
                  </p>
                  <h2 className="font-bold px-6 line-clamp-2 w-[240px]">
                    {newItem.title}
                  </h2>
                </div>
                {newItem.photo !== null ? (
                  <div className="self-center hidden lg:block lg:max-w-[150px] lg:max-h-[72px]">
                    <Image
                      src={imgSrc}
                      width={150}
                      height={150}
                      alt="Imagen de la noticia"
                      className="lg:max-w-[150px] lg:max-h-[72px] object-cover"
                    />
                  </div>
                ) : (
                  <div className="self-center hidden lg:block lg:max-w-[150px] lg:max-h-[72px]">
                    <Image
                      src={"/image/newsDefault.png"}
                      width={150}
                      height={150}
                      alt="Imagen de la noticia"
                      className="lg:max-w-[150px] lg:max-h-[72px] object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="self-end flex gap-4 md:self-center">
                <button
                  onClick={() => openModalEdit(newItem)}
                  className="flex gap-4 items-center justify-center border border-primaryGreen py-2 px-6 mt-4 rounded-3xl font-bold text-sm text-primaryGreen md:mt-0"
                >
                  <Image
                    src={"/icons/editIcon.svg"}
                    width={24}
                    height={24}
                    alt="Icono de editar"
                  />
                  EDITAR
                </button>
                <button
                  onClick={() => openModalDelete(newItem.id)}
                  className="flex gap-4 items-center justify-center border border-secondRed py-2 px-6 mt-4 rounded-3xl font-bold text-sm text-secondRed md:mt-0"
                >
                  <Image
                    src={"/icons/deleteIcon.svg"}
                    width={24}
                    height={24}
                    alt="Icono de eliminar"
                  />
                  ELIMINAR
                </button>
              </div>
            </article>
          );
        })
      ) : (
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
          <Image
            src={"/image/noNewsYet.svg"}
            width={300}
            height={300}
            alt="Noticias"
          />
          <p className="mt-2 font-bold text-center">Todavía no hay noticias</p>
        </div>
      )}
      <Toaster/>
    </main>
  );
};

export default dashboardNews;

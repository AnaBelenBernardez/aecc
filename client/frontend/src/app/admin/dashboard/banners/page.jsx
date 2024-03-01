"use client";

import Loading from "../../../../components/loading/Loading";
import useGetAllBanners from "../../../../hooks/useGetAllBanners";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLoginStore } from "../../../../store";
import { deleteBannerService, addBannerService, editBannerService } from "../../../../service"; 
import { useState, useEffect } from "react";
import { useToast } from '../../../../components/ui/use-toast';
import { Toaster } from '../../../../components/ui/toaster';
import AddBannerModal from "../../../../components/modals/banners/AddBannerModal";
import EditBannerModal from "../../../../components/modals/banners/EditBannerModal";
import BlockScroll from "../../../../components/blockScroll/BlockScroll";
import DeleteBannerModal from "../../../../components/modals/banners/DeleteBannerModal";

const dashboardBanners = () => {
  const router = useRouter();
  const token = useLoginStore((state) => state.token);
  if (!token) {
    router.push("/admin");
  }
  const { toast } = useToast();

  const { banners, loading, refetch, setBanners } = useGetAllBanners(); 
  const [idBannerOpen, setIdBannerOpen] = useState();
  const [deleteModalOpen, setDeleteModalOpen] = useState();
  const [addBannerModalOpen, setAddBannerModalOpen] = useState();
  const [editBannerModalOpen, setEditBannerModalOpen] = useState();
  const [singleBanner, setSingleBanner] = useState();
  const [formValues, setFormValues] = useState({
    title: '',
    subtitle: '',
    button_text: '',
    button_link: '',
    galician_title: '',
    galician_subtitle: '',
    galician_button_text: '',
  });
  const [formValuesEdit, setFormValuesEdit] = useState({
    title: singleBanner?.title || "",
    subtitle: singleBanner?.subtitle || "",
    button_text: singleBanner?.button_text || "",
    button_link: singleBanner?.button_link || "",
    galician_title: singleBanner?.galician_title || "",
    galician_subtitle: singleBanner?.galician_subtitle || "",
    galician_button_text: singleBanner?.galician_button_text || "",
  });

  useEffect(() => {
    if (singleBanner) {
      setFormValuesEdit({
        title: singleBanner.title,
        subtitle: singleBanner.subtitle,
        button_text: singleBanner.button_text,
        button_link: singleBanner.button_link,
        galician_title: singleBanner.galician_title,
        galician_subtitle: singleBanner.galician_subtitle,
        galician_button_text: singleBanner.galician_button_text,
      });
    }
  }, [singleBanner]);

  const openModalDelete = async (idBanner) => {
    setIdBannerOpen(idBanner);
    setDeleteModalOpen(true);
  };

  const handleClickDelete = async () => {
    await deleteBannerService(idBannerOpen, token);
    setBanners([]);
    refetch();
    setDeleteModalOpen(false);
    toast({
      variant: "success",
      title: "Banner eliminado correctamente",
      className: "bg-primaryGreen text-white text-lg font-bold",
    });
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();

    try {
      await addBannerService(token, formValues);
      setAddBannerModalOpen(false);
      refetch();
      toast({
        variant: "success",
        title: "Banner añadido correctamente",
        className: "bg-primaryGreen text-white text-lg font-bold",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.message,
        className: "bg-secondRed text-white text-lg font-bold",
      });
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    try {
      await editBannerService(formValuesEdit, singleBanner.id, token);
      setEditBannerModalOpen(false);
      refetch();
      toast({
        variant: "success",
        title: "Banner editado correctamente",
        className: "bg-primaryGreen text-white text-lg font-bold",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: error.message,
        className: "bg-secondRed text-white text-lg font-bold",
      });
    }
  };

  const openModalAddBanner = async () => {
    setAddBannerModalOpen(true);
  };

  const openModalEdit = async (banner) => {
    setSingleBanner(banner);
    setEditBannerModalOpen(true);
  };

  if (loading) return <Loading />;

  return (
    <>
      <main className="flex flex-col my-4 px-4 items-center">
        <BlockScroll
          isModalOpen={addBannerModalOpen || deleteModalOpen || editBannerModalOpen}
        />
        <button
          onClick={openModalAddBanner}
          className="border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 
          mb-6 lg:mb-6 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen"
        >
          AÑADIR BANNER
        </button>
        {addBannerModalOpen && (
          <AddBannerModal
            setAddBannerModalOpen={setAddBannerModalOpen}
            formValues={formValues}
            setFormValues={setFormValues}
            handleSubmitAdd={handleSubmitAdd}
          />
        )}
        {deleteModalOpen && (
          <DeleteBannerModal
            handleClickDelete={handleClickDelete}
            setDeleteModalOpen={setDeleteModalOpen}
          />
        )}
        {editBannerModalOpen && (
          <EditBannerModal
            currentBanner={singleBanner}
            setEditBannerModalOpen={setEditBannerModalOpen}
            handleSubmitEdit={handleSubmitEdit}
            setFormValuesEdit={setFormValuesEdit}
            formValuesEdit={formValuesEdit}
          />
        )}
      {banners.length > 0 ? (
    banners.map((banner) => {
      const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${banner.photo}`;
      return (
        <article
          className="flex flex-col justify-between p-8 items-center shadow-md md:flex-row w-[90%]"
          key={banner.id}
        >
          <div className="lg:flex lg:w-[70%] lg:justify-evenly">
            <div className="flex items-center">
              <h2 className="hidden font-bold px-6 line-clamp-2 w-[240px] lg:block">
                {banner.title !== "null" ? banner.title : null}
              </h2>
              <p className="hidden line-clamp-2 w-[240px] lg:block">{banner.subtitle !== "null" ? banner.subtitle : null}</p>
            </div>
            {banner.photo !== null ? (
              <div className="self-center lg:w-[400px] lg:h-[100px]">
                <Image
                  src={imgSrc}
                  width={400}
                  height={100}
                  alt="Imagen del banner"
                  className="w-[280px] h-[70px] lg:w-[400px] lg:h-[100px] object-cover"
                />
              </div>
            ) : (
              <div className="self-center hidden lg:block lg:max-w-[150px] lg:max-h-[72px]">
                <Image
                  src={"/image/bannerDefault.png"}
                  width={150}
                  height={150}
                  alt="Imagen del banner por defecto"
                  className="lg:max-w-[150px] lg:max-h-[72px] object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex gap-4 self-center">
            <button
              onClick={() => openModalEdit(banner)}
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
              onClick={() => openModalDelete(banner.id)}
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 mt-8">
          <Image
            src={"/image/noBannersYet.svg"}
            width={300}
            height={300}
            alt="Banners"
          />
          <p className="mt-2 font-bold text-center">Todavía no hay banners</p>
        </div>
      )}
      </main>
      <Toaster />
    </>
    
  );
};

export default dashboardBanners;

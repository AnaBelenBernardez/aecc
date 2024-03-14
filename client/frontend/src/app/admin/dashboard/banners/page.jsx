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
    title: singleBanner?.title || '',
    subtitle: singleBanner?.subtitle || '',
    button_text: singleBanner?.button_text || '',
    button_link: singleBanner?.button_link || '',
    galician_title: singleBanner?.galician_title || '',
    galician_subtitle: singleBanner?.galician_subtitle || '',
    galician_button_text: singleBanner?.galician_button_text || '',
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
      const desktopImgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${banner.desktop_photo}`;
      const mobileImgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${banner.mobile_photo}`;
      const tabletImgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${banner.tablet_photo}`;
      return (
        <article
          className="flex flex-col justify-center p-8 items-center lg:justify-start shadow-md md:flex-row w-[95%]"
          key={banner.id}
        >
          <div className="grid lg:grid-flow-col justify-between gap-4 md:gap-6 lg:w-[90%]">
            <div className="flex items-center">
              { banner.title === "null" ? null :
              <h2 className="hidden font-bold px-6 line-clamp-2 lg:block">
                {banner.title}
              </h2> 
            }
              {/* <p className="hidden line-clamp-2 w-[240px] lg:block">{banner.subtitle !== "null" ? banner.subtitle : null}</p> */}
            </div>
            <div className="flex flex-col lg:flex-row lg:h-auto gap-4">
            {banner.desktop_photo !== null ? (
              <div className="aspect-[4/1] lg:h-[100px] lg:mb-0 ">
                <Image
                  src={desktopImgSrc}
                  width={400}
                  height={100}
                  alt="Imagen del banner"
                  className="aspect-[4/1] lg:h-[100px] object-cover"
                />
              </div>
            ) : null
            }
            <div className="flex justify-between gap-4">
              {banner.tablet_photo !== null
                ? (
                <div className="aspect-[4/2.5] lg:h-[100px]">
                  <Image
                    src={tabletImgSrc}
                    width={200}
                    height={125}
                    alt="Imagen del banner"
                    className="aspect-[4/2.5] lg:h-[100px] object-cover"
                  />
                </div>
              ) : null
              }
              {banner.mobile_photo !== null ? (
                <div className="aspect-[1/1] lg:h-[100px]">
                  <Image
                    src={mobileImgSrc}
                    width={200}
                    height={200}
                    alt="Imagen del banner"
                    className="aspect-[1/1] lg:h-[100px] object-cover"
                  />
                </div>
              ) : null
              }
            </div>
            </div>
          <div className="flex gap-4 self-center justify-center">
            <button
              onClick={() => openModalEdit(banner)}
              className="flex gap-4 items-center justify-center border border-primaryGreen py-2 px-6 rounded-3xl font-bold text-sm text-primaryGreen md:mt-0"
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
              className="flex gap-4 items-center justify-center border border-secondRed py-2 px-6 rounded-3xl font-bold text-sm text-secondRed md:mt-0"
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

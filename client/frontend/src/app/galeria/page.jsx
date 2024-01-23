import { GalleryCard } from "../../components";

const GalleryPage = () => {
  return (
    <div className="container mx-auto p-4 lg:h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <GalleryCard title={"Evento 1"} location={"Ferrol"} />
        <GalleryCard title={"Evento 2"} location={"Ferrol"} />
        <GalleryCard title={"Evento 3"} location={"Ferrol"} />
        <GalleryCard title={"Evento 4"} location={"Ferrol"} />
        <GalleryCard title={"Evento 5"} location={"Ferrol"} />
        <GalleryCard title={"Evento 6"} location={"Ferrol"} />
      </div>
    </div>
  );
};

export default GalleryPage;

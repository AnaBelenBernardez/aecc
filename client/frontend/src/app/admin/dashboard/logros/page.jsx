"use client";
import Image from "next/image";
import Loading from "../../../../components/loading/Loading";
import Link from "next/link";
import { useLoginStore, useModalEventStore } from "../../../../store";
import { useRouter } from "next/navigation";
import useGetAllAchievements from "../../../../hooks/useGetAllAchievements";
import { AchievementsCard } from "../../../../components/dashboard/Achievements/AchievementsCard";
import { ModalAchievement } from "../../../../components/modals/achievements/ModalAchievement";
import ModalDeleteAchievement from "../../../../components/modals/achievements/ModalDeleteAchievement";
import { ModalEditAchievement } from "../../../../components/modals/achievements/ModalEditAchievement";

const AchievementsPage = () => {
  const token = useLoginStore((state) => state.token);

  const { achievements, loading, error, refetch } = useGetAllAchievements();
  const openModal = useModalEventStore((state) => state.openModalAchievements);
  console.log(achievements);

  const router = useRouter();

  if (!token) {
    router.push("/admin");
  }

  if (loading) return <Loading />;

  return (
    <main className="flex flex-col my-4 px-4 items-center">
      <button
        onClick={openModal}
        className=" border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 
          mb-6 lg:mb-6 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen"
      >
        NUEVO LOGRO
      </button>
      <ModalDeleteAchievement token={token} refetch={refetch} />
      <ModalAchievement token={token} refetch={refetch} />
      <ModalEditAchievement
        token={token}
        refetch={refetch}
        achievement={achievements}
      />

      {!loading && achievements?.length > 0 ? (
        achievements?.map((achievement) => {
          return (
            <AchievementsCard
              key={achievement.id}
              id={achievement.id}
              photo={achievement.icon}
              title={achievement.description}
            />
          );
        })
      ) : (
        <>
          <div className="flex items-center gap-6 my-10 px-4 lg:my-0 lg:mt-28 lg:justify-center">
            <Image src={"/image/noEventsYet.svg"} width={150} height={150} />
            <div className="flex flex-col">
              <p>No hay logros para mostrar</p>
            </div>
          </div>
          <Link href={"/admin/dashboard"} className="self-center">
            <button className="border border-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 mb-6 hover:text-secondLightGray hover:bg-primaryGreen">
              VOLVER AL INICIO
            </button>
          </Link>
        </>
      )}
    </main>
  );
};

export default AchievementsPage;
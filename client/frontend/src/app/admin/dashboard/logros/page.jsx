"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "../../../../components/loading/Loading";
import { useLoginStore, useModalEventStore } from "../../../../store";
import useGetAllAchievements from "../../../../hooks/useGetAllAchievements";
import { AchievementsCard } from "../../../../components/dashboard/Achievements/AchievementsCard";
import { ModalAchievement } from "../../../../components/modals/achievements/ModalAchievement";
import ModalDeleteAchievement from "../../../../components/modals/achievements/ModalDeleteAchievement";
import { ModalEditAchievement } from "../../../../components/modals/achievements/ModalEditAchievement";
import BlockScroll from "../../../../components/blockScroll/BlockScroll";

const AchievementsPage = () => {
  const token = useLoginStore((state) => state.token);

  const { achievements, loading, error, refetch, setAchievements } =
    useGetAllAchievements();
  const openModal = useModalEventStore((state) => state.openModalAchievements);
  const isModalAchievementsOpen = useModalEventStore(
    (state) => state.isModalAchievementsOpen
  );
  const isModalDeleteAchievementsOpen = useModalEventStore(
    (state) => state.isModalDeleteAchievementsOpen
  );
  const isModalEditAchievementsOpen = useModalEventStore(
    (state) => state.isModalEditAchievementsOpen
  );

  const router = useRouter();

  if (!token) {
    router.push("/admin");
  }

  if (loading) return <Loading />;

  return (
    <main>
      <section className="flex flex-col my-4 px-4 items-center">
        <BlockScroll
          isModalOpen={
            isModalAchievementsOpen ||
            isModalDeleteAchievementsOpen ||
            isModalEditAchievementsOpen
          }
        />
        <button
          onClick={openModal}
          className=" border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 
          mb-6 lg:mb-6 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen"
        >
          NUEVO LOGRO
        </button>
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
              <Image
                src={"/image/noEventsYet.svg"}
                width={150}
                height={150}
                alt="No hay logros disponibles"
              />
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
      </section>
      <ModalDeleteAchievement
        token={token}
        refetch={refetch}
        setAchievements={setAchievements}
      />
      <ModalAchievement token={token} refetch={refetch} />
      <ModalEditAchievement
        token={token}
        refetch={refetch}
        achievement={achievements}
      />
    </main>
  );
};

export default AchievementsPage;

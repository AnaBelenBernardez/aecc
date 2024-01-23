"use client";

import { DashboardCard } from "../../../components";
import {
  CalendarEvent,
  Photos,
  User,
  Faq,
  Volunteers,
  Publicity,
  News,
  Blog,
  Contact,
  Logout,
} from "../../../lib/svg";
import { useLoginStore } from "../../../store";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const token = useLoginStore((state) => state.token);
  if (!token) {
    router.push("/admin");
  }
  return (
    <>
      {token && (
        <section>
          <h1 className="text-5xl font-bold text-center mt-8">
            Bienvenido Admin
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 justify-center items-center w-full container">
            <DashboardCard title={"Eventos"}>
              <CalendarEvent />
            </DashboardCard>
            <DashboardCard title={"Galeria"}>
              <Photos />
            </DashboardCard>
            <DashboardCard title={"Usuario"}>
              <User />
            </DashboardCard>
            <DashboardCard title={"FAQ"}>
              <Faq />
            </DashboardCard>
            <DashboardCard title={"Voluntarios"}>
              <Volunteers />
            </DashboardCard>
            <DashboardCard title={"Patrocinadores"}>
              <Publicity />
            </DashboardCard>
            <DashboardCard title={"Noticias"}>
              <News />
            </DashboardCard>
            <DashboardCard title={"Blog"}>
              <Blog />
            </DashboardCard>
            <DashboardCard title={"Contacto"}>
              <Contact />
            </DashboardCard>
          </div>
        </section>
      )}
    </>
  );
};

export default DashboardPage;

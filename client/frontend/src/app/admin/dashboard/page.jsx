"use client";

import { DashboardCard } from "../../../components";
import {
  CalendarEvent,
  Photos,
  User,
  Faq,
  Publicity,
  News,
  Experiences,
  Achievements,
  Banner,
} from "../../../lib/svg";
import { useLoginStore } from "../../../store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

const DashboardPage = () => {
  const router = useRouter();
  const token = useLoginStore((state) => state.token);

  useEffect(() => {
    if (!token) {
     router.push("/admin");
    }
  }, [token])
  
  return (
    <>
      {token && (
        <section>
          <h1 className="text-5xl font-bold text-center mt-7">
            Bienvenido/a Admin
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 justify-center items-center w-full container">
            <Link href="/admin/dashboard/eventos">
              <DashboardCard title={"Eventos"}>
                <CalendarEvent />
              </DashboardCard>
            </Link>
            <Link href={"/admin/dashboard/galeria"}>
              <DashboardCard title={"Galeria"}>
                <Photos />
              </DashboardCard>
            </Link>
            <Link href={"/admin/dashboard/usuario"}>
              <DashboardCard title={"Usuario"}>
                <User />
              </DashboardCard>
            </Link>
            <Link href={"/admin/dashboard/faqs"}>
              <DashboardCard title={"FAQ"}>
                <Faq />
              </DashboardCard>
            </Link>
            <Link href={"/admin/dashboard/patrocinadores"}>
              <DashboardCard title={"Patrocinadores"}>
                <Publicity />
              </DashboardCard>
            </Link>
            <Link href={"/admin/dashboard/noticias"}>
              <DashboardCard title={"Noticias"}>
                <News />
              </DashboardCard>
            </Link>
            <Link href={"/admin/dashboard/experiences"}>
              <DashboardCard title={"Experiencias"}>
                <Experiences />
              </DashboardCard>
            </Link>
            <Link href={"/admin/dashboard/logros"}>
              <DashboardCard title={"Logros"}>
                <Achievements />
              </DashboardCard>
            </Link>
            <Link href={"/admin/dashboard/banners"}>
              <DashboardCard title={"Banners"}>
                <Banner />
              </DashboardCard>
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default DashboardPage;

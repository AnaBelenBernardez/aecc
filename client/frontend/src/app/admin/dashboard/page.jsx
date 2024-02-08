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
} from "../../../lib/svg";
import { useLoginStore } from "../../../store";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
              <Link href="/admin/dashboard/eventos">
                <CalendarEvent />
              </Link>
            </DashboardCard>
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
            <DashboardCard title={"FAQ"}>
              <Link href={"/admin/dashboard/faqs"}>
                <Faq />
              </Link>
            </DashboardCard>
            <DashboardCard title={"Patrocinadores"}>
              <Link href={"/admin/dashboard/patrocinadores"}>
                <Publicity />
              </Link>
            </DashboardCard>
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
          </div>
        </section>
      )}
    </>
  );
};

export default DashboardPage;

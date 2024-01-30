"use client";

import { DashboardCard } from "../../../components";
import {
  CalendarEvent,
  Photos,
  User,
  Faq,
  Publicity,
  News, 
  Logout,
} from "../../../lib/svg";
import { useLoginStore } from "../../../store";
import { useRouter } from "next/navigation";
import Link from 'next/link';


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
            <Link href={'/admin/dashboard/usuario'}>
              <DashboardCard title={"Usuario"}>
                <User />
              </DashboardCard>
            </Link>
            <DashboardCard title={"FAQ"}>
              <Link href={'/admin/dashboard/faqs'}><Faq /></Link>
            </DashboardCard>
            <DashboardCard title={"Patrocinadores"}>
              <Publicity />
            </DashboardCard>
            <Link href={'/admin/dashboard/noticias'}>
              <DashboardCard title={"Noticias"}>
                <News />
              </DashboardCard>
            </Link>
            <Link href={'/admin/dashboard/experiences'}>
              <DashboardCard title={"Experiencias"}>
                <News />
              </DashboardCard>
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default DashboardPage;

import React from "react";
import { AzkarLayout } from "@/components/azkar/AzkarLayout";

export const metadata = { title: "Hisnul Muslim | CUMSA" };

export default function Page() {
  return (
    <main className="p-4 container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        Hisn al-Muslim (Fortress of the Muslim) From the Qur’an and Sunnah
      </h1>
      <AzkarLayout />
    </main>
  );
}

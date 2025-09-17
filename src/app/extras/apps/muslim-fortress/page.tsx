import React from "react";
import { AzkarLayout } from "@/components/azkar/AzkarLayout";

export const metadata = { title: "Muslim Fortress | CUMSA" };

export default function Page() {
  return (
    <main className="p-4 container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        Hisn al-Muslim (Muslim Fortress) From the remembrances of the Qur’an and Sunnah
      </h1>
      <AzkarLayout />
    </main>
  );
}

"use client";
import React from "react";
import { Zikr } from "@/lib/azkar/types";
import { ZikrItem } from "@/components/azkar/ZikrItem";
import { LanguageToggle } from "@/components/azkar/LanguageToggle";

interface Props {
  azkar: Zikr[];
  loading: boolean;
  onPlayAudio: (url: string, id: string) => void;
  isPlaying: (id: string) => boolean;
  audioLoading: boolean;
  audioError: string | null;
  display: { arabic: boolean; transliteration: boolean; translation: boolean };
  onDisplayChange: (
    d: Partial<{ arabic: boolean; transliteration: boolean; translation: boolean }>,
  ) => void;
}

export function AzkarDisplay({
  azkar,
  loading,
  onPlayAudio,
  isPlaying,
  audioLoading,
  audioError,
  display,
  onDisplayChange,
}: Props) {
  if (loading)
    return (
      <div className="p-6 grid gap-3 sm:grid-cols-2 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 rounded-md bg-[var(--blue)]/10" />
        ))}
      </div>
    );
  if (!azkar.length)
    return (
      <div className="p-6 text-sm leading-relaxed space-y-8 overflow-y-auto custom-scroll max-h-full">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4 animate-slide-in-left">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">Introduction</h2>
            <p dir="ltr">
              Surely all praise is for Allah. We praise Him, seek His help, and ask His forgiveness.
              We seek refuge in Him from the evil of our own souls and from the wickedness of our
              deeds. Whomever He guides then nothing can make him lost, and whomever He makes lost
              then nothing can guide him. I bear witness that none has the right to be worshipped
              but Allah, alone, Who has no partner, and I bear witness that Muhammad is His slave
              and His Messenger. May Allah send prayers upon him and upon his family and his
              Companions and those who follow them in piety until the Day of Judgement and may He
              send copius peace (upon them). To proceed:
            </p>
            <p dir="ltr">
              This is an abridgement that I have abridged from my earlier work entitled
              &quot;Ath-Thikr wad-Dua wal-Ilaj bir-Ruqa minal-kitab was-Sunnah&quot;. I have
              abridged in it the section on words of remembrance (i.e. dhikr) in order to make it
              easy to carry in travels.
            </p>
            <p dir="ltr">
              I have confined to only the text of the words of remembrance. I also have sufficed in
              referencing it by mentioning only one or two sources from the original work. Whoever
              would like to know about the Companion or more about the reference information should
              refer to the original work.
            </p>
            <p dir="ltr">
              I ask Allah, mighty and glorious, by His beautiful names and by His sublime attributes
              to make this sincere for his noble countenance and to benefit me with it during my
              life and after my death and to benefit with it those who read it or print it or is a
              cause of distributing it. Verily He, glorified is He, is the patron of that and
              capable of it. May Allah send prayers upon our Prophet Muhammad and upon his family
              and Companions and whoever follows them in piety until the Day of Judgement.
            </p>
            <p dir="ltr">The Author (Sa`id b. `Ali b. Wahf al-Qahtani)</p>
            <p dir="ltr">Safar, 1409H</p>
          </div>
          <div className="space-y-4 animate-slide-in-right" dir="rtl">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">المقدمة</h2>
            <p>
              إن الحمد لله ، نحمده ونستعينهُ ، ونستغفرهُ ونعوذُ باللهِ من شرورِ أنفسنا ، وسيئاتِ
              أعمالنا ، من يهده الله فلا مضل لهُ، ومن يضلل فلا هادي له ، وأشهد أن لا إله إلا الله
              وحده لا شريك لهُ،وأشهدُ أن محمداً عبدهُ ورسولهُ صلى الله عليه وعلى أله وأصحابه ومن
              تبعهم بإحسان إلى يوم الدين وسلم تسليما كثيراً ،أما بعد .
            </p>
            <p>
              فهذا مختصر اختصرته من كتابي (( الذكرُ والدعاءُ والعلاج بالرقي من الكتاب والسنة ))
              اختصرت فيه قسم الأذكار ؛ ليكون خفيف الحمل في الأسفار .
            </p>
            <p>
              وقد اقتصرت على متن الذكر ، واكتفيت في تخريجه بذكر مصدر أو مصدرين مما وجد في الأصل ،ومن
              أراد معرفة الصحابي أو زيادة في التخريج فعليه بالرجوع إلى الأصل.
            </p>
            <p>
              وأسأل الله عز وجل بأسمائه الحسنى ، وصفاته العُلى أن يجعله خالصا لوجهه الكريم ، وأن
              ينفعني به في حياتي وبعد مماتي وأن ينفع به من قرأه ، أو طبعه ، أو كان سبباً في نشره إنه
              سبحانه ولي ذلك والقادر عليه. وصلى الله على نبينا محمد وعلى آله وأصحابه ومن تبعهم
              بإحسان إلى يوم الدين.
            </p>
            <p>المؤلف حرر في شهر صفر 1409هـ</p>
          </div>
        </div>
      </div>
    );
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-[var(--blue)]/25 flex items-center justify-between bg-white/70 backdrop-blur-md">
        <LanguageToggle mode={display} onChange={onDisplayChange} />
      </div>
      <div className="p-4 overflow-y-auto flex-1 space-y-4 custom-scroll bg-gradient-to-br from-white/60 via-white/40 to-white/20">
        {azkar.map((z) => (
          <ZikrItem
            key={z.ID}
            zikr={z}
            display={display}
            onPlayAudio={onPlayAudio}
            isPlaying={isPlaying}
            audioLoading={audioLoading}
            audioError={audioError}
          />
        ))}
      </div>
    </div>
  );
}

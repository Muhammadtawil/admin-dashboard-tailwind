"use client"
import { useSession } from "next-auth/react"
import { useLocale, useTranslations } from "next-intl";

interface Welcome {
  pageName: string;
}
const WelcomeMain = () => {
    const t = useTranslations('mainPage');
const lang =useTranslations('LocaleSwitcher')
  const { data: session } = useSession();
  const locale = useLocale();
    return (
        <div className={locale==='ar'?'relative flex bottom-0 right-0 pt-7 pb-7':"relative flex bottom-0 left-0 pt-7 pb-7"}>
            <div className={locale==='ar'?"absolute bottom-0 right-0 max-sm:top-0 pt-7 pb-7":"absolute bottom-0 left-0 max-sm:top-0 pb-7 pt-7"}>
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-7 pt-7">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
      {locale === 'ar'
          ? `${session?.userName } ${t('welcomeMessage')} `
          : `${t('welcomeMessage')} ${session?.userName}`}
      </h2>

             </div>
           </div>
  
    </div>
  );
};

export default WelcomeMain;

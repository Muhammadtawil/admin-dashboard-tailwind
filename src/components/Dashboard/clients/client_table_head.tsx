"use client"

import { useTranslations } from "next-intl"

export default function ClientTableHead({ selectedStatus, handleStatusFilterChange }: { selectedStatus: any, handleStatusFilterChange: any }) {
  
  const t=useTranslations('clientPage')
  return (
    <thead>
    <tr className="bg-gray-2 text-left dark:bg-meta-4">
      <th></th>
      <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 max-sm:min-w-[100px]">
          {t("clientName")}
      </th>
      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white max-sm:min-w-[100px]">
      {t("clientPhone")}
      </th>
      <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
      {t("service")}
      </th>
      <th className="py-4 px-4 font-medium text-black dark:text-white">
        <>
        {t("status")}
          <select
            className="bg-white dark:bg-boxdark"
            value={selectedStatus}
            onChange={handleStatusFilterChange}
            style={{ marginLeft: '8px' }}
          >
            <option value="">  {t("All")}</option>
            <option value="COMPLETED">  {t("completed")}</option>
              <option value="PENDING">  {t("pending")}</option>
            <option value="IN_PROGRESS">  {t("inProgress")}</option>
              

          </select>
        </>
      </th>
      <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
      {t("clientEmail")}
        </th>
        <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
        {t("clientMsg")}
      </th>
      <th className="py-4 px-4 font-medium text-black dark:text-white">
      {t("actions")}
      </th>
    </tr>
  </thead>
  )
}

export  function ClientExpandHead() {
  
  const t=useTranslations('clientPage')
  return (
    <thead>
    <tr className="bg-gray-2 text-left dark:bg-meta-4">
  
      <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 max-sm:min-w-[100px]">
          {'Client Notes'}
      </th>
      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white max-sm:min-w-[100px]">
      {t("clientPhone")}
      </th>
      <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
      {t("service")}
      </th>
  
      <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
      {t("clientEmail")}
        </th>
        <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
        {t("clientMsg")}
      </th>
      <th className="py-4 px-4 font-medium text-black dark:text-white">
      {t("actions")}
      </th>
    </tr>
  </thead>
  )
}

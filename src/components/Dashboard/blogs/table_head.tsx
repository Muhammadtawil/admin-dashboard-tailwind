import React from 'react'

export default function BlogsTableHead({selectedStatus,handleStatusFilterChange}:{selectedStatus:any,handleStatusFilterChange:any}) {
  return (
    <thead>
    <tr className="bg-gray-2 text-left dark:bg-meta-4">
        <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 max-sm:min-w-[100px]">
            Title
        </th>
        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white max-sm:min-w-[100px]">
            Author
        </th>
        <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
            Date
        </th>
        <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
           Language
        </th>
        <th className="py-4 px-4 font-medium text-black dark:text-white">
            <>
                {'Status'}
                <select
                    className="bg-white dark:bg-boxdark"
                    value={selectedStatus}
                    onChange={handleStatusFilterChange}
                    style={{ marginLeft: '8px' }}
                >
                    <option value="">All</option>
                    <option value="deployed">Deployed</option>
                    <option value="draft">Draft</option>
        
                </select>
            </>
        </th>
    
        <th className="py-4 px-4 font-medium text-black dark:text-white">
            Actions
        </th>
    </tr>
</thead>
  )
}

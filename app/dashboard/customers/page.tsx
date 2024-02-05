import { fetchFilteredCustomers } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";
import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page({
  searchParams
}: {
  searchParams?: {
    query?: string,
    page?: string
  }
}){

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const { totalPages } = await fetchFilteredCustomers(query, currentPage);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
      </div>
       <Suspense
        //la key es para que re renderize cuando cambia, porque suspense solo funciona una vez 
        key={query + currentPage} 
       fallback={<InvoicesTableSkeleton />}>
        <CustomersTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
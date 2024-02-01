"use client"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import {  ReactQueryDevtools} from "@tanstack/react-query-devtools"
import { ReactNode, useState } from "react";

export default function ReactQueryProvider({children}: { children: ReactNode}) {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>
            {children}
        </QueryClientProvider>
    )
}
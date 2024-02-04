import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ExistingActivityCategories } from "@/constants/activities/categories";
import { getExactActivitiesCount } from "@/services/activities/getActivities";
import {
  GLOBAL_ACTIVITIES_PER_PAGE,
  GLOBAL_FIRST_PAGINATION_PAGE,
} from "@/constants/pagination/globals";

// TODO: MAKE SURE YOU'RE CONTROLLING THE USER URL IF THEY PUT RANDOM STUFF.
export async function ActivitiesPagination({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentPage = Number(searchParams.page) || GLOBAL_FIRST_PAGINATION_PAGE;
  const pageCount = await getExactActivitiesCount(
    searchParams.category as undefined | ExistingActivityCategories
  );

  const getTotalPages = (): number => {
    const totalPages = Math.ceil((pageCount ?? 0) / GLOBAL_ACTIVITIES_PER_PAGE);
    return Math.max(1, totalPages);
  };

  const totalPages = getTotalPages();

  const isDisabled = (targetPage: number): boolean =>
    targetPage <= GLOBAL_FIRST_PAGINATION_PAGE || targetPage >= totalPages;

  const renderPageNumbers = (): JSX.Element[] => {
    return Array.from({ length: totalPages }, (_, index) => index + 1).map(
      (pageNumber) => (
        <PaginationItem key={pageNumber}>
          <PaginationLink
            isActive={
              currentPage === pageNumber ||
              (pageNumber === GLOBAL_FIRST_PAGINATION_PAGE && !currentPage)
            }
            href={generateLink(pageNumber)}
          >
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      )
    );
  };

  const generateLink = (page: number): string => {
    return `?page=${page}`;
  };

  return (
    <Pagination className="my-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={
              currentPage <= GLOBAL_FIRST_PAGINATION_PAGE
                ? "pointer-events-none opacity-50"
                : undefined
            }
            aria-disabled={currentPage <= GLOBAL_FIRST_PAGINATION_PAGE}
            tabIndex={
              currentPage <= GLOBAL_FIRST_PAGINATION_PAGE ? -1 : undefined
            }
            href={generateLink(currentPage - 1)}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={
              isDisabled(currentPage + 1)
                ? "pointer-events-none opacity-50"
                : undefined
            }
            aria-disabled={isDisabled(currentPage + 1)}
            tabIndex={isDisabled(currentPage + 1) ? -1 : undefined}
            href={generateLink(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

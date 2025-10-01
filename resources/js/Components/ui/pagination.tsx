import { Link } from "@inertiajs/react";

interface LinkProps {
  active: boolean;
  label: string;
  url: string | null;
}

interface PaginationData {
  links: LinkProps[];
  from: number;
  to: number;
  total: number;
}

interface PaginationProps {
  products: PaginationData;
  perPage: string;
  onPerPageChange: (value: string) => void;
  totalCount: number;
  filteredCount: number;
  search: string;
}

export const Pagination = ({
  products,
  perPage,
  onPerPageChange,
  totalCount,
  filteredCount,
  search,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-between mt-4">
      {/* Pagination information */}
      {search ? (
        <p>
          Showing <strong>{filteredCount}</strong> filtered result
          {filteredCount !== 1 && "s"} out of <strong>{totalCount}</strong> entr
          {totalCount !== 1 ? "ies" : "y"}
        </p>
      ) : (
        <p>
          Showing <strong>{products.from}</strong> to{" "}
          <strong>{products.to}</strong> out of <strong>{products.total}</strong>{" "}
          entr{totalCount !== 1 ? "ies" : "y"}
        </p>
      )}

      {/* Native Select Per Page */}
      <div className="flex items-center gap-2">
        <span className="text-sm"> Rows per page:</span>
        <select
          value={perPage}
          onChange={(e) => onPerPageChange(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="-1">All</option>
        </select>
      </div>

      {/* Pagination Links */}
      <div className="flex gap-2">
        {products.links.map((link, index) => (
          <Link
            className={`px-3 py-2 border rounded ${
              link.active ? "bg-gray-700 text-white" : ""
            }`}
            href={link.url || "#"}
            key={index}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div>
    </div>
  );
};

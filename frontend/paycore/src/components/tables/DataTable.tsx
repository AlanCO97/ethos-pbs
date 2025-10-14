"use client";

import { PaginationResponse } from "@/lib/schemas/responses";
import { useState } from "react";
import { TablePagination } from "./TablePagination";

interface ColumnConfig {
  header: string;
  accessor: string;
  className?: string;
  render?: "text" | "badge" | "date";
}

interface DataTableProps<T extends { id: string | number }> {
  title: string;
  description?: string | React.ReactNode;
  apiEndpoint: string;
  columns: ColumnConfig[];
  initialData: PaginationResponse<T[]>;
  itemsPerPage?: number;
}

export function DataTable<T extends { id: string | number }>({
  title,
  description,
  apiEndpoint,
  columns,
  initialData,
  itemsPerPage = 10,
}: DataTableProps<T>) {
  const [data, setData] = useState<T[]>(initialData.data ?? []);
  const [pagination, setPagination] = useState(
    initialData.pagination ?? {
      currentPage: 1,
      totalPages: 1,
      totalItems: initialData.data?.length ?? 0,
      itemsPerPage,
      hasNext: false,
      hasPrev: false,
    }
  );
  const [loading, setLoading] = useState(false);

  const handlePageChange = async (page: number) => {
    setLoading(true);
    try {
        // Usar en endpoint interno que hace fetch al endpoint del server
      const res = await fetch(
        `${apiEndpoint}?page=${page}&limit=${itemsPerPage}`
      );
      const result: PaginationResponse<T[]> = await res.json();

      if (result.success && result.data) {
        setData(result.data);
        setPagination(result.pagination ?? pagination);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderCellContent = (row: T, column: ColumnConfig) => {
    const value = (row as Record<string, unknown>)[column.accessor];

    if (value === null || value === undefined) {
      return <span className="text-gray-500">-</span>;
    }

    // Renderizado según el tipo
    switch (column.render) {
      case "badge":
        return (
          <span
            className={`px-2 py-1 rounded text-xs ${
              value === "aprobado"
                ? "bg-green-500/20 text-green-400"
                : value === "en progreso"
                ? "bg-blue-500/20 text-blue-400"
                : value === "pendiente"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-gray-500/20 text-gray-400"
            }`}
          >
            {String(value)}
          </span>
        );

      case "date":
        return (
          <span className="text-gray-300">
            {new Date(String(value)).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        );

      case "text":
      default:
        return <span className="text-gray-300">{String(value)}</span>;
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {description && (
            <div className="text-sm text-gray-400 mt-1">
              {typeof description === 'string' ? (
                <p>{description}</p>
              ) : (
                description
              )}
            </div>
          )}
        </div>
      </div>


      <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-white">
            <thead>
              <tr className="border-b border-white/10">
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className={`py-3 px-4 text-sm font-medium text-gray-400 ${
                      col.className ?? ""
                    }`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-8 text-center text-gray-400"
                  >
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span className="ml-2">Cargando...</span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-8 text-center text-gray-400"
                  >
                    No hay datos disponibles
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    {columns.map((col, idx) => (
                      <td key={idx} className="py-3 px-4 text-sm">
                        {renderCellContent(row, col)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {pagination.totalPages && pagination.totalPages > 1 && (
          <TablePagination
            currentPage={pagination.currentPage ?? 1}
            totalPages={pagination.totalPages ?? 1}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
}

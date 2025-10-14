import { PaginationResponse } from "./responses";

export interface ColumnConfig<T = unknown> {
  header: string;
  accessor: string | ((row: T) => React.ReactNode);
  className?: string;
}

export interface TableConfig<T = unknown> {
  entity: string;
  title: string;
  description?: string;
  apiEndpoint: string;
  columns: ColumnConfig<T>[];
  initialData: PaginationResponse<T[]>;
  itemsPerPage?: number;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
}
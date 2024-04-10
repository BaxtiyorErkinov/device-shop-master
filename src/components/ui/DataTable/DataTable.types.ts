import { Nullable } from '@/@types/utility.types';

export interface ITableHeader {
  title: string;
  key: string;
  type?: Nullable<'date' | 'formatted_number'>;
}

export interface ITableProps {
  headers: Nullable<ITableHeader[]>;
  items: any[];
  loading: boolean;
}

export interface Column {
  label: string;
  path?: string;
  content?: (item: any) => any;
}

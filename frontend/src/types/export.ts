export interface ExportOptions {
    format: 'csv' | 'xml';
    includeTitle: boolean;
    includeAuthor: boolean;
    ids: number[];
    selectedAll: boolean;
  }
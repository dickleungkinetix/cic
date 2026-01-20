export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  adminUrl: string;
  vettingUrl: string;
  active: boolean;
  category: 'FTL CMS' | 'FTS CMS' | 'PT CMS' | 'Safety CMS';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Administrator' | 'Vetting Officer';
  courseAccess: number;
  adminAccess: number;
  vettingAccess: number;
}

export interface CategoryStats {
  'FTL CMS': number;
  'FTS CMS': number;
  'PT CMS': number;
  'Safety CMS': number;
}

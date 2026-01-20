import { Course, User } from '../types';

export const initialCourses: Course[] = [
  {
    id: '1',
    code: 'FRC1',
    name: '工地領班員安全訓練課程',
    description: 'Basic safety training for construction description will display here',
    adminUrl: 'https://csc-cms.cic.gov.hk/admin',
    vettingUrl: 'https://csc-cms.cic.gov.hk/vetting',
    active: true,
    category: 'Safety CMS'
  },
  {
    id: '2',
    code: 'FRC2',
    name: '工地領班員安全訓練課程 2',
    description: 'Basic safety training for construction description will display here',
    adminUrl: 'https://csc-cms.cic.gov.hk/admin',
    vettingUrl: 'https://csc-cms.cic.gov.hk/vetting',
    active: true,
    category: 'Safety CMS'
  },
  {
    id: '3',
    code: 'A1DE',
    name: '建造工友(指定行業)安全訓練課程 - 升降機工',
    description: 'Basic safety training for construction description will display here',
    adminUrl: 'https://csc-cms.cic.gov.hk/admin',
    vettingUrl: 'https://csc-cms.cic.gov.hk/vetting',
    active: true,
    category: 'Safety CMS'
  },
  {
    id: '4',
    code: 'A1DC',
    name: '建造工友(指定行業)安全訓練課程 - 升降機工',
    description: 'Basic safety training for construction description will display here',
    adminUrl: 'https://csc-cms.cic.gov.hk/admin',
    vettingUrl: 'https://csc-cms.cic.gov.hk/vetting',
    active: true,
    category: 'Safety CMS'
  },
  {
    id: '5',
    code: 'FRC3',
    name: '工地領班員安全訓練課程進階',
    description: 'Basic safety training for construction description will display here',
    adminUrl: 'https://csc-cms.cic.gov.hk/admin',
    vettingUrl: 'https://csc-cms.cic.gov.hk/vetting',
    active: false,
    category: 'Safety CMS'
  },
  {
    id: '6',
    code: 'FTL1',
    name: 'Forklift Training Level 1',
    description: 'Basic forklift operation and safety training',
    adminUrl: 'https://csc-cms.cic.gov.hk/admin',
    vettingUrl: 'https://csc-cms.cic.gov.hk/vetting',
    active: true,
    category: 'FTL CMS'
  },
  {
    id: '7',
    code: 'FTL2',
    name: 'Forklift Training Level 2',
    description: 'Advanced forklift operation techniques',
    adminUrl: 'https://csc-cms.cic.gov.hk/admin',
    vettingUrl: 'https://csc-cms.cic.gov.hk/vetting',
    active: true,
    category: 'FTL CMS'
  },
  {
    id: '8',
    code: 'FTS1',
    name: 'First Time Supervisor Training',
    description: 'Essential supervision skills for new supervisors',
    adminUrl: 'https://csc-cms.cic.gov.hk/admin',
    vettingUrl: 'https://csc-cms.cic.gov.hk/vetting',
    active: true,
    category: 'FTS CMS'
  },
  {
    id: '9',
    code: 'PT1',
    name: 'Plant Training Course',
    description: 'Plant machinery operation training',
    adminUrl: 'https://csc-cms.cic.gov.hk/admin',
    vettingUrl: 'https://csc-cms.cic.gov.hk/vetting',
    active: true,
    category: 'PT CMS'
  },
];

export const initialUsers: User[] = [
  {
    id: '1',
    name: 'User1',
    email: 'User1@cic.gov.hk',
    role: 'Administrator',
    courseAccess: 4,
    adminAccess: 4,
    vettingAccess: 3
  },
  {
    id: '2',
    name: 'User2',
    email: 'User2@cic.gov.hk',
    role: 'Vetting Officer',
    courseAccess: 3,
    adminAccess: 0,
    vettingAccess: 3
  }
];

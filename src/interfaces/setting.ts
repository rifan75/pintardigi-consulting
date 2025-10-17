export interface IBackup {
  id: string;
  no: number;
  file_name: string;
  file_path: string;
  status: string;
  created_at: string;
}

export interface ISettingFront{
  id: string;
  company_name: string;
  self_register: boolean;
  status: string;
  created_at: string;
}
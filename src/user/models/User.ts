export interface User {
    user_id: number;
    user_name: string;
    password: string;
    role_id_fk: number;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted: boolean;
  }
  
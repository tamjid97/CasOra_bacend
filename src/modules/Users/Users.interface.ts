export interface IUpdateProfileRequest {
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  country?: string;
}

export interface IUpdateUserRoleRequest {
  role: 'CUSTOMER' | 'ADMIN';
}

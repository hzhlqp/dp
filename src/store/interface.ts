export interface Setting {
  isCollapse: Boolean;
  collapseCall: string;
}

export interface User {
  token: string;
  userInfo: {
    avatar: string;
    email: string;
    id: number;
    name: string;
    phone: string;
    sex: string;
  };
}

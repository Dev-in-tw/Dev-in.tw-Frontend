export type userType = {
  _id: string; // 此欄位為DB自動生成之欄位, will be used as user id.
  githubId: string; // User's Github ID
  email: string; // User's email
  name: string; // User's display name.
  first_name: string; // 申請網域時身份驗證用
  last_name: string; // 申請網域時身份驗證用
  birth: Date; // 申請網域時身份驗證用
  identy_id: string; // 申請網域時身份驗證用
  address: string; // 申請網域時身份驗證用
  phone: string; // 申請網域時身份驗證用
  avatar: string; // Base64 encoded image.
  description: string; // User's description.
  domain_names: [string]; // e.g. lazco, haco, oncloud.
  badage: [string]; // Just for future. e.g. Premium badage, Domain badage.
  beta: boolean; // Just for future. Get beta program.
  warn: number; // Admin warning time.
  disable: boolean; // Banned
  premium: boolean; // Yup; VIP mode.
  primaryEmail: string; // Primary email.
  ip: [string]; // 記錄使用者 IP
  create_time: Date; // Account created time.
  last_update: Date; // Account last edit time.
};

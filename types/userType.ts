export type userType = {
  _id: String; // 此欄位為DB自動生成之欄位, will be used as user id.
  githubId: String; // User's Github ID
  email: String; // User's email
  name: String; // User's display name.
  first_name: String; // 申請網域時身份驗證用
  last_name: String; // 申請網域時身份驗證用
  birth: Date; // 申請網域時身份驗證用
  identy_id: String; // 申請網域時身份驗證用
  address: String; // 申請網域時身份驗證用
  phone: String; // 申請網域時身份驗證用
  avatar: String; // Base64 encoded image.
  description: String; // User's description.
  domain_names: [String]; // e.g. lazco, haco, oncloud.
  badage: [String]; // Just for future. e.g. Premium badage, Domain badage.
  beta: Boolean; // Just for future. Get beta program.
  warn: Number; // Admin warning time.
  disable: Boolean; // Banned
  premium: Boolean; // Yup, VIP mode.
  ip: [String]; // 記錄使用者 IP
  create_time: Date; // Account created time.
  last_update: Date; // Account last edit time.
};

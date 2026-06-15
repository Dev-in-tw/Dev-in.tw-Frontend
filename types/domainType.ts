export type userType = {
  _id: string; // 此欄位為DB自動生成之欄位, will be used as domain id.
  cloudflare_id: string; // POST到CF後所生成的id，預設 0
  name: string; // 子網域名稱 如：lazco
  description: string; // 子網域介紹
  owner: string; // 使用者採用id制抓id獲取資料
  verify: boolean; // true 即代表申請通過，預設為 false
  status: string; //
  apply_time: Date; // 申請送出的timestamp
  last_update: Date; // 最後變更的timestamp，預設同apply_time
  expire_time: Date; // 到期timestamp，申請通過當下後一年
  ssl: string; // Will only be one of ["off", "flexible", "full", "strict"]
  premium: boolean; // 是否否為精選子網域
  exclusive: boolean; // 使否為特殊子網域
  disable: boolean; // 是被管理員停用
};

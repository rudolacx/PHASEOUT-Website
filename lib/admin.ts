export const ADMIN_EMAILS = [
  "unielvtuber@naver.com"
];


export function isAdmin(email?: string | null){

  if(!email) return false;

  return ADMIN_EMAILS.includes(email);

}
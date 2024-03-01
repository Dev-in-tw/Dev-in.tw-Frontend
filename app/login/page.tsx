import { redirect } from "next/navigation";


export default function Login() {
  redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}&scope=user:email`,
  );
}

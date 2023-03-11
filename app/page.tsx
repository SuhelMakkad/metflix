import { getRequestToken } from "@/api/tmbd";

export default async function Home() {
  const x = await getRequestToken();
  if (!x) {
    throw Error("can not get access token");
  }

  return (
    <main>
      <p>Hello</p>
      <h1>{x.expiresAt}</h1>
      <h1>{x.token}</h1>
    </main>
  );
}

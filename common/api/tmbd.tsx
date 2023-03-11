import axios from "axios";
import { env } from "process";

export const baseUrl = "https://api.themoviedb.org/3";

export const getRequestToken = async () => {
  const reqUrl = `${baseUrl}/authentication/token/new`;
  const config = {
    params: {
      api_key: env.TMBD_API_KEY,
    },
  };

  const res = await axios.get(reqUrl, config).catch(console.error);

  if (!res || !res.data.success) return;

  const data = res.data;
  const { expires_at, request_token }: { expires_at: string; request_token: string } = data;

  const tokenData = {
    expiresAt: new Date(expires_at).getTime(),
    token: request_token,
  };

  return tokenData;
};

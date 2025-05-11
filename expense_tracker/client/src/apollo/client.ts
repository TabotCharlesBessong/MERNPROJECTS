import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { getAccessToken, setAccessToken } from "../utils/token";
import axios from "axios";

// Refresh token from backend
const refreshToken = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/refresh_token",
      {},
      { withCredentials: true }
    );
    const { accessToken } = response.data;
    setAccessToken(accessToken);
    return accessToken;
  } catch (err) {
    console.error("Failed to refresh token:", err);
    return null;
  }
};

// Apollo link to attach token
const authLink = setContext(async (_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Handle token expiry
// @ts-ignore
const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  const isUnauth = graphQLErrors?.some(
    (err) => err.message === "Not authenticated"
  );

  if (isUnauth) {
    return refreshToken().then((newToken) => {
      if (newToken) {
        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            authorization: `Bearer ${newToken}`,
          },
        }));
        return forward(operation);
      }
    });
  }
});

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: "include",
});

export const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

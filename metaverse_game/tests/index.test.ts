import axios from "axios";
import { AxiosResponse, AxiosError } from "axios";

const BACKEND_URL = "http://localhost:3000";
const WS_URL = "ws://localhost:3001";

interface CustomAxiosResponse<T = any> extends AxiosResponse<T> {
  status: number;
  data: T;
}

interface SignupRequest {
  username: string;
  password: string;
  type?: string;
  role?: string;
}

interface SigninRequest {
  username: string;
  password: string;
}

interface SigninResponse {
  token: string;
  [key: string]: any;
}

const customAxios = {
  post: async <T = any>(
    ...args: Parameters<typeof axios.post>
  ): Promise<CustomAxiosResponse<T>> => {
    try {
      const res = await axios.post<T>(...args);
      return res;
    } catch (e) {
      return (e as AxiosError).response as CustomAxiosResponse<T>;
    }
  },
  get: async <T = any>(
    ...args: Parameters<typeof axios.get>
  ): Promise<CustomAxiosResponse<T>> => {
    try {
      const res = await axios.get<T>(...args);
      return res;
    } catch (e) {
      return (e as AxiosError).response as CustomAxiosResponse<T>;
    }
  },
  put: async <T = any>(
    ...args: Parameters<typeof axios.put>
  ): Promise<CustomAxiosResponse<T>> => {
    try {
      const res = await axios.put<T>(...args);
      return res;
    } catch (e) {
      return (e as AxiosError).response as CustomAxiosResponse<T>;
    }
  },
  delete: async <T = any>(
    ...args: Parameters<typeof axios.delete>
  ): Promise<CustomAxiosResponse<T>> => {
    try {
      const res = await axios.delete<T>(...args);
      return res;
    } catch (e) {
      return (e as AxiosError).response as CustomAxiosResponse<T>;
    }
  },
};

interface AvatarResponse {
  avatarId: string;
}

interface SignupResponse {
  userId: string;
}

interface UserMetadataResponse {
  avatars: Array<{
    userId: string;
    [key: string]: any;
  }>;
}

interface AvailableAvatarsResponse {
  avatars: Array<{
    id: string;
    [key: string]: any;
  }>;
}

interface ElementResponse {
  id: string;
}

interface MapResponse {
  id: string;
}

interface SpaceResponse {
  spaceId: string;
}

interface SpaceListResponse {
  spaces: Array<{
    id: string;
    [key: string]: any;
  }>;
}

interface CreateSpaceRequest {
  name: string;
  dimensions?: string;
  mapId?: string;
}

interface CreateElementRequest {
  imageUrl: string;
  width: number;
  height: number;
  static: boolean;
}

interface CreateMapRequest {
  thumbnail: string;
  dimensions: string;
  name: string;
  defaultElements: Array<{
    elementId: string;
    x: number;
    y: number;
  }>;
}

describe("Authentication", () => {
  test("User is able to sign up only once", async () => {
    const username = "kirat" + Math.random();
    const password = "123456";
    const response = await customAxios.post<void>(
      `${BACKEND_URL}/api/v1/signup`,
      {
        username,
        password,
        type: "admin",
      } as SignupRequest
    );

    expect(response.status).toBe(200);
    const updatedResponse = await customAxios.post<void>(
      `${BACKEND_URL}/api/v1/signup`,
      {
        username,
        password,
        type: "admin",
      } as SignupRequest
    );

    expect(updatedResponse.status).toBe(400);
  });

  test("Signup request fails if the username is empty", async () => {
    const password = "123456";

    const response = await customAxios.post<void>(
      `${BACKEND_URL}/api/v1/signup`,
      {
        password,
      } as SignupRequest
    );

    expect(response.status).toBe(400);
  });

  test("Signin succeeds if the username and password are correct", async () => {
    const username = `kirat-${Math.random()}`;
    const password = "123456";

    await customAxios.post<void>(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    } as SignupRequest);

    const response = await customAxios.post<SigninResponse>(
      `${BACKEND_URL}/api/v1/signin`,
      {
        username,
        password,
      } as SigninRequest
    );

    expect(response.status).toBe(200);
    expect(response.data.token).toBeDefined();
  });

  test("Signin fails if the username and password are incorrect", async () => {
    const username = `kirat-${Math.random()}`;
    const password = "123456";

    await customAxios.post<void>(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      role: "admin",
    } as SignupRequest);

    const response = await customAxios.post<void>(
      `${BACKEND_URL}/api/v1/signin`,
      {
        username: "WrongUsername",
        password,
      } as SigninRequest
    );

    expect(response.status).toBe(403);
  });
});

describe("User metadata endpoint", () => {
  let token: string = "";
  let avatarId: string = "";

  beforeAll(async () => {
    const username = `kirat-${Math.random()}`;
    const password = "123456";

    await customAxios.post<void>(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    } as SignupRequest);

    const response = await customAxios.post<SigninResponse>(
      `${BACKEND_URL}/api/v1/signin`,
      {
        username,
        password,
      } as SigninRequest
    );

    token = response.data.token;

    const avatarResponse = await customAxios.post<AvatarResponse>(
      `${BACKEND_URL}/api/v1/admin/avatar`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
        name: "Timmy",
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("avatarresponse is " + avatarResponse.data.avatarId);

    avatarId = avatarResponse.data.avatarId;
  });

  test("User cant update their metadata with a wrong avatar id", async () => {
    const response = await customAxios.post<void>(
      `${BACKEND_URL}/api/v1/user/metadata`,
      {
        avatarId: "123123123",
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    expect(response.status).toBe(400);
  });

  test("User can update their metadata with the right avatar id", async () => {
    const response = await customAxios.post<void>(
      `${BACKEND_URL}/api/v1/user/metadata`,
      {
        avatarId,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    expect(response.status).toBe(200);
  });

  test("User is not able to update their metadata if the auth header is not present", async () => {
    const response = await customAxios.post<void>(
      `${BACKEND_URL}/api/v1/user/metadata`,
      {
        avatarId,
      }
    );

    expect(response.status).toBe(403);
  });

  test("test 3", () => {});
});

describe("User avatar information", () => {
  let avatarId: string;
  let token: string;
  let userId: string;

  beforeAll(async () => {
    const username = `kirat-${Math.random()}`;
    const password = "123456";

    const signupResponse = await customAxios.post<SignupResponse>(
      `${BACKEND_URL}/api/v1/signup`,
      {
        username,
        password,
        type: "admin",
      } as SignupRequest
    );

    userId = signupResponse.data.userId;

    console.log("userid is " + userId);
    const response = await customAxios.post<SigninResponse>(
      `${BACKEND_URL}/api/v1/signin`,
      {
        username,
        password,
      } as SigninRequest
    );

    token = response.data.token;

    const avatarResponse = await customAxios.post<AvatarResponse>(
      `${BACKEND_URL}/api/v1/admin/avatar`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
        name: "Timmy",
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    avatarId = avatarResponse.data.avatarId;
  });

  test("Get back avatar information for a user", async () => {
    console.log("asking for user with id " + userId);
    const response = await customAxios.get<UserMetadataResponse>(
      `${BACKEND_URL}/api/v1/user/metadata/bulk?ids=[${userId}]`
    );
    console.log("response was " + userId);
    console.log(JSON.stringify(response.data));
    expect(response.data.avatars.length).toBe(1);
    expect(response.data.avatars[0].userId).toBe(userId);
  });

  test("Available avatars lists the recently created avatar", async () => {
    const response = await customAxios.get<AvailableAvatarsResponse>(
      `${BACKEND_URL}/api/v1/avatars`
    );
    expect(response.data.avatars.length).not.toBe(0);
    const currentAvatar = response.data.avatars.find((x) => x.id === avatarId);
    expect(currentAvatar).toBeDefined();
  });
});

describe("Space information", () => {
  let mapId: string;
  let element1Id: string;
  let element2Id: string;
  let adminToken: string;
  let adminId: string;
  let userToken: string;
  let userId: string;

  beforeAll(async () => {
    const username = `kirat-${Math.random()}`;
    const password = "123456";

    const signupResponse = await customAxios.post<SignupResponse>(
      `${BACKEND_URL}/api/v1/signup`,
      {
        username,
        password,
        type: "admin",
      } as SignupRequest
    );

    adminId = signupResponse.data.userId;

    const response = await customAxios.post<SigninResponse>(
      `${BACKEND_URL}/api/v1/signin`,
      {
        username,
        password,
      } as SigninRequest
    );

    adminToken = response.data.token;

    const userSignupResponse = await customAxios.post<SignupResponse>(
      `${BACKEND_URL}/api/v1/signup`,
      {
        username: username + "-user",
        password,
        type: "user",
      } as SignupRequest
    );

    userId = userSignupResponse.data.userId;

    const userSigninResponse = await customAxios.post<SigninResponse>(
      `${BACKEND_URL}/api/v1/signin`,
      {
        username: username + "-user",
        password,
      } as SigninRequest
    );

    userToken = userSigninResponse.data.token;

    const element1Response = await customAxios.post<ElementResponse>(
      `${BACKEND_URL}/api/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        width: 1,
        height: 1,
        static: true,
      } as CreateElementRequest,
      {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      }
    );

    const element2Response = await customAxios.post<ElementResponse>(
      `${BACKEND_URL}/api/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        width: 1,
        height: 1,
        static: true,
      } as CreateElementRequest,
      {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      }
    );

    element1Id = element1Response.data.id;
    element2Id = element2Response.data.id;

    const mapResponse = await customAxios.post<MapResponse>(
      `${BACKEND_URL}/api/v1/admin/map`,
      {
        thumbnail: "https://thumbnail.com/a.png",
        dimensions: "100x200",
        name: "Test space",
        defaultElements: [
          {
            elementId: element1Id,
            x: 20,
            y: 20,
          },
          {
            elementId: element1Id,
            x: 18,
            y: 20,
          },
          {
            elementId: element2Id,
            x: 19,
            y: 20,
          },
        ],
      } as CreateMapRequest,
      {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      }
    );

    mapId = mapResponse.data.id;
  });

  test("User is able to create a space", async () => {
    const response = await customAxios.post<SpaceResponse>(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        dimensions: "100x200",
        mapId: mapId,
      } as CreateSpaceRequest,
      {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      }
    );
    expect(response.status).toBe(200);
    expect(response.data.spaceId).toBeDefined();
  });

  test("User is able to create a space without mapId (empty space)", async () => {
    const response = await customAxios.post<SpaceResponse>(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        dimensions: "100x200",
      } as CreateSpaceRequest,
      {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      }
    );

    expect(response.data.spaceId).toBeDefined();
  });

  test("User is not able to create a space without mapId and dimensions", async () => {
    const response = await customAxios.post<void>(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
      } as CreateSpaceRequest,
      {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      }
    );

    expect(response.status).toBe(400);
  });

  test("User is not able to delete a space that doesnt exist", async () => {
    const response = await customAxios.delete<void>(
      `${BACKEND_URL}/api/v1/space/randomIdDoesntExist`,
      {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      }
    );

    expect(response.status).toBe(400);
  });

  test("User is able to delete a space that does exist", async () => {
    const response = await customAxios.post<SpaceResponse>(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        dimensions: "100x200",
      } as CreateSpaceRequest,
      {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      }
    );

    const deleteResponse = await customAxios.delete<void>(
      `${BACKEND_URL}/api/v1/space/${response.data.spaceId}`,
      {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      }
    );

    expect(deleteResponse.status).toBe(200);
  });

  test("User should not be able to delete a space created by another user", async () => {
    const response = await customAxios.post<SpaceResponse>(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        dimensions: "100x200",
      } as CreateSpaceRequest,
      {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      }
    );

    const deleteResponse = await customAxios.delete<void>(
      `${BACKEND_URL}/api/v1/space/${response.data.spaceId}`,
      {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      }
    );

    expect(deleteResponse.status).toBe(403);
  });

  test("Admin has no spaces initially", async () => {
    const response = await customAxios.get<SpaceListResponse>(
      `${BACKEND_URL}/api/v1/space/all`,
      {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      }
    );
    expect(response.data.spaces.length).toBe(0);
  });

  test("Admin has gets once space after", async () => {
    const spaceCreateResponse = await customAxios.post<SpaceResponse>(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        dimensions: "100x200",
      } as CreateSpaceRequest,
      {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      }
    );

    const response = await customAxios.get<SpaceListResponse>(
      `${BACKEND_URL}/api/v1/space/all`,
      {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      }
    );

    const filteredSpace = response.data.spaces.find(
      (x) => x.id === spaceCreateResponse.data.spaceId
    );
    expect(response.data.spaces.length).toBe(1);
    expect(filteredSpace).toBeDefined();
  });
});

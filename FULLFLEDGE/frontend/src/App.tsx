import React from "react";

import { Refine, AuthProvider } from "@pankod/refine-core";
import {
	notificationProvider,
	RefineSnackbarProvider,
	CssBaseline,
	GlobalStyles,
	ReadyPage,
	ErrorComponent,
} from "@pankod/refine-mui";
import {
	AccountCircleOutlined,
	ChatBubbleOutline,
	PeopleAltOutlined,
	StarOutlineRounded,
	VillaOutlined,
} from "@mui/icons-material";

import dataProvider from "@pankod/refine-simple-rest";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { useTranslation } from "react-i18next";
import { ColorModeContextProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";
import {
	Login,
	Home,
	Edit,
	AllProperties,
	Agents,
	MyProfile,
	AgentProfilePage,
	PropertyDetails,
	CreateProperty,
} from "pages";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
	const token = localStorage.getItem("token");
	if (request.headers) {
		request.headers["Authorization"] = `Bearer ${token}`;
	} else {
		request.headers = {
			Authorization: `Bearer ${token}`,
		};
	}

	return request;
});

function App() {
	const { t, i18n } = useTranslation();

	const authProvider: AuthProvider = {
		login: ({ credential }: CredentialResponse) => {
			const profileObj = credential ? parseJwt(credential) : null;

			if (profileObj) {
				localStorage.setItem(
					"user",
					JSON.stringify({
						...profileObj,
						avatar: profileObj.picture,
					})
				);
			}

			localStorage.setItem("token", `${credential}`);

			return Promise.resolve();
		},
		logout: () => {
			const token = localStorage.getItem("token");

			if (token && typeof window !== "undefined") {
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				axios.defaults.headers.common = {};
				window.google?.accounts.id.revoke(token, () => {
					return Promise.resolve();
				});
			}

			return Promise.resolve();
		},
		checkError: () => Promise.resolve(),
		checkAuth: async () => {
			const token = localStorage.getItem("token");

			if (token) {
				return Promise.resolve();
			}
			return Promise.reject();
		},

		getPermissions: () => Promise.resolve(),
		getUserIdentity: async () => {
			const user = localStorage.getItem("user");
			if (user) {
				return Promise.resolve(JSON.parse(user));
			}
		},
	};

	const i18nProvider = {
		translate: (key: string, params: object) => t(key, params),
		changeLocale: (lang: string) => i18n.changeLanguage(lang),
		getLocale: () => i18n.language,
	};

	return (
		<ColorModeContextProvider>
			<CssBaseline />
			<GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
			<RefineSnackbarProvider>
				<Refine
					dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
					notificationProvider={notificationProvider}
					ReadyPage={ReadyPage}
					catchAll={<ErrorComponent />}
					resources={[
						{
							name: "properties",
							list: AllProperties,
							show:PropertyDetails,
							create:CreateProperty,
							edit:Edit,
							icon: <VillaOutlined />,
						},
						{
							name: "agents",
							list: Agents,
							show:AgentProfilePage,
							icon: <PeopleAltOutlined />,
						},
						{
							name: "reviews",
							list: Home,
							icon: <StarOutlineRounded />,
						},
						{
							name: "messages",
							list: Home,
							icon: <ChatBubbleOutline />,
						},
						{
							name: "my-profile",
							options: {
								label: "My Profile",
							},
							list: MyProfile,
							icon: <AccountCircleOutlined />,
						},
					]}
					Title={Title}
					Sider={Sider}
					Layout={Layout}
					Header={Header}
					routerProvider={routerProvider}
					authProvider={authProvider}
					LoginPage={Login}
					i18nProvider={i18nProvider}
					DashboardPage={Home}
				/>
			</RefineSnackbarProvider>
		</ColorModeContextProvider>
	);
}

export default App;

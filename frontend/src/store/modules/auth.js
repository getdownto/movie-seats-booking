import userService from "../../services/user-service";

export default {
    state() {
        return {
            userId: null,
            isAdmin: false,
            isLoggedIn: false,
        };
    },
    getters: {
        userId(state) {
            return state.userId;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        isAdmin(state) {
            return state.isAdmin;
        },
    },
    mutations: {
        setUser(state, data) {
            state.isLoggedIn = data.isLoggedIn,
            state.userId = data.userId,
            state.isAdmin = data.isAdmin;
        },
    },
    actions: {
        async login(context, data) {
            userService.login(data.username, data.password).then((user) => {
                if (user !== "Invalid username or password") {
                    context.commit("setUser", {
                        isLoggedIn: true,
                        userId: user._id,
                        isAdmin: user.isAdmin,
                    });
                }
            });
        },
        async verify(context) {
            const cookies = document.cookie
                .split("; ")
                .reduce((acc, cookie) => {
                    const [cookieName, cookieValue] = cookie.split("=");
                    acc[cookieName] = cookieValue;
                    return acc;
                }, {});
            if (
                cookies["x-auth-token"] !== null &&
                cookies["x-auth-token"] !== undefined
            ) {
                const token = cookies["x-auth-token"];
                if (!token) {
                    this.logOut();
                    return;
                }
                userService
                    .verify(token)
                    .then((data) => {
                        if (data.user !== undefined) {
                            const user = data.user;
                            context.commit("setUser", {
                                isLoggedIn: true,
                                userId: user._id,
                                isAdmin: user.isAdmin,
                            });
                        }
                    })
                    .catch((err) => console.log(err));
            }
        },
        logout(context) {
            userService.logout().then(() => {
                context.commit("setUser", {
                    userId: null,
                    isLoggedIn: false,
                    isAdmin: false
                });
            })
        },
    },
};

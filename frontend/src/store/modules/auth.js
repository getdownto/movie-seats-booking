import userService from "../../services/user-service";

export default {
    state() {
        return {
            userId: null,
            username: null,
            isAdmin: false,
            isLoggedIn: !!document.cookie.split("; ").reduce((acc, cookie) => {
                const [cookieName, cookieValue] = cookie.split("=");
                acc[cookieName] = cookieValue;
                return acc;
            }, {})["x-auth-token"],
            error: null
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
        username(state) {
            return state.username;
        },
        error(state) {
            return state.error;
        },
    },
    mutations: {
        setUser(state, data) {
            state.isLoggedIn = data.isLoggedIn;
            state.userId = data.userId;
            state.isAdmin = data.isAdmin;
            state.username = data.username;
        },
        setErrors(state, data) {
            state.error = data.error
        },
    },
    actions: {
        login(context, data) {
            userService.login(data.username, data.password).then((user) => {
                //console.log(user, 'user in action');
                if (user) {
                    context.commit("setUser", {
                        isLoggedIn: true,
                        userId: user._id,
                        isAdmin: user.isAdmin,
                        username: user.username,
                    });
                   // console.log("logged in");
                } else {
                    context.commit("setErrors", {
                        error: "Invalid username or password"
                    });
                    console.log('error');
                }
            }).catch(err => {
                context.commit("setErrors", {
                    error: "Invalid username or password"
                });
                console.log(err, 'set error in state');
            });
        },
        verify(context) {
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
                //console.log(token);
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
                                username: user.username,
                            });
                            console.log(user, "user");
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
                    isAdmin: false,
                });
            });
        },
    },
};

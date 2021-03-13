const orderService = {
    load: function() {
        return fetch("http://localhost:9999/api/book").then((res) =>
            res.json()
        );
    },
    details: function(id) {
        return fetch(`http://localhost:9999/api/book/${id}`).then((res) =>
            res.json()
        );
    },
    create: function(movie, moviePrice, date, duration, totalPrice, seats) {
        return fetch("http://localhost:9999/api/book", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                movie,
                moviePrice,
                date,
                duration,
                totalPrice,
                seats,
            }),
            credentials: "include",
        }).then((res) => res.text());
    },
    update: function(id, status) {
        return fetch(`http://localhost:9999/api/book/${id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status,
            }),
            credentials: "include",
        }).then((res) => res.text());
    },
    delete: function(id) {
        return fetch(`http://localhost:9999/api/book/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        }).then((res) => res.text());
    },
};

export default orderService;

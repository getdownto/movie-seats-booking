const movieService = {
    load: function() {
        return fetch('http://localhost:9999/api/movie').then(res => res.json())
    },
    details: function(id) {
        return fetch(`http://localhost:9999/api/movie/${id}`).then(res => res.json())
    },
    create: function(newMovie) {
        return fetch('http://localhost:9999/api/movie/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(
                newMovie
            ),
            credentials: 'include'
        }).then(res => res.text())
    },
    update: function(id, updatedMovie) {
        return fetch(`http://localhost:9999/api/movie/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(updatedMovie),
            credentials: 'include'
        }).then(res => res.text())
    },
    rate: function(id, rating) {
        return fetch(`http://localhost:9999/api/movie/rate/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                rating
            }),
            credentials: 'include'
        }).then(res => res.text())
    },
    delete: function(id) {
        return fetch(`http://localhost:9999/api/movie/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            credentials: 'include'
        }).then(res => res.text())
    }

}

export default movieService
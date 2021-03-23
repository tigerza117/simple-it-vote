const auth = firebase.auth()

auth.onAuthStateChanged(
    function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName
            var email = user.email
            var emailVerified = user.emailVerified
            var photoURL = user.photoURL
            var uid = user.uid
            var phoneNumber = user.phoneNumber
            var providerData = user.providerData
            user.getIdToken().then(function (accessToken) {})
            // Validate data
            if (window.location.pathname == '/login.html') {
                window.location.href = '/index.html'
            }
        } else {
            // User is signed out.
            if (window.location.pathname != 'login.html') {
                window.location.href = '/login.html'
            }
        }
    },
    function (error) {
        console.log(error)
    }
)

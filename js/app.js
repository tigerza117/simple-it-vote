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
        } else {
            // User is signed out.
        }
    },
    function (error) {
        console.log(error)
    }
)

var uiConfig = {
    signInSuccessUrl: 'index.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
        window.location.assign('<your-privacy-policy-url>')
    }
}

var ui = new firebaseui.auth.AuthUI(firebase.auth())
ui.start('#firebaseui-auth-container', uiConfig)

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

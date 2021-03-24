const db = firebase.firestore()

const auth = firebase.auth()

var signoutBtn = document.getElementById('signout')
var ministriesList = document.getElementById('ministries')

auth.onAuthStateChanged(
    async (user) => {
        if (user) {
            // User is signed in.
            await db
                .collection('students')
                .doc(user.uid)
                .get()
                .then((doc) => {
                    if (!doc.data()) {
                        return (window.location.href = '/infomation.html')
                    }
                })

            db.collection('ministries')
                .get()
                .then((docs) => {
                    docs.forEach((doc) => {
                        let { name, enable } = doc.data()
                        let ministry = document.createElement('button')
                        ministry.classList.add('ministry')
                        ministry.disabled = !enable
                        ministry.innerText = name
                        ministry.onclick = () => {
                            window.location.href = `/rule-vote.html?id=${doc.id}`
                        }
                        ministriesList.appendChild(ministry)
                    })
                })

            signoutBtn.onclick = () => {
                auth.signOut()
                window.location.href = '/login.html'
            }
        } else {
            window.location.href = '/login.html'
        }
    },
    (error) => {
        console.log(error)
    }
)

const db = firebase.firestore()

const auth = firebase.auth()

var nicknameInput = document.getElementById('nickname')
var taSelect = document.getElementById('ta')
var formInfo = document.getElementById('info_form')

auth.onAuthStateChanged(
    async (user) => {
        if (user) {
            // User is signed in.
            await db
                .collection('students')
                .doc(user.uid)
                .get()
                .then((doc) => {
                    if (doc.data()) {
                        return (window.location.href = '/index.html')
                    }
                })

            db.collection('tas')
                .get()
                .then((docs) => {
                    docs.forEach((doc) => {
                        let { name, img } = doc.data()
                        let option = document.createElement('option')
                        option.value = doc.id
                        option.innerText = name
                        taSelect.appendChild(option)
                    })
                })

            formInfo.onsubmit = (e) => {
                e.preventDefault()
                db.collection('students')
                    .doc(user.uid)
                    .set({
                        ta: taSelect.value,
                        nickname: nicknameInput.value,
                        createAt: new Date()
                    })
                    .then((doc) => {
                        return (window.location.href = '/index.html')
                    })
                return false
            }
        } else {
            window.location.href = '/login.html'
        }
    },
    (error) => {
        console.log(error)
    }
)

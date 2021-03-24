const db = firebase.firestore()

const auth = firebase.auth()

var signoutBtn = document.getElementById('signout')
var rulesList = document.getElementById('rules')
var submitBtn = document.getElementById('submit')
let select = []

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

            await db
                .collection('rule_votes')
                .where('uid', '==', user.uid)
                .get()
                .then((doc) => {
                    if (doc.size >= 2) {
                        return (window.location.href = '/rule-vote-result.html')
                    }
                })

            db.collection('rules')
                .where('ministry_id', '==', searchToObject().id)
                .get()
                .then((docs) => {
                    docs.forEach((doc) => {
                        let { name, content } = doc.data()
                        let rule = document.createElement('button')
                        let title = document.createElement('div')
                        let body = document.createElement('div')
                        rule.classList.add('rule')
                        rule.onclick = () => {
                            console.log(select)
                            let idx = select.indexOf(doc.id)
                            if (idx >= 0) {
                                select.splice(idx, 1)
                                rule.classList.remove('active')
                            } else {
                                if (select.length < 2) {
                                    select.push(doc.id)
                                    rule.classList.add('active')
                                }
                            }
                        }
                        title.innerText = name
                        body.innerText = content

                        rule.appendChild(title)
                        rulesList.appendChild(rule)
                        console.log(doc.data())
                    })
                })

            submitBtn.onclick = () => {
                select.forEach((item) => {
                    console.log(item)
                    db.collection('rule_votes')
                        .add({
                            uid: user.uid,
                            rule_id: item,
                            createAt: new Date()
                        })
                        .then((doc) => {
                            return (window.location.href =
                                '/rule-vote-result.html')
                        })
                })
            }

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

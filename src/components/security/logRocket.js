import {getCurrenUser} from "../../services/authService";
import LogRocket from "logrocket";


export default function initRocket() {
    let user = getCurrenUser()
    console.log("LOG ROCKET USER",user)
// This is an example script - don't forget to change it!
    LogRocket.identify(user.email, {
        name: user.name,
        email: user.email,

        // Add your own custom user variables here, ie:
        subscriptionType: user.isAdmin? 'Amin User':'Limited User'
    })
}

import Routes from '@/router/routes'
// enums
import Navbar from '@/enum/navbar'
import Auth from '@/enum/auth'

// helper function
function getBar(navbar, isAuthentificated) {
    console.info(`'${navbar}' bar reloaded authentification is '${isAuthentificated}'`);
    return Routes.filter(el => {
        const present = el.presentetion

        if (present) {
            if (present.navbar === navbar) {
                switch (present.auth) {
                    case Auth.AUTH:
                        return isAuthentificated
                    case Auth.UNAUTH:
                        return !isAuthentificated
                    default: 
                        return true
                }                        
            } else {
                return false
            }
        } else {
            return false
        }
     }).map(el => {
        const present = el.presentetion

        return {to: el.name, icon: present.icon, title: present.description}
     })
}

const getters = {
    navigationBar: ( state, getters ) => {
        return getBar(Navbar.NAV, getters.isAuthentificated)
    },
    authBar: (state, getters ) => {
        return getBar(Navbar.AUTH, getters.isAuthentificated)
    }
}

export default {
    getters
}
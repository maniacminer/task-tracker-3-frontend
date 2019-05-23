import Routes from '@/router/routes'
// enums
import Navbar from '@/enum/navbar'
import Auth from '@/enum/auth'

// helper function
function getBar(navbar, isAuthentificated) {
    console.info(`'${navbar}' bar reloaded authentification is '${isAuthentificated}'`);
    return Routes.filter(el => {
        if (el.presentetion) {
            if (el.presentetion.navbar === navbar) {
                switch (el.presentetion.auth) {
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
         return {to: el.name, icon: el.presentetion.icon, title: el.presentetion.description}
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
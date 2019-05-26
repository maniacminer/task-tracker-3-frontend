import { actions as journalsActions, state as journalState, getters as journalGetters} from './journals'

let state = {
    $db: null,
}

state = Object.assign(state, journalState)


let getters = {

}

getters = Object.assign(getters, journalGetters)


const mutations = {
    db: (state, db) => {
        state.$db = db
    }        
}

let actions = {
    bindDb: ({ commit }, db) => {
        commit('db', db)
    },
    getDoc: ({ state }, params) => {
        const promise = state.$db.collection(params.name).doc(params.id).get()

        
        promise.then(doc => {
            if (doc.exists) {
                params.callBack(doc.data()) 
            } else {
                params.callBack(null, "no document") // TODO: error
            }
        }).catch(err => {
            params.callBack(null, err) 
        })

    },
    saveDoc: ({ state }, params) => {
        const payload = params.payload
        const collectionName = params.payload._name
        let db = {}
        params.payload._persistent.forEach(f => db[f] = params.payload[f])
        

        let promise = null
        
        if (!payload.id) {
            promise = state.$db.collection(collectionName).add(db)
        } else {
            // all fields, include not changed TODO: fix
            promise = state.$db.collection(collectionName).doc(payload.id).set(db)
        }
        
        promise.then(docRef => {
            params.callBack(docRef)
        }).catch(err => {
            params.callBack(null, err)
        })
    },
    deleteDoc({ state }, params ){
        console.log(params);
        if (!params.id) {
            params.callBack('no document, id is empty')
            return
        }

        state.$db.collection(params.name).doc(params.id).delete()
            .then(() => params.callBack())
            .catch(err=> params.callBack(err))
    },
    getCollection({state}, params){
        let collection = state.$db.collection(params.name)

        if (params.filters) {
            params.filters.forEach(f => collection=collection.where(f.field, f.eq, f.value))
        }

        return collection.get()
    },    
}

actions = Object.assign(actions, journalsActions)

export default {
    state, getters, mutations, actions
}
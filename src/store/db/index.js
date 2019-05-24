import { timingSafeEqual } from "crypto";

const state = {
    $db: null,
    taskList: []
}

const getters = {

}

const mutations = {
    db: (state, db) => {
        state.$db = db
    }        
}

const actions = {
    bindDb: ({ commit }, db) => {
        commit('db', db)
    },
    getTask: ({ state }, params) => {
        const promise = state.$db.collection('task').doc(params.id).get()

        
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
    saveTask: ({ state }, params) => {
        const payload = params.payload
        const dbpayload = {
            id: payload.id,
            title: payload.title,
            dueDate: payload.dueDate,
            priority: payload.priority,
            responsibleId: payload.responsible,
            description: payload.description,
            createDate: payload.createDate,
            completed: payload.completed,
        }
        

        let promise = null
        
        if (!payload.id) {
            console.log('new task save ...')
            promise = state.$db.collection('task').add(dbpayload)
        } else {
            console.log('updating task ...')
            // all fields, include not changed TODO: fix
            promise = state.$db.collection('task').doc(payload.id).set(dbpayload)
        }
        
        promise.then(docRef => {
            params.callBack(docRef)
        }).catch(err => {
            params.callBack(null, err)
        })
    },
    getTaskList({ state }, callBack) {
        state.taskList = []
        console.log(state.$db);
        // state.$db.ref("task").get().then( qs => {

        state.$db.collection("task").get().then( qs => {
            qs.forEach((doc) => {
                const data = doc.data()
                state.taskList.push({id: doc.id,
                    title: data.title,
                    dueDate: data.dueDate,
                    priority: data.priority,
                    createDate: data.createDate,
                    completed: data.completed,
                })

            })
            callBack()
        }).catch(err => {
            callBack(err)
        })

    },
    deleteTask({ state }, params ){
        if (!params.id) {
            params.callBack('no document, id is empty')
            return
        }

        state.$db.collection('task').doc(params.id).delete()
            .then(() => params.callBack())
            .catch(err=> params.callBack(err))
    }
}

export default {
    state, getters, mutations, actions
}
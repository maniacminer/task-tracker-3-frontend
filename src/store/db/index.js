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
    saveTask: ({ state }, params) => {
        const task = params.task
        const dbTask = {
            id: task.id,
            title: task.title,
            dueDate: task.dueDate,
            priority: task.priority,
            responsibleId: task.responsible,
            description: task.description,
            createDate: task.createDate,
        }
        
        let promise = null
        
        if (!task.id) {
            console.log('new task save ...')
            promise = state.$db.collection('task').add(dbTask)
        } else {
            console.log('updating task ...')
            // all fields, include not changed TODO: fix
            promise = state.$db.collection('task').doc(task.id).update(dbTask)
        }
        
        promise.then(docRef => {
            params.callBack(docRef)
        }).catch(err => {
            params.callBack(null, err)
        })
    },
    getTaskList({ state }, callBack) {
        state.taskList = []
        state.$db.collection("task").get().then( qs => {
            qs.forEach((doc) => {
                const data = doc.data()
                state.taskList.push({id: doc.id,
                    title: data.title,
                    dueDate: data.dueDate,
                    priority: data.priority,
                    createDate: data.createDate,
                })

            })
            callBack()
        }).catch(err => {
            callBack(err)
        })

    }
}

export default {
    state, getters, mutations, actions
}
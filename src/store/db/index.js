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
    saveTask: ({ state }, task) => {
        console.log('task save ..')
        // console.log(state);
        // console.info(task);

        state.$db.collection('task').add(
            {
                title: task.title,
                dueDate: task.dueDate,
                priority: task.priority,
                responsibleId: task.responsible,
                description: task.description
            }
        )
    },
    getTaskList({ state }) {
        state.taskList = []
        state.$db.collection("task").get().then( qs => {
            qs.forEach((doc) => {
                const data = doc.data()
                state.taskList.push({id: doc.id, title: data.title, dueDate: data.dueDate, priority: data.priority})
                console.log(`${doc.id} => ${doc.data()}`);
            })
            console.log(state.taskList)
        })        

    }
}

export default {
    state, getters, mutations, actions
}
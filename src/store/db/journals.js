const state = {
  taskList: [],
  projectList: []
}

const getters = {}

const actions = {
  getTaskListAsync({ state }, params) {
    return state.$db.collection("task").get()
  },

  getTaskList({ state }, params) {
    state.taskList = []

    const collection = state.$db.collection("task")

    let promise = null
    if (params.onlyOpen) {
      promise = collection.where("completed", "==", false).get()
    } else {
      promise = collection.get()
    }

    promise
      .then(qs => {
        qs.forEach(doc => {
          const data = doc.data()
          state.taskList.push({
            id: doc.id,
            title: data.title,
            dueDate: data.dueDate,
            priority: data.priority,
            createDate: data.createDate,
            completed: data.completed
          })
        })
        params.callBack()
      })
      .catch(err => {
        params.callBack(err)
      })
  },
  getProjectList({ state }, params) {
    state.taskList = []

    const collection = state.$db.collection("project")

    let promise = null
    // if (params.onlyOpen) {
    // promise = collection.where("completed","==", false).get()
    // } else {
    promise = collection.get()
    // }

    promise
      .then(qs => {
        qs.forEach(doc => {
          const data = doc.data()
          state.projectList.push({ id: doc.id, title: data.title })
        })
        params.callBack()
      })
      .catch(err => {
        params.callBack(err)
      })
  }
}

export { actions, state, getters }

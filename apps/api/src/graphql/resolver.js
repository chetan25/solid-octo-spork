const axios = require('axios');

module.exports = {
  todos() {
    return axios.get('http://localhost:3000/todos')
      .then(res => res.data);
  },
  addTodo(args, req) {
    const { addTodo } = args;
    return axios.post('http://localhost:3000/todos', {
      title: addTodo.title,
      description: addTodo.description,
      endGoal: addTodo.endGoal,
      actions: addTodo.actions
    })
      .then(res => res.data);
  }
}

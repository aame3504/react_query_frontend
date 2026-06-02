// TodoPage.jsx

import React, { useState } from 'react'
import TodoTemplate from '../no2_components/todo/TodoTemplate'
import TodoInsert from '../no2_components/todo/TodoInsert'
import TodoList from '../no2_components/todo/TodoList'


const TodoPage = () => {
  
  return (
    <TodoTemplate>
      <TodoInsert/>

      <TodoList/>
    </TodoTemplate>
  )
}

export default TodoPage
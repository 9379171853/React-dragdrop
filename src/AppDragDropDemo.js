import React, { Component } from 'react';

class AppDragDropDemo extends Component {
  state = {
    tasks: [
      { name: 'Learn Angular', category: 'wip', bgcolor: 'yellow' },
      { name: 'Learn React', category: 'wip', bgcolor: 'pink' },
      { name: 'Vue', category: 'complete', bgcolor: 'skyblue' },
    ],
  };
  onDragStart = (ev, id) => {
    console.log('drag start:', id);
    ev.dataTransfer.setData('id', id);
  };
  onDragOver = (ev) => {
    ev.preventDefault();
  };
  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData('id');

    let tasks = this.state.tasks.filter((task) => {
      if (task.name === id) {
        task.category = cat;
      }
      return task;
    });
    this.setState({
      ...this.state,
      tasks,
    });
  };

  render() {
    const tasks = {
      wip: [],
      complete: [],
    };
    this.state.tasks.forEach((t) => {
      tasks[t.category].push(
        <div
          onDragStart={(e) => this.onDragStart(e, t.name)}
          key={t.name}
          draggable
          className='draggable'
          style={{ backgroundColor: t.bgcolor }}
        >
          {t.name}
        </div>
      );
    });

    return (
      <div className='container-drag'>
        <h2 className='header'>Dragable App</h2>
        <div
          className='wip'
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, 'wip')}
        >
          <span className='task-header'>WIP</span>
          {tasks.wip}
        </div>
        <div
          className='droppable'
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, 'complete')}
        >
          <span className='task-header'>COMPLETED</span>
          {tasks.complete}
        </div>
      </div>
    );
  }
}

export default AppDragDropDemo;

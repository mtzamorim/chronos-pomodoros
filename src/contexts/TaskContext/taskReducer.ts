import type { TaskStateModel } from '../../models/TaskStateModel';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';
import { getNextCycle } from '../../utils/getNextCycle';
import { TaskActionTypes, type TaskActionModel } from './taskActions';

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      // setState(prevState => {
      //   return {
      //     ...prevState,
      //     config: { ...prevState.config },
      //     activeTask: newTask,
      //     currentCycle: nextCycle,
      //     secondsRemaining,
      //     formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
      //     tasks: [...prevState.tasks, newTask],
      //   };
      // });
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsReamining = newTask.duration * 60;
      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsReamining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsReamining),
        tasks: [...state.tasks, newTask],
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsReamining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.RESET_STATE: {
      return state;
    }
  }

  return state;
}

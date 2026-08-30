import Task from "./Task"
import type { TaskModel } from "./types"
import { useState, useCallback, useMemo } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type Modifier
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

  const restrictToVerticalAndParent: Modifier = ({
    containerNodeRect,
    draggingNodeRect,
    transform
  }) => {
    if (!draggingNodeRect || !containerNodeRect) return transform
    return {
      ...transform,
      x: 0,
      y: Math.min(
        Math.max(
          transform.y,
          containerNodeRect.top - draggingNodeRect.top
        ),
        containerNodeRect.bottom - draggingNodeRect.bottom
      ),
    };
  }


export default function TaskList() {
  const [tasks, setTasks] = useState<TaskModel[]>([
    {
      id: "1",
      position: 1,
      isPin: false,
      title: "Task 1",
      description: "Description 1",
      status: "TODO",
    },
    {
      id: "2",
      position: 2,
      isPin: false,
      title: "Task 2",
      description: "Description 2",
      status: "IN_PROGRESS",
    },
    {
      id: "3",
      position: 3,
      isPin: false,
      title: "Task 3",
      description: "Description 3",
      status: "DONE",
    },
  ])

  const updateTask = useCallback((id: string, updates: Partial<Omit<TaskModel, 'id'>>) => {
    setTasks(prevTasks => prevTasks.map(task => {
      if (task.id === id) {
        return { ...task, ...updates }
      }
      return task
    }))
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
  }, [])

  // Sort tasks so that pinned tasks appear first
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (a.isPin && !b.isPin) return -1
      if (!a.isPin && b.isPin) return 1
      return (a.position || 0) - (b.position || 0)
    })
  }, [tasks])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Point moves at least 5px to allow drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = sortedTasks.findIndex((task) => task.id === active.id)
      const newIndex = sortedTasks.findIndex((task) => task.id === over.id)

      const newSorted = arrayMove(sortedTasks, oldIndex, newIndex)
      const updatedPositionTasks = newSorted.map((item, index) => ({
        ...item,
        position: index + 1
      }))
      setTasks(updatedPositionTasks)
    }
  }, [sortedTasks])


  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAndParent]}
    >
      <div className="flex flex-col w-full gap-3">
        <SortableContext
          items={sortedTasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedTasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              position={task.position}
              title={task.title}
              description={task.description}
              status={task.status}
              isPin={task.isPin}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  )
}

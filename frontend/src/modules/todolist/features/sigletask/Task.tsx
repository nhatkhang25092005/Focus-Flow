import { memo, useMemo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import Block from "../../../../components/Block"
import Typography from "../../../../components/text/Typography"
import { cn } from "../../../../utils/cn"
import DropdownMenu from "../../../../components/Dropdown/DropdownMenu"
import DropdownItem from "../../../../components/Dropdown/DropdownItem"
import EditText from "../../../../components/EditText"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { TaskModel, TaskStatus } from "./types"

export type TaskProps = TaskModel & {
  updateTask?: (id: string, updates: Partial<Omit<TaskModel, 'id'>>) => void
  deleteTask?: (id: string) => void
}

const STATUS_CONFIG = {
  TODO: {
    labelKey: "todolist.task.status.todo",
    indicatorClassName: "bg-gray-500",
    textColor: "text-gray-500",
    backgroundClassName: "bg-gray-100",
    textClassName: "text-gray-500",
    hoverBackground: "hover:bg-gray-200"
  },
  IN_PROGRESS: {
    labelKey: "todolist.task.status.in_progress",
    indicatorClassName: "bg-blue-500",
    backgroundClassName: "bg-blue-100",
    textColor: "text-blue-500",
    textClassName: "text-blue-500",
    hoverBackground: "hover:bg-blue-200"
  },
  DONE: {
    labelKey: "todolist.task.status.done",
    indicatorClassName: "bg-green-500",
    backgroundClassName: "bg-green-100",
    textColor: "text-green-500",
    textClassName: "text-green-500",
    hoverBackground: "hover:bg-green-200"
  },
} as const

function Status({ status }: { status: TaskStatus }) {
  const config = STATUS_CONFIG[status]
  const { t } = useTranslation()

  return (
    <span className={`${config.backgroundClassName} rounded-lg px-3 shrink-0 inline-flex items-center py-1 hover:scale-102 transition-all duration-300 hover:shadow-lg cursor-pointer`}>
      <Typography className={`${config.textClassName}`} bold variant="small">{t(config.labelKey)}</Typography>
    </span>
  )
}

type OptionKey = 'EDIT' | 'PIN' | 'ADD_TO_GROUP' | 'DELETE'

type OptionConfig = {
  labelKey: string
  className?: string
  icon: string
  handler?: (id: string) => void
}

function ThreeDot() {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200">
      <span className="-translate-y-1.5 font-bold text-2xl cursor-pointer">...</span>
    </span>
  )
}

export default memo(function Task({
  isPin = false,
  status = 'IN_PROGRESS',
  id,
  title,
  description,
  deleteTask,
  updateTask
}: TaskProps) {
  const config = STATUS_CONFIG[status]
  const { t } = useTranslation()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.9 : 1,
    zIndex: isDragging ? 50 : "auto",
    position: "relative" as const,
  };

  // Handlers
  const changeTitle = useCallback((value: string) => {
    updateTask?.(id, { title: value })
  }, [id, updateTask])

  const changeDescription = useCallback((value: string) => {
    updateTask?.(id, { description: value })
  }, [id, updateTask])

  const changeStatus = useCallback((newStatus: TaskStatus) => {
    updateTask?.(id, { status: newStatus })
  }, [id, updateTask])

  const changePin = useCallback(() => {
    updateTask?.(id, { isPin: !isPin })
  }, [id, isPin, updateTask])

  const handleDelete = useCallback(() => {
    deleteTask?.(id)
  }, [id, deleteTask])

  const OPTION_CONFIG: Record<OptionKey, OptionConfig> = useMemo(() => ({
    EDIT: { labelKey: "todolist.task.options.edit", icon: "/edit.png" },
    PIN: { labelKey: "todolist.task.options.pin", icon: "/pin.png", handler: changePin },
    ADD_TO_GROUP: { labelKey: "todolist.task.options.add_to_group", icon: "/add_group.png" },
    DELETE: {
      labelKey: "todolist.task.options.delete",
      className: "text-red-600 hover:bg-red-50 hover:text-red-700",
      icon: "/delete.png",
      handler: handleDelete
    }
  }), [changePin, handleDelete])

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn("transition-colors rounded-lg", isDragging ? "bg-gray-50 border" : "bg-white")} 
    >
      <Block className="[&>div]:w-full [&>div]:p-1 relative">
        {isPin && (
          <span className="absolute top-1 right-1 z-40">
            <img className="w-4 h-4 object-contain" src="/color_pin.png" alt="Pinned" />
          </span>
        )}

        <div className="w-full flex flex-row h-full p-0 items-center gap-3">
          <span className={cn(
            `rounded-xl h-10 w-2 ${config.indicatorClassName}`
          )} />
          <div className="flex-1 min-w-0 overflow-hidden">
            <EditText value={title} onChange={changeTitle} bold="semibold" variant="body-sm" />
            <EditText color="secondary" variant="small" truncate value={description} onChange={changeDescription} />
          </div>

          <div className="h-fit items-center gap-3 flex ml-auto">
            <DropdownMenu
              trigger={<Status status={status} />}
              triggerClassName="rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              {(Object.keys(STATUS_CONFIG) as TaskStatus[]).map(option => (
                <DropdownItem
                  key={option}
                  onSelect={() => changeStatus(option)}
                  className={STATUS_CONFIG[option].hoverBackground}
                >
                  <Typography bold className={STATUS_CONFIG[option].textColor}>
                    {t(STATUS_CONFIG[option].labelKey)}
                  </Typography>
                </DropdownItem>
              ))}
            </DropdownMenu>

            <DropdownMenu trigger={<ThreeDot />}>
              {(Object.keys(OPTION_CONFIG) as OptionKey[]).map(option => (
                <DropdownItem
                  key={option}
                  onSelect={() => OPTION_CONFIG[option].handler?.(id)}
                  className={OPTION_CONFIG[option].className}
                >
                  <img
                    src={OPTION_CONFIG[option].icon}
                    alt={t(OPTION_CONFIG[option].labelKey)}
                    className="w-4 h-4 object-contain"
                  />
                  {t(OPTION_CONFIG[option].labelKey)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </div>
        </div>
      </Block>
    </div>
  )
})
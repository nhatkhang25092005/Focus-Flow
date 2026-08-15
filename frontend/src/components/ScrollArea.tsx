import type { ComponentPropsWithRef, ElementType } from "react";
import {cn} from "../utils/cn"
type ScrollAreaProps<T extends ElementType> = {as?:T} & ComponentPropsWithRef<T>

export default function ScrollArea<T extends ElementType = "div">({
  as,
  className,
  ...props}:ScrollAreaProps<T>){
  const Component = as ?? "div"
  return(
    <Component
      className={cn(
        ` overflow-y-auto overscroll-contain
          scrollbar-thin
          [scrollbar-color:#f59e0b_transparent]
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-amber-400
          [&::-webkit-scrollbar-thumb:hover]:bg-amber-500`,
          className,
      )}
      {...props}
    />
  )
}
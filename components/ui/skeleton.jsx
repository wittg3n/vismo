import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (<div
    className={cn(
      "animate-pulse rounded-md bg-gradient-to-r from-[#2F3734]  to-[#424D49]",
      className
    )}
    {...props}
  />);
}

export { Skeleton }

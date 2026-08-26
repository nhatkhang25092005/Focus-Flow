export default function Clock({hideHours = false, time, className}:{hideHours?: boolean,time:number, className?: string}) {

  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = time % 60

  return (
    <div className={className}>
      <section>
        <section>
          {!hideHours && <span>{String(hours).padStart(2, "0")}:</span>}
          <span>{String(minutes).padStart(2, "0")}:</span>
          <span>{String(seconds).padStart(2, "0")}</span>
        </section>
      </section>
    </div>
  )
}
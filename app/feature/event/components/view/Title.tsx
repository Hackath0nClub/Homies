import { useEvent } from '../../../../feature/event/hooks/useEvent'
import { getMonthDay, getYear } from '../../../../lib/splitDateTime'

export const Title = () => {
  const { base } = useEvent()

  const Year = () => {
    return (
      <span className="text-base leading-none m-0">
        <span>{base.start_at ? getYear(base.start_at) : null}</span>
      </span>
    )
  }

  const Date = () => {
    return (
      <span className="text-2xl leading-none m-0">
        <span>{base.start_at ? getMonthDay(base.start_at) : null}</span>
      </span>
    )
  }

  const TitleText = () => {
    return (
      <span className="text-xl leading-none m-0">
        <span>{base.title}</span>
      </span>
    )
  }

  return (
    <div className="gap-4 inline-flex items-center text-white text-left font-bold w-full">
      <div className="py-2 pr-3 flex flex-col items-center w-16">
        <Year />
        <Date />
      </div>
      <TitleText />
    </div>
  )
}

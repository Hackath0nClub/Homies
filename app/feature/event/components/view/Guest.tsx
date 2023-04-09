import { useEvent } from '../../../../feature/event/hooks/useEvent'
import { DjType, VjType } from '../../store/eventState'

export const Guest = () => {
  const { timetable, vjtable } = useEvent()

  const GuestRow = ({ dj }: { dj: DjType | VjType }) => {
    return (
      <div className="w-full grid grid-cols-3 gap-8 m-8" key={dj.user_id}>
        <img
          alt={dj.name!}
          src={dj.icon_url!}
          className="rounded-full col-span-1"
        />
        <div className="col-span-2">
          <p className="text-white text-xl">{dj.name}</p>
          <p className="text-white text-base">{dj.text}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <p className="text-white text-left font-bold text-2xl my-4">
        ゲストDJ/VJ
      </p>
      <div className="guest-row-guest-details">
        {timetable.map((dj, index) => (
          <GuestRow dj={dj} key={index} />
        ))}
        {vjtable.map((vj, index) => (
          <GuestRow dj={vj} key={index} />
        ))}
      </div>
    </>
  )
}

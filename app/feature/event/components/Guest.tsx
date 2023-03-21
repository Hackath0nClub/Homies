type propsType = {
  timetable:
    | {
        row_number: number
        name: string | null
        user_id: string | null
        text: string | null
        icon_url: string | null
        start_time: string
        end_time: string
        guest_name: string | null
        guest_text: string | null
        guest_icon_url: string | null
      }[]
}

const Guest = (props: propsType) => {
  return (
    <>
      <p className="text-white text-left font-bold text-2xl my-4">
        ゲストDJ/VJ
      </p>
      <div className="guest-row-guest-details">
        {props.timetable.map((row) => {
          if (row.user_id) {
            return (
              <div
                className="w-full grid grid-cols-3 gap-8 m-8"
                key={row.user_id}
              >
                <img
                  alt={row.name!}
                  src={row.icon_url!}
                  className="rounded-full col-span-1"
                />
                <div className="col-span-2">
                  <p className="text-white text-xl">{row.name}</p>
                  <p className="text-white text-base">{row.text}</p>
                </div>
              </div>
            )
          } else {
            return (
              <div
                className="w-full grid grid-cols-3 gap-8 m-8"
                key={row.user_id}
              >
                <img
                  alt="icon"
                  src="/user.png"
                  className="rounded-full col-span-1"
                />
                <div className="col-span-2">
                  <p className="text-white text-xl">{row.name}</p>
                  <p className="text-white text-base">{row.user_id}</p>
                </div>
              </div>
            )
          }
        })}
      </div>
    </>
  )
}

export default Guest

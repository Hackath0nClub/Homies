type propsType = {
  organizers: {
    name: string
    user_id: string
    text: string | null
    icon_url: string | null
  }[]
}

const OrganizerRow = (props: propsType) => {
  return (
    <>
      <div className="border border-gray-500 rounded-xl w-full bg-[rgba(47,51,56,1)] my-4">
        <p className="p-4 w-full flex items-start self-stretch text-xl text-white text-left">
          主催
        </p>
        <div className="border-t-2 border-gray-500"></div>

        {props.organizers.map((organizer) => {
          return (
            <div
              className="w-full grid grid-cols-3 gap-8 m-8"
              key={organizer.user_id}
            >
              <img
                alt={organizer.name!}
                src={organizer.icon_url!}
                className="rounded-full col-span-1"
              />
              <div className="col-span-2">
                <p className="text-white text-xl">{organizer.name}</p>
                <p className="text-white text-base">{organizer.text}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default OrganizerRow

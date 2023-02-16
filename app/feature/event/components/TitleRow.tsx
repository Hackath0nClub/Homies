type propsType = {
  title: string | null
  year: string | null
  date: string | null
}

export const TitleRow = (props: propsType) => {
  return (
    <>
      <div className="gap-4 inline-flex items-center text-white text-left font-bold w-full">
        <div className="py-2 pr-3 flex flex-col items-center w-16">
          <span className="text-base leading-none m-0">
            <span>{props.year}</span>
          </span>
          <span className="text-2xl leading-none m-0">
            <span>{props.date}</span>
          </span>
        </div>
        <span className="flex-1 text-2xl m-0">
          <span>{props.title}</span>
        </span>
      </div>
    </>
  )
}

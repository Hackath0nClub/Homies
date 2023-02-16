type propsType = {
  price: number | null
  capacity: number | null
  date: string | null
  start_time: string | null
  end_time: string | null
  location_name: string | null
  location_url: string | null
  note: string | null
  listener: number
}

const EventItemsRow = (props: propsType) => {
  return (
    <>
      <div className="border border-gray-500 rounded-xl w-full bg-[rgba(47,51,56,1)] my-4">
        <p className="p-4 w-full flex items-start self-stretch text-xl text-white text-left">
          チケット購入
        </p>
        <div className="border-t-2 border-gray-500"></div>

        <div className="w-full text-center my-4">
          <button className="border border-white px-16 py-3 text-white font-bold bg-gradient-to-r from-[rgba(232,112,39,1)] to-[rgba(232,189,39,1)] rounded-3xl">
            チケット購入へ！
          </button>
        </div>

        <div className="w-full grid grid-cols-8 px-4 my-4">
          <div className="flex justify-center col-span-1">
            <img
              alt="ionticketoutline1031"
              src="/playground_assets/ionticketoutline1031-67td.svg"
            />
          </div>
          <p className="text-left text-[rgba(167,167,167,1)] col-span-2">
            料金(税金)
          </p>
          <p className="text-right text-white col-span-4">￥{props.price}</p>
        </div>

        <div className="w-full grid grid-cols-8 px-4 my-4">
          <div className="flex justify-center col-span-1">
            <img
              alt="ionticketoutline1031"
              src="/playground_assets/mdiaccountgroup1032-eah9.svg"
            />
          </div>
          <p className="text-left text-[rgba(167,167,167,1)] col-span-2">
            制限人数
          </p>
          <p className="text-right text-white col-span-4">{props.date}</p>
        </div>

        <div className="w-full grid grid-cols-8 px-4 my-4">
          <div className="flex justify-center col-span-1">
            <img
              alt="ionticketoutline1031"
              src="/playground_assets/materialsymbolscalendarmonth1032-h966.svg"
            />
          </div>
          <p className="text-left text-[rgba(167,167,167,1)] col-span-2">
            日程
          </p>
          <p className="text-right text-white col-span-4">
            {props.listener}人 / {props.capacity}人
          </p>
        </div>

        <div className="w-full grid grid-cols-8 px-4 my-4">
          <div className="flex justify-center col-span-1">
            <img
              alt="ionticketoutline1031"
              src="/playground_assets/icoutlineaccesstime1032-5mx.svg"
            />
          </div>
          <p className="text-left text-[rgba(167,167,167,1)] col-span-2">
            時間
          </p>
          <p className="text-right text-white col-span-4">
            {props.start_time} ～ {props.end_time}
          </p>
        </div>

        <div className="w-full grid grid-cols-8 px-4 my-4">
          <div className="flex justify-center col-span-1">
            <img
              alt="ionticketoutline1031"
              src="/playground_assets/mdimapmarker1032-nu2k.svg"
            />
          </div>
          <p className="text-left text-[rgba(167,167,167,1)] col-span-2">
            会場
          </p>
          <p className="text-right text-white col-span-4">
            {props.location_name}
          </p>
        </div>
        <iframe className="w-full px-8 my-4" src={props.location_url!}></iframe>

        <div className="w-full grid grid-cols-8 px-4 my-4">
          <div className="flex justify-center col-span-1">
            <img
              alt="ionticketoutline1031"
              src="/playground_assets/mdifiledocumentoutline1032-0n0h.svg"
            />
          </div>
          <p className="text-left text-[rgba(167,167,167,1)] col-span-7">
            備考
          </p>
          <div className="col-span-1"></div>
          <p className="whitespace-pre-wrap text-white col-span-7">
            {props.note}
          </p>
        </div>
      </div>
    </>
  )
}

export default EventItemsRow

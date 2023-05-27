import { useEvent } from '../../../../feature/event/hooks/useEvent'
import { getFullDate, getTime } from '../../../../lib/splitDateTime'
import Link from 'next/link'

export const EventItems = () => {
  const { base, listener } = useEvent()

  const main = () => {
    return (
      <>
        <EditEventButton />
        <div className="border border-gray-500 rounded-xl w-full bg-[rgba(47,51,56,1)] my-4">
          <TopText />
          <div className="border-t-2 border-gray-500"></div>
          {/* <BuyTicketButton /> */}
          <Price />
          <Capacity />
          <Date />
          <Time />
          <Location />
          <Map />
          <Note />
        </div>
      </>
    )
  }

  const TopText = () => {
    return (
      <p className="p-4 w-full flex items-start self-stretch text-xl text-white text-left">
        チケット購入
      </p>
    )
  }

  const EditEventButton = () => {
    return (
      <div className="w-full text-center my-4">
        <Link href={'/event/' + base.id + '/edit'}>
          <button className="border border-white px-16 py-3 text-white font-bold bg-gradient-to-r from-[rgba(232,112,39,1)] to-[rgba(232,189,39,1)] rounded-3xl">
            イベント編集へ
          </button>
        </Link>
      </div>
    )
  }

  const BuyTicketButton = () => {
    return (
      <div className="w-full text-center my-4">
        <button className="border border-white px-16 py-3 text-white font-bold bg-gradient-to-r from-[rgba(232,112,39,1)] to-[rgba(232,189,39,1)] rounded-3xl">
          チケット購入へ！
        </button>
      </div>
    )
  }

  const Price = () => {
    return (
      <div className="w-full grid grid-cols-8 px-4 my-4">
        <div className="flex justify-center col-span-1">
          <img alt="" src="/playground_assets/ionticketoutline1031-67td.svg" />
        </div>
        <p className="text-left text-[rgba(167,167,167,1)] col-span-2">
          料金(税金)
        </p>
        <p className="text-right text-white col-span-4">￥{base.price}</p>
      </div>
    )
  }

  const Capacity = () => {
    return (
      <div className="w-full grid grid-cols-8 px-4 my-4">
        <div className="flex justify-center col-span-1">
          <img alt="" src="/playground_assets/mdiaccountgroup1032-eah9.svg" />
        </div>
        <p className="text-left text-[rgba(167,167,167,1)] col-span-2">
          制限人数
        </p>
        <p className="text-right text-white col-span-4">
          {listener.length}人 / {base.capacity}人
        </p>
      </div>
    )
  }

  const Date = () => {
    const fulldata = base.start_at ? getFullDate(base.start_at) : null
    return (
      <div className="w-full grid grid-cols-8 px-4 my-4">
        <div className="flex justify-center col-span-1">
          <img
            alt=""
            src="/playground_assets/materialsymbolscalendarmonth1032-h966.svg"
          />
        </div>
        <p className="text-left text-[rgba(167,167,167,1)] col-span-2">日程</p>
        <p className="text-right text-white col-span-4">{fulldata}</p>
      </div>
    )
  }

  const Time = () => {
    const start_at = base.start_at ? getTime(base.start_at) : null
    const end_at = base.end_at ? getTime(base.end_at) : null
    return (
      <div className="w-full grid grid-cols-8 px-4 my-4">
        <div className="flex justify-center col-span-1">
          <img
            alt=""
            src="/playground_assets/icoutlineaccesstime1032-5mx.svg"
          />
        </div>
        <p className="text-left text-[rgba(167,167,167,1)] col-span-2">時間</p>
        <p className="text-right text-white col-span-4">
          {start_at} ～ {end_at}
        </p>
      </div>
    )
  }

  const Location = () => {
    return (
      <div className="w-full grid grid-cols-8 px-4 my-4">
        <div className="flex justify-center col-span-1">
          <img
            alt="ionticketoutline1031"
            src="/playground_assets/mdimapmarker1032-nu2k.svg"
          />
        </div>
        <p className="text-left text-[rgba(167,167,167,1)] col-span-2">会場</p>
        <p className="text-right text-white col-span-4">{base.location_name}</p>
      </div>
    )
  }

  const Map = () => {
    return (
      <iframe className="w-full px-8 my-4" src={base.location_url}></iframe>
    )
  }

  const Note = () => {
    return (
      <div className="w-full grid grid-cols-8 px-4 my-4">
        <div className="flex justify-center col-span-1">
          <img
            alt=""
            src="/playground_assets/mdifiledocumentoutline1032-0n0h.svg"
          />
        </div>
        <p className="text-left text-[rgba(167,167,167,1)] col-span-7">備考</p>
        <div className="col-span-1"></div>
        <p className="whitespace-pre-wrap text-white col-span-7">{base.note}</p>
      </div>
    )
  }

  return main()
}

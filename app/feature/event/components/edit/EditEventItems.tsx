import { EventType } from '../../store/eventState'
import { useEvent } from '../../../../feature/event/hooks/useEvent'
import { getUrlFromGoogleMapHtml } from '../../../../lib/getUrlFromGoogleMapHtml'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const EditEventItemsRow = () => {
  const {
    base,
    setPrice,
    setCapacity,
    setStartTime,
    setEndTime,
    setLocationName,
    setLocationUrl,
    setNote,
  } = useEvent()

  return (
    <>
      <div className="border border-gray-500 rounded-xl w-full bg-[rgba(47,51,56,1)] my-4">
        <p className="p-4 w-full flex items-start self-stretch text-xl text-white text-left">
          イベント情報
        </p>
        <div className="border-t-2 border-gray-500"></div>

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
          <input
            type="number"
            className="col-span-5 text-right mx-2 px-2 block placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            value={base.price ?? ''}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
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
          <input
            type="number"
            className="col-span-5 text-right mx-2 px-2 block placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            value={base.capacity ?? ''}
            onChange={(e) => setCapacity(Number(e.target.value))}
          />
        </div>

        <div className="w-full grid grid-cols-8 px-4 my-4">
          <div className="flex justify-center col-span-1">
            <img
              alt="ionticketoutline1031"
              src="/playground_assets/materialsymbolscalendarmonth1032-h966.svg"
            />
          </div>
          <p className="text-left text-[rgba(167,167,167,1)] col-span-2">
            開始日時
          </p>
          <DatePicker
            selected={base.start_at}
            onChange={(date) => {
              if (date) setStartTime(date)
            }}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            className="col-span-5 text-right mx-2 px-2 block placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
          />
        </div>

        <div className="w-full grid grid-cols-8 px-4 my-4">
          <div className="flex justify-center col-span-1" />

          <p className="text-left text-[rgba(167,167,167,1)] col-span-2">
            終了日時
          </p>
          <DatePicker
            selected={base.end_at}
            onChange={(date) => {
              if (date) setEndTime(date)
            }}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            className="col-span-5 text-right mx-2 px-2 block placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
          />
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
          <input
            type="text"
            className="col-span-5 text-right mx-2 px-2 block placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            value={base.location_name ?? ''}
            onChange={(e) => setLocationName(e.target.value)}
          />
        </div>
        <div className="w-full grid grid-cols-8 px-4 my-4">
          <div className="flex justify-center col-span-1" />
          <p className="text-left text-[rgba(167,167,167,1)] col-span-2">
            埋込URL
          </p>
          <input
            type="text"
            className="col-span-5 text-right mx-2 px-2 block placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            value={base.location_url ?? ''}
            onChange={(e) =>
              setLocationUrl(getUrlFromGoogleMapHtml(e.target.value))
            }
          />
        </div>
        <iframe className="w-full px-8 my-4" src={base.location_url}></iframe>

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

          <textarea
            className="col-span-7 h-[10vh] block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            id="message"
            value={base.note ?? ''}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>
    </>
  )
}

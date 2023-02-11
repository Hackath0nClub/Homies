import { Event } from '../hooks/useEvent'
import { getFullDate, getTime } from '../../../lib/splitDateTime'

type propsType = {
  base: Event
  setBase: (base: Event) => void
}

export const EditEventItemsRow = (props: propsType) => {
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
          <input
            type="number"
            className="col-span-5 text-right mx-2 px-2 block placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            value={props.base.price ?? ''}
            onChange={(e) =>
              props.setBase({ ...props.base!, price: Number(e.target.value) })
            }
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
            value={props.base.capacity ?? ''}
            onChange={(e) =>
              props.setBase({
                ...props.base!,
                capacity: Number(e.target.value),
              })
            }
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
            日程
          </p>
          <p className="text-right text-white col-span-4">
            {props.base.start_at ? getFullDate(props.base.start_at) : null}
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
            {props.base.start_at ? getFullDate(props.base.start_at) : null} ～{' '}
            {props.base.start_at ? getTime(props.base.start_at) : null}
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
          <input
            type="text"
            className="col-span-5 text-right mx-2 px-2 block placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            value={props.base.location_name ?? ''}
            onChange={(e) =>
              props.setBase({
                ...props.base!,
                location_name: e.target.value,
              })
            }
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
            value={props.base.location_url ?? ''}
            onChange={(e) =>
              props.setBase({
                ...props.base!,
                location_url: e.target.value,
              })
            }
          />
        </div>
        <iframe
          className="w-full px-8 my-4"
          src={props.base.location_url!}
        ></iframe>

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
            value={props.base.note ?? ''}
            onChange={(e) =>
              props.setBase({ ...props.base!, note: e.target.value })
            }
          />
        </div>
      </div>
    </>
  )
}

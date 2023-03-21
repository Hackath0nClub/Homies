import { useState } from "react"

export const UserEvent = (props: any) => {
  const [openTab, setOpenTab] = useState(1)
  return (
    <>
      <div>
        <div className="profile-event-tab flex flex-wrap">
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  href="#overview"
                  className={
                    "font-bold uppercase px-5 py-3 block leading-normal " +
                    (openTab === 1
                      ? "text-white border-b-2 border-b-orange-600"
                      : "text-white")
                  }
                  onClick={e => {
                    setOpenTab(1);
                    e.preventDefault();
                  }}
                  data-toggle="tab"
                  role="tablist"
                >
                  概要/外部リンク
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  href="#performance"
                  className={
                    "font-bold uppercase px-5 py-3 block leading-normal " +
                    (openTab === 2
                      ? "text-white border-b-2 border-b-orange-600"
                      : "text-white")
                  }
                  onClick={e => {
                    setOpenTab(2);
                    e.preventDefault();
                  }}
                  data-toggle="tab"
                  role="tablist"
                >
                  出演イベント
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  href="#organize"
                  className={
                    "font-bold uppercase px-5 py-3 block leading-normal " +
                    (openTab === 3
                      ? "text-white border-b-2 border-b-orange-600"
                      : "text-white")
                  }
                  onClick={e => {
                    setOpenTab(3);
                    e.preventDefault();
                  }}
                  data-toggle="tab"
                  role="tablist"
                >
                  主催イベント
                </a>
              </li>
            </ul>
            <div className="flex relative flex-col min-w-0 break-words bg-white w-full mb-6">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div className={openTab === 1 ? "block" : "hidden"} id="overview">
                    <p>
                      ここにイベント入るよ
                    </p>
                  </div>
                  <div className={openTab === 2 ? "block" : "hidden"} id="performance">
                    <p>
                      ここに出演したイベントが入るよ
                    </p>
                  </div>
                  <div className={openTab === 3 ? "block" : "hidden"} id="organize">
                    <p>
                      ここに主催したイベントが入るよ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
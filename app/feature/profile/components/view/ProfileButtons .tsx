import { useProfile } from "../../hooks/useProfile";

export const ProfileButtons = () => {
  const { profileBase, isEditText, editUserText } = useProfile()
  return (
    <>
      {profileBase.twitter_url && (
        <>
          <a href={profileBase.twitter_url}>
            <img alt="Twitter" src="/playground_assets/twitter-icon.png" className="md:w-11 w-8 mx-3"></img>
          </a>
        </>
      )}
      <button
        className={`grow [box-shadow:0px_0px_0px_1px_rgba(84,_89,_92,_1)_inset] [box-shadow-width:1px] px-0 py-2 inline-flex justify-center items-center text-white rounded-[30px] font-['Hiragino_Kaku_Gothic_Pro'] hover:bg-white hover:text-[rgba(28,32,37,1)]`}
        onClick={() => editUserText(!isEditText)}
      >
        <span className="text-lg px-8 m-0 tracking-[-0.64px]">
          {!isEditText ?
            <span>
              プロフィールを編集する
            </span>
            :
            <span>
              編集を終了する
            </span>
          }
        </span>
      </button>
    </>
  )
}
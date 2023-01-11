type propsType = {
  rootClassName: string
  alt: string
  src: string
}

const ImageRow = (props: propsType) => {
  return (
    <>
      <div className={`image-row-container ${props.rootClassName} `}>
        <div className="image-row-image-row">
          <img
            alt={props.alt}
            src={props.src}
            className="image-row-event-image"
          />
        </div>
      </div>
      <style jsx>
        {`
          .image-row-container {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-direction: column;
          }
          .image-row-image-row {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            margin-top: 2%;
            align-items: flex-start;
            margin-bottom: 2%;
          }
          .image-row-event-image {
            width: 100%;
            height: 100%;
            position: relative;
            border-color: transparent;
          }
          .image-row-root-class-name {
            height: auto;
          }
        `}
      </style>
    </>
  )
}

export default ImageRow

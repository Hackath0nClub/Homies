type propsType = {
  alt: string
  src: string
}

const ImageRow = (props: propsType) => {
  return (
    <>
      <img alt={props.alt} src={props.src} className="w-full my-4 rounded-lg" />
    </>
  )
}

export default ImageRow

import Link from 'next/link'

const Footer = (props: any) => {
  return (
    <>
      <div>
        <footer className="footer">
          <div className="footer-link">
            <Link href="" className="terms">利用規約</Link>
            <Link href="" className="privacyーpolicy">プライバシーポリシー</Link>
            <Link href="" className="cookie-policy">Cookieのポリシー</Link>
            <Link href="" className="accessibility">アクセシビリティ</Link>
          </div>
          <div className="copyright">
            <p>&copy; 2023 Homies</p>
          </div>
        </footer>
      </div>
      <style jsx>
        {`
          .footer {
            color: #ffffff;
            font-size: 12px;
            align-self: stretch;
            width: 60%;
          }
          .footer-link {
            display: grid;
            grid-template-columns: repeat(2,minmax(0,1fr));
            grid-template-rows: repeat(2,minmax(0,1fr));
          }

          @media only screen and (max-width: 960px) {
            .footer {
              width: 100%;
            }
            .copyright {
              text-align: center;
            }
          }
        `}
      </style>
    </>
  )
}


export default Footer
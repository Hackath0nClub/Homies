import Header from './Header'

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '48px' }}>{children}</main>
    </>
  )
}

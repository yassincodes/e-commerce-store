import '../styles/globals.css'
import NextNProgress from "nextjs-progressbar";
import { AuthContextProvider } from "../contexts/authContext"
import { DataContextProvider } from '../contexts/dataContext'
import Layout from "../comps/Layout"

function MyApp({ Component, pageProps }) {
  return (
      <>
      <NextNProgress options={{ showSpinner: false }} height={5}/>
      <AuthContextProvider>
        <DataContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DataContextProvider>
      </AuthContextProvider>
      </>
  )
}

export default MyApp
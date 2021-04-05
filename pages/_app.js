import ReactGA from 'react-ga'
import '../styles/index.scss'
import {useEffect} from 'react'

function MyApp({Component, pageProps}) {
  useEffect(() => {
    ReactGA.initialize('UA-000000-01')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  return <Component {...pageProps} />
}

export default MyApp

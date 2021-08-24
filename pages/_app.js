import ReactGA from 'react-ga'
import '../styles/index.scss'
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {appWithTranslation} from 'next-i18next'
import TagManager from 'react-gtm-module'

const newReplace = {
  download: 'download',
  faq: 'faq',
  contribute: 'contribute',
  guide: 'guide',
  donate: 'donate',
  flip_challenge: 'flip-challenge',
  manifesto: 'manifesto',
  technology: 'technology',
  webclient: 'webclient',
}

function MyApp({Component, pageProps}) {
  const router = useRouter()

  // handle old links
  useEffect(() => {
    if (
      router.pathname === '/' &&
      router.query.view &&
      newReplace[router.query.view]
    ) {
      router.push(
        router.asPath
          .replace(router.query.view, newReplace[router.query.view])
          .replace('?view=', '')
      )
    }
  }, [router])

  useEffect(() => {
    ReactGA.initialize('UA-139651161-1')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  useEffect(() => {
    TagManager.initialize({gtmId: 'GTM-P4K5GX4'})
  }, [])

  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp)

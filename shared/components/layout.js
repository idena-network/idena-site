/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-target-blank */
import {useRouter} from 'next/router'
import Link from 'next/link'
import {Children, useEffect, useState} from 'react'
import {useTranslation} from 'next-i18next'
import cookie from 'cookie-cutter'
import Header from './header'
import TopHeader from './topheader'
import {Combobox} from './combobox'
import {AVAILABLE_LANGS, isoLangs} from '../utils/i18n'

const LiActive = ({className, children, ...props}) => {
  const router = useRouter()
  const child = Children.only(children)

  if (router.pathname === child.props.href) {
    className = `${className} active`
  }

  return (
    <li className={className} {...props}>
      {children}
    </li>
  )
}

const PAGES_LIST = {
  contribute: 'contribute-page',
  donate: 'donate-page',
  download: 'download-page',
  faq: 'faq-page',
  flipChallenge: 'flip-challenge-page',
  gitcoin: 'gitcoin-page',
  guide: 'guide-page',
  index: 'main-page',
  joinIdena: 'join-idena-page',
}

export default function Layout({children, title = '', description = ''}) {
  const router = useRouter()
  const [menuOpened, setMenuOpened] = useState(false)
  const {t} = useTranslation('common')
  const {i18n} = useTranslation()
  const currentLanguage = isoLangs[i18n.language]
  const translationLink = `https://translate.idena.io/projects/idena-site${
    router.pathname === '/' ? '/main' : router.pathname
  }-page/${i18n.language === 'en' ? '' : i18n.language}`

  useEffect(() => {
    const savedLocale = cookie.get('NEXT_LOCALE')
    if (savedLocale) {
      if (router.locale !== savedLocale) {
        router.push(router.asPath, null, {locale: savedLocale})
      }
    }
  }, [router])

  return (
    <div className={menuOpened ? `menu-opened` : ``}>
      <Header title={title} description={description} />

      <header className="header">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-md-3">
              <Link
                href="/"
                className="navbar-brand nav-link d-none d-md-block show"
                data-target="menu_main"
              >
                <img src="/static/images/idena_black.svg" alt="logo" />
                <p>Idena</p>
              </Link>
            </div>

            <div className="col-md-6 text-center">
              <ul className="header_nav nav justify-content-center">
                <li className="nav-item header_nav__item mobile_only">
                  <Link
                    href="/"
                    className="nav-link header_nav__link"
                    data-target="menu_main"
                  >
                    {t('Home')}
                  </Link>
                </li>

                <LiActive className="nav-item header_nav__item">
                  <Link
                    href="/staking"
                    className="nav-link header_nav__link"
                    data-target="menu_contribute"
                  >
                    {t('Staking')}
                  </Link>
                </LiActive>

                <LiActive className="nav-item header_nav__item mobile_only">
                  <Link
                    href="/download"
                    className="nav-link header_nav__link"
                    data-target="menu_download"
                  >
                    {t('Download')}
                  </Link>
                </LiActive>

                <LiActive className="nav-item header_nav__item">
                  <Link
                    href="/faq"
                    className="nav-link header_nav__link"
                    data-target="menu_faq"
                  >
                    {t('FAQ')}
                  </Link>
                </LiActive>

                <LiActive className="nav-item header_nav__item">
                  <a
                    href="https://scan.idena.io/"
                    rel="noreferrer"
                    target="_blank"
                    className="nav-link header_nav__link"
                  >
                    {t('Explorer')}
                  </a>
                </LiActive>

                <LiActive
                  className="nav-item header_nav__item"
                  style={{overflow: 'visible'}}
                >
                  <a
                    href="https://ai.idena.io/"
                    rel="noreferrer"
                    target="_blank"
                    className="nav-link header_nav__link"
                  >
                    {t('AI')}
                    <span
                      style={{
                        fontSize: '0.654rem',
                        position: 'relative',
                        top: '-9px',
                        left: '5px',
                        color: 'rgb(39 217 128)',
                      }}
                    >
                      beta
                    </span>
                  </a>
                </LiActive>

                <LiActive className="nav-item header_nav__item mobile_only">
                  <a
                    href="https://docs.idena.io/docs/wp/summary/"
                    rel="noreferrer"
                    target="_blank"
                    className="nav-link header_nav__link"
                  >
                    {t('Whitepaper')}
                  </a>
                </LiActive>

                <LiActive className="nav-item header_nav__item">
                  <a
                    href="https://docs.idena.io/"
                    rel="noreferrer"
                    target="_blank"
                    className="nav-link header_nav__link"
                  >
                    {t('Docs')}
                  </a>
                </LiActive>

                <LiActive className="nav-item header_nav__item">
                  <a
                    href="https://bridge.idena.io/"
                    rel="noreferrer"
                    target="_blank"
                    className="nav-link header_nav__link"
                  >
                    {t('Bridge')}
                  </a>
                </LiActive>

                <LiActive className="nav-item header_nav__item mobile_only">
                  <Link
                    href="/join-idena"
                    className="nav-link header_nav__link"
                  >
                    {t('How to join')}
                  </Link>
                </LiActive>

                <LiActive className="nav-item header_nav__item mobile_only">
                  <Link
                    href="https://app.idena.io"
                    className="nav-link header_nav__link"
                    data-target=""
                  >
                    {t('Web app')}
                  </Link>
                </LiActive>
              </ul>
            </div>

            <div className="col-md-3">
              <Link
                href="https://app.idena.io"
                className="navbar-side-btn"
                data-target="menu_main"
              >
                {t('Web app')}
              </Link>

              <Link
                href="/download"
                className="navbar-side-btn _link"
                data-target="menu_main"
              >
                {t('Node')}
              </Link>
            </div>
          </div>
        </div>
      </header>
      <button
        className={`btn btn-sm btn-icon btn_menu d-md-none ${
          menuOpened ? `active` : ``
        }`}
        onClick={() => setMenuOpened(!menuOpened)}
      >
        <i></i>
        <i></i>
        <i></i>
      </button>

      <button
        className={`btn btn-sm btn-icon btn_menu_secondary d-md-none ${
          menuOpened ? `active` : ``
        }`}
      >
        <a href="https://app.idena.io">Web app</a>
      </button>

      {children}
      <footer className="footer">
        <div className="container">
          <h5 className="d-md-none nav_next">Next up</h5>
          <ul className="nav d-md-none">
            <LiActive className="header_nav__item">
              <Link
                href="/download"
                className="nav-link header_nav__link"
                data-target="menu_download"
              >
                {t('Download')}
              </Link>
            </LiActive>

            <LiActive className="header_nav__item">
              <Link
                href="/"
                className="nav-link header_nav__link"
                data-target="menu_main"
              >
                {t('Home')}
              </Link>
            </LiActive>

            {/* <li className="nav-item header_nav__item"> */}
            {/*  <a */}
            {/*    className="nav-link header_nav__link" */}
            {/*    data-target="menu_technology" */}
            {/*  > */}
            {/*    How Idena works */}
            {/*  </a> */}
            {/* </li> */}
            {/* <li className="nav-item header_nav__item"> */}
            {/*  <a */}
            {/*    className="nav-link header_nav__link" */}
            {/*    data-target="menu_manifesto" */}
            {/*  > */}
            {/*    Manifesto */}
            {/*  </a> */}
            {/* </li> */}
            {/* <li className="nav-item header_nav__item"> */}
            {/*  <a */}
            {/*    className="nav-link header_nav__link" */}
            {/*    data-target="menu_flip-challenge" */}
            {/*  > */}
            {/*    Flip challenge */}
            {/*  </a> */}
            {/* </li> */}
            {/* <li className="nav-item header_nav__item"> */}
            {/*  <a */}
            {/*    className="nav-link header_nav__link" */}
            {/*    data-target="menu_invitation" */}
            {/*  > */}
            {/*    My Idena */}
            {/*  </a> */}
            {/* </li> */}

            <LiActive className="nav-item header_nav__item">
              <Link
                href="/staking"
                className="nav-link header_nav__link"
                data-target="menu_staking"
              >
                {t('Staking')}
              </Link>
            </LiActive>

            <LiActive className="header_nav__item">
              <Link href="/join-idena" className="nav-link header_nav__link">
                {t('How to join Idena')}
              </Link>
            </LiActive>

            <LiActive className="nav-item header_nav__item">
              <Link
                href="/faq"
                className="nav-link header_nav__link"
                data-target="menu_faq"
              >
                {t('FAQ')}
              </Link>
            </LiActive>

            <LiActive className="nav-item header_nav__item">
              <Link
                href="/contribute"
                className="nav-link header_nav__link"
                data-target="menu_contribute"
              >
                {t('How to contribute')}
              </Link>
            </LiActive>

            <li className="nav-item header_nav__item">
              <a
                href="https://docs.idena.io/docs/wp/summary/"
                rel="noreferrer"
                target="_blank"
                className="nav-link header_nav__link"
              >
                {t('Whitepaper')}
              </a>
            </li>

            <li className="nav-item header_nav__item">
              <a
                href="https://docs.idena.io/"
                rel="noreferrer"
                target="_blank"
                className="nav-link header_nav__link"
              >
                {t('Documentation')}
              </a>
            </li>

            <li className="nav-item header_nav__item">
              <a
                href="https://scan.idena.io/"
                rel="noreferrer"
                target="_blank"
                className="nav-link header_nav__link"
              >
                {t('Blockchain explorer')}
              </a>
            </li>

            <li className="nav-item header_nav__item">
              <a
                href="https://medium.com/idena/"
                rel="noreferrer"
                target="_blank"
                className="nav-link header_nav__link"
              >
                {t('Blog')}
              </a>
            </li>
          </ul>

          <div className="row justify-content-center text-center">
            <div className="col-md-7 col-lg-6">
              <div className="social_list">
                <a
                  href="https://medium.com/idena"
                  rel="nofollow"
                  target="_blank"
                  className="social_list__item"
                >
                  <i className="icon icon--medium"></i>
                </a>
                <a
                  href="https://twitter.com/IdenaNetwork"
                  rel="nofollow"
                  target="_blank"
                  className="social_list__item"
                >
                  <i className="icon icon--twitter"></i>
                </a>
                <a
                  href="https://t.me/IdenaAnnouncements"
                  rel="nofollow"
                  target="_blank"
                  className="social_list__item"
                >
                  <i className="icon icon--telegram"></i>
                </a>
                <a
                  href="https://github.com/idena-network"
                  rel="nofollow"
                  target="_blank"
                  className="social_list__item"
                >
                  <i className="icon icon--github"></i>
                </a>
                <a
                  href="https://www.reddit.com/r/Idena/"
                  target="_blank"
                  className="social_list__item"
                >
                  <i className="icon icon--reddit_icn"></i>
                </a>

                <a
                  href="https://discord.gg/8BusRj7"
                  target="_blank"
                  className="social_list__item"
                >
                  <i className="icon icon--discord_icn"></i>
                </a>
                <a
                  href="mailto:info@idena.io"
                  target="_blank"
                  className="social_list__item"
                >
                  <i className="icon icon--mail-fill"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="container language-container">
            <div className="language-centered">
              <div className="row justify-content-center text-center">
                <div className="language">
                  <Combobox
                    title={currentLanguage.nativeName}
                    itemsList={AVAILABLE_LANGS.map(lng => ({
                      key: lng,
                      title: isoLangs[lng].nativeName,
                      href: `/${lng}${router.pathname}`,
                    }))}
                    itemsTitle="Choose a language"
                  />
                </div>

                <div className="language">
                  <a
                    href={translationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="translate-link"
                  >
                    <img
                      src="/static/images/icon-translate.svg"
                      alt="translate"
                      width="24"
                    />
                    <span>{t('Contribute translations')}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center text-center">
            <div className="donate">
              <a href="/donate">{t('Donate')}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

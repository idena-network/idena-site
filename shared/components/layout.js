/* eslint-disable react/jsx-no-target-blank */
import {useRouter} from 'next/router'
import Link from 'next/link'
import {Children, useState} from 'react'
import {useTranslation} from 'next-i18next'
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

export default function Layout({children, title = '', description = ''}) {
  const router = useRouter()
  const [menuOpened, setMenuOpened] = useState(false)
  const {t} = useTranslation('common')
  const {i18n} = useTranslation()
  const currentLanguage = isoLangs[i18n.language]

  return (
    <div className={menuOpened ? `menu-opened` : ``}>
      <Header title={title} description={description} />
      <TopHeader />
      <header className="header">
        <div className="container">
          <div className="row align-items-center justify-content-center align-items-center">
            <Link href="/">
              <a
                className={`navbar-brand nav-link d-none d-md-block ${router.pathname !==
                  '/' && 'show'}`}
                data-target="menu_main"
              >
                <img
                  src="/static/images/idena_black.svg"
                  alt="logo"
                  width="38px"
                />
              </a>
            </Link>
            <div className="col-md-12 text-center">
              <ul className="header_nav nav justify-content-center">
                <li className="nav-item header_nav__item mobile_only">
                  <Link href="/">
                    <a
                      className="nav-link header_nav__link"
                      data-target="menu_main"
                    >
                      {t('Home')}
                    </a>
                  </Link>
                </li>

                {/* <LiActive className="nav-item header_nav__item"> */}
                {/*  <Link href="/technology"> */}
                {/*    <a */}
                {/*      className="nav-link header_nav__link" */}
                {/*      data-target="menu_technology" */}
                {/*    > */}
                {/*      How Idena works */}
                {/*    </a> */}
                {/*  </Link> */}
                {/* </LiActive> */}

                {/* <LiActive className="nav-item header_nav__item"> */}
                {/*  <Link href="/manifesto"> */}
                {/*    <a */}
                {/*      className="nav-link header_nav__link" */}
                {/*      data-target="menu_manifesto" */}
                {/*    > */}
                {/*      Manifesto */}
                {/*    </a> */}
                {/*  </Link> */}
                {/* </LiActive> */}

                {/* <LiActive className="nav-item header_nav__item"> */}
                {/*  <Link href="/flip-challenge"> */}
                {/*    <a */}
                {/*      className="nav-link header_nav__link" */}
                {/*      data-target="menu_flip-challenge" */}
                {/*    > */}
                {/*      Flip challenge */}
                {/*    </a> */}
                {/*  </Link> */}
                {/* </LiActive> */}

                <LiActive className="nav-item header_nav__item">
                  <Link href="/download">
                    <a
                      className="nav-link header_nav__link"
                      data-target="menu_download"
                    >
                      {t('Download')}
                    </a>
                  </Link>
                </LiActive>

                <LiActive className="nav-item header_nav__item">
                  <Link href="/faq">
                    <a
                      className="nav-link header_nav__link"
                      data-target="menu_faq"
                    >
                      {t('FAQ')}
                    </a>
                  </Link>
                </LiActive>

                <LiActive className="nav-item header_nav__item mobile_only">
                  <Link href="/guide">
                    <a
                      className="nav-link header_nav__link"
                      data-target="menu_guide"
                    >
                      {t('Installation guide')}
                    </a>
                  </Link>
                </LiActive>

                <LiActive className="nav-item header_nav__item mobile_only">
                  <Link href="/webclient">
                    <a
                      className="nav-link header_nav__link"
                      data-target="menu_webclient"
                    >
                      {t('Web client')}
                    </a>
                  </Link>
                </LiActive>

                <LiActive className="nav-item header_nav__item">
                  <Link href="/contribute">
                    <a
                      className="nav-link header_nav__link"
                      data-target="menu_contribute"
                    >
                      {t('Contribute')}
                    </a>
                  </Link>
                </LiActive>

                <LiActive className="nav-item header_nav__item mobile_only">
                  <Link href="/donate">
                    <a
                      className="nav-link header_nav__link"
                      data-target="menu_donate"
                    >
                      {t('Donate to Idena')}
                    </a>
                  </Link>
                </LiActive>

                {/* <li className="header_nav__indicator"></li> */}

                <LiActive className="nav-item header_nav__item">
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
                    {t('BSC bridge')}
                  </a>
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
              </ul>
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
      {children}
      <footer className="footer">
        <div className="container">
          <h5 className="d-md-none nav_next">Next up</h5>
          <ul className="nav d-md-none">
            <LiActive className="header_nav__item">
              <Link href="/download">
                <a
                  className="nav-link header_nav__link"
                  data-target="menu_download"
                >
                  {t('Download')}
                </a>
              </Link>
            </LiActive>

            <LiActive className="header_nav__item">
              <Link href="/">
                <a
                  className="nav-link header_nav__link"
                  data-target="menu_main"
                >
                  {t('Home')}
                </a>
              </Link>
            </LiActive>

            <li className="nav-item header_nav__item">
              <Link href="/faq#faq-start-1">
                <a className="nav-link header_nav__link where_to_start">
                  {t('How to start mining Idena')}
                </a>
              </Link>
            </li>

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
              <Link href="/faq">
                <a className="nav-link header_nav__link" data-target="menu_faq">
                  {t('FAQ')}
                </a>
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

            <LiActive className="nav-item header_nav__item">
              <Link href="/contribute">
                <a
                  className="nav-link header_nav__link"
                  data-target="menu_contribute"
                >
                  {t('How to contribute')}
                </a>
              </Link>
            </LiActive>

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
                href="https://idena-apps.org/"
                rel="noreferrer"
                target="_blank"
                className="nav-link header_nav__link"
              >
                {t('Apps & Resources')}
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

            <LiActive className="nav-item header_nav__item">
              <Link href="/donate">
                <a
                  className="nav-link header_nav__link"
                  data-target="menu_donate"
                >
                  {t('Donate to Idena')}
                </a>
              </Link>
            </LiActive>
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
              <div className="copy"></div>
              <div className="donate">
                <a href="/donate">{t('Support Idena by making a donation')}</a>
              </div>
            </div>
          </div>

          <div className="row justify-content-center text-center">
            <div className="col-md-7 col-lg-6">
              <div className="language row">
                <Combobox
                  title={currentLanguage.nativeName}
                  itemsList={AVAILABLE_LANGS.map(lng => ({
                    key: lng,
                    title: isoLangs[lng].nativeName,
                    href: `/${lng}${router.pathname}`,
                  }))}
                  itemsTitle="Choose a language"
                />
                <a
                  href="https://translate.idena.io/"
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
      </footer>
    </div>
  )
}

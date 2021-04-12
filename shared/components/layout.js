import {useRouter} from 'next/router'
import Link from 'next/link'
import {Children, useState} from 'react'
import Header from './header'
import TopHeader from "./topheader";

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
                      Home
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
                      Download
                    </a>
                  </Link>
                </LiActive>

                <LiActive className="nav-item header_nav__item">
                  <Link href="/faq">
                    <a
                      className="nav-link header_nav__link"
                      data-target="menu_faq"
                    >
                      FAQ
                    </a>
                  </Link>
                </LiActive>

                <LiActive className="nav-item header_nav__item mobile_only">
                  <Link href="/guide">
                    <a
                      className="nav-link header_nav__link"
                      data-target="menu_guide"
                    >
                      Installation guide
                    </a>
                  </Link>
                </LiActive>

                <LiActive className="nav-item header_nav__item mobile_only">
                  <Link href="/webclient">
                    <a
                      className="nav-link header_nav__link"
                      data-target="menu_webclient"
                    >
                      Web client
                    </a>
                  </Link>
                </LiActive>

                <LiActive className="nav-item header_nav__item">
                  <Link href="/contribute">
                    <a
                      className="nav-link header_nav__link"
                      data-target="menu_contribute"
                    >
                      Contribute
                    </a>
                  </Link>
                </LiActive>

                <LiActive className="nav-item header_nav__item mobile_only">
                  <Link href="/donate">
                    <a
                      className="nav-link header_nav__link"
                      data-target="menu_donate"
                    >
                      Donate to Idena
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
                    Whitepaper
                  </a>
                </LiActive>

                <LiActive className="nav-item header_nav__item">
                  <a
                    href="https://docs.idena.io/"
                    rel="noreferrer"
                    target="_blank"
                    className="nav-link header_nav__link"
                  >
                    Docs
                  </a>
                </LiActive>

                <LiActive className="nav-item header_nav__item">
                  <a
                    href="https://bridge.idena.io/"
                    rel="noreferrer"
                    target="_blank"
                    className="nav-link header_nav__link"
                  >
                    BSC bridge
                  </a>
                </LiActive>

                <LiActive className="nav-item header_nav__item">
                  <a
                    href="https://scan.idena.io/"
                    rel="noreferrer"
                    target="_blank"
                    className="nav-link header_nav__link"
                  >
                    Explorer
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
                  Download
                </a>
              </Link>
            </LiActive>

            <LiActive className="header_nav__item">
              <Link href="/">
                <a
                  className="nav-link header_nav__link"
                  data-target="menu_main"
                >
                  Home
                </a>
              </Link>
            </LiActive>

            <li className="nav-item header_nav__item">
              <Link href="/faq#faq-start-1">
                <a className="nav-link header_nav__link where_to_start">
                  How to start mining Idena
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
                  FAQ
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
                Whitepaper
              </a>
            </li>

            <li className="nav-item header_nav__item">
              <a
                href="https://docs.idena.io/"
                rel="noreferrer"
                target="_blank"
                className="nav-link header_nav__link"
              >
                Documentation
              </a>
            </li>

            <LiActive className="nav-item header_nav__item">
              <Link href="/contribute">
                <a
                  className="nav-link header_nav__link"
                  data-target="menu_contribute"
                >
                  How to contribute
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
                Blockchain explorer
              </a>
            </li>

            <li className="nav-item header_nav__item">
              <a
                href="https://idena-apps.org/"
                rel="noreferrer"
                target="_blank"
                className="nav-link header_nav__link"
              >
                Apps & Resources
              </a>
            </li>

            <li className="nav-item header_nav__item">
              <a
                href="https://medium.com/idena/"
                rel="noreferrer"
                target="_blank"
                className="nav-link header_nav__link"
              >
                Blog
              </a>
            </li>

            <LiActive className="nav-item header_nav__item">
              <Link href="/donate">
                <a
                  className="nav-link header_nav__link"
                  data-target="menu_donate"
                >
                  Donate to Idena
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
                <a href="/donate">Support Idena by making a donation</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

import {useRouter} from 'next/router'
import Link from 'next/link'
import {Children} from 'react'
import Header from './header'

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

  return (
    <>
      <Header title={title} description={description} />
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
                  src="/static/images/Idena_logo.svg"
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

                <LiActive className="nav-item header_nav__item">
                  <Link href="/technology">
                    <a
                      className="nav-link header_nav__link"
                      data-target="menu_technology"
                    >
                      How Idena works
                    </a>
                  </Link>
                </LiActive>

                <LiActive className="nav-item header_nav__item">
                  <Link href="/manifesto">
                    <a
                      className="nav-link header_nav__link"
                      data-target="menu_manifesto"
                    >
                      Manifesto
                    </a>
                  </Link>
                </LiActive>

                <LiActive className="nav-item header_nav__item">
                  <Link href="/flip-challenge">
                    <a
                      className="nav-link header_nav__link"
                      data-target="menu_flip-challenge"
                    >
                      Flip challenge
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

                <li className="header_nav__indicator"></li>

                <LiActive className="nav-item header_nav__item">
                  <Link href="https://scan.idena.io/">
                    <a className="nav-link header_nav__link">Explore</a>
                  </Link>
                </LiActive>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <button className="btn btn-sm btn-icon btn_menu d-md-none">
        <i></i>
        <i></i>
        <i></i>
      </button>
      {children}
      <footer className="footer">
        <div className="container">
          <h5 className="d-md-none nav_next">Next up</h5>
          <ul className="nav d-md-none">
            <li className="header_nav__item active">
              <a
                className="nav-link header_nav__link"
                data-target="menu_download"
              >
                Download
              </a>
            </li>

            <li className="header_nav__item active">
              <a className="nav-link header_nav__link" data-target="menu_main">
                Home
              </a>
            </li>

            <li className="nav-item header_nav__item">
              <a className="nav-link header_nav__link where_to_start">
                How to start mining Idena
              </a>
            </li>

            <li className="nav-item header_nav__item">
              <a
                className="nav-link header_nav__link"
                data-target="menu_technology"
              >
                How Idena works
              </a>
            </li>
            <li className="nav-item header_nav__item">
              <a
                className="nav-link header_nav__link"
                data-target="menu_manifesto"
              >
                Manifesto
              </a>
            </li>
            <li className="nav-item header_nav__item">
              <a
                className="nav-link header_nav__link"
                data-target="menu_flip-challenge"
              >
                Flip challenge
              </a>
            </li>
            <li className="nav-item header_nav__item">
              <a
                className="nav-link header_nav__link"
                data-target="menu_invitation"
              >
                My Idena
              </a>
            </li>
            <li className="nav-item header_nav__item">
              <a className="nav-link header_nav__link" data-target="menu_faq">
                FAQ
              </a>
            </li>

            <li className="nav-item header_nav__item">
              <a
                className="nav-link header_nav__link"
                data-target="menu_contribute"
              >
                How to contribute
              </a>
            </li>

            <li className="nav-item header_nav__item">
              <a
                className="nav-link header_nav__link"
                data-target="menu_donate"
              >
                Donate to Idena
              </a>
            </li>

            <li className="nav-item header_nav__item">
              <a className="nav-link header_nav__link explorelink">Explore</a>
            </li>

            <li className="nav-item header_nav__item">
              <a className="nav-link header_nav__link appslink">
                Apps & Resources
              </a>
            </li>

            <li className="nav-item header_nav__item">
              <a className="nav-link header_nav__link bloglink">Blog</a>
            </li>
          </ul>

          <div className="row justify-content-center text-center">
            <div className="col-md-7 col-lg-6">
              <div className="social_list">
                <a
                  href="https://medium.com/@idena.network"
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
    </>
  )
}
import Header from './header'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {Children} from 'react'

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
                className={`navbar-brand nav-link d-none d-md-block ${router.pathname !== '/' && 'show'}`}
                data-target="menu_main"
              >
                <img src="/static/images/Idena_logo.svg" alt="logo" width="38px" />
              </a>
            </Link>
            <div className="col-md-12 text-center">
              <ul className="header_nav nav justify-content-center">
                <li className="nav-item header_nav__item mobile_only">
                  <Link href="/">
                    <a className="nav-link header_nav__link" data-target="menu_main">
                      Home
                    </a>
                  </Link>
                </li>
                <LiActive className="nav-item header_nav__item">
                  <Link href="/technology">
                    <a className="nav-link header_nav__link" data-target="menu_technology">
                      How Idena works
                    </a>
                  </Link>
                </LiActive>

                <LiActive className="nav-item header_nav__item">
                  <Link href="/manifesto">
                    <a className="nav-link header_nav__link" data-target="menu_manifesto">
                      Manifesto
                    </a>
                  </Link>
                </LiActive>

                <li className="nav-item header_nav__item">
                  <a
                    className="nav-link header_nav__link"
                    data-target="menu_flip_challenge"
                    title="Idena Flip Challenge: AI-resistant CAPTCHA."
                    descriptioncontent="Flip is AI-hard CAPTCHA created by a human. Common sense is required to identify a meaningful story told in pictures"
                  >
                    Flip challenge
                  </a>
                </li>

                <li className="nav-item header_nav__item mobile_only">
                  <a
                    className="nav-link header_nav__link"
                    data-target="menu_invitation"
                    title="How to join Idena Network"
                    descriptioncontent="Invitations can be only sent out by validated nodes. Idena core team is granted to issue a limited number of invitations per month to support the network growth."
                  >
                    My Idena
                  </a>
                </li>

                <li className="nav-item header_nav__item">
                  <a
                    className="nav-link header_nav__link"
                    data-target="menu_faq"
                    title="IDENA FAQ"
                    descriptioncontent="We are here to help you. Browse through the most frequently asked questions. Can�t find an answer? Email us at info@idena.io"
                  >
                    FAQ
                  </a>
                </li>

                <li className="nav-item header_nav__item mobile_only">
                  <a
                    className="nav-link header_nav__link"
                    data-target="menu_guide"
                    title="IDENA Installation and troubleshooting guide"
                    descriptioncontent="We are here to help to you with running the Idena Node. Browse through the known issues and most frequently asked questions. "
                  >
                    Installation guide
                  </a>
                </li>

                <li className="nav-item header_nav__item">
                  <a
                    className="nav-link header_nav__link"
                    data-target="menu_download"
                    title="Download Idena Node"
                    descriptioncontent="Download stable and develop builds of Idena Node and Idena Client."
                  >
                    Download
                  </a>
                </li>

                <li className="nav-item header_nav__item mobile_only">
                  <a
                    className="nav-link header_nav__link"
                    data-target="menu_webclient"
                    title="Idena web client"
                    descriptioncontent="Join mining Idena with your browser."
                  >
                    Web client
                  </a>
                </li>

                <li className="nav-item header_nav__item">
                  <a
                    className="nav-link header_nav__link"
                    data-target="menu_contribute"
                    title="How to contribute to Idena"
                    descriptioncontent="Idena is an open source project and the Idena community is its key driving force."
                  >
                    Contribute
                  </a>
                </li>

                <li className="nav-item header_nav__item mobile_only">
                  <a
                    className="nav-link header_nav__link"
                    data-target="menu_donate"
                    title="Donate to Idena"
                    descriptioncontent="Support Idena by making a donation"
                  >
                    Donate to Idena
                  </a>
                </li>

                <li className="header_nav__indicator"></li>

                <li className="nav-item header_nav__item">
                  <a
                    className="nav-link header_nav__link explorelink"
                    title="Idena blockchain explorer"
                    descriptioncontent="Navidate Idena blockchain data."
                  >
                    Explore
                  </a>
                </li>
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
              <a className="nav-link header_nav__link" data-target="menu_download">
                Download
              </a>
            </li>

            <li className="header_nav__item active">
              <a className="nav-link header_nav__link" data-target="menu_main">
                Home
              </a>
            </li>

            <li className="nav-item header_nav__item">
              <a className="nav-link header_nav__link where_to_start">How to start mining Idena</a>
            </li>

            <li className="nav-item header_nav__item">
              <a className="nav-link header_nav__link" data-target="menu_technology">
                How Idena works
              </a>
            </li>
            <li className="nav-item header_nav__item">
              <a className="nav-link header_nav__link" data-target="menu_manifesto">
                Manifesto
              </a>
            </li>
            <li className="nav-item header_nav__item">
              <a className="nav-link header_nav__link" data-target="menu_flip_challenge">
                Flip challenge
              </a>
            </li>
            <li className="nav-item header_nav__item">
              <a className="nav-link header_nav__link" data-target="menu_invitation">
                My Idena
              </a>
            </li>
            <li className="nav-item header_nav__item">
              <a className="nav-link header_nav__link" data-target="menu_faq">
                FAQ
              </a>
            </li>

            <li className="nav-item header_nav__item">
              <a className="nav-link header_nav__link" data-target="menu_contribute">
                How to contribute
              </a>
            </li>

            <li className="nav-item header_nav__item">
              <a className="nav-link header_nav__link" data-target="menu_donate">
                Donate to Idena
              </a>
            </li>

            <li className="nav-item header_nav__item">
              <a className="nav-link header_nav__link explorelink">Explore</a>
            </li>

            <li className="nav-item header_nav__item">
              <a className="nav-link header_nav__link appslink">Apps & Resources</a>
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
                <a href="https://twitter.com/IdenaNetwork" rel="nofollow" target="_blank" className="social_list__item">
                  <i className="icon icon--twitter"></i>
                </a>
                <a href="https://t.me/IdenaAnnouncements" rel="nofollow" target="_blank" className="social_list__item">
                  <i className="icon icon--telegram"></i>
                </a>
                <a href="https://github.com/idena-network" rel="nofollow" target="_blank" className="social_list__item">
                  <i className="icon icon--github"></i>
                </a>
                <a href="https://www.reddit.com/r/Idena/" target="_blank" className="social_list__item">
                  <i className="icon icon--reddit_icn"></i>
                </a>

                <a href="https://discord.gg/8BusRj7" target="_blank" className="social_list__item">
                  <i className="icon icon--discord_icn"></i>
                </a>
                <a href="mailto:info@idena.io" target="_blank" className="social_list__item">
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

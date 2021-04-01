import Link from 'next/link'
import {useEffect, useState} from 'react'
import Layout from '../shared/components/layout'
import {useNextValidationTime, useTotalValidatedCount} from '../public/api'

export default function Home() {
  const [validatedCount, setValidatedCount] = useState(null)
  const [validationTime, setValidationTime] = useState(null)

  useEffect(async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const count = await useTotalValidatedCount()
    setValidatedCount(count)
  })
  useEffect(async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const time = await useNextValidationTime()
    setValidationTime(time)
  }, [])

  return (
    <Layout
      title="IDENA: Proof-of-Person blockchain"
      description="Join the mining of the first human-centric cryptocurrency"
    >
      <section className="section section_lead" id="lead">
        <div className="section_lead__header text-center">
          <div className="container" data-target="menu_main">
            <div
              className="logo nav-link"
              title="IDENA: Proof-of-Person blockchain"
              descriptioncontent="Join the mining of the first human-centric cryptocurrency"
            >
              <img
                src="/static/images/idena-logo-round.svg"
                alt=""
                width="135px"
              />
            </div>

            <h1 className="title">Proof-Of-Person Blockchain</h1>
            <div className="subtitle">
              Join the mining&nbsp;of the first
              human-centric&nbsp;cryptocurrency
            </div>

            <div
              id="text_carousel"
              className="carousel slide carousel-fade"
              data-ride="carousel"
              style={{display: 'none'}}
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="subtitle">
                    Everyone has an equal right to mine coins
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="subtitle">
                    Everyone has an equal right to vote
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="subtitle">
                    Everyone has an equal right to communicate privately
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section_lead__body">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-7 col-lg-6">
                <div className="lead_links">
                  <div className="row justify-content-center">
                    <div className="col-auto">
                      <div className="row justify-content-center">
                        <a href="/download" className="btn btn-link">
                          <i className="icon icon--download"></i>
                          <span>Download Idena</span>
                        </a>
                      </div>
                    </div>

                    <div className="col-auto">
                      <div className="row justify-content-center">
                        <a
                          style={{marginLeft: 15}}
                          href="/webclient"
                          className="btn btn-link"
                        >
                          <i className="icon icon--web"></i>
                          <span>
                            Join Idena in web
                            <span
                              style={{
                                fontSize: 'small',
                                marginLeft: 3,
                                marginTop: -11,
                                color: 'limegreen',
                              }}
                            >
                              beta
                            </span>{' '}
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section_lead__info lead_info">
                  <div className="row">
                    <div className="col-sm-4 lead_info__nodes clickable">
                      <div className="_value" id="ValidatedNodes">
                        {validatedCount === null ? '-' : validatedCount}
                      </div>
                      <p className="nodes _hint">Validated nodes</p>
                    </div>

                    <div
                      className="col-sm-8 lead_info__counter"
                      id="TimerPanel"
                    >
                      <div
                        id="counter"
                        className="_value row justify-content-center"
                      >
                        <div className="col-auto">
                          <span className="days">-</span>
                          <span className="_smalltext">d</span>
                        </div>
                        <div className="col-auto">
                          <span className="hours">-</span>
                          <span className="_smalltext">h</span>
                        </div>
                        <div className="col-auto">
                          <span className="minutes">-</span>
                          <span className="_smalltext">m</span>
                        </div>
                        <div className="col-auto">
                          <span className="seconds">-</span>
                          <span className="_smalltext">s</span>
                        </div>
                      </div>

                      <p className="time _hint">
                        Next validation:{' '}
                        <span
                          style={{fontSize: 'small'}}
                          className="NextValidationDateTime"
                        >
                          {validationTime === null ? '' : validationTime}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section section_content menu_section_content menu_main"
        id="what is idena"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <h3>What is Idena</h3>

              <p>
                Idena is the first proof-of-person blockchain where every node
                is linked to a cryptoidentity - one single person with equal
                voting power. Idena is one of the most decentralized
                blockchains.
              </p>
              <p>
                To start mining Idena, you need to{' '}
                <Link href="/faq#faq-start-1">
                  <a>prove you're a unique human</a>
                </Link>
                . It does not require the disclosure of any personal data (no
                KYC). You have to appear online when the validation ceremony
                starts and solve a series of flip-tests (CAPTCHAs).
              </p>

              <p>
                The Idena protocol solves the blockchain oracle problem: Its
                independent mining nodes can act as oracles across various
                blockchains. Idena accounts are compatible with Ethereum.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

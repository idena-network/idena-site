/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {Accordion, Card, Tab, Tabs} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import validator from 'validator'
import axios from 'axios'
import Layout from '../shared/components/layout'
import {CustomToggle} from '../shared/components/toggle'
import {useHash} from '../shared/useHash'
import {getGoogleCalendarLink, useNextValidationTime} from '../shared/api'

const EmailSavingState = {
  None: 0,
  Success: 1,
  InvalidEmail: 2,
  Error: 3,
}

// eslint-disable-next-line react/prop-types
function Alert({state}) {
  return (
    <div
      style={{
        display: state === EmailSavingState.None ? 'none' : 'block',
        backgroundColor:
          state === EmailSavingState.Success ? '#27d980' : '#ff6666',
        padding: '18px 24px',
        color: 'white',
        fontSize: '1rem',
        marginTop: '1rem',
        borderRadius: '8px',
      }}
    >
      {state === EmailSavingState.Success && (
        <span>Email submitted. We will contact you soon.</span>
      )}
      {state === EmailSavingState.InvalidEmail && (
        <span>Wrong email address. Please try another one.</span>
      )}
      {state === EmailSavingState.Error && (
        <span>An error occured. Pleasetry again later.</span>
      )}
    </div>
  )
}

export default function Gitcoin() {
  const [activeHash, setActiveHash] = useState()
  const [hash] = useHash()

  const [email, setEmail] = useState()
  const [emailActionState, setEmailActionState] = useState(
    EmailSavingState.None
  )

  useEffect(() => {
    setActiveHash(hash)
  }, [hash])

  const {localeTime: validationTime, jsonDateString} = useNextValidationTime()
  const validationCalendarLink = getGoogleCalendarLink(jsonDateString)

  const getCode = async () => {
    try {
      if (!validator.isEmail(email)) {
        setEmailActionState(EmailSavingState.InvalidEmail)
        return
      }

      await axios.post('/api/saveEmail', {email})

      setEmailActionState(EmailSavingState.Success)
    } catch (e) {
      setEmailActionState(EmailSavingState.Error)
      console.error('cannot send request')
    }
  }

  return (
    <Layout
      title="Verify your Gitcoin"
      description="How to verify your Gitcoin account with Idena"
    >
      <section
        className="section section_content menu_section_content menu_gitcoin"
        id="gitcoin"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <div className="">
                <h3 className="h1">
                  How to verify your Gitcoin account with Idena
                </h3>
                <p className="text-center" style={{color: '#96999E'}}>
                  Idena is the first proof-of-person blockchain based on
                  democratic principles. Every node is linked to a
                  cryptoidentity — a unique person with equal voting power and
                  mining income.
                </p>
                <p>
                  Your validated cryptoidentity ensures you are a unique human
                  without revealing any personal data. It allows you to have
                  more voting power when the voting can be subject to a sybil
                  attack. Gitcoin accounts verified with Idena get +25% grants
                  match bonus in Gitcoin funding.
                </p>
              </div>

              <Accordion
                activeKey={activeHash}
                onSelect={e => setActiveHash(e)}
              >
                <Card id="gitcoin-1-1">
                  <Card.Header>
                    <CustomToggle eventKey="#gitcoin-1-1">
                      <span>Step 1</span>
                      <br />
                      Get an invitation code
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#gitcoin-1-1">
                    <div className="card-body">
                      <p>
                        To prevent invite drain and welcome more new users, we
                        need to confirm you are a unique human. Invitations will
                        be distributed on a competitive basis: the most
                        trustworthy accounts will get invitations first.
                      </p>
                      <p>
                        Please choose the platform where you are most active and
                        have longest account history:
                      </p>

                      <Tabs
                        defaultActiveKey="#social_twitter"
                        transition={false}
                        id="tab_social"
                      >
                        <Tab eventKey="#social_twitter" title="Twitter">
                          <p style={{marginTop: '2rem'}}>
                            Send a tweet with a hashtag #IdenaTrustBonus from
                            your account and we will send you an invitation code
                            in pm. The tweet should say:
                            <div className="dedicated_info">
                              I want to join @IdenaNetwork to get +25% Grants
                              Match Bonus in @gitcoin Grants Round 10
                              <br />
                              <span style={{color: '#578fff'}}>
                                #IdenaTrustBonus
                              </span>
                            </div>
                            <a
                              rel="noreferrer"
                              target="_blank"
                              href="https://twitter.com/intent/tweet?text=I%20want%20to%20join%20%40IdenaNetwork%20to%20get%20%2B25%25%20Grants%20Match%20Bonus%20in%20%40gitcoin%20Grants%20Round%2010"
                              className="btn btn-secondary btn-sm client_darwin_latest"
                            >
                              <img
                                src="/static/images/twitter-icn.svg"
                                alt="tweet"
                                width="24"
                                style={{
                                  color: '#d8d8d8',
                                  margin: '-0.375rem 0.5rem -0.25rem 0',
                                }}
                              />
                              Tweet
                            </a>
                          </p>
                        </Tab>
                        <Tab eventKey="#social_github" title="Github">
                          <p style={{marginTop: '2rem'}}>
                            Leave a request in the{' '}
                            <a
                              rel="noreferrer"
                              target="_blank"
                              href="https://github.com/idena-network/idena-docs/discussions/17"
                            >
                              Idena Invitation Codes
                            </a>{' '}
                            discussion on Github from your account and we will
                            send an invitation to your email. Please make sure
                            your email address is set to public in your{' '}
                            <a
                              href="https://github.com/settings/emails"
                              rel="noreferrer"
                              target="_blank"
                            >
                              Github Account Email settings
                            </a>
                            .
                          </p>
                        </Tab>
                        <Tab eventKey="#social_discord" title="Discord">
                          <p style={{marginTop: '2rem'}}>
                            Join{' '}
                            <a
                              rel="noreferrer"
                              target="_blank"
                              href="https://discord.gg/8BusRj7"
                            >
                              Idena Community Discord
                            </a>{' '}
                            and request an invite from the community in{' '}
                            <i>#invite-requests</i> channel.
                          </p>
                        </Tab>
                        <Tab eventKey="#social_telegram" title="Telegram">
                          <p style={{marginTop: '2rem'}}>
                            Join the official{' '}
                            <a
                              rel="noreferrer"
                              target="_blank"
                              href="https://t.me/IdenaNetworkPublic"
                            >
                              Idena Telegram group
                            </a>{' '}
                            and request an invite from the community.
                          </p>
                        </Tab>
                        <Tab eventKey="#social_email" title="Email">
                          <p style={{marginTop: '2rem'}}>
                            Email verification is the least reliable way to
                            confirm you are a unique human. That means that you
                            will be the last in the queue to get an invitation.
                            Please consider other channels and use this option
                            only as the last resort.
                          </p>
                          <div
                            className="section_tight"
                            style={{margin: '0px'}}
                          >
                            <div className="row">
                              <div className="col-sm-7 section_tight__info">
                                <input
                                  type="text"
                                  placeholder="Your email"
                                  value={email}
                                  onChange={e => setEmail(e.target.value)}
                                />
                              </div>
                              <div
                                className="col-sm-4 section_tight__info separated"
                                style={{marginLeft: '2rem'}}
                              >
                                <a
                                  style={{
                                    color: '#578fff',
                                    lineHeight: '2rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                  }}
                                  onClick={() => getCode()}
                                >
                                  Get an invitation code
                                </a>
                              </div>
                            </div>
                          </div>
                          <Alert state={emailActionState} />
                        </Tab>
                      </Tabs>
                    </div>
                  </Accordion.Collapse>
                </Card>
                <Card id="gitcoin-1-2">
                  <Card.Header>
                    <CustomToggle eventKey="#gitcoin-1-2">
                      <span>Step 2</span>
                      <br />
                      Create and activate your Idena account
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#gitcoin-1-2">
                    <div className="card-body">
                      <ul style={{paddingLeft: '16px'}}>
                        <li>
                          Open{' '}
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://app.idena.io/"
                          >
                            Idena Web App
                          </a>
                        </li>
                        <li>
                          Follow the instructions to create your account and
                          activate it with your invitation code:
                        </li>
                        <img
                          src="/static/images/wc_act_inv_02.gif"
                          alt="instructions"
                          width="600"
                          style={{borderRadius: '0.5rem', margin: '1.5rem 0'}}
                        />
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>
                <Card id="gitcoin-1-3">
                  <Card.Header>
                    <CustomToggle eventKey="#gitcoin-1-3">
                      <span>Step 3</span>
                      <br />
                      Prepare yourself for the validation session
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#gitcoin-1-3">
                    <div className="card-body">
                      <ul style={{paddingLeft: '16px'}}>
                        <li>
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://medium.com/idena/how-to-pass-a-validation-session-in-idena-1724a0203e81"
                          >
                            Learn what a validation is and how to pass it
                            successfully
                          </a>
                        </li>
                        <li>
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://flips.idena.io/?pass=idena.io"
                          >
                            Train to solve flips
                          </a>
                        </li>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>
                <Card id="gitcoin-1-4">
                  <Card.Header>
                    <CustomToggle eventKey="#gitcoin-1-4">
                      <span>Step 4</span>
                      <br />
                      Join the validation ceremony to validate your account
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#gitcoin-1-4">
                    <div className="card-body">
                      <div
                        className="section_lead__info lead_info"
                        style={{marginTop: '0px'}}
                      >
                        <div className="row">
                          <div className="col-sm-8 lead_info__item">
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

                          <div
                            className="col-sm-4 lead_info__counter"
                            id="CalendarPanel"
                          >
                            {validationTime !== null &&
                              validationTime !== 'RUNNING NOW' && (
                                <div>
                                  <img
                                    src="/static/images/icon-plus.svg"
                                    alt=""
                                    width="20px"
                                  />
                                  <br />
                                  <a
                                    className="_calendar"
                                    href={validationCalendarLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{margin: '0'}}
                                  >
                                    Add to calendar
                                  </a>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                      <ul style={{paddingLeft: '16px'}}>
                        <li>
                          Sign in to your Idena Web app 15 minutes before the
                          next validation session starts. Check you have Wait
                          for validation status. Make sure you have reliable and
                          fast internet connection. We advise to use a laptop
                          for better experience.
                        </li>
                        <li>
                          Sign in to your Idena Web app 15 minutes before the
                          next validation session starts. Check you have Wait
                          for validation status. Make sure you have reliable and
                          fast internet connection. We advise to use a laptop
                          for better experience. Wait for the validation session
                          to begin. Follow the instructions, solve flips and
                          enjoy the process!
                        </li>
                        <div className="video-responsive">
                          <iframe
                            width="600"
                            height="388"
                            style={{
                              marginBottom: '-10px',
                            }}
                            src="https://www.youtube.com/embed/Bb5tE9Y7M4c"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="53rd Idena Validation Ceremony 8/29/2020 (LIVE)"
                          />
                        </div>
                        <li>
                          Wait for the validation session to begin. Follow the
                          instructions, solve flips and enjoy the process!
                        </li>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>
                <Card id="gitcoin-1-5">
                  <Card.Header>
                    <CustomToggle eventKey="#gitcoin-1-5">
                      <span>Step 5</span>
                      <br />
                      Connect your Idena account to your Gitcoin profile
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#gitcoin-1-5">
                    <div className="card-body">
                      <ul style={{paddingLeft: '16px'}}>
                        <li>
                          Go to the Trust Bonus tab of your Gitcoin profile
                        </li>
                        <li>Find Idena and click Connect</li>
                        <img
                          src="/static/images/gitcoin-banner.png"
                          width="600"
                          alt="Verify with Idena"
                          style={{
                            padding: '0.875rem 0',
                            marginLeft: '-1.25rem',
                          }}
                        />
                        <li>Authorise Gitcoin to access your Idena account</li>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

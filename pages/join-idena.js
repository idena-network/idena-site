/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from 'next/link'
import {
  Accordion,
  Card,
  FormControl,
  InputGroup,
  Tab,
  Tabs,
} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import {Trans, useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import axios from 'axios'
import {useRouter} from 'next/router'
import cookie from 'cookie-cutter'
import Layout from '../shared/components/layout'
import {CustomToggle} from '../shared/components/toggle'
import {useHash} from '../shared/useHash'
import {getGoogleCalendarLink, useNextValidationTime} from '../shared/api'

const ResponseState = {
  None: 0,
  Success: 1,
  Error: 3,
}
const followersCount = process.env.TWITTER_MINIMUM_SUBS_COUNT || 100

// eslint-disable-next-line react/prop-types
function Alert({state, message}) {
  return (
    <div
      className={`alert ${state === ResponseState.None ? 'hide' : ''} ${
        state === ResponseState.Success ? 'success' : 'error'
      }`}
    >
      <img
        src={`/static/images/alert-${
          state === ResponseState.Success ? 'success' : 'error'
        }.svg`}
        alt="alert"
        width="20"
      />
      <span>{message}</span>
    </div>
  )
}

export default function JoinIdena() {
  const {t} = useTranslation('join-idena')
  const router = useRouter()

  const {localeTime: validationTime, jsonDateString} = useNextValidationTime()
  const validationCalendarLink = getGoogleCalendarLink(jsonDateString)

  const [activeHash, setActiveHash] = useState()
  const [hash] = useHash()
  const [twitterName, setTwitterName] = useState()
  const [isTweetChecking, setIsTweetChecking] = useState(false)
  const [isTextCopied, setIsTextCopied] = useState(false)
  const [isTweetCopied, setIsTweetCopied] = useState(false)
  const [twitterAlertMessage, setTwitterAlertMessage] = useState('')
  const [twitterKey, setTwitterKey] = useState('')
  const [twitterAlertState, setTwitterAlertState] = useState(ResponseState.None)

  useEffect(() => {
    setActiveHash(hash)
  }, [hash])

  useEffect(() => {
    const refLink = router.query.ref
    if (!refLink || !jsonDateString) {
      return
    }

    const refId = cookie.get('refId')
    if (refId && refId !== refLink) {
      return
    }
    cookie.set('refId', refLink, {expires: new Date(jsonDateString)})
  }, [jsonDateString, router.query.ref])

  const getKeyByTwitter = async name => {
    if (!name) {
      setTwitterAlertState(ResponseState.Error)
      setTwitterAlertMessage('Please enter your twitter nickname')
      return
    }
    setIsTweetChecking(true)
    setTwitterAlertState(ResponseState.None)

    try {
      const response = await axios.get('/api/getInvitationTweetProof', {
        params: {screen_name: name, refId: cookie.get('refId')},
      })
      setTwitterAlertMessage(
        'Your invitation code has been generated successfully!'
      )
      setTwitterKey(response.data)
      setTwitterAlertState(ResponseState.Success)
    } catch (e) {
      if (!e.response) {
        setTwitterAlertMessage('Something went wrong')
      } else {
        setTwitterAlertMessage(e.response.data)
      }
      setTwitterAlertState(ResponseState.Error)
    } finally {
      setIsTweetChecking(false)
    }
  }

  async function copyTweet() {
    await navigator.clipboard.writeText(
      'I want to join @IdenaNetwork to become a validator of the first Proof-of-Person blockchain #IdenaInvite\n' +
        '\n' +
        'https://www.idena.io/join-idena'
    )
    setIsTweetCopied(true)
  }

  async function copyKey() {
    await navigator.clipboard.writeText(twitterKey)
    setIsTextCopied(true)
  }

  return (
    <Layout
      title={t('How to join Idena', {ns: 'join-idena'})}
      description="How to verify your Idena cryptoidentity"
    >
      <section
        className="section section_content menu_section_content menu_join_idena"
        id="join-idena"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <div className="">
                <h3 className="h1">
                  {t('How to join Idena', {
                    ns: 'join-idena',
                  })}
                </h3>
                <p className="text-center" style={{color: '#96999E'}}>
                  <Trans i18nKey="ToStartMiningIdena" t={t} ns="join-idena">
                    To start mining Idena, you need to validate your
                    cryptoidentity. It does not require the disclosure of any
                    personal data (no KYC). You need to appear online when the
                    validation ceremony starts and solve a series of flip-tests
                    (CAPTCHAs).
                  </Trans>
                </p>
              </div>

              <div
                className="section_lead__info lead_info"
                style={{marginTop: '0px'}}
              >
                <div className="row">
                  <div className="col-sm-8 lead_info__item">
                    <div
                      id="counter_top"
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
                      {t('Next validation:', {
                        ns: 'join-idena',
                        nsSeparator: '!',
                      })}{' '}
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
                            {t('Add to calendar', {ns: 'join-idena'})}
                          </a>
                        </div>
                      )}
                  </div>
                </div>
              </div>

              <Accordion
                activeKey={activeHash}
                onSelect={e => setActiveHash(e)}
              >
                <Card id="join-idena-1-1">
                  <Card.Header>
                    <CustomToggle eventKey="#join-idena-1-1">
                      <span>{t('Step 1', {ns: 'join-idena'})}</span>
                      <br />
                      {t('Get an invitation code', {ns: 'join-idena'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#join-idena-1-1">
                    <div className="card-body">
                      <p>
                        <Trans
                          i18nKey="getInvitationNotes"
                          t={t}
                          ns="join-idena"
                        >
                          To minimize the probability of a Sybil attack, the
                          pace of network growth is restricted: Idena network
                          participation is invitation-based. New invitations can
                          be sent out only by validated users. The number of
                          invitations is limited and increases as the network
                          grows.
                        </Trans>
                      </p>
                      <p>
                        {t(
                          'Please choose the platform where you have the most active account:',
                          {ns: 'join-idena', nsSeparator: '!'}
                        )}
                      </p>

                      <Tabs
                        defaultActiveKey="#social_telegram"
                        transition={false}
                        id="tab_social"
                      >
                        <Tab eventKey="#social_telegram" title="Telegram">
                          <p style={{marginTop: '2rem'}}>
                            <Trans
                              i18nKey="idenaTelegramGroupLink"
                              t={t}
                              ns="join-idena"
                            >
                              Join the official{' '}
                              <a
                                rel="noreferrer"
                                target="_blank"
                                href="https://t.me/IdenaNetworkPublic"
                              >
                                Idena Telegram group
                              </a>{' '}
                              and request an invitation code from the community.
                            </Trans>
                          </p>
                        </Tab>
                        <Tab eventKey="#social_discord" title="Discord">
                          <p style={{marginTop: '2rem'}}>
                            <Trans
                              i18nKey="idenaCommunityDiscordLink"
                              t={t}
                              ns="join-idena"
                            >
                              Join{' '}
                              <a
                                rel="noreferrer"
                                target="_blank"
                                href="https://discord.gg/8BusRj7"
                              >
                                Idena Community Discord
                              </a>{' '}
                              and request an invitation code from the community
                              in <code>#invite-requests</code> channel.
                            </Trans>
                          </p>
                        </Tab>
                        <Tab eventKey="#social_twitter" title="Twitter">
                          <ol>
                            <li style={{marginTop: '2rem'}}>
                              <Trans
                                i18nKey="tweetSendingTip"
                                t={t}
                                ns="join-idena"
                              >
                                <a
                                  target="_blank"
                                  rel="noreferrer"
                                  href="https://twitter.com/intent/tweet?text=I%20want%20to%20join%20%40IdenaNetwork%20to%20become%20a%20validator%20of%20the%20first%20Proof-of-Person%20blockchain%20%23IdenaInvite%0A%0Ahttps://www.idena.io/join-idena"
                                >
                                  Send a tweet
                                </a>{' '}
                                with a hashtag #IdenaInvite from your account.
                                To get an invite, your account should be{' '}
                                <b>older than 1 year</b> or{' '}
                                <b>
                                  older than two months and have at least{' '}
                                  {{followersCount}} followers
                                </b>
                                . The tweet should say:
                              </Trans>
                            </li>
                            <div
                              style={{
                                paddingRight: '5rem',
                                marginTop: '16px',
                              }}
                              className="dedicated_info inactive"
                            >
                              {isTweetCopied ? (
                                <span
                                  className="copy_element"
                                  style={{
                                    marginTop: '-0.5rem',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#27d980',
                                  }}
                                >
                                  Copied!
                                </span>
                              ) : (
                                <img
                                  className="copy_element"
                                  style={{
                                    cursor: 'pointer',
                                  }}
                                  onClick={copyTweet}
                                  src="/static/images/icon-copy.svg"
                                  alt="copy"
                                  width="13"
                                />
                              )}
                              I want to join @IdenaNetwork to become a validator
                              of the first Proof-of-Person blockchain{' '}
                              <span style={{color: '#578fff'}}>
                                #IdenaInvite
                              </span>
                              <br />
                              <br />
                              <span style={{color: '#578fff'}}>
                                https://www.idena.io/join-idena
                              </span>
                            </div>
                            <li style={{marginTop: '32px'}}>
                              <Trans
                                i18nKey="getInviteWithTwitterName"
                                t={t}
                                ns="join-idena"
                              >
                                Enter your twitter name and click{' '}
                                <i>Get an invitation code</i> button. The code
                                will be shown automatically.
                              </Trans>
                            </li>
                            <div
                              style={{marginTop: '16px'}}
                              className="section_tight"
                            >
                              <div className="row">
                                <div className="col-sm-7 section_tight__input">
                                  <InputGroup className="section_input">
                                    <InputGroup.Prepend>
                                      <InputGroup.Text id="twitterAtSign">
                                        @
                                      </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                      placeholder="Your nickname"
                                      aria-label="Your nickname"
                                      aria-describedby="twitterAtSign"
                                      value={twitterName}
                                      onChange={n =>
                                        setTwitterName(n.target.value)
                                      }
                                    />
                                  </InputGroup>
                                </div>
                                <div
                                  className="col-sm-4 section_tight__info separated"
                                  style={{marginLeft: '4rem'}}
                                >
                                  <a
                                    style={{
                                      color: '#578fff',
                                      lineHeight: '2rem',
                                      fontWeight: 500,
                                      cursor: 'pointer',
                                    }}
                                    onClick={() => getKeyByTwitter(twitterName)}
                                  >
                                    {t('Get an invitation code', {
                                      ns: 'join-idena',
                                    })}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </ol>
                          <Alert
                            state={twitterAlertState}
                            message={twitterAlertMessage}
                          />
                          {isTweetChecking && (
                            <div className="loadingState">
                              <img
                                src="/static/images/spinner.svg"
                                alt="Loading..."
                                width="48"
                              />
                            </div>
                          )}
                          {twitterAlertState === ResponseState.Success && (
                            <div
                              className="section_tight margin-t-m"
                              style={{margin: '0px', textAlign: 'left'}}
                            >
                              <span
                                style={{
                                  fontSize: '14px',
                                  color: '#96999e',
                                  fontWeight: '500',
                                }}
                              >
                                Invitation code
                              </span>

                              <div style={{wordBreak: 'break-all'}}>
                                {twitterKey}
                                {isTextCopied ? (
                                  <span
                                    style={{
                                      marginLeft: '0.5rem',
                                      fontSize: '14px',
                                      fontWeight: '500',
                                      color: '#27d980',
                                    }}
                                  >
                                    Copied!
                                  </span>
                                ) : (
                                  <img
                                    style={{
                                      marginLeft: '0.25rem',
                                      cursor: 'pointer',
                                    }}
                                    onClick={copyKey}
                                    src="/static/images/icon-copy.svg"
                                    alt="copy"
                                    width="13"
                                  />
                                )}
                              </div>
                            </div>
                          )}
                        </Tab>
                      </Tabs>
                    </div>
                  </Accordion.Collapse>
                </Card>
                <Card id="join-idena-1-2">
                  <Card.Header>
                    <CustomToggle eventKey="#join-idena-1-2">
                      <span>{t('Step 2', {ns: 'join-idena'})}</span>
                      <br />
                      {t('Create and activate your Idena account', {
                        ns: 'join-idena',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#join-idena-1-2">
                    <div className="card-body">
                      <ul style={{paddingLeft: '1.25rem'}}>
                        <li>
                          <Trans
                            i18nKey="idenaWebAppLink"
                            t={t}
                            ns="join-idena"
                          >
                            Open{' '}
                            <a
                              rel="noreferrer"
                              target="_blank"
                              href="https://app.idena.io/"
                            >
                              Idena Web App
                            </a>
                          </Trans>
                        </li>
                        <li>
                          {t('Follow the instructions to create your account', {
                            ns: 'join-idena',
                            nsSeparator: '!',
                          })}
                        </li>
                        <li>
                          {t(
                            'Activate your invitation code. Please note that the invitation code expires 5 mins before validation!',
                            {ns: 'join-idena'}
                          )}
                        </li>
                        <img
                          src="/static/images/web-client-activate.gif"
                          alt="instructions"
                          width="600"
                          style={{
                            borderRadius: '0.5rem',
                            margin: '1.5rem 0 1.5rem -1.25rem',
                          }}
                        />
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>
                <Card id="join-idena-1-3">
                  <Card.Header>
                    <CustomToggle eventKey="#join-idena-1-3">
                      <span>{t('Step 3', {ns: 'join-idena'})}</span>
                      <br />
                      {t('Prepare yourself for the validation session', {
                        ns: 'join-idena',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#join-idena-1-3">
                    <div className="card-body">
                      <p>
                        {t(
                          'Validation ceremony is a time-sensitive event. It requires users to be strictly on time and to use the latest version of Idena app to be able to participate in validation. Even 1 minute late or outdated app version could lead to failure.',
                          {ns: 'join-idena'}
                        )}
                      </p>
                      <p>
                        {t(
                          'To get advance notifications about validation and Idena updates we strongly recommend to follow us on one of the social media:',
                          {ns: 'join-idena'}
                        )}
                      </p>
                      <ul style={{paddingLeft: '1.25rem'}}>
                        <li>
                          <Trans
                            i18nKey="joinIdenaTelegramLink"
                            t={t}
                            ns="join-idena"
                          >
                            Telegram:{' '}
                            <a
                              rel="noreferrer"
                              target="_blank"
                              href="https://t.me/IdenaAnnouncements"
                            >
                              Idena Announcements channel
                            </a>{' '}
                            (important updates and announcements only)
                          </Trans>
                        </li>
                        <li>
                          {t('Twitter:', {ns: 'join-idena', nsSeparator: '!'})}{' '}
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://twitter.com/IdenaNetwork"
                          >
                            @IdenaNetwork
                          </a>
                        </li>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>
                <Card id="join-idena-1-4">
                  <Card.Header>
                    <CustomToggle eventKey="#join-idena-1-4">
                      <span>{t('Step 4', {ns: 'join-idena'})}</span>
                      <br />
                      {t('Prepare yourself for the validation session', {
                        ns: 'join-idena',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#join-idena-1-4">
                    <div className="card-body">
                      <ul style={{paddingLeft: '1.25rem'}}>
                        <li>
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://medium.com/idena/how-to-pass-a-validation-session-in-idena-1724a0203e81"
                          >
                            {t(
                              'Learn what a validation session is and how to pass it successfully',
                              {ns: 'join-idena'}
                            )}
                          </a>
                        </li>
                        <li>
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://flips.idena.io/?pass=idena.io"
                          >
                            {t('Train to solve flips', {ns: 'join-idena'})}
                          </a>
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
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>
                <Card id="join-idena-1-5">
                  <Card.Header>
                    <CustomToggle eventKey="#join-idena-1-5">
                      <span>{t('Step 5', {ns: 'join-idena'})}</span>
                      <br />
                      {t(
                        'Join the validation ceremony to validate your account',
                        {ns: 'join-idena'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#join-idena-1-5">
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
                              {t('Next validation:', {
                                ns: 'join-idena',
                                nsSeparator: '!',
                              })}{' '}
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
                                    {t('Add to calendar', {ns: 'join-idena'})}
                                  </a>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                      <ul style={{marginTop: '-23px', paddingLeft: '1.25rem'}}>
                        <li>
                          <Trans
                            i18nKey="idenaWebAppSignIn"
                            t={t}
                            ns="join-idena"
                          >
                            <a
                              rel="noreferrer"
                              target="_blank"
                              href="https://app.idena.io/"
                            >
                              Sign in
                            </a>{' '}
                            to your Idena Web App{' '}
                            <b>
                              15 minutes before the next validation session
                              starts
                            </b>
                            . Check you have Wait for validation status. Make
                            sure you have reliable and fast internet connection.
                            We advise to use a laptop/PC for better experience.
                          </Trans>
                        </li>
                        <li>
                          {t(
                            'Wait for the validation session to begin. Follow the instructions, solve flips and enjoy the process!',
                            {ns: 'join-idena'}
                          )}
                        </li>
                        <li>
                          <Trans
                            i18nKey="validationResults"
                            t={t}
                            ns="join-idena"
                          >
                            Wait for the validation results. If you have
                            successfully solved the flips, you will get a{' '}
                            <i>Newbie</i> status. Congratulations, you are now a
                            validated cryptoidentity!
                          </Trans>
                        </li>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h3>{t('After validation', {ns: 'join-idena'})}</h3>
              <Accordion
                activeKey={activeHash}
                onSelect={e => setActiveHash(e)}
              >
                <Card id="join-idena-2-1">
                  <Card.Header>
                    <CustomToggle eventKey="#join-idena-2-1">
                      <span>{t('Step 1', {ns: 'join-idena'})}</span>
                      <br />
                      {t('Start mining', {
                        ns: 'join-idena',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#join-idena-2-1">
                    <div className="card-body">
                      <ul style={{paddingLeft: '1.25rem'}}>
                        <li>
                          <Link href="/download">
                            <a>
                              <Trans
                                i18nKey="DownloadIdena"
                                t={t}
                                ns="join-idena"
                              >
                                Download the Idena Desktop App.
                              </Trans>
                            </a>
                          </Link>
                        </li>

                        <li>
                          <Trans i18nKey="MigrateIdena" t={t} ns="join-idena">
                            Migrate your Idena account (using Settings page):
                            export your private key backup from the Idena Web
                            App and then import it in your Idena Desktop App.
                          </Trans>
                        </li>

                        <li>
                          <Trans
                            i18nKey="ActivateMiningStatus"
                            t={t}
                            ns="join-idena"
                          >
                            Activate your Mining status and keep your Idena node
                            synchronized to mine iDNA coins.
                          </Trans>
                        </li>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>
                <Card id="join-idena-2-2">
                  <Card.Header>
                    <CustomToggle eventKey="#join-idena-2-2">
                      <span>{t('Step 2', {ns: 'join-idena'})}</span>
                      <br />
                      {t('Prolong your cryptoidentity status', {
                        ns: 'join-idena',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#join-idena-2-2">
                    <div className="card-body">
                      <p>
                        <Trans
                          i18nKey="ProlongCryptoidentityStatus"
                          t={t}
                          ns="join-idena"
                        >
                          Your cryptoidentity status is valid until the next
                          epoch. You should prolong your validation status for
                          every new epoch.
                        </Trans>
                      </p>
                      <ul style={{paddingLeft: '1.25rem'}}>
                        <li>
                          <Trans i18nKey="SubmitFlips" t={t} ns="join-idena">
                            Learn how to create flips and submit three flips
                            before the next validation. If you don't submit 3
                            flips you won't be allowed to participate in the
                            next validation.
                          </Trans>
                        </li>

                        <li>
                          <Trans
                            i18nKey="ScheduleNextValidation"
                            t={t}
                            ns="join-idena"
                          >
                            Schedule your next validation.
                          </Trans>
                        </li>
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

export const getStaticProps = async ({locale}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['join-idena', 'common'])),
  },
})

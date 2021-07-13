/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Accordion,
  Card,
  FormControl,
  InputGroup,
  Tab,
  Tabs,
} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Trans, useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Layout from '../shared/components/layout'
import {CustomToggle} from '../shared/components/toggle'
import {useHash} from '../shared/useHash'
import {getGoogleCalendarLink, useNextValidationTime} from '../shared/api'
// import Twitter from "twitter";

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

export default function Gitcoin() {
  const {t} = useTranslation('gitcoin')

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

  const {localeTime: validationTime, jsonDateString} = useNextValidationTime()
  const validationCalendarLink = getGoogleCalendarLink(jsonDateString)

  const getKeyByTwitter = async name => {
    if (!name) {
      return
    }
    setIsTweetChecking(true)
    setTwitterAlertState(ResponseState.None)

    try {
      const response = await axios.get('/api/getGitcoinTweetProof', {
        params: {screen_name: name},
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
      'I want to join @IdenaNetwork to get +50% Trust Bonus on @gitcoin ' +
        '#IdenaTrustBonus'
    )
    setIsTweetCopied(true)
  }

  async function copyKey() {
    await navigator.clipboard.writeText(twitterAlertMessage)
    setIsTextCopied(true)
  }

  return (
    <Layout
      title={t('Verify your Gitcoin', {ns: 'gitcoin'})}
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
                  {t('How to verify your Gitcoin account with Idena', {
                    ns: 'gitcoin',
                  })}
                </h3>
                <p className="text-center" style={{color: '#96999E'}}>
                  {t(
                    'Idena is the first proof-of-person blockchain based on democratic principles. Every node is linked to a cryptoidentity — a unique person with equal voting power and mining income.',
                    {ns: 'gitcoin'}
                  )}
                </p>
                <p>
                  {t(
                    'Your validated cryptoidentity ensures you are a unique human without revealing any personal data. It allows you to have more voting power when the voting can be subject to a sybil attack. Gitcoin accounts verified with Idena get +50% grants match bonus in Gitcoin funding.',
                    {ns: 'gitcoin'}
                  )}
                </p>
              </div>

              <Accordion
                activeKey={activeHash}
                onSelect={e => setActiveHash(e)}
              >
                <Card id="gitcoin-1-1">
                  <Card.Header>
                    <CustomToggle eventKey="#gitcoin-1-1">
                      <span>{t('Step 1', {ns: 'gitcoin'})}</span>
                      <br />
                      {t('Get an invitation code', {ns: 'gitcoin'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#gitcoin-1-1">
                    <div className="card-body">
                      <p>
                        {t(
                          'The number of invitations is limited. To prevent invite drain and welcome more new users, we need to confirm you are a unique human. Invitations will be distributed on a competitive basis: the most trustworthy accounts will get invitations first.',
                          {ns: 'gitcoin', nsSeparator: '!'}
                        )}
                      </p>
                      <p>
                        {t(
                          'Please choose the platform where you have the most active account:',
                          {ns: 'gitcoin', nsSeparator: '!'}
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
                              ns="gitcoin"
                            >
                              Join the official{' '}
                              <a
                                rel="noreferrer"
                                target="_blank"
                                href="https://t.me/IdenaNetworkPublic"
                              >
                                Idena Telegram group
                              </a>{' '}
                              and request an invite from the community.
                            </Trans>
                          </p>
                        </Tab>
                        <Tab eventKey="#social_discord" title="Discord">
                          <p style={{marginTop: '2rem'}}>
                            <Trans
                              i18nKey="idenaCommunityDiscordLink"
                              t={t}
                              ns="gitcoin"
                            >
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
                            </Trans>
                          </p>
                        </Tab>
                        <Tab eventKey="#social_twitter" title="Twitter">
                          <p style={{marginTop: '2rem'}}>
                            <Trans i18nKey="tweetSendingTip" t={t} ns="gitcoin">
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://twitter.com/intent/tweet?text=I%20want%20to%20join%20%40IdenaNetwork%20to%20get%20%2B50%25%20Trust%20Bonus%20on%20%40gitcoin%20%0D%23IdenaTrustBonus"
                              >
                                Send a tweet
                              </a>{' '}
                              with a hashtag #IdenaTrustBonus from your account.
                              To get an invite, your account should be{' '}
                              <b>
                                older than 1 year or older than two months and
                                and least {{followersCount}} followers
                              </b>
                              . The tweet should say:
                            </Trans>
                          </p>
                          <div
                            style={{paddingRight: '5rem'}}
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
                            I want to join @IdenaNetwork to get +50% Trust Bonus
                            on @gitcoin
                            <br />
                            <span style={{color: '#578fff'}}>
                              #IdenaTrustBonus
                            </span>
                          </div>
                          <div className="section_tight">
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
                                    color:
                                      isTweetChecking || !twitterName
                                        ? '#96999e'
                                        : '#578fff',
                                    lineHeight: '2rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                  }}
                                  onClick={() => getKeyByTwitter(twitterName)}
                                >
                                  {t('Get an invitation code', {
                                    ns: 'gitcoin',
                                  })}
                                </a>
                              </div>
                            </div>
                          </div>
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
                <Card id="gitcoin-1-2">
                  <Card.Header>
                    <CustomToggle eventKey="#gitcoin-1-2">
                      <span>{t('Step 2', {ns: 'gitcoin'})}</span>
                      <br />
                      {t('Create and activate your Idena account', {
                        ns: 'gitcoin',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#gitcoin-1-2">
                    <div className="card-body">
                      <ul style={{paddingLeft: '1.25rem'}}>
                        <li>
                          <Trans i18nKey="idenaWebAppLink" t={t} ns="gitcoin">
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
                          {t(
                            'Follow the instructions to create your account and activate it with your invitation code:',
                            {ns: 'gitcoin', nsSeparator: '!'}
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
                <Card id="gitcoin-1-3">
                  <Card.Header>
                    <CustomToggle eventKey="#gitcoin-1-3">
                      <span>{t('Step 3', {ns: 'gitcoin'})}</span>
                      <br />
                      {t('Prepare yourself for the validation session', {
                        ns: 'gitcoin',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#gitcoin-1-3">
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
                              {ns: 'gitcoin'}
                            )}
                          </a>
                        </li>
                        <li>
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://flips.idena.io/?pass=idena.io"
                          >
                            {t('Train to solve flips', {ns: 'gitcoin'})}
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
                <Card id="gitcoin-1-4">
                  <Card.Header>
                    <CustomToggle eventKey="#gitcoin-1-4">
                      <span>{t('Step 4', {ns: 'gitcoin'})}</span>
                      <br />
                      {t(
                        'Join the validation ceremony to validate your account',
                        {ns: 'gitcoin'}
                      )}
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
                              {t('Next validation:', {
                                ns: 'gitcoin',
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
                                    {t('Add to calendar', {ns: 'gitcoin'})}
                                  </a>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                      <ul style={{paddingLeft: '1.25rem'}}>
                        <li>
                          <Trans i18nKey="idenaWebAppSignIn" t={t} ns="gitcoin">
                            <a
                              rel="noreferrer"
                              target="_blank"
                              href="https://app.idena.io/"
                            >
                              Sign in
                            </a>{' '}
                            to your Idena Web app{' '}
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
                            {ns: 'gitcoin'}
                          )}
                        </li>
                        <li>
                          <Trans i18nKey="validationResults" t={t} ns="gitcoin">
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
                <Card id="gitcoin-1-5">
                  <Card.Header>
                    <CustomToggle eventKey="#gitcoin-1-5">
                      <span>{t('Step 5', {ns: 'gitcoin'})}</span>
                      <br />
                      {t('Connect your Idena account to your Gitcoin profile', {
                        ns: 'gitcoin',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#gitcoin-1-5">
                    <div className="card-body">
                      <ul style={{paddingLeft: '1.25rem'}}>
                        <li>
                          <Trans
                            i18nKey="gitcoinTrustBonusLink"
                            t={t}
                            ns="gitcoin"
                          >
                            Go to the{' '}
                            <a
                              rel="noreferrer"
                              target="_blank"
                              href="https://gitcoin.co/login/github/?next=/profile/trust"
                            >
                              Trust Bonus tab
                            </a>{' '}
                            of your Gitcoin profile
                          </Trans>
                        </li>
                        <li>
                          {t('Find Idena and click Verify', {ns: 'gitcoin'})}
                        </li>
                        <img
                          src="/static/images/gitcoin-banner.png"
                          width="300"
                          alt="Verify with Idena"
                          style={{
                            // padding: '0.875rem 0',
                            borderRadius: '0.5rem',
                            margin: '1.5rem 0 1.5rem -1.25rem',
                          }}
                        />
                        <li>
                          {t('Authorise Gitcoin to access your Idena account', {
                            ns: 'gitcoin',
                          })}
                        </li>
                        <li>
                          {t(
                            'Congratulations! Your Idena account is now verified',
                            {ns: 'gitcoin'}
                          )}
                        </li>
                        <img
                          src="/static/images/gitcoin-banner-2.png"
                          alt="Your account is verified"
                          width="300"
                          style={{
                            borderRadius: '0.5rem',
                            margin: '1.5rem 0 1.5rem -1.25rem',
                          }}
                        />
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
    ...(await serverSideTranslations(locale, ['gitcoin', 'common'])),
  },
})

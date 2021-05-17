/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import Link from 'next/link'
import {useEffect, useState} from 'react'
import {Trans, useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Layout from '../shared/components/layout'
import {
  useNextValidationTime,
  useTotalValidatedCount,
  getGoogleCalendarLink,
} from '../public/api'
import {LinkText} from '../shared/utils/utils'

export default function Home() {
  const [validatedCount, setValidatedCount] = useState(null)
  const [validationTime, setValidationTime] = useState(null)
  const [validationCalendarLink, setValidationCalendarLink] = useState(null)

  const {t} = useTranslation('index')

  useEffect(async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const count = await useTotalValidatedCount()
    setValidatedCount(count)
  }, [])
  useEffect(async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const nextValidation = await useNextValidationTime()
    setValidationTime(nextValidation.localeTime)
    setValidationCalendarLink(
      getGoogleCalendarLink(nextValidation.jsonDateString)
    )
  }, [])

  return (
    <Layout
      title={t('IDENA: Proof-of-Person blockchain', {
        ns: 'index',
        nsSeparator: '!',
      })}
      description={t(
        'Join the mining of the first human-centric cryptocurrency',
        {ns: 'index'}
      )}
    >
      <section className="section section_lead" id="lead">
        <div className="section_lead__header text-center">
          <div className="container" data-target="menu_main">
            <div
              className="logo nav-link"
              title={t('IDENA: Proof-of-Person blockchain', {
                ns: 'index',
                nsSeparator: '!',
              })}
              descriptioncontent={t(
                'Join the mining of the first human-centric cryptocurrency',
                {ns: 'index'}
              )}
            >
              <img
                src="/static/images/idena-logo-round.svg"
                alt=""
                width="135px"
              />
            </div>

            <h1 className="title">
              {t('Proof-Of-Person Blockchain', {ns: 'index'})}
            </h1>
            <div
              className="subtitle"
              dangerouslySetInnerHTML={{
                __html: t(
                  'Join the mining&nbsp;of the first human-centric&nbsp;cryptocurrency',
                  {ns: 'index'}
                ),
              }}
            />

            <div
              id="text_carousel"
              className="carousel slide carousel-fade"
              data-ride="carousel"
              style={{display: 'none'}}
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="subtitle">
                    {t('Everyone has an equal right to mine coins', {
                      ns: 'index',
                    })}
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="subtitle">
                    {t('Everyone has an equal right to vote', {ns: 'index'})}
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="subtitle">
                    {t('Everyone has an equal right to communicate privately', {
                      ns: 'index',
                    })}
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
                        <Link href="/download">
                          <a className="btn btn-link">
                            <i className="icon icon--download"></i>
                            <span>{t('Download Idena', {ns: 'index'})}</span>
                          </a>
                        </Link>
                      </div>
                    </div>

                    <div className="col-auto">
                      <div className="row justify-content-center">
                        <Link href="https://app.idena.io">
                          <a style={{marginLeft: 15}} className="btn btn-link">
                            <i className="icon icon--web"></i>
                            <span>
                              <Trans i18nKey="joinIdenaWeb" t={t} ns="index">
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
                                </span>
                              </Trans>{' '}
                            </span>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section_lead__info lead_info">
                  <div className="row">
                    <div
                      className="col-sm-4 lead_info__nodes clickable"
                      onClick={() =>
                        window.open('https://scan.idena.io', '_blank')
                      }
                    >
                      <div className="_value" id="ValidatedNodes">
                        {validatedCount === null ? '-' : validatedCount}
                      </div>
                      <p className="nodes _hint">
                        {t('Validated nodes', {ns: 'index'})}
                      </p>
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
                          <span className="_smalltext">{t('d', {ns: 'index'})}</span>
                        </div>
                        <div className="col-auto">
                          <span className="hours">-</span>
                          <span className="_smalltext">{t('h', {ns: 'index'})}</span>
                        </div>
                        <div className="col-auto">
                          <span className="minutes">-</span>
                          <span className="_smalltext">{t('m', {ns: 'index'})}</span>
                        </div>
                        <div className="col-auto">
                          <span className="seconds">-</span>
                          <span className="_smalltext">{t('s', {ns: 'index'})}</span>
                        </div>
                      </div>

                      <p className="time _hint">
                        {t('Next validation:', {ns: 'index', nsSeparator: '!'})}{' '}
                        <span
                          style={{fontSize: 'small'}}
                          className="NextValidationDateTime"
                        >
                          {validationTime !== null &&
                          validationTime !== 'RUNNING NOW'
                            ? validationTime
                            : t('RUNNING NOW', {ns: 'index'})}
                          {''}
                        </span>
                      </p>

                      {validationTime !== null &&
                        validationTime !== 'RUNNING NOW' && (
                          <a
                            className="_calendar"
                            href={validationCalendarLink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {t('Add to calendar', {ns: 'index'})}
                            <img
                              src="/static/images/icon-plus.svg"
                              alt=""
                              width="20px"
                              style={{marginLeft: '10px'}}
                            />
                          </a>
                        )}
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

              <p
                dangerouslySetInnerHTML={{
                  __html: t(
                    'Idena is the first proof-of-person blockchain based on democratic principles. Every node is linked to a cryptoidentity &ndash; one single person with equal voting power and mining income. It is one of the most decentralized blockchains with thousands of unique miners joining the network.',
                    {ns: 'index'}
                  ),
                }}
              />

              <p>
                {t(
                  'To start mining Idena, you need to prove you are a unique human. It does not require the disclosure of any personal data (no KYC). You have to appear online when the validation ceremony starts and solve a series of flip-tests (CAPTCHAs).',
                  {ns: 'index'}
                )}
              </p>

              <p>
                <Trans i18nKey="joinTheDemocratisCrypto" t={t} ns="index">
                  Join the{' '}
                  <LinkText href="/faq#faq-start-1">
                    <a>democratic crypto network of equal rights &rsaquo;</a>
                  </LinkText>
                </Trans>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['index'])),
    },
  }
}

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
  getCoingeckoData,
} from '../shared/api'
import {precise2, usdFmt, LinkText} from '../shared/utils/utils'

export default function Home() {
  const [marketData, setMarketData] = useState({
    price: 0,
    priceChange: 0,
    marketCap: 0,
  })

  const {t} = useTranslation('index')

  useEffect(() => {
    async function getData() {
      const [{idena}] = await Promise.all([getCoingeckoData()])
      setMarketData({
        price: idena && idena.usd,
        priceChange: idena && idena.usd_24h_change,
        marketCap: idena && idena.usd_market_cap,
      })
    }
    getData()
  }, [])

  const {localeTime: validationTime, jsonDateString} = useNextValidationTime()
  const validatedCount = useTotalValidatedCount()

  const validationCalendarLink = getGoogleCalendarLink(jsonDateString)

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
            <div className="subtitle">
              {t('Join the mining of the first human-centric cryptocurrency', {
                ns: 'index',
              })}
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

              <p>
                {t(
                  'Idena is the first proof-of-person blockchain based on democratic principles',
                  {ns: 'index'}
                )}
              </p>

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

              <div className="index-price-info">
                <div className="row">
                  <div className="col-sm-6 lead_info__nodes">
                    <div className="item">
                      <div className="content">
                        <div className="value">
                          <span style={{paddingRight: '4px'}}>
                            {usdFmt(precise2(marketData.price))}
                          </span>
                          {marketData.priceChange && (
                            <span className="change">
                              {' '}
                              <span
                                style={{
                                  color: `${
                                    marketData.priceChange > 0
                                      ? '#27d980'
                                      : '#ff6666'
                                  }`,
                                }}
                              >
                                <span
                                  style={{
                                    verticalAlign: 'middle',
                                    fontSize: '8px',
                                  }}
                                >
                                  {`${marketData.priceChange > 0 ? '▲' : '▼'}`}
                                </span>
                                {`${Math.abs(
                                  Math.round(marketData.priceChange * 10) / 10
                                )}%`}
                              </span>
                            </span>
                          )}
                        </div>
                        <div className="description">
                          <span>
                            Price powered by{' '}
                            <a
                              href="https://www.coingecko.com/en/search_redirect?id=idena&type=coin"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Coingecko
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 lead_info__counter">
                    <div className="_value row justify-content-center">
                      <div className="item">
                        <div className="content">
                          <div className="value">
                            <span>
                              {usdFmt(Math.round(marketData.marketCap))}
                            </span>
                          </div>
                          <div className="description">
                            <span>Market cap</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="linkbar">
                <div className="linkbar-div">
                  <div className="container">
                    <div className="item">
                      <div className="content">
                        <img
                          src="/static/images/logo_qtrade.svg"
                          alt="qTrade"
                          width="40"
                        />
                        <div className="linkbar-value">
                          <span>qTrade</span>
                        </div>
                        <a
                          href="https://qtrade.io/market/IDNA_BTC"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {' '}
                        </a>
                      </div>
                    </div>
                    <div className="item">
                      <div className="content">
                        <img
                          src="/static/images/logo_pancakeswap.svg"
                          alt="Pancakeswap"
                          width="40"
                        />
                        <div className="linkbar-value">
                          <span>Pancakeswap</span>
                        </div>
                        <a
                          href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x0de08c1abe5fb86dd7fd2ac90400ace305138d5b"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {' '}
                        </a>
                      </div>
                    </div>
                    <div className="item">
                      <div className="content">
                        <img
                          src="/static/images/logo_hotbit.svg"
                          alt="Hotbit"
                          width="40"
                        />
                        <div className="linkbar-value">
                          <span>Hotbit</span>
                        </div>
                        <a
                          href="https://www.hotbit.io/exchange?symbol=IDNA_BTC"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {' '}
                        </a>
                      </div>
                    </div>
                    <div className="item">
                      <div className="content">
                        <img
                          src="/static/images/logo_vitex.svg"
                          alt="ViteX"
                          width="40"
                        />
                        <div className="linkbar-value">
                          <span>ViteX</span>
                        </div>
                        <a
                          href="https://x.vite.net/trade?symbol=IDNA-000_BTC-000"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {' '}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps = async ({locale}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['index', 'common'])),
  },
})

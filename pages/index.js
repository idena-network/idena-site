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
              {t('Human-centric Blockchain', {ns: 'index'})}
            </h1>
            <div className="subtitle">
              {t('Join the democratic borderless world', {
                ns: 'index',
              })}
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
                        <Link href="https://app.idena.io">
                          <a style={{marginLeft: 15}} className="btn btn-link">
                            <i className="icon icon--web"></i>
                            <span>{t('Idena Web App', {ns: 'index'})}</span>
                          </a>
                        </Link>
                      </div>
                    </div>

                    <div className="col-auto">
                      <div className="row justify-content-center">
                        <Link href="/download">
                          <a className="btn btn-link">
                            <i className="icon icon--download"></i>
                            <span>{t('Idena Desktop App', {ns: 'index'})}</span>
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
              <h1>{t('What is Idena', {ns: 'index'})}</h1>
              <p>
                <Trans
                  i18nKey="Idena is the first Proof-of-Person blockchain"
                  t={t}
                  ns="index"
                >
                  Idena is the first Proof-of-Person blockchain based on
                  democratic principles. Every mining node is linked to a
                  cryptoidentity – one single person with equal voting power and
                  mining income.
                </Trans>
              </p>

              <p>
                <Trans
                  i18nKey="Every unique human can become an Idena validator"
                  t={t}
                  ns="index"
                >
                  Every unique human can become an Idena validator no matter who
                  they are and where they live. To start mining Idena, you need
                  to prove you are a unique human. It does not require the
                  disclosure of any personal data (no KYC). You need to appear
                  online when the validation ceremony starts and solve a series
                  of flip-tests (CAPTCHAs).
                </Trans>
              </p>

              <div className="lead_links">
                <div className="row justify-content-center">
                  <div className="col-auto">
                    <div className="row justify-content-center">
                      <Link href="/join-idena?v1">
                        <a className="btn btn-cta">
                          <img
                            src="/static/images/idena_black.svg"
                            alt="tweet"
                            width="38px"
                          />
                          {t('Join Idena Network', {ns: 'index'})}
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

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
                          href="https://pancakeswap.info/token/0x0de08c1abe5fb86dd7fd2ac90400ace305138d5b"
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

      <section
        className="section section_content menu_section_content menu_main"
        id="Why Idena"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-9">
              <div className="section_header">
                <h2 className="h1">{t('Why Idena', {ns: 'index'})}</h2>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-4">
                  <div className="item-image">
                    <img
                      src="/static/images/main-idena.svg"
                      alt="Evolution of the Internet"
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-8">
                  <h4>
                    {t('Evolution of the Internet', {
                      ns: 'index',
                      nsSeparator: '#',
                    })}
                  </h4>
                  <p>
                    <Trans i18nKey="why-idena-cryptoidentity" t={t} ns="index">
                      Idena is the next step in the evolution of decentralized
                      systems on the Internet. First, Bitcoin brought
                      peer-to-peer cryptocurrency payments. Then Ethereum
                      developed a virtual machine for running decentralized
                      apps. Idena has introduced cryptoidentity enabling people
                      to build democratic governance on the Internet.
                    </Trans>
                  </p>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-4">
                  <div className="item-image">
                    <img
                      src="/static/images/main-cryptoidentity.svg"
                      alt="Cryptoidentity"
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-8">
                  <h4>{t('Cryptoidentity', {ns: 'index'})}</h4>
                  <p>
                    <Trans
                      i18nKey="why-idena-sybil-resistance"
                      t={t}
                      ns="index"
                    >
                      Cryptoidentity is your digitally verified avatar. It's
                      semi-unique which means you can easily validate one
                      account, but it's much harder to get two and impossible to
                      get many accounts. It can not be bought and sold, its
                      value grows with age, it can not be taken over. Anonymous
                      and Sybil-resistant identity is a missing part for Web
                      3.0.
                    </Trans>
                  </p>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-4">
                  <div className="item-image">
                    <img
                      src="/static/images/main-authority.svg"
                      alt="No authorities"
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-8">
                  <h4>{t('No authorities', {ns: 'index'})}</h4>
                  <p>
                    <Trans i18nKey="why-idena-no-authorities" t={t} ns="index">
                      Cryptoidentity is mutually verified by users with no
                      central authority in the peer-to-peer network. It is
                      anonymous, self-managed, and valid globally.
                      Cryptoidentity has no central issuer, so it can not be
                      banned, restricted or censored.
                    </Trans>
                  </p>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-4">
                  <div className="item-image">
                    <img
                      src="/static/images/main-rights.svg"
                      alt="Equal human rights"
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-8">
                  <h4>{t('Equal human rights', {ns: 'index'})}</h4>
                  <p>
                    <Trans i18nKey="why-idena-no-authorities" t={t} ns="index">
                      All cryptoidentities in Idena have equal rights: to
                      validate other identities, to vote, to verify
                      transactions. Self-sovereign, decentralized and anonymous
                      cryptoidentity prevents human rights abuse by the
                      powerful, and supports the rights of the individual to be
                      oneself and to freely associate.
                    </Trans>
                  </p>
                </div>
              </div>

              <div className="section_header">
                <h2 className="h1">{t('Use cases', {ns: 'index'})}</h2>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-4">
                  <div className="item-image">
                    <img
                      src="/static/images/main-voting.svg"
                      alt="Democratic governance"
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-8">
                  <h4>{t('Democratic governance', {ns: 'index'})}</h4>
                  <p>
                    <Trans
                      i18nKey="use-cases-democratic-governance"
                      t={t}
                      ns="index"
                    >
                      One person - one vote is a fundamental principle for
                      democracy. Cryptoidentity brings this concept to the
                      blockchain. Advanced voting mechanisms like quadratic
                      voting could improve distributed governance for everyone.
                    </Trans>
                  </p>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-4">
                  <div className="item-image">
                    <img
                      src="/static/images/main-freedom.svg"
                      alt="Freedom of speech"
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-8">
                  <h4>{t('Freedom of speech', {ns: 'index'})}</h4>
                  <p>
                    <Trans
                      i18nKey="use-cases-freedom-of-speech"
                      t={t}
                      ns="index"
                    >
                      Every voice has a right to be heard. Idena allows
                      spreading information seamlessly, and makes content
                      censorship-resistant.
                    </Trans>
                  </p>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-4">
                  <div className="item-image">
                    <img
                      src="/static/images/main-coins.svg"
                      alt="Universal basic income"
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-8">
                  <h4>{t('Universal basic income', {ns: 'index'})}</h4>
                  <p>
                    <Trans
                      i18nKey="use-cases-freedom-of-speech"
                      t={t}
                      ns="index"
                    >
                      Mining Idena coins is accessible for everyone who owns an
                      average laptop with an Internet connection. All Idena
                      participants are empowered to maintain the network and
                      earn equal mining rewards. These rewards can be considered
                      as a form of universal basic income.
                    </Trans>
                  </p>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-4">
                  <div className="item-image">
                    <img
                      src="/static/images/main-ads.svg"
                      alt="Attention economy"
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-8">
                  <h4>{t('Attention economy', {ns: 'index'})}</h4>
                  <p>
                    <Trans
                      i18nKey="use-cases-attention-economy"
                      t={t}
                      ns="index"
                    >
                      Onchain advertising allows to create an ecosystem with
                      attention economy where advertisers pay iDNA to Idena
                      Oracles to review their ads and then burn the coins to
                      compete for the network attention, supporting sustainable
                      economy of the Idena network.
                    </Trans>
                  </p>
                </div>
              </div>

              <div className="section_header">
                <h2 className="h1">{t('Technology', {ns: 'index'})}</h2>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-4">
                  <div className="item-image">
                    <img
                      src="/static/images/main-rocket.svg"
                      alt="Sharding Cryptoidentity Scalability"
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-8">
                  <h4>
                    {t('Sharding + Cryptoidentity = Scalability', {
                      ns: 'index',
                    })}
                  </h4>
                  <p>
                    <Trans
                      i18nKey="technology-scalability-decentralization-security"
                      t={t}
                      ns="index"
                    >
                      Scalable blockchain performing thousands of transactions
                      per second can be built without compromising its safety
                      and decentralization. Sharding combined with
                      cryptoidentity is the solution to the blockchain trilemma:
                      network throughput increases with the number of validated
                      users forming more and more new shards.
                    </Trans>
                  </p>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-4">
                  <div className="item-image">
                    <img
                      src="/static/images/main-contracts.svg"
                      alt="Smart contracts"
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-8">
                  <h4>{t('Smart contracts for everyone', {ns: 'index'})}</h4>
                  <p>
                    <Trans
                      i18nKey="technology-smart-contracts"
                      t={t}
                      ns="index"
                    >
                      Blockchain transactions can be expensive. But Idena allows
                      anyone to mine cryptocurrency and to spend it when using
                      smart contracts.
                    </Trans>
                  </p>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-4">
                  <div className="item-image">
                    <img
                      src="/static/images/main-time.svg"
                      alt="Instant finality"
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-8">
                  <h4>{t('Instant finality', {ns: 'index'})}</h4>
                  <p>
                    <Trans
                      i18nKey="technology-instant-finality"
                      t={t}
                      ns="index"
                    >
                      Idena implements a Proof-of-Person Sybil control mechanism
                      and committee-based BFT consensus with fast finality.
                      Every block mined by Idena validators is final with almost
                      100% probability, which means that blockchain forks are
                      almost not possible. You need to wait just 2 blocks to
                      make sure your transaction will be never reverted.
                    </Trans>
                  </p>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-4">
                  <div className="item-image">
                    <img
                      src="/static/images/main-eco.svg"
                      alt="Eco friendly mining"
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-8">
                  <h4>{t('Eco friendly mining', {ns: 'index'})}</h4>
                  <p>
                    <Trans
                      i18nKey="why-idena-eco-friendly-mining"
                      t={t}
                      ns="index"
                    >
                      Idena blockchain is driven by eco-friendly Proof-of-Person
                      consensus. To verify transactions, Idena miner needs to
                      have a valid cryptoidentity and keep their node online.
                      Mining income does not depend on your hardware. It doesn’t
                      require to use up high volumes of electricity, GPUs or
                      mining rigs.
                    </Trans>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <br />
          <div className="lead_links">
            <div className="row justify-content-center">
              <div className="col-auto">
                <div className="row justify-content-center">
                  <Link href="/join-idena?v2">
                    <a className="btn btn-cta">
                      <img
                        src="/static/images/idena_black.svg"
                        alt="tweet"
                        width="38px"
                      />
                      {t('Join Idena Network', {ns: 'index'})}
                    </a>
                  </Link>
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

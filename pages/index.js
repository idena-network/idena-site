/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import Link from 'next/link'
import {useEffect, useState} from 'react'
import {Trans, useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import YouTube from 'react-youtube'
import Layout from '../shared/components/layout'
import {
  useNextValidationTime,
  useTotalValidatedCount,
  useNodesCount,
  getGoogleCalendarLink,
  getCoingeckoData,
  getMaxStake,
} from '../shared/api'
import {
  precise2,
  usdFmt,
  addLeadingZeros,
  LinkText,
} from '../shared/utils/utils'
import {TooltipLogo} from '../shared/components/tooltip'
import {Staking, useStaking} from '../shared/components/staking'

export default function Home() {
  const [maxStake, setMaxStake] = useState(2000000)

  const [marketData, setMarketData] = useState({
    price: 0,
    priceChange: 0,
    marketCap: 0,
  })
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMobileVideoPlaying, setIsMobileVideoPlaying] = useState(false)

  const opts = {
    borderRadius: '12px',
    height: '474',
    width: '840',
    playerVars: {
      rel: 0,
      autoplay: true,
    },
  }

  const optsMobile = {
    playerVars: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      rel: 0,
      autoplay: true,
    },
  }

  const {t} = useTranslation('index')

  useEffect(() => {
    async function getData() {
      const [{idena}] = await Promise.all([getCoingeckoData()])
      setMarketData({
        price: idena && idena.usd,
        priceChange: idena && idena.usd_24h_change,
        marketCap: idena && idena.usd_market_cap,
      })
      const result = await Promise.all([getMaxStake()])

      setMaxStake(result && result[0] && result[0][0] && result[0][0].stake)
    }

    getData()
  }, [])

  const {localeTime: validationTime, jsonDateString} = useNextValidationTime()
  const validatedCount = useTotalValidatedCount()
  const {validatorsCount, totalNodeCount} = useNodesCount()

  const validationCalendarLink = getGoogleCalendarLink(jsonDateString)

  const {epochTime, calcTotalRewards} = useStaking()

  const richestStakeUSD = 10000 // maxStake * marketData.price
  const richestReward = calcTotalRewards(maxStake)
  const richestAPY = Math.round(
    (((richestReward * 100) / maxStake) * 366) / epochTime.epochDuration
  )

  const userStakeUSD = richestStakeUSD / 100

  const userStake = marketData.price ? userStakeUSD / marketData.price : 20000
  const userReward = calcTotalRewards(userStake)
  const userAPY = Math.round(
    (((userReward * 100) / userStake) * 366) / epochTime.epochDuration
  )

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
      <section className="section section_content" id="lead">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-md-11 col-lg-11">
              <div className="face" />

              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-12">
                  <h1 className="h1 title">
                    {t('Proof of Person Blockchain', {
                      ns: 'index',
                    })}
                  </h1>
                  <h2 className="h2">
                    {t('Coordination of individuals', {
                      ns: 'index',
                    })}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="container"
          style={{
            marginTop: '40px',
            marginBottom: '40px',
          }}
        >
          <div className="row justify-content-center">
            <Link href="https://app.idena.io">
              <a className="btn btn-secondary">
                {t('Become a validator', {ns: 'index'})}
              </a>
            </Link>
          </div>
        </div>
      </section>

      <section
        className="section section_content"
        id="Has decentralization failed"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-11 col-lg-11 section_black section_panel">
              <div className="justify-content-center">
                <div className="scales">
                  <div className="scales__balance">
                    <div className="item99 item">99%</div>
                    <div className="item1 item">1%</div>
                    <div className="line"></div>
                  </div>
                  <div className="scales__base"></div>
                </div>
              </div>

              <div className="container1">
                <div className="row justify-content-center">
                  <div className="col-md-12 col-lg-12">
                    <h2 className="h1 h1-light pg_main">
                      {t('Has decentralization failed?', {
                        ns: 'index',
                      })}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="container1">
                <div className="row justify-content-center text-center">
                  <div className="col-md-5 col-lg-5">
                    <p>
                      <Trans i18nKey="StopPlutocracy0" t={t} ns="index">
                        VC, whales and staking pools dominate blockchain
                        governance and monopolize mining taking away block
                        rewards from individuals and making independent mining
                        meaningless.
                      </Trans>
                    </p>
                    <br />
                    <p>
                      <Trans i18nKey="StopPlutocracy1" t={t} ns="index">
                        Most blockchains have failed to maintain
                        decentralization and turned into plutocracy.
                        <br />
                      </Trans>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section_content" id="Encourage individuals">
        <div className="container section_panel">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-10">
              <h2 className="h1 pg_main">
                {t('Start plutocracy resistance', {
                  ns: 'index',
                })}
              </h2>

              <div className="index-price-info" style={{margin: '100px 0'}}>
                <div className="row justify-content-center">
                  <div className="col-md-4 col-lg-4">
                    <div className="item">
                      <div className="content">
                        <div className="value ripple-blue">
                          <span>{userAPY ? `${userAPY}%` : ' '}</span>
                        </div>
                        <div className="description">
                          <span>
                            {userStakeUSD
                              ? `Return on ${usdFmt(
                                  userStakeUSD,
                                  '$',
                                  0,
                                  0
                                )} stake`
                              : ' '}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-2 col-lg-2"></div>

                  <div className="col-md-4 col-lg-4 ripple-red-col">
                    <div className="_value row justify-content-center">
                      <div className="item">
                        <div className="content">
                          <div className="value ripple-red">
                            <span>{richestAPY ? `${richestAPY}%` : ' '}</span>
                          </div>
                          <div className="description">
                            <span>
                              {richestStakeUSD
                                ? `Return on ${usdFmt(
                                    richestStakeUSD,
                                    '$',
                                    0,
                                    0
                                  )} stake`
                                : ' '}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container1" style={{marginTop: '100px'}}>
                <div className="row justify-content-center">
                  <h2 className="h2">
                    {t('Encouraging individuals', {
                      ns: 'index',
                    })}
                  </h2>
                </div>
              </div>

              <div className="container1">
                <div className="row justify-content-center text-center">
                  <div className="col-md-8 col-lg-7">
                    <p>
                      <Trans i18nKey="StopPlutocracy2" t={t} ns="index">
                        To increase network diversity Idena provides higher
                        returns for smaller stakes. Individual APY is always
                        higher than the APY of staking pools or richer accounts.
                      </Trans>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section_content" id="Personhood">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-11 col-lg-11 section_dark section_panel section_magic">
              <div className="container1">
                <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-8">
                    <h2 className="h1 pg_main">
                      <span className="h1 h1-light">Why proof of</span>{' '}
                      <span className="h1 magic">personhood</span>
                    </h2>
                  </div>
                </div>
              </div>

              <div className="container1">
                <div className="row justify-content-center">
                  <div className="col-md-5 col-lg-5">
                    <p>
                      <Trans i18nKey="WhyPersnonhood1" t={t} ns="index">
                        Unlike PoS and PoW blockchains, to become a validator
                        Idena requires you to prove that you are a unique
                        person. Why?
                      </Trans>
                    </p>
                  </div>
                </div>
              </div>

              <div className="container1" style={{margin: '25px 0 60px'}}>
                <div className="row justify-content-center">
                  <Link href="https://app.idena.io">
                    <a className="btn btn-light">
                      {t('Create an account', {ns: 'index'})}
                    </a>
                  </Link>
                </div>
              </div>

              <div className="container1">
                <div className="row justify-content-center">
                  <div className="col-md-5 col-lg-5">
                    <p>
                      <Trans i18nKey="WhyPersnonhood2" t={t} ns="index">
                        Proof of Personhood allows you to maximize rewards as an
                        individual miner and prevents the concentration of
                        capital in staking pools.
                      </Trans>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section section_panel section_content"
        id="Sublinear Staking"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-7">
              <h2 className="h1 pg_main">
                {t('Maximize individual rewards', {
                  ns: 'index',
                })}
              </h2>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5 col-lg-5">
              <p>
                <Trans i18nKey="IdentityStaking1" t={t} ns="index">
                  Increase your rewards by optimizing the amount of your stake.
                  Identity staking allows you to earn higher returns as an
                  independent miner compared to being part of a staking pool.
                  This prevents capital concentration and promotes individual
                  mining.
                </Trans>
              </p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5 col-lg-5">
              <Staking price={marketData.price} />
            </div>
          </div>
        </div>
      </section>

      <section
        className="section section_content menu_section_content menu_main"
        id="Validate your identity"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-11 col-lg-11 section_gray section_panel">
              <h2 className="h1 pg_main">
                {t('Prove your personhood', {ns: 'index'})}
              </h2>
              <div className="row justify-content-center text-center">
                <div className="col-md-12 col-lg-12">
                  <p>
                    <Trans i18nKey="ProveYourPersonhood1" t={t} ns="index">
                      No personal data is needed, simply prove your uniqueness
                    </Trans>
                  </p>
                </div>
              </div>

              <div className="container1" style={{margin: '100px 0 0'}}>
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-10">
                    <div className="row">
                      <div className="col-sm-4 ">
                        <img
                          className="h2-image-above _ellipse"
                          style={{
                            marginLeft: '-22px',
                          }}
                          src="/static/images/ellipse1.svg"
                          alt=""
                        />
                        <h2 className="h2 ">
                          {t('Be online', {
                            ns: 'index',
                          })}
                        </h2>

                        <p>
                          <Trans
                            i18nKey="validate-your-identity-step1"
                            t={t}
                            ns="index"
                          >
                            Open your Idena app on validation date before 13:30
                            UTC
                          </Trans>
                        </p>
                      </div>
                      <div className="col-sm-4">
                        <img
                          className="h2-image-above _ellipse"
                          style={{
                            marginLeft: '-8px',
                          }}
                          src="/static/images/ellipse2.svg"
                          alt=""
                        />
                        <h2 className="h2 ">
                          {t('Get validated', {
                            ns: 'index',
                          })}
                        </h2>

                        <p>
                          <Trans
                            i18nKey="validate-your-identity-step2"
                            t={t}
                            ns="index"
                          >
                            Solve a series of common sense tests (FLIP-puzzles)
                          </Trans>
                        </p>
                      </div>

                      <div className="col-sm-4">
                        <img
                          className="h2-image-above _ellipse"
                          style={{
                            marginLeft: '4px',
                          }}
                          src="/static/images/ellipse3.svg"
                          alt=""
                        />
                        <h2 className="h2 ">
                          {t('Make flips', {
                            ns: 'index',
                          })}
                        </h2>

                        <p>
                          <Trans
                            i18nKey="validate-your-identity-step2"
                            t={t}
                            ns="index"
                          >
                            Create a few bot-resistant FLIPs for the next
                            validation
                          </Trans>
                        </p>
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
        id="Countdown"
      >
        <div className="">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-11 col-lg-11 section_panel hand">
                <div className="row justify-content-center text-center">
                  <div id="TimerPanel">
                    <h2 className="h2">
                      {t('Follow countdown', {
                        ns: 'index',
                      })}
                    </h2>

                    <div
                      id="counter"
                      className="_value row justify-content-center"
                      style={{color: '#96999E'}}
                    >
                      <div className="col-auto">
                        <span className="days h1-font">-</span>
                        <span className="h2-font">d</span>
                      </div>
                      <div className="col-auto">
                        <span className="hours h1-font">-</span>
                        <span className="h2-font">h</span>
                      </div>
                      <div className="col-auto">
                        <span className="minutes h1-font">-</span>
                        <span className="h2-font">m</span>
                      </div>
                      <div className="col-auto">
                        <span className="seconds h1-font">-</span>
                        <span className="h2-font">s</span>
                      </div>
                    </div>

                    <p className="time _hint">
                      <Trans i18nKey="NextValidationStartsAt" t={t} ns="index">
                        The next validation ceremony starts at
                      </Trans>

                      <br />
                      <span className="">
                        {t('', {
                          ns: 'index',
                          nsSeparator: '!',
                        })}{' '}
                        <span className="NextValidationDateTime">
                          {validationTime !== null &&
                          validationTime !== 'RUNNING NOW'
                            ? `${validationTime} your local time`
                            : t('RUNNING NOW', {ns: 'index'})}
                          {''}
                        </span>
                      </span>
                    </p>
                  </div>
                </div>

                <div className="container1" style={{margin: '150px 0'}}>
                  <div className="row justify-content-center">
                    <Link href="https://app.idena.io">
                      <a className="btn btn-secondary">
                        {t('Open Idena app', {ns: 'index'})}
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="container1" style={{margin: '200px 0'}}>
                  <div className="row justify-content-center text-center">
                    <div className="col-md-11 col-lg-11 section_gray1 section_panel1">
                      <h2 className="h2">
                        {t('Join network of', {
                          ns: 'index',
                        })}
                      </h2>

                      <h2 className="h1 networksize pg_main">
                        {validatedCount
                          ? addLeadingZeros(validatedCount, 9)
                          : ''}
                      </h2>
                      <div className="row justify-content-center">
                        <p>
                          {t('Unique accounts', {
                            ns: 'index',
                          })}
                        </p>
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
        id="Run Idena node"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-11 col-lg-11">
              <h2 className="h1 pg_main">
                {t('Run Idena node', {ns: 'index'})}
              </h2>
              <div className="row justify-content-center text-center">
                <div className="col-md-12 col-lg-12">
                  <p>
                    {t('Earn rewards by running your very first mining node', {
                      ns: 'index',
                    })}
                  </p>
                </div>
              </div>

              <div className="container1 text-center">
                <div className="row justify-content-center">
                  <div className="col-md-5 section_panel__cell _node _left section_gray">
                    <div className="item">
                      <div className="content">
                        <div className="h2 blue-value">
                          <span>{totalNodeCount || ' '}</span>
                        </div>
                        <div className="description">
                          <span>
                            {t('Total nodes online', {
                              ns: 'index',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5  section_panel__cell _node _right section_gray">
                    <div className="_value row justify-content-center">
                      <div className="item">
                        <div className="content">
                          <div className="h2 orange-value">
                            <span>{validatorsCount || ' '}</span>
                          </div>
                          <div className="description">
                            <span>
                              {t('Mining nodes online', {
                                ns: 'index',
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container1" style={{margin: '80px 0 0'}}>
                <div className="row justify-content-center">
                  <div className="col-md-9 col-lg-9">
                    <div className="row">
                      <div className="col-sm-4">
                        <img
                          className="h2-image-above"
                          src="/static/images/node3.svg"
                          alt=""
                        />
                        <h2 className="h2 ">
                          {t('It’s easy', {
                            ns: 'index',
                          })}
                        </h2>

                        <p>
                          <Trans i18nKey="run-your-node-1" t={t} ns="index">
                            You don’t need to be a tech expert to install the
                            mining node on your PC
                          </Trans>
                        </p>
                      </div>

                      <div className="col-sm-4">
                        <img
                          className="h2-image-above"
                          src="/static/images/node1.svg"
                          alt=""
                        />
                        <h2 className="h2 ">
                          {t('Low costs', {
                            ns: 'index',
                          })}
                        </h2>
                        <p>
                          <Trans i18nKey="run-your-node-2" t={t} ns="index">
                            Run the node on your home computer, laptop or
                            Raspberry Pi
                          </Trans>
                        </p>
                      </div>
                      <div className="col-sm-4">
                        <img
                          className="h2-image-above"
                          src="/static/images/node2.svg"
                          alt=""
                        />
                        <h2 className="h2 ">
                          {t('Eco-friendly ', {
                            ns: 'index',
                          })}
                        </h2>

                        <p>
                          <Trans i18nKey="run-your-node-3" t={t} ns="index">
                            No GPU or mining rigs needed, no high electricity
                            usage
                          </Trans>
                        </p>
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
        className="section section_content menu_section_content section_panel menu_main"
        id="Markets"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-11 col-lg-11 section_gray section_panel">
              <h2 className="h1 pg_main">
                {t('Earn buy/sell IDNA', {ns: 'index'})}
              </h2>

              <div className="row justify-content-center">
                <div className="col-md-4 col-lg-4">
                  <div className="linkbar">
                    <div className="linkbar-div">
                      <div className="row justify-content-center container1">
                        <div className="col-sm-6 item">
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
                        <div className="col-sm-6 item">
                          <div className="content">
                            <img
                              src="/static/images/logo-bitmart.svg"
                              alt="Bitmart"
                            />
                            <div className="linkbar-value">
                              <span>Bitmart</span>
                            </div>
                            <a
                              href="https://www.bitmart.com/trade/en?layout=basic&symbol=IDNA_USDT"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {' '}
                            </a>
                          </div>
                        </div>
                        <div className="col-sm-6 item">
                          <div className="content">
                            <img
                              src="/static/images/logo-probit.svg"
                              alt="Probit"
                            />
                            <div className="linkbar-value">
                              <span>Probit</span>
                            </div>
                            <a
                              href="https://www.probit.com/app/exchange/IDNA-BTC"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {' '}
                            </a>
                          </div>
                        </div>
                        <div className="col-sm-6 item">
                          <div className="content">
                            <img
                              src="/static/images/logo-coinmarketcap.svg"
                              alt="Coinmarketcap"
                              width="40"
                            />
                            <div className="linkbar-value">
                              <span>Coinmarketcap</span>
                            </div>
                            <a
                              href="https://coinmarketcap.com/currencies/idena/"
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

              <div className="index-price-info">
                <div className="row justify-content-center">
                  <div className="col-sm-4">
                    <div className="item">
                      <div className="content">
                        <div className="h2">
                          <span style={{paddingRight: '4px'}}>
                            {marketData.price
                              ? usdFmt(marketData.price, '$', 4, 4)
                              : ' '}
                          </span>
                          {marketData.priceChange ? (
                            <span className="change">
                              {' '}
                              <span
                                style={{
                                  color: `${
                                    marketData.priceChange > 0
                                      ? '#BCC1C7' // green '#27d980'
                                      : '#BCC1C7' // red   '#ff6666'
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
                                  Math.round(marketData.priceChange * 100) / 100
                                )}%`}
                              </span>
                            </span>
                          ) : (
                            ' '
                          )}
                        </div>
                        <div className="description">
                          <span>Price</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="_value row justify-content-center">
                      <div className="item">
                        <div className="content">
                          <div className="h2">
                            <span>
                              {marketData.marketCap
                                ? usdFmt(Math.round(marketData.marketCap))
                                : ' '}
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
            </div>
          </div>
        </div>
      </section>

      <section className="section section_content" id="Watch">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-11 col-lg-11">
              <div className="container1">
                <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-8">
                    <h2 className="h1 pg_main">
                      <span className="h1">Watch about Idena</span>
                    </h2>
                  </div>
                </div>
              </div>

              <div className="container1" style={{margin: '50px 0'}}>
                <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-8">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="video-preview">
                          <a
                            target="_blank"
                            href="https://www.youtube.com/watch?v=yLt4Xal16IU"
                            rel="noreferrer"
                          >
                            <div className="video-preview-img">
                              <img
                                src="/static/images/whatisidena.png"
                                alt=""
                              />
                            </div>
                          </a>
                          <p className="quote">
                            <Trans i18nKey="watch-1-1" t={t} ns="index">
                              Consensus mechanics based on money lead to
                              plutocracy and extreme concentration of power
                            </Trans>
                          </p>

                          <h2 className="h2">What is Idena</h2>

                          <p>
                            <Trans i18nKey="watch-1-2" t={t} ns="index">
                              Explanatory video about Idena
                            </Trans>
                          </p>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="video-preview">
                          <a
                            target="_blank"
                            href="https://www.youtube.com/watch?v=OYH7EQjas-c"
                            rel="noreferrer"
                          >
                            <div className="video-preview-img">
                              <img src="/static/images/kevin.jpg" alt="" />
                            </div>
                          </a>
                          <p className="quote">
                            <Trans i18nKey="watch-2-1" t={t} ns="index">
                              Idena is one of the many players out there making
                              an earnest try at creating more Sybil-resistance“
                            </Trans>
                          </p>

                          <h2 className="h2">Kevin Owocki</h2>

                          <p>
                            <Trans i18nKey="watch-2-2" t={t} ns="index">
                              The Green Pill Podcast with Andrew Edi, co-founder
                              of Idena
                            </Trans>
                          </p>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="video-preview">
                          <a
                            target="_blank"
                            href="https://youtu.be/jAurj02pe4w"
                            rel="noreferrer"
                          >
                            <div className="video-preview-img" href="#">
                              <img src="/static/images/tristan.jpg" alt="" />
                            </div>
                          </a>
                          <p className="quote">
                            <Trans i18nKey="watch-3-1" t={t} ns="index">
                              What are the decentralized ways of
                              Proof-of-Personhood? There’s a project called
                              Idena
                            </Trans>
                          </p>
                          <h2 className="h2">Tristan Harris</h2>
                          <p>
                            <Trans i18nKey="watch-3-2" t={t} ns="index">
                              Tristan Harris mentions Idena on The Joe Rogan
                              Experience podcast
                            </Trans>
                          </p>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="video-preview">
                          <a
                            target="_blank"
                            href="https://youtu.be/vB1SUQByRjI"
                            rel="noreferrer"
                          >
                            <div className="video-preview-img">
                              <img
                                src="/static/images/blochainsocialist.png"
                                alt=""
                              />
                            </div>
                          </a>
                          <p className="quote">
                            <Trans i18nKey="watch-4-1" t={t} ns="index">
                              Idena is a blockchain that has found a good
                              balance between privacy and Sybil-resistance
                            </Trans>
                          </p>

                          <h2 className="h2">Blockchain Socialist</h2>

                          <p>
                            <Trans i18nKey="watch-4-2" t={t} ns="index">
                              The Blockchain Socialist podcast with Idena
                              community members
                            </Trans>
                          </p>
                        </div>
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
        className="section section_content"
        style={{marginTop: '0px'}}
        id="Technology"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-11 col-lg-11">
              <div className="container1">
                <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-8">
                    <h2 className="h1 pg_main">
                      <span className="h1">
                        {t('Technology', {ns: 'index'})}
                      </span>
                    </h2>
                  </div>
                </div>
              </div>

              <div className="container1">
                <div className="row justify-content-center">
                  <div className="col-md-12 col-lg-12">
                    <div className="row">
                      <div className="col-sm-6 section_panel__cell section_gray">
                        <div className="cell_content">
                          <img
                            className="technology-img"
                            src="/static/images/icon-shield.svg"
                            alt=""
                          />

                          <h2 className="h2">
                            {t('Security and decentralization', {ns: 'index'})}
                          </h2>

                          <p>
                            <Trans i18nKey="tech-1" t={t} ns="index">
                              Idena, the first Proof-of-Person blockchain, is
                              live since 2019. Idena validators are coordinated
                              on the basis of a 1-person-1-vote consensus.
                              Security is ensured by the variety of validators
                              and a minimum threshold for stake to be eligible
                              to vote.
                            </Trans>
                          </p>
                        </div>
                      </div>

                      <div className="col-sm-6 section_panel__cell section_gray">
                        <div className="cell_content">
                          <img
                            className="technology-img"
                            src="/static/images/icon-arr.svg"
                            alt=""
                          />
                          <h2 className="h2">
                            {t('Scalability and decentralization', {
                              ns: 'index',
                            })}
                          </h2>

                          <p>
                            <Trans i18nKey="tech-2" t={t} ns="index">
                              The throughput of the 1-person-1-vote blockchain
                              can be enhanced by increasing the number of
                              independent validators. A sharded network of
                              validators enables parallel processing of more
                              transactions. In contrast, money-based blockchains
                              achieve scalability through greater
                              centralization.
                            </Trans>
                          </p>
                        </div>
                      </div>

                      <div className="col-sm-6 section_panel__cell section_gray">
                        <div className="cell_content">
                          <img
                            className="technology-img"
                            src="/static/images/icon-coins.svg"
                            alt=""
                          />
                          <h2 className="h2">
                            {t('Identity contracts', {
                              ns: 'index',
                            })}
                          </h2>

                          <p>
                            <Trans i18nKey="tech-3" t={t} ns="index">
                              Identity primitive is natively integrated into
                              Idena smart contracts. Idena enables identity
                              staking for any IRC20 token. You can use it for
                              airdrops or building plutocracy-resistant DAOs
                              based on token-backed identities. Build DApps
                              using Idena Oracles as a decentralized gateway to
                              access real world data.
                            </Trans>
                          </p>
                        </div>
                      </div>

                      <div className="col-sm-6 section_panel__cell section_gray">
                        <div className="cell_content">
                          <img
                            className="technology-img"
                            src="/static/images/icon-robot.svg"
                            alt=""
                          />

                          <h2 className="h2">
                            {t('AI-resistance', {
                              ns: 'index',
                            })}
                          </h2>
                          <p>
                            <Trans i18nKey="tech-4" t={t} ns="index">
                              The difficulty of FLIP-tests increases over time.
                              On one hand, participants are encouraged to create
                              AI-resistant FLIPs. On the other hand, these FLIPs
                              are used to train a friendly AI. The friendly AI
                              is to help participants to filter out trivial
                              flips, making it more challenging for hostile AIs
                              to attack the system.
                            </Trans>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section_content" id="Pillars">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-md-11 col-lg-11 section_panel__cell section_black"
              style={{
                backgroundImage: 'url(/static/images/pillars.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundPositionX: '50%',
                backgroundPositionY: '100%',
              }}
            >
              <div className="container1" style={{margin: '50px 0 0'}}>
                <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-8">
                    <h2 className="h1 pg_main">
                      <span className="h1 h1-light">
                        {t('Pillars of decentralization', {
                          ns: 'index',
                        })}
                      </span>
                    </h2>
                  </div>
                </div>
              </div>

              <div className="container1" style={{margin: '50px 0'}}>
                <div className="row justify-content-center">
                  <div className="col-md-11 col-lg-11">
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="">
                          <div className="">
                            <div className="">
                              <img
                                className="h2-image"
                                src="/static/images/pillar1.svg"
                                alt=""
                              />

                              <h2 className="h2 h2-light">
                                {t('Plutocracy resistance ', {
                                  ns: 'index',
                                })}
                              </h2>

                              <p>
                                <Trans i18nKey="pillars-3" t={t} ns="index">
                                  1-person-1-vote coupled with higher returns
                                  for smaller stakers mitigate dominance of the
                                  rich and stimulate network diversity
                                </Trans>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="">
                          <div className="">
                            <div className="">
                              <div className="">
                                <img
                                  className="h2-image"
                                  src="/static/images/pillar2.svg"
                                  alt=""
                                />
                                <h2 className="h2 h2-light">
                                  {t('Collusion resistance', {
                                    ns: 'index',
                                  })}
                                </h2>

                                <p>
                                  <Trans i18nKey="pillars-2" t={t} ns="index">
                                    Identity staking serves against the
                                    buying/selling accounts, identity farming,
                                    and coercive validation
                                  </Trans>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-4">
                        <div className="">
                          <div className="">
                            <div className="">
                              <div className="">
                                <img
                                  className="h2-image"
                                  src="/static/images/pillar3.svg"
                                  alt=""
                                />
                                <h2 className="h2 h2-light">
                                  {t('AI resistance ', {
                                    ns: 'index',
                                  })}
                                </h2>

                                <p>
                                  <Trans i18nKey="pillars-3" t={t} ns="index">
                                    Human creativity boosted by accessible AI
                                    tools is to withstand attacks from hostile
                                    AI-bots
                                  </Trans>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container1" style={{margin: '40px 0'}}>
                <div className="row justify-content-center">
                  <Link href="https://app.idena.io">
                    <a className="btn btn-light">
                      {t('Join Idena', {ns: 'index'})}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section section_content menu_section_content menu_main"
        id="partners and media"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-11 col-lg-11 section_content section_gray section_panel__cell section_panel">
              <h1
                className="h1 pg_main"
                style={{
                  marginTop: '50px',
                }}
              >
                {t('Partners and Media', {ns: 'index'})}
              </h1>

              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-8">
                  <div className="index-partners-info">
                    <TooltipLogo
                      tooltip="Gitcoin"
                      href="https://medium.com/idena/gitcoin-integrates-idena-to-add-sybil-resistance-to-gitcoin-grants-6730bb905053"
                      imageLink="logo-gitcoin"
                    />
                    <TooltipLogo
                      tooltip="RadicalxChange"
                      href="https://www.radicalxchange.org/concepts/intersectional-social-identity/"
                      imageLink="logo-radicalxchange"
                      isWidth
                    />
                    <TooltipLogo
                      tooltip="Cosmos"
                      href="https://cosmos.network/ecosystem/apps/"
                      imageLink="logo-cosmos"
                    />
                    <TooltipLogo tooltip="Aragon" imageLink="logo-aragon" />
                    <TooltipLogo tooltip="Amasa" imageLink="logo-amasa" />
                    <TooltipLogo
                      tooltip="Discord"
                      href="https://github.com/iyomisc/idenauth"
                      imageLink="logo-discord"
                    />
                    <TooltipLogo
                      tooltip="Coindesk"
                      href="https://www.coindesk.com/tech/2020/10/27/an-internet-for-humans-proof-of-personhood-explained/"
                      imageLink="logo-coindesk"
                    />
                    <TooltipLogo
                      tooltip="humanetics"
                      href="https://humanetics.super.site/"
                      imageLink="logo-humanetics"
                    />
                    <TooltipLogo
                      tooltip="MyAltcoins"
                      href="https://myaltcoins.info/idena-review/"
                      imageLink="logo-myaltcoins"
                    />
                    <TooltipLogo
                      tooltip="CoinLore"
                      href="https://www.coinlore.com/coin/idena"
                      imageLink="logo-coinlore"
                      isWidth
                    />
                    <TooltipLogo
                      tooltip="Hackernoon"
                      href="https://hackernoon.com/understanding-idena---the-human-centric-blockchain"
                      imageLink="logo-hackernoon"
                    />
                    <TooltipLogo
                      tooltip="Publish0x"
                      href="https://www.publish0x.com/idena-trust-experiment"
                      imageLink="logo-publish0x"
                    />
                    <TooltipLogo
                      tooltip="Frontiers in Blockchain"
                      href="https://www.frontiersin.org/articles/10.3389/fbloc.2020.590171/full"
                      imageLink="logo-frontier"
                    />
                    <TooltipLogo
                      tooltip="Bitcourier"
                      href="https://bitcourier.co.uk/news/Idena-interview"
                      imageLink="logo-bitcourier"
                    />
                    <TooltipLogo
                      tooltip="Newsbit"
                      href="https://newsbit.nl/idena-sharding-hoe-het-proof-of-personhood-consensus-het-schaalbaarheid-probleem-van-blockchain-kan-oplossen/"
                      imageLink="logo-newsbit"
                    />
                    <TooltipLogo
                      tooltip="CoinGecko"
                      href="https://www.coingecko.com/en/coins/idena"
                      imageLink="logo-coingecko"
                    />
                    <TooltipLogo
                      tooltip="CoinMarketCap"
                      href="https://coinmarketcap.com/currencies/idena/"
                      imageLink="logo-coinmarketcap"
                    />
                    <TooltipLogo
                      tooltip="Crypto"
                      href="https://crypto.com/price/idena"
                      imageLink="logo-crypto"
                    />
                    <TooltipLogo
                      tooltip="Nomics"
                      href="https://nomics.com/assets/dna2-idena/reviews"
                      imageLink="logo-nomics"
                    />
                  </div>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-8">
                  <h2
                    className="h2 text-center"
                    style={{
                      color: '#BCC1C7',
                      // fontSite: '40px',
                      // lineHeight: '35px',
                      marginBottom: '50px',
                    }}
                  >
                    Gitcoin Radicalexchange Cosmos Aragon Amasa Discord Coindesk
                    Humanetics Myaltcoins CoinLore Hackernoon Publish0x
                    Frontiers in blockchain Bitcourier Newsbit Сoingecko
                    Сoinmarketcap Сrypto Nomics
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section section_content menu_section_content menu_main"
        id="Join Idena"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-11 col-lg-11">
              <div className="container1">
                <div className="row justify-content-center">
                  <div className="col-md-12 section_panel__cell section_blue_red">
                    <div className="item">
                      <div
                        className="content text-center"
                        style={{margin: '50px 0 0'}}
                      >
                        <h2 className="h1 pg_main">
                          {t('Join Idena', {ns: 'index'})}
                        </h2>
                        <h2 className="h2 pg_main">
                          {t('Proof-of-person blockchain', {ns: 'index'})}
                        </h2>

                        <div
                          className="container1 text-center"
                          style={{margin: '50px 0 0'}}
                        >
                          <p>
                            <Trans i18nKey="join-idena-1" t={t} ns="index">
                              Increase the network diversity by providing higher
                              returns to individual miners
                            </Trans>
                          </p>
                        </div>

                        <div
                          className="container1"
                          style={{
                            margin: '40px 0',
                          }}
                        >
                          <div className="row justify-content-center">
                            <Link href="https://app.idena.io">
                              <a className="btn btn-secondary">
                                {t('Start Idena journey', {ns: 'index'})}
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 section_panel__cell section_gray text-center">
                    <div className="_value row justify-content-center">
                      <div className="item">
                        <div className="content">
                          <div className="h2 h2-blue-dark">
                            <span>
                              {t('Meet the community', {ns: 'index'})}
                            </span>
                          </div>
                          <div className="description">
                            <LinkText href="https://t.me/IdenaNetworkPublic">
                              <a>Telegram</a>
                            </LinkText>{' '}
                            <LinkText href="https://discord.gg/8BusRj7">
                              <a>Discord</a>
                            </LinkText>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 section_panel__cell section_gray text-center">
                    <div className="_value row justify-content-center">
                      <div className="item">
                        <div className="content">
                          <div className="h2 h2-red-dark">
                            <span>{t('Start building', {ns: 'index'})}</span>
                          </div>
                          <div className="description">
                            <LinkText href="https://docs.idena.io">
                              <a>Docs</a>
                            </LinkText>{' '}
                            <LinkText href="https://github.com/idena-network">
                              <a>Github</a>
                            </LinkText>
                          </div>
                        </div>
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

/* eslint-disable no-shadow */
import Link from 'next/link'
import {useEffect, useState} from 'react'
import {Trans, useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {
  getCoingeckoData,
  getEpoch,
  getEpochIdentitiesSummary,
  getEpochRewardBounds,
  getEpochRewardsSummary,
  getLastEpoch,
  getOnlineIdentitiesCount,
  getOnlineMinersCount,
} from '../shared/api'
import {precise1, usdFmt} from '../shared/utils/utils'
import Header from '../shared/components/header'

export default function Contribute() {
  const {t} = useTranslation('index')

  const [marketData, setMarketData] = useState({
    price: 0,
    priceChange: 0,
    marketCap: 0,
  })

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

  const [epoch, setEpoch] = useState(1)
  const [nodesData, setNodesData] = useState({
    onlineCount: 1,
    nodesCount: undefined,
  })
  const [validationTime, setValidationTime] = useState(0)
  const [epochData, setEpochData] = useState({
    prevNodesCount: 0,
    epochDuration: 0,
    totalRewardsPaid: 0,
  })

  useEffect(() => {
    async function getData() {
      const [
        identitiesSummary,
        {validationTime: prevValidationTime},
        rewardsSummary,
      ] = await Promise.all([
        getEpochIdentitiesSummary(epoch - 1),
        getEpoch(epoch),
        getEpochRewardsSummary(epoch),
      ])

      const firstDate = new Date(prevValidationTime)
      const secondDate = new Date(validationTime)
      const epochDuration = Math.round(
        Math.abs((firstDate - secondDate) / 86400000)
      )

      const getCount = (src, state) =>
        (src.find(x => x.value === state) || {count: 0}).count

      const prevNodesCount =
        identitiesSummary && identitiesSummary.length
          ? getCount(identitiesSummary, 'Human') +
            getCount(identitiesSummary, 'Verified') +
            getCount(identitiesSummary, 'Newbie')
          : 0

      setEpochData({
        prevNodesCount,
        epochDuration,
        totalRewardsPaid: rewardsSummary.total,
      })
    }
    if (epoch && validationTime) getData()
  }, [epoch, validationTime])

  const [rewardsData, setRewardsData] = useState({
    maxRewardPaid: 0,
    minRewardPaid: 0,
  })

  useEffect(() => {
    async function getData() {
      const rewardBounds = await getEpochRewardBounds(epoch)
      const minRewardPaid =
        rewardBounds &&
        rewardBounds.reduce(
          (min, item) =>
            min <= item.min.amount * 1 ? min : item.min.amount * 1,
          rewardBounds && rewardBounds[0] ? rewardBounds[0].min.amount : 0
        )
      const maxRewardPaid =
        rewardBounds &&
        rewardBounds.reduce(
          (max, item) =>
            max >= item.max.amount * 1 ? max : item.max.amount * 1,
          0
        )

      setRewardsData({
        maxRewardPaid,
        minRewardPaid,
      })
    }
    if (epoch) getData()
  }, [epoch, epochData])

  useEffect(() => {
    async function getData() {
      const [
        onlineCount,
        nodesCount,
        {epoch, validationTime},
      ] = await Promise.all([
        getOnlineMinersCount(),
        getOnlineIdentitiesCount(),
        getLastEpoch(),
      ])
      setEpoch(epoch * 1 - 1)
      setValidationTime(validationTime)

      setNodesData({
        onlineCount,
        nodesCount,
      })
    }
    getData()
  }, [])

  const reward =
    (marketData &&
      rewardsData &&
      rewardsData.maxRewardPaid * marketData.price +
        (marketData.price * 25920 * 30) / nodesData.onlineCount) ||
    45

  return (
    <>
      <Header
        title="Welcome to Idena"
        description={`Create and validate your cryptoidentity to earn up to ${usdFmt(
          precise1(reward)
        )} every month for supporting the network`}
      />
      <div className="landingpage">
        <div
          className="row align-items-center justify-content-center align-items-center"
          style={{height: '100%'}}
        >
          <div
            className="col-md-12 col-lg-6 text-center"
            style={{height: '100%'}}
          >
            <section className="section section_lead" id="lead">
              <div className="section_lead__header text-center centered">
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
            </section>
          </div>
          <div
            className="col-md-12 col-lg-6 text-center"
            style={{height: '100%'}}
          >
            <div className="section lead_info" style={{height: '100%'}}>
              <div className="centered">
                <div className="item-image">
                  <img
                    src="/static/images/main-cryptoidentity.svg"
                    alt="Cryptoidentity"
                  />
                </div>

                <p className="text-center" style={{color: '#96999E'}}>
                  <Trans i18nKey="whatIsIdenaNotes" t={t} ns="index">
                    Idena is the first Proof-of-Person blockchain based on
                    democratic principles. Every unique human can become an
                    Idena validator no matter who they are and where they live.
                  </Trans>
                </p>
                <p className="text-center" style={{fontWeight: 500}}>
                  <Trans i18nKey="CallToAction" t={t} ns="index">
                    Create and validate your cryptoidentity to earn up to{' '}
                    {usdFmt(precise1(reward))} every month for supporting the
                    network!
                  </Trans>
                </p>

                <div className="container">
                  <div className="row justify-content-center">
                    <Link href="https://app.idena.io">
                      <a className="btn btn-secondary">
                        {t('Create my cryptoidentity', {ns: 'index'})}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async ({locale}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['contribute', 'common'])),
  },
})

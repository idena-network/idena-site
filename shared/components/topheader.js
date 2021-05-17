/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {useEffect, useState} from 'react'
import {useTranslation} from 'next-i18next'
import TooltipText from './tooltip'
import {usdFmt, precise1, precise2} from '../utils/utils'

import {
  getOnlineIdentitiesCount,
  getCoingeckoData,
  getOnlineMinersCount,
  getEpochRewardsSummary,
  getLastEpoch,
  getEpoch,
  getEpochIdentitiesSummary,
  getEpochRewardBounds,
} from '../../public/api'

const COUNT_IDNA_PER_MONTH = 6 * 3 * 60 * 24 * 30

export default function TopHeader() {
  const [marketData, setMarketData] = useState({
    price: 0,
    priceChange: 0,
    marketCap: 0,
  })
  const {t} = useTranslation('common')

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

  return (
    <div>
      <div className="topheader">
        <div className="topheader-div">
          <div className="container">
            <Card
              name={t('iDNA price')}
              value={usdFmt(precise2(marketData.price))}
              change={marketData.priceChange}
              tooltip={t(
                'Idena price | 24h price change https://coingecko.com',
                {nsSeparator: '!'}
              )}
              href="https://www.coingecko.com/en/search_redirect?id=idena&type=coin"
              blank
            />

            <Card
              name={t('Epoch mining')}
              value={usdFmt(
                precise1(
                  (marketData.price * 25920 * epochData.epochDuration) /
                    nodesData.onlineCount
                )
              )}
              tooltip={t(
                'Epoch mining rewards per user ({{epochDuration}} days)',
                {
                  epochDuration: epochData.epochDuration,
                }
              )}
            />
            <Card
              name={t('Validation rewards')}
              value={
                rewardsData.minRewardPaid &&
                rewardsData.maxRewardPaid &&
                marketData.price
                  ? `${usdFmt(
                      precise1(rewardsData.minRewardPaid * marketData.price)
                    )} - ${usdFmt(
                      precise1(rewardsData.maxRewardPaid * marketData.price)
                    )}`
                  : '-'
              }
              tooltip={t('Last validation rewards paid per user')}
              href={`https://scan.idena.io/epoch/${epoch + 1}/rewards`}
              blank
            />
            <Card
              name={t('Rewards paid')}
              value={usdFmt(
                Math.round(epochData.totalRewardsPaid * marketData.price)
              )}
              tooltip={t('Total rewards paid for last validation')}
              href={`https://scan.idena.io/epoch/${epoch + 1}/rewards`}
              blank
            />
            <Card
              name={t('Market cap')}
              value={usdFmt(Math.round(marketData.marketCap))}
              tooltip="https://coingecko.com"
              href="https://www.coingecko.com/en/search_redirect?id=idena&type=coin"
              blank
            />
            <Card
              name={t('Network size')}
              value={nodesData.nodesCount}
              change={
                nodesData.nodesCount && epochData.prevNodesCount
                  ? ((nodesData.nodesCount - epochData.prevNodesCount) /
                      epochData.prevNodesCount) *
                    100
                  : undefined
              }
              tooltip={t('Total nodes | Change since last validation')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function Card({
  name,
  value,
  tooltip = '',
  change = '',
  href = '',
  blank = false,
}) {
  const changeValue = Math.abs(Math.round(change * 10) / 10)
  return (
    <TooltipText tooltip={tooltip}>
      <div className="item">
        <div className="content">
          <span>{name}</span>
          <div className="topheader-value">
            <span>{value}</span>
            {change && (
              <span>
                <span style={{color: '#e8eaed90', padding: '2px'}}> ❘ </span>
                <span style={{color: `${change > 0 ? '#27d980' : '#ff6666'}`}}>
                  <span style={{verticalAlign: 'middle', fontSize: '6px'}}>
                    {`${change > 0 ? '▲' : '▼'}  `}
                  </span>
                  {`${changeValue}%`}
                </span>
              </span>
            )}
          </div>
          {href && (
            <a
              href={href}
              target={blank ? '_blank' : ''}
              rel={blank ? 'noreferrer' : ''}
            >
              {' '}
            </a>
          )}
        </div>
      </div>
    </TooltipText>
  )
}

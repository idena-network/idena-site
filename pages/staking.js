import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {getTrackBackground, Range} from 'react-range'
import {useState, useEffect, useMemo, useCallback} from 'react'
import {
  AreaChart,
  Area,
  Tooltip as ChartTooltip,
  ReferenceDot,
  YAxis,
  XAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {useRouter} from 'next/router'
import Layout from '../shared/components/layout'
import {Tooltipicon} from '../shared/components/tooltip'
import {useTotalValidatedCount} from '../shared/api'
import {calculateEstimatedMiningReward, LinkText} from '../shared/utils/utils'

const Scroll = require('react-scroll')

export default function Staking() {
  const {t} = useTranslation('stake')
  const router = useRouter()
  const [amountValue, setAmountValue] = useState(1000)
  const [amountSlider, setAmountSlider] = useState([245])
  const [weight, setWeight] = useState(1)
  const [averageMinerWeight, setAverageMinerWeight] = useState(1)
  const [rewardFund, setRewardFund] = useState({})
  const [rewardWeight, setRewardWeight] = useState({})
  const [onlineSize, setOnlineSize] = useState(1)
  const [totalShares, setTotalShares] = useState(1)
  const [totalStake, setTotalStake] = useState('0')
  const [epochRewardFund, setEpochRewardFund] = useState([0])
  const [epochTime, setEpochTime] = useState({
    epochDuration: 21,
    epochLeftPercent: 100,
    epochLeft: '-',
    epochLeftUnit: '-',
  })
  const [epochNum, setEpochNum] = useState(0)
  const validatedCount = useTotalValidatedCount()

  const {scroller} = Scroll

  const STEP = 1
  const MIN = 0
  const MAX = 999
  const STAKING_POWER = 0.9
  const BLOCKS_IN_EPOCH = epochTime.epochDuration * 24 * 60 * 3
  const TOTAL_FUND = BLOCKS_IN_EPOCH * 6

  // eslint-disable-next-line react/prop-types
  const CustomTooltip = ({value}) => (
    <div
      style={{
        fontSize: '0.875rem',
        paddingTop: '8px',
        paddingBottom: '8px',
        lineHeight: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '136px',
        borderRadius: '6px',
        border: '1px solid rgba(150, 153, 158, 0.5)',
        backgroundColor: 'white',
      }}
    >
      <p style={{margin: 0, color: 'rgb(83, 86, 92)'}}>{`${value.toLocaleString(
        undefined,
        {
          maximumFractionDigits: 2,
        }
      )} IDNA`}</p>
      <p style={{margin: 0, color: 'rgb(150, 153, 158)'}}>
        {t('Total epoch reward', {ns: 'stake'})}
      </p>
    </div>
  )

  useEffect(() => {
    async function getData() {
      try {
        const coinsResponse = await fetch('https://api.idena.io/api/coins')
        const coinsData = await coinsResponse.json()

        const stakeResponse = await fetch('https://api.idena.io/api/staking')
        const stakingData = await stakeResponse.json()

        const onlineResponse = await fetch(
          'https://api.idena.io/api/onlineminers/count'
        )
        const onlineData = await onlineResponse.json()

        const epochResponse = await fetch('https://api.idena.io/api/epoch/last')
        const jsonEpoch = await epochResponse.json()
        const epochNumber = jsonEpoch.result.epoch - 1
        const prevEpochResponse = await fetch(
          `https://api.idena.io/api/epoch/${jsonEpoch.result.epoch - 1}`
        )
        const jsonPrevEpoch = await prevEpochResponse.json()

        const rewardsResponse = await fetch(
          `https://api.idena.io/api/epoch/${epochNumber}/rewardssummary`
        )
        const rewardsData = await rewardsResponse.json()

        const epochStart = new Date(jsonPrevEpoch.result.validationTime)
        const epochEnd = new Date(jsonEpoch.result.validationTime)
        const nowDate = new Date()
        const epochDuration = Math.round(
          Math.abs((epochEnd.getTime() - epochStart.getTime()) / 86400000)
        )
        const epochDurationMinutes = epochDuration * 24 * 60
        const epochLeftMinutes = Math.round(
          Math.max(
            0,
            ((epochEnd.getTime() - nowDate.getTime()) / 86400000) * 24 * 60
          )
        )
        const epochLeftPercent = Math.min(
          99,
          (epochLeftMinutes / epochDurationMinutes) * 100
        )
        const {epochLeft, epochLeftUnit} =
          // eslint-disable-next-line no-nested-ternary
          epochLeftMinutes < 60
            ? {epochLeft: epochLeftMinutes, epochLeftUnit: 'Minutes'}
            : epochLeftMinutes > 24 * 60
            ? {
                epochLeft: Math.round(epochLeftMinutes / 24 / 60),
                epochLeftUnit: 'Days',
              }
            : {
                epochLeft: Math.round(epochLeftMinutes / 60),
                epochLeftUnit: 'Hours',
              }

        setWeight(stakingData.result.weight)
        setTotalShares(stakingData.result.minersWeight)
        setAverageMinerWeight(stakingData.result.averageMinerWeight)
        setRewardFund({
          extraFlips: rewardsData.result.extraFlips,
          invitations: rewardsData.result.invitations,
        })
        setRewardWeight({
          extraFlips: stakingData.result.extraFlipsWeight,
          invitations: stakingData.result.invitationsWeight,
        })
        setOnlineSize(onlineData.result)
        setEpochRewardFund(
          rewardsData.result.staking && rewardsData.result.staking > 0
            ? rewardsData.result.staking
            : rewardsData.result.validation * STAKING_POWER
        )
        setTotalStake(coinsData.result.totalStake)
        setEpochNum(jsonEpoch.result.epoch)
        setEpochTime({
          epochDuration,
          epochLeftPercent,
          epochLeft,
          epochLeftUnit,
        })
      } catch (e) {
        console.error('cannot fetch API')
      }
    }
    getData()
  }, [])

  const calcStakingReward = useCallback(
    amount =>
      (amount ** STAKING_POWER / (amount ** STAKING_POWER + weight)) *
      epochRewardFund,
    [weight, epochRewardFund]
  )

  const calcExtraFlipReward = useCallback(
    amount =>
      (amount ** STAKING_POWER / rewardWeight.extraFlips) *
      rewardFund.extraFlips,
    [rewardWeight.extraFlips, rewardFund.extraFlips]
  )

  const calcInvitationReward = useCallback(
    amount =>
      (amount ** STAKING_POWER / rewardWeight.invitations) *
      rewardFund.invitations,
    [rewardWeight.invitations, rewardFund.invitations]
  )

  const calcMiningReward = useCallback(
    amount => {
      const myStakeWeight = amount ** STAKING_POWER
      return calculateEstimatedMiningReward(
        myStakeWeight,
        averageMinerWeight,
        onlineSize,
        epochTime.epochDuration
      )
    },
    [averageMinerWeight, epochTime.epochDuration, onlineSize]
  )

  const isNotAmount = !amountValue || parseInt(amountValue) === 0

  const xAxis = useMemo(
    () => new Array(1000).fill(0).map((_, idx) => idx * 1000),
    []
  )

  const yAxis = useMemo(
    () =>
      xAxis.map((amount, index) => ({
        index,
        amount: Math.max(calcStakingReward(1000), calcStakingReward(amount)),
      })),
    [xAxis, calcStakingReward]
  )

  const amountLog = useMemo(
    () =>
      xAxis.map((amount, index) =>
        Math.round((index / 999) ** 5 * 999900 + 100)
      ),
    [xAxis]
  )

  useEffect(() => {
    const {amount} = router.query
    if (!amount) {
      return
    }
    if (!parseFloat(amount)) {
      return
    }

    setAmountValue(Math.round(parseFloat(amount) * 100) / 100)
    setAmountSlider([amountLog.findIndex(item => item > parseInt(amount)) - 1])
    scroller.scrollTo(`stake calculator`)
  }, [amountLog, router.query, router.query.amount, scroller])

  const updateAmountValue = value => setAmountValue(parseInt(amountLog[value]))
  const updateAmountSlider = amount =>
    setAmountSlider([amountLog.findIndex(item => item > amount) - 1])

  const renderTooltip = () => (
    <CustomTooltip
      value={
        calcStakingReward(amountValue) +
        calcMiningReward(amountValue) +
        calcExtraFlipReward(amountValue) +
        calcInvitationReward(amountValue)
      }
    />
  )

  return (
    <Layout
      title={t(`Stake IDNA to get rewards`, {ns: 'stake'})}
      description={t(`Stake IDNA to get Identity Staking rewards`, {
        ns: 'stake',
      })}
    >
      <section
        className="section section_content menu_section_content menu_stake"
        id="stake"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <div className="section_header">
                <h3 className="h1" style={{position: 'relative'}}>
                  {t('Identity staking', {
                    ns: 'stake',
                  })}
                </h3>

                <h3
                  className="h2"
                  style={{display: 'none', position: 'relative'}}
                >
                  {t('Stake IDNA to get identity staking rewards', {
                    ns: 'stake',
                  })}
                </h3>

                <p className="hint text-center">
                  {t(
                    'Identity staking offers higher APY for small-scale stakeholders, preventing capital concentration in staking pools and encouraging individual mining.',
                    {ns: 'stake'}
                  )}
                  <br />
                  <LinkText href="/faq#faq-economy-9">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontSize: '14px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '20px',
                      }}
                    >
                      {t('Read more about Identity Staking', {
                        ns: 'stake',
                      })}
                      <img
                        style={{marginLeft: '4px'}}
                        src="/static/images/link-arrow.svg"
                        alt="staking"
                        width="12"
                      />
                    </a>
                  </LinkText>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section section_content menu_section_content menu_stake"
        id="stake info"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-9">
              <div className="row">
                <div className="col-lg-6 info-block">
                  <h2 className="h2">{t('Rewards', {ns: 'stake'})}</h2>
                  <p>
                    {t(
                      'Earn rewards by locking IDNA in your identity stake and optimize your stake amount to increase rewards. Small-scale stakeholders earn a higher APY compared to larger stakeholders.',
                      {ns: 'stake'}
                    )}{' '}
                  </p>
                </div>
                <div className="col-lg-6 info-block">
                  <h2 className="h2">{t('Risks', {ns: 'stake'})}</h2>
                  <p>
                    {t(
                      'You may lose IDNA for missing or failing validation depending on your identity status.',
                      {ns: 'stake'}
                    )}{' '}
                    {t('Learn more about', {ns: 'stake'})}{' '}
                    <LinkText href="https://docs.idena.io/docs/wp/technology#losing-stake">
                      <a target="_blank" rel="noreferrer">
                        {t('stake protection', {
                          ns: 'stake',
                        })}
                      </a>
                    </LinkText>
                    .
                  </p>
                </div>
                <div className="col-lg-6 info-block">
                  <h2 className="h2">{t('Requirements', {ns: 'stake'})}</h2>
                  <p>
                    {t(
                      'You need to get a validated identity to be able to stake IDNA.',
                      {ns: 'stake'}
                    )}{' '}
                  </p>
                </div>
                <div className="col-lg-6 info-block">
                  <h2 className="h2">{t('Voting power', {ns: 'stake'})}</h2>
                  <p>
                    {t(
                      'The amount of staked coins does not affect the voting power of your validated identity, unless it is below a certain threshold.',
                      {ns: 'stake'}
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section section_content menu_section_content menu_stake"
        id="stake calculator"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-9">
              <div className="page-area">
                <h3 className="h1" style={{marginTop: '0px'}}>
                  {t('Staking calculator', {
                    ns: 'stake',
                  })}
                </h3>

                <div>
                  <div
                    style={{
                      marginBottom: '0',
                      marginLeft: '0px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontWeight: '500',
                      color: '#96999e',
                    }}
                  >
                    <span>{t('Amount, IDNA', {ns: 'stake'})}</span>
                    <span>{t('APY, %', {ns: 'stake'})}</span>
                  </div>

                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
                  <div
                    style={{
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <input
                      style={{
                        fontSize: '40px',
                      }}
                      className="h2"
                      type="number"
                      maxLength={7}
                      placeholder="0"
                      value={amountValue}
                      onChange={n => {
                        const {value} = n.target
                        setAmountValue(value)
                        updateAmountSlider(value)
                      }}
                    />
                    <span
                      className="h2"
                      style={{
                        fontSize: '40px',
                        fontWeight: 500,
                        // color: '#96999e',
                      }}
                    >{`${
                      isNotAmount
                        ? 0
                        : (
                            ((((calcStakingReward(amountValue) +
                              calcMiningReward(amountValue) +
                              calcExtraFlipReward(amountValue) +
                              calcInvitationReward(amountValue)) *
                              100) /
                              amountValue) *
                              366) /
                            epochTime.epochDuration
                          )?.toFixed(1)
                    }`}</span>
                  </div>
                  <Range
                    values={amountSlider}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    onChange={values => {
                      setAmountSlider(values)
                      updateAmountValue(values[0])
                    }}
                    renderTrack={({props, children}) => (
                      <div
                        {...props}
                        style={{
                          height: '4px',
                          width: '100%',
                          borderRadius: '6px',
                          background: getTrackBackground({
                            values: amountSlider,
                            colors: ['#548BF4', '#f5f6f7'],
                            min: MIN,
                            max: MAX,
                          }),
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({props}) => (
                      <div
                        {...props}
                        style={{
                          height: '24px',
                          width: '24px',
                          backgroundColor: 'transparent',
                          borderRadius: '12px',
                          outline: 'none',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            height: '16px',
                            width: '16px',
                            backgroundColor: '#578fff',
                            borderRadius: '8px',
                            border: '4px solid white',
                            boxShadow: '0 2px 4px 0 rgba(83, 86, 92, 0.06)',
                          }}
                        />
                      </div>
                    )}
                  />
                  <div className="illustrated-data">
                    <div className="row justify-content-center">
                      <div className="col-md-6 col-lg-6">
                        <div className="diagram-block">
                          <div
                            style={{
                              zIndex: 1,
                              position: 'absolute',
                              top: 0,
                              width: '100%',
                              height: '100%',
                            }}
                          />
                          <ResponsiveContainer height={160} width="100%">
                            <AreaChart data={yAxis}>
                              <Area
                                type="monotone"
                                dataKey="amount"
                                stroke="#578fff"
                                fill="rgba(87,143,255,0.12)"
                                strokeWidth={2}
                              />
                              <YAxis
                                domain={[30, 100000]}
                                allowDataOverflow
                                scale="log"
                                type="category"
                                hide
                              />
                              <XAxis padding={{left: 2}} tick={false} hide />
                              <ChartTooltip
                                content={renderTooltip}
                                position={{
                                  x: Math.min(
                                    210,
                                    parseInt(amountValue / 3000) + 20
                                  ),
                                  y: Math.max(
                                    20,
                                    130 *
                                      (1 -
                                        Math.log(amountValue) /
                                          Math.log(10000000))
                                  ),
                                }}
                                wrapperStyle={{visibility: 'visible'}}
                              />
                              <ReferenceDot
                                x={Math.min(999, parseInt(amountValue / 1000))}
                                y={Math.min(
                                  calcStakingReward(999000),
                                  Math.max(
                                    calcStakingReward(1000),
                                    calcStakingReward(amountValue)
                                  )
                                )}
                                fill="#578fff"
                                stroke="white"
                                strokeWidth={2}
                                r={4}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                          <span style={{fontWeight: 500, marginTop: '24px'}}>
                            {`${t('Staking power', {ns: 'stake'})}`}{' '}
                            {STAKING_POWER}
                          </span>
                          <span style={{fontWeight: 400, color: '#96999e'}}>
                            {t(
                              'Your share of the reward pie is proportional to the stake',
                              {ns: 'stake'}
                            )}
                            <sup>0.9</sup>
                            {'. '}
                            {t(
                              'The smaller the stake, the higher the percentage yield.',
                              {ns: 'stake'}
                            )}
                          </span>
                        </div>{' '}
                      </div>

                      <div className="col-md-6 col-lg-6">
                        <div className="user-info-block">
                          <div
                            style={{
                              paddingBottom: '6px',
                              borderBottom: 'solid 1px #e8eaed',
                            }}
                          >
                            <StakingData
                              title="Mining reward"
                              tooltip={t(
                                'The amount of coins you get per epoch by running a mining node.',
                                {ns: 'stake'}
                              )}
                              value={`${calcMiningReward(
                                amountValue
                              ).toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })} IDNA`}
                            />

                            <StakingData
                              title={t('Validation reward', {ns: 'stake'})}
                              tooltip={t(
                                'The amount of coins you get for a successful validation',
                                {ns: 'stake'}
                              )}
                              value={`${calcStakingReward(
                                amountValue
                              ).toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })} IDNA`}
                            />
                            <StakingData
                              title={t('Extra flip premium', {ns: 'stake'})}
                              tooltip={t(
                                'The amount of coins you get for 1 extra flip in addition to the basic flip reward',
                                {ns: 'stake'}
                              )}
                              value={`${calcExtraFlipReward(
                                amountValue
                              ).toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })} IDNA`}
                            />
                            <StakingData
                              title={t('Invitation reward', {ns: 'stake'})}
                              tooltip={t(
                                'The amount of coins you get for 3 successful validations of one invited user',
                                {ns: 'stake'}
                              )}
                              value={`${calcInvitationReward(
                                amountValue
                              ).toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })} IDNA`}
                            />
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginTop: '24px',
                            }}
                          >
                            <div>
                              <span style={{fontWeight: 'bold'}}>
                                {t('Total epoch reward', {ns: 'stake'})}
                              </span>
                            </div>
                            <div>
                              <span style={{fontWeight: 'bold'}}>
                                {`${(
                                  calcStakingReward(amountValue) +
                                  calcMiningReward(amountValue) +
                                  calcExtraFlipReward(amountValue) +
                                  calcInvitationReward(amountValue)
                                ).toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                })} IDNA`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="stakingStat">
                <div className="stakingStatSection">
                  <StakingInfo
                    title={t('Staking rewards fund', {ns: 'stake'})}
                    value={`${Math.round(
                      epochRewardFund
                    ).toLocaleString()} IDNA`}
                    isDivided
                  />
                  <StakingInfo
                    title={t('Mining rewards fund', {ns: 'stake'})}
                    value={`${Math.round(TOTAL_FUND).toLocaleString()} IDNA`}
                    isDivided
                  />
                  <StakingInfo
                    title={t('Total identities', {ns: 'stake'})}
                    value={validatedCount?.toLocaleString()}
                    isDivided
                  />
                  <StakingInfo
                    title={t('Total stakes locked', {ns: 'stake'})}
                    value={`${
                      totalStake > 1000000
                        ? `${Math.round(totalStake / 100000) / 10}M`
                        : Math.round(totalStake).toLocaleString()
                    } IDNA`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

// eslint-disable-next-line react/prop-types
function StakingData({title, value, tooltip}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '17px',
        marginBottom: '19px',
      }}
    >
      <div style={{display: 'flex', alignItems: 'center'}}>
        <span style={{fontWeight: 500, color: '#96999e', marginRight: '4px'}}>
          {title}
        </span>
        {tooltip && <Tooltipicon tooltip={tooltip} />}
      </div>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <span style={{fontWeight: 500, color: '#53565c'}}>{value}</span>
      </div>
    </div>
  )
}

// eslint-disable-next-line react/prop-types
function StakingInfo({title, value, children, isDivided}) {
  return (
    <div className={`col-md-3 stakingStatBlock ${isDivided ? 'divided' : ''}`}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        {children}
        <h2
          className="h2"
          style={{fontSize: '40px', fontWeight: 500, color: '#53565c'}}
        >
          {value}
        </h2>
      </div>
      <div>
        <span style={{fontSize: '0.875rem', fontWeight: 400, color: '#96999e'}}>
          {title}
        </span>
      </div>
    </div>
  )
}

// eslint-disable-next-line react/prop-types
function MicroPie({val, innerVal = val, maxVal = 100, size = 12}) {
  const data = [
    {
      name: 'value',
      value: val,
      innerValue: innerVal,
      color: '#578fff',
      innerColor: '#578fff22',
    },
    {
      name: 'innerValue',
      value: Math.max(0, maxVal - val),
      innerValue: Math.max(0, maxVal - innerVal),
      color: '#578fff22',
      innerColor: '#578fff00',
    },
  ]
  return (
    <div className="microPie">
      <ResponsiveContainer width="100%">
        <PieChart>
          <Pie
            startAngle={90}
            endAngle={-270}
            data={data}
            dataKey="value"
            strokeWidth={0}
            innerRadius={size - 2}
            outerRadius={size}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={data[index].color} />
            ))}
          </Pie>
          <Pie
            startAngle={90}
            endAngle={-270}
            data={data}
            dataKey="innerValue"
            strokeWidth={0}
            innerRadius={0}
            outerRadius={size - 2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={data[index].innerColor} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export const getStaticProps = async ({locale}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['stake', 'common'])),
  },
})

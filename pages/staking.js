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
import Layout from '../shared/components/layout'
import {Tooltipicon} from '../shared/components/tooltip'
import {useTotalValidatedCount} from '../shared/api'

export default function Staking() {
  const {t} = useTranslation('stake')
  const [amountValue, setAmountValue] = useState(1000)
  const [amountSlider, setAmountSlider] = useState([245])
  const [weight, setWeight] = useState(1)
  const [totalStake, setTotalStake] = useState('0')
  const [epochRewardFund, setEpochRewardFund] = useState([0])
  const [epochTime, setEpochTime] = useState({
    epochDuration: '-',
    epochLeftPercent: 100,
    epochLeft: '-',
    epochLeftUnit: '-',
  })
  const [epochNum, setEpochNum] = useState(0)
  const validatedCount = useTotalValidatedCount()

  const STEP = 1
  const MIN = 0
  const MAX = 999

  // eslint-disable-next-line react/prop-types
  const CustomTooltip = ({value}) => (
    <div
      style={{
        fontSize: '14px',
        paddingTop: '8px',
        paddingBottom: '8px',
        lineHeight: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '116px',
        borderRadius: '6px',
        border: '1px solid rgba(150, 153, 158, 0.5)',
        backgroundColor: 'white',
      }}
    >
      <p style={{margin: 0, color: 'rgb(83, 86, 92)'}}>{`${Math.round(
        value
      ).toLocaleString()}.${Math.round((value % 1) * 100)} iDNA`}</p>
      <p style={{margin: 0, color: 'rgb(150, 153, 158)'}}>
        {t('Epoch reward', {ns: 'stake'})}
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
        setEpochRewardFund(rewardsData.result.validation * 0.8)
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

  const calcValue = useCallback(
    amount => (amount ** 0.9 / (amount ** 0.9 + weight)) * epochRewardFund,
    [weight, epochRewardFund]
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
        amount: Math.max(calcValue(1000), calcValue(amount)),
      })),
    [xAxis, calcValue]
  )

  const amountLog = useMemo(
    () =>
      xAxis.map((amount, index) =>
        Math.round((index / 999) ** 5 * 999900 + 100)
      ),
    [xAxis]
  )

  const updateAmountValue = value => setAmountValue(parseInt(amountLog[value]))
  const updateAmountSlider = amount =>
    setAmountSlider([amountLog.findIndex(item => item > amount) - 1])

  const renderTooltip = () => <CustomTooltip value={calcValue(amountValue)} />

  return (
    <Layout
      title={t(`Stake iDNA to get rewards`, {ns: 'stake'})}
      description={t(`Stake iDNA to get Quadratic Staking rewards`, {
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
                <h3 className="h1 header52px coming_soon" style={{position: 'relative'}}>
                  {t('Staking iDNA to get Quadratic Staking rewards', {
                    ns: 'stake',
                  })}
                </h3>
                <p className="hint text-center">
                  {t(
                    'Quadratic Staking encourages people to secure their identities with iDNA stakes, no matter how small, and ensures a democratic distribution of staking rewards.',
                    {ns: 'stake'}
                  )}
                  <br />
                  <a
                    href="https://docs.idena.io/docs/iip/iip-4"
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
                    {t('Read more about Quadratic Staking (IIP-4)', {
                      ns: 'stake',
                    })}
                    <img
                      style={{marginLeft: '4px'}}
                      src="/static/images/link-arrow.svg"
                      alt="staking"
                      width="12"
                    />
                  </a>
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
              <div className="info-two-col">
                <div className="info-block">
                  <h4>{t('Rewards', {ns: 'stake'})}</h4>
                  <p>
                    {t(
                      'Get staking rewards for improving security of the protocol by locking iDNA in your identity stake. The larger the stake the higher the value of your identity.',
                      {ns: 'stake'}
                    )}{' '}
                  </p>
                </div>
                <div className="info-block">
                  <h4>{t('Risks', {ns: 'stake'})}</h4>
                  <p>
                    {t(
                      'Although you can earn rewards for securing your identity, you can lose IDNA for missing or failing validation depending on your identity status.',
                      {ns: 'stake'}
                    )}{' '}
                  </p>
                </div>
                <div className="info-block">
                  <h4>{t('Requirements', {ns: 'stake'})}</h4>
                  <p>
                    {t(
                      'You need to get a validated identity to be able to stake iDNA.',
                      {ns: 'stake'}
                    )}{' '}
                  </p>
                </div>
                <div className="info-block">
                  <h4>{t('Voting power', {ns: 'stake'})}</h4>
                  <p>
                    {t(
                      'The amount of staked coins does not affect the voting power of your validated identity.',
                      {ns: 'stake'}
                    )}{' '}
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
                <h3 className="h1" style={{fontSize: '52px', marginTop: '0px'}}>
                  {t('Staking calculator', {
                    ns: 'stake',
                  })}
                </h3>
                <div>
                  <span
                    style={{
                      fontWeight: '500',
                      color: '#96999e',
                      marginLeft: '2px',
                    }}
                  >
                    {t('Amount, iDNA', {ns: 'stake'})}
                  </span>
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
                      type="text"
                      maxLength={7}
                      placeholder="0"
                      value={amountValue}
                      onChange={n => {
                        setAmountValue(n.target.value)
                        updateAmountSlider(n.target.value)
                      }}
                    />
                    <span
                      style={{
                        fontWeight: 500,
                        color: '#96999e',
                      }}
                    >{`APY ${
                      isNotAmount
                        ? 0
                        : (
                            (((calcValue(amountValue) * 100) / amountValue) *
                              366) /
                            epochTime.epochDuration
                          )?.toFixed(1)
                    } %`}</span>
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
                                230,
                                parseInt(amountValue / 3000) + 20
                              ),
                              y: Math.max(
                                20,
                                150 *
                                  (1 -
                                    Math.log(amountValue) / Math.log(10000000))
                              ),
                            }}
                            wrapperStyle={{visibility: 'visible'}}
                          />
                          <ReferenceDot
                            x={Math.min(999, parseInt(amountValue / 1000))}
                            y={Math.min(
                              calcValue(999000),
                              Math.max(calcValue(1000), calcValue(amountValue))
                            )}
                            fill="#578fff"
                            stroke="white"
                            strokeWidth={2}
                            r={4}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                      <span style={{fontWeight: 500, marginTop: '24px'}}>
                        {`${t('Staking power', {ns: 'stake'})} 0.9`}
                      </span>
                      <span style={{fontWeight: 500, color: '#96999e'}}>
                        {t(
                          'Quadratic Staking encourages smaller players to increase their stakes. The lower the stake, the higher the percentage yield.',
                          {ns: 'stake'}
                        )}
                      </span>
                    </div>
                    <div className="user-info-block">
                      <div
                        style={{
                          paddingBottom: '6px',
                          borderBottom: 'solid 1px #e8eaed',
                        }}
                      >
                        <StakingData
                          title={t('Staking', {ns: 'stake'})}
                          value={`${
                            isNotAmount
                              ? 0
                              : Math.round(amountValue).toLocaleString()
                          } iDNA`}
                        />
                        <StakingData
                          title={t('Share', {ns: 'stake'})}
                          tooltip={t(
                            'Share of your stake in the total amount of staked coins',
                            {ns: 'stake'}
                          )}
                          value={`${
                            isNotAmount
                              ? 0
                              : (
                                  (amountValue * 100) /
                                  (parseInt(amountValue) + parseInt(totalStake))
                                )?.toFixed(1)
                          } %`}
                        />
                        <StakingData
                          title="EPY"
                          tooltip={t('Epoch percentage yield', {ns: 'stake'})}
                          value={`${
                            isNotAmount
                              ? 0
                              : (
                                  (calcValue(amountValue) * 100) /
                                  amountValue
                                )?.toFixed(1)
                          } %`}
                        />
                        <StakingData
                          title="APY"
                          tooltip={t('Annual percentage yield', {ns: 'stake'})}
                          value={`${
                            isNotAmount
                              ? 0
                              : (
                                  (((calcValue(amountValue) * 100) /
                                    amountValue) *
                                    366) /
                                  epochTime.epochDuration
                                )?.toFixed(1)
                          } %`}
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
                            {t('Epoch reward', {ns: 'stake'})}
                          </span>
                        </div>
                        <div>
                          <span style={{fontWeight: 'bold'}}>
                            {`${Math.round(
                              calcValue(amountValue)
                            ).toLocaleString()}.${Math.round(
                              (calcValue(amountValue) % 1) * 100
                            )} iDNA`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="stakingStat">
                <div className="stakingStatSection">
                  <StakingInfo
                    title={`${t('Epoch', {ns: 'stake'})} #0${
                      epochNum > 99 ? '' : '0'
                    }${epochNum}`}
                    value={`${epochTime.epochLeft} ${epochTime.epochLeftUnit} left`}
                    isDivided
                  >
                    <MicroPie
                      val={Math.trunc(100 - epochTime.epochLeftPercent)}
                      maxVal={100}
                    />
                  </StakingInfo>
                  <StakingInfo
                    title={t('Staking rewards fund', {ns: 'stake'})}
                    value={`${Math.round(
                      epochRewardFund
                    ).toLocaleString()} iDNA`}
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
                    } iDNA`}
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
    <div className={`stakingStatBlock ${isDivided ? 'divided' : ''}`}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        {children}
        <span style={{fontSize: '21px', fontWeight: 500, color: '#53565c'}}>
          {value}
        </span>
      </div>
      <div>
        <span style={{fontSize: '14px', fontWeight: 500, color: '#96999e'}}>
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

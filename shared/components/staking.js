// import {useTranslation} from 'next-i18next'
import {getTrackBackground, Range} from 'react-range'
import {useState, useRef, useEffect, useMemo, useCallback} from 'react'
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
import Layout from './layout'
import {Tooltipicon} from './tooltip'
import {useTotalValidatedCount} from '../api'
import {
  usdFmt,
  dnaFmt,
  calculateEstimatedMiningReward,
  LinkText,
} from '../utils/utils'

const STAKING_POWER = 0.9
const Scroll = require('react-scroll')

export function useStaking() {
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
  // const [epochNum, setEpochNum] = useState(0)
  // const validatedCount = useTotalValidatedCount()

  const BLOCKS_IN_EPOCH = epochTime.epochDuration * 24 * 60 * 3
  const TOTAL_FUND = BLOCKS_IN_EPOCH * 6

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
        // setEpochNum(jsonEpoch.result.epoch)
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

  const calcTotalRewards = useCallback(
    amount =>
      calcStakingReward(amount) +
      calcMiningReward(amount) +
      calcExtraFlipReward(amount) +
      calcInvitationReward(amount)
  )

  return {
    calcStakingReward,
    calcExtraFlipReward,
    calcInvitationReward,
    calcMiningReward,
    calcTotalRewards,
    epochTime,
    totalShares,
    totalStake,
  }
}

export function Staking({price}) {
  //  const {t} = useTranslation('stake')
  const t = function(value) {
    return value
  }

  const [amountValue, setAmountValue] = useState(1000)
  const [sliderPosition, setSliderPosition] = useState([200])

  const {
    calcStakingReward,
    calcExtraFlipReward,
    calcInvitationReward,
    calcMiningReward,
    calcTotalRewards,
    epochTime,
  } = useStaking(0)

  const {scroller} = Scroll

  const STEP = 1
  const MIN = 0
  const MAX = 999

  const [annualReward, setAnnualReward] = useState(0)
  const [annualYield, setAnnualYield] = useState(0)

  // eslint-disable-next-line react/prop-types
  const CustomTooltip = ({value}) => (
    <div
      style={{
        fontSize: '14px',
        paddingTop: '6px',
        paddingBottom: '6px',
        lineHeight: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '160px',
        border: 'none',
        backgroundColor: 'transparent',
      }}
    >
      {/*
      <p style={{fontSize: '14px', margin: 0, color: 'rgb(83, 86, 92)'}}>
        {t('Annual reward:', {ns: 'stake'})} {usdFmt(annualReward)}
      </p>
      <p
        style={{margin: 0, color: 'rgb(83, 86, 92)'}}
      >{`APY ${annualYield} %`}</p>
    */}
    </div>
  )

  const isNotAmount = !amountValue || parseInt(amountValue) === 0
  const maxStake = 3000000
  const xAxisMaxPosition = 1000

  const xAxis = useMemo(
    () =>
      new Array(xAxisMaxPosition)
        .fill(0)
        .map((_, idx) => (idx * maxStake) / xAxisMaxPosition),
    []
  )

  const yAxis = useMemo(
    () =>
      xAxis.map((amount, index) => ({
        index,
        amount: Math.max(calcTotalRewards(1000), calcTotalRewards(amount)),
      })),
    [calcTotalRewards, xAxis]
  )

  const amountLog = useMemo(
    () =>
      xAxis.map((amount, index) =>
        Math.round((index / 999) ** 5 * (maxStake - 100) + 100)
      ),
    [xAxis]
  )

  const updateAnnualRewards = stakeAmount => {
    const epochReward = calcTotalRewards(stakeAmount)
    const reward = Math.round(
      ((epochReward * price) / epochTime.epochDuration) * 366
    )
    setAnnualReward(reward)

    const yieldValue = Math.round(
      (((epochReward * 100) / stakeAmount) * 366) / epochTime.epochDuration
    )
    setAnnualYield(yieldValue)
  }

  const updateAmountValueBySlider = useCallback(value => {
    const amount = parseInt(amountLog[value])
    setAmountValue(amount)
    updateAnnualRewards(amount)
  })

  const updateSliderPositionByAmount = amount => {
    setSliderPosition([amountLog.findIndex(item => item > amount) - 1])
    updateAnnualRewards(amount)
  }

  const renderTooltip = () => {
    updateAnnualRewards(amountValue)
    return <CustomTooltip value={calcTotalRewards(amountValue)} />
  }

  const getYAxisFillOffset = () => {
    const max = Math.log(calcTotalRewards(maxStake))
    const min = Math.log(calcTotalRewards(1000))
    const curr = Math.log(calcTotalRewards(amountValue))
    const coef = max / (max - min)
    return Math.min(0.99, 1 - ((curr - min) / max) * coef) || 0
  }

  const inputRef = useRef(null)
  const [inputRefFocus, setInputRefFocus] = useState(true)

  return (
    <div
      className=""
      onMouseEnter={() => {
        if (inputRefFocus) {
          inputRef.current.focus()
          inputRef.current.type = 'text'
          inputRef.current.selectionStart = inputRef.current.value.length
          inputRef.current.type = 'number'
        }
      }}
      onMouseLeave={() => {
        if (inputRefFocus) {
          inputRef.current.blur()
          setInputRefFocus(false)
        }
      }}
    >
      <div className="">
        <div className="">
          <div className="page-area">
            <div>
              <span
                style={{
                  fontWeight: '500',
                  color: '#96999e',
                }}
              >
                {t('Enter your IDNA stake', {ns: 'stake'})}
              </span>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <input
                  ref={inputRef}
                  className="h-font"
                  style={{
                    fontSize: '50px',
                    fontWeight: 500,
                  }}
                  type="number"
                  maxLength={7}
                  placeholder="0"
                  color="#1E2E45"
                  value={amountValue}
                  onChange={n => {
                    const {value} = n.target
                    setAmountValue(value)
                    updateSliderPositionByAmount(value)
                  }}
                />
                <span
                  className="h-font"
                  style={{
                    fontSize: '50px',
                    fontWeight: 400,
                    // color: '#A9BCEA', // 96999e
                  }}
                >
                  {price && `${usdFmt(Math.round(amountValue * price))}`}
                </span>
              </div>
              <Range
                values={sliderPosition}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={values => {
                  setSliderPosition(values)
                  updateAmountValueBySlider(values[0])
                }}
                renderTrack={({props, children}) => (
                  <div
                    {...props}
                    className="range-track"
                    style={{
                      background: getTrackBackground({
                        values: sliderPosition,
                        colors: ['#DB6CBC', '#f5f6f7'],
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
                        backgroundColor: '#53565C', // orang: E9922D // #578fff
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
                      <defs>
                        <linearGradient
                          id="colorUv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#D5D7D8" // F5F7F8
                            stopOpacity={0.1}
                          />

                          <stop
                            offset={getYAxisFillOffset()}
                            stopColor="#D5D7D8" // DB6CBC pink
                            stopOpacity={0.3}
                          />

                          <stop
                            offset={getYAxisFillOffset()}
                            stopColor="#D5D7D8" // A9BCEA blue
                            stopOpacity={0.8}
                          />

                          <stop
                            offset="99%"
                            stopColor="#D5D7D8"
                            stopOpacity={0.3}
                          />
                          <stop offset="100%" stopColor="#D5D7D8" />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#ECEBEA" // gray F5F7F8 // blue old 578fff
                        fill="url(#colorUv)"
                        strokeWidth={1}
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
                          x: 80,
                          y: Math.max(
                            20,
                            130 *
                              (1 - Math.log(amountValue) / Math.log(10000000))
                          ),
                        }}
                        wrapperStyle={{visibility: 'visible'}}
                      />
                      <ReferenceDot
                        x={Math.min(
                          xAxisMaxPosition - 1,
                          Math.max(
                            parseInt(
                              (amountValue / maxStake) * xAxisMaxPosition
                            ),
                            1
                          )
                        )}
                        y={Math.min(
                          calcTotalRewards(maxStake) - 1000,
                          Math.max(
                            calcTotalRewards(1000),
                            calcTotalRewards(amountValue)
                          )
                        )}
                        fill="#D5D7D8" // blue 6087EA // black 53565C // E78D42 // 578fff
                        r={3}
                        stroke="white"
                        strokeWidth={1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>

                  <div
                    className="container"
                    style={{
                      margin: '10px 0 0 0px',
                      padding: 0,
                    }}
                  >
                    <div className="justify-content-center">
                      <div className="" style={{float: 'left'}}>
                        <div>
                          <div className="blue-value h-font">
                            {annualReward ? usdFmt(annualReward) : usdFmt(0)}
                          </div>
                          <div className="">Annual reward</div>
                        </div>
                      </div>

                      <div className="" style={{float: 'right'}}>
                        <div className="" style={{textAlign: 'right'}}>
                          <div className="">
                            <div className="red-value h-font">
                              {annualYield || 0}%
                            </div>
                            <div className="">Annual yield</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <span style={{fontWeight: 500, marginTop: '24px'}}></span>
                  <span style={{fontWeight: 400, color: '#96999e'}}>
                    {t(
                      'Your share of the reward pie is proportional to the stake',
                      {ns: 'stake'}
                    )}
                    <sup>0.9</sup>
                    {'. '}
                    {t(
                      'Estimations are based on the current network size, total staked amount and current IDNA price.',
                      {ns: 'stake'}
                    )}
                    {
                      // ` (${usdFmt(price, '$', 2, 4)}.`
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

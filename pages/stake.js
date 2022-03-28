import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {getTrackBackground, Range} from 'react-range'
import {useState, useEffect} from 'react'
import {
  AreaChart,
  Area,
  Tooltip as ChartTooltip,
  ReferenceDot,
  YAxis,
} from 'recharts'
import Layout from '../shared/components/layout'
import {TooltipText} from '../shared/components/tooltip'

export default function Stake() {
  const {t} = useTranslation('contribute')
  const [amountValue, setAmountValue] = useState(1000)
  const [amountSlider, setAmountSlider] = useState([5])
  const [weight, setWeight] = useState(1)
  const [epochReward, setEpochReward] = useState(0)
  const [totalStake, setTotalStake] = useState('0')
  const [epochRewardFund, setEpochRewardFund] = useState([0])
  const [epochDays, setEpochDays] = useState(0)

  const STEP = 1
  const MIN = 0
  const MAX = 20
  const BLOCKS_IN_ONE_DAY = 4320
  const AMOUNT_STAKED = [
    0,
    0,
    10,
    76,
    320,
    977,
    2430,
    5252,
    10240,
    18453,
    31250,
    50328,
    77760,
    116029,
    168070,
    237305,
    327680,
    443705,
    590490,
    773781,
    1000000,
  ]
  // const STAKE_REWARDS = AMOUNT_STAKED.map((amount, index) => ({
  //   index,
  //   amount: (((index * 50000) ** 0.9 / weight) * epochRewardFund),
  // }))

  const getArray = () => {
    const rewards = []
    let i = 1
    while (i < 41) {
      rewards.push({index: i, amount: Math.log(i)})
      i += 1
    }
    return rewards
  }

  useEffect(() => {
    async function getStakeData() {
      try {
        const coinsResponse = await fetch('https://api.idena.io/api/coins')
        const coinsData = await coinsResponse.json()

        const stakeResponse = await fetch('https://api.idena.io/api/staking')
        const stakingData = await stakeResponse.json()

        const epochResponse = await fetch('http://api.idena.io/api/epoch/last')
        const jsonEpoch = await epochResponse.json()
        const epochNumber = jsonEpoch.result.epoch - 1

        const rewardsResponse = await fetch(
          `https://api.idena.io/api/epoch/${epochNumber}/rewardssummary`
        )
        const rewardsData = await rewardsResponse.json()

        const totalEpochReward =
          (stakingData.result.weight ** 0.9 / coinsData.result.totalStake) *
          rewardsData.result.validation
        setWeight(stakingData.result.weight)
        setEpochRewardFund(rewardsData.result.validation * 0.8)
        setEpochDays(rewardsData.result.epochDuration / BLOCKS_IN_ONE_DAY)
        setTotalStake(coinsData.result.totalStake)
        setEpochReward(totalEpochReward)
      } catch (e) {
        console.error('cannot fetch API')
      }
    }
    getStakeData()
  }, [])

  const updateAmountValue = value => setAmountValue(AMOUNT_STAKED[value])
  const updateAmountSlider = amount =>
    setAmountSlider([AMOUNT_STAKED.findIndex(item => item > amount) - 1])

  return (
    <Layout
      title={t(`Stake iDNA to get rewards`, {ns: 'stake'})}
      description={t(`Stake iDNA to get quadratic staking rewards`, {
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
                <h3 className="h1" style={{fontSize: '52px'}}>
                  {t('Stake iDNA to get quadratic staking rewards', {
                    ns: 'stake',
                  })}
                </h3>
                <p className="hint text-center">
                  {t(
                    'Quadratic Staking encourages people to secure their identities with iDNA stakes, no matter how small, and ensures a democratic allocation of staking rewards to benefit the public.',
                    {ns: 'stake'}
                  )}
                  <br />
                  <a
                    href="https://docs.idena.io/docs/iip/iip-4"
                    target="_blank"
                    rel="noreferrer"
                    style={{fontSize: '14px'}}
                  >
                    What is Quadratic staking
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
                  <span style={{fontWeight: '500', color: '#96999e'}}>
                    {t('Amount', {ns: 'stake'})}
                  </span>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
                  <label data-idna="iDNA">
                    <input
                      type="text"
                      placeholder="Enter amount"
                      value={amountValue}
                      onChange={n => {
                        setAmountValue([n.target.value])
                        updateAmountSlider(n.target.value)
                      }}
                    />
                  </label>
                  <Range
                    values={amountSlider}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    onChange={values => {
                      setAmountSlider(values)
                      console.log(
                        `amount - ${amountValue} slider - ${amountSlider}`
                      )
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
                            colors: ['#548BF4', '#ccc'],
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
                          height: '16px',
                          width: '16px',
                          backgroundColor: '#578fff',
                          borderRadius: '8px',
                          border: '4px solid white',
                          boxShadow: '0 2px 4px 0 rgba(83, 86, 92, 0.06)',
                        }}
                      />
                    )}
                  />
                  <div className="illustrated-data">
                    <div className="diagram-block">
                      <AreaChart width={320} height={120} data={getArray()}>
                        <ReferenceDot x={11} y={Math.log(11)} display="none" />
                        <Area
                          type="monotone"
                          dataKey="amount"
                          stroke="#578fff"
                          fill="#578fffaa"
                          strokeWidth={2}
                        />
                        <ChartTooltip />
                      </AreaChart>
                      <span style={{fontWeight: 500, marginTop: '24px'}}>
                        Stake power 0.9
                      </span>
                      <span style={{fontWeight: 500, color: '#96999e'}}>
                        {t(
                          'Quadratic staking encourages smaller players to increase their stakes. The lower the stake, the higher the percentage yield.'
                        )}
                      </span>
                    </div>
                    <div
                      style={{
                        backgroundColor: '#f5f6f7',
                        borderRadius: '8px',
                        width: '100%',
                        marginLeft: '20px',
                        padding: '32px',
                      }}
                    >
                      <div
                        style={{
                          paddingBottom: '20px',
                          borderBottom: 'solid 1px #e8eaed',
                        }}
                      >
                        <StakingData
                          title="Stake"
                          value={`${
                            totalStake
                              ? totalStake.substr(0, totalStake.indexOf('.'))
                              : '0'
                          } iDNA`}
                        />
                        <StakingData
                          title="Share"
                          value={`${Math.round(
                            (amountValue * 100) / totalStake
                          )} %`}
                        />
                        <StakingData
                          title="EPY"
                          tooltip="Epoch percentage yield"
                          value={`${Math.round(
                            (epochReward * 100) / totalStake
                          )} %`}
                        />
                        <StakingData
                          title="APY"
                          tooltip="Annual percentage yield"
                          value={`${Math.round(
                            (((epochReward * 100) / totalStake) * 366) /
                              epochDays
                          )} %`}
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
                          <span style={{fontWeight: 'bold'}}>Epoch reward</span>
                        </div>
                        <span style={{fontWeight: 'bold'}}>
                          {`${Math.round(epochReward)} iDNA`}
                        </span>
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

// eslint-disable-next-line react/prop-types
function StakingData({title, value, tooltip, ...props}) {
  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div>
        <span style={{fontWeight: 500, color: '#96999e'}}>{title}</span>
        {tooltip && <TooltipText />}
      </div>
      <span style={{fontWeight: 500, color: '#53565c'}}>{value}</span>
    </div>
  )
}

export const getStaticProps = async ({locale}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['stake', 'common'])),
  },
})

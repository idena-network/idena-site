import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {getTrackBackground, Range} from 'react-range'
import {useEffect, useState} from 'react'
import {AreaChart, Area} from 'recharts'
import Layout from '../shared/components/layout'

export default function Stake() {
  const {t} = useTranslation('contribute')
  const [amountValue, setAmountValue] = useState([0])
  const [amountSlider, setAmountSlider] = useState([0])

  const STEP = 1
  const MIN = 0
  const MAX = 19
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

  const getAmountValue = AMOUNT_STAKED[amountSlider[0]]
  const getAmountSlider =
    AMOUNT_STAKED.findIndex(item => item > amountValue) - 1

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
                      value={amountValue[0]}
                      onChange={n => setAmountValue([n.target.value])}
                    />
                  </label>
                  <Range
                    values={amountSlider}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    onChange={values => setAmountSlider(values)}
                    renderTrack={({props, children}) => (
                      <div
                        {...props}
                        style={{
                          height: '4px',
                          width: '100%',
                          borderRadius: '6px',
                          background: getTrackBackground({
                            values: amountValue,
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
                      <AreaChart data={STAKE_REWARDS}>
                        <Area
                          type="monotone"
                          dataKey="rewards"
                          stroke="#578fff"
                          fill="#578fffaa"
                          strokeWidth={2}
                          activeDot={{r: 3}}
                          dot={{r: 0}}
                        />
                        {
                          // <Tooltip cursor={false} content={<CustomTooltip />} />
                        }
                      </AreaChart>
                    </div>
                    <div></div>
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
    ...(await serverSideTranslations(locale, ['stake', 'common'])),
  },
})

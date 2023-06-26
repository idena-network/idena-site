import {Nav, Tab} from 'react-bootstrap'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {useTranslation} from 'next-i18next'
import Layout from '../shared/components/layout'

export default function Donate() {
  const {t} = useTranslation('donate')

  return (
    <Layout
      title={t('Donate to Idena', {ns: 'donate'})}
      description={t('Support Idena by making a donation', {ns: 'donate'})}
    >
      <section
        className="section section_content menu_section_content menu_donate"
        id="donate"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <div className="section_header">
                <h3 className="h1">{t('Donate to Idena', {ns: 'donate'})}</h3>
              </div>

              <p>
                {t(
                  'Support the Idena network with your donation. All the funds will be used for Idena development and promotion.',
                  {ns: 'donate'}
                )}
              </p>

              <div className="donate_container">
                <Tab.Container defaultActiveKey="#btc-content" id="tab_wallet">
                  <Tab.Content>
                    <Tab.Pane eventKey="#btc-content">
                      <h2 className="h2">Bitcoin</h2>
                      <p
                        style={{
                          width: '100%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        bc1qpy9v4ew097g4sa0eghvsp0kpult8ckturhc98j
                      </p>
                      <img src="/static/images/btc.png" alt="btc" width="208" />
                    </Tab.Pane>
                    <Tab.Pane eventKey="#eth-content">
                      <h2 className="h2">Ethereum</h2>
                      <p
                        style={{
                          width: '100%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        0x730f10D119058253e995BAF1FC0AD66eAbE94453
                      </p>
                      <img src="/static/images/eth.png" alt="eth" width="208" />
                    </Tab.Pane>
                  </Tab.Content>
                  <Nav className="nav-tabs">
                    <Nav.Item>
                      <Nav.Link eventKey="#btc-content">BTC</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="#eth-content">ETH</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Tab.Container>
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
    ...(await serverSideTranslations(locale, ['donate', 'common'])),
  },
})

import {Col, Nav, Row, Tab, Tabs} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import Layout from '../shared/components/layout'
import {useHash} from '../shared/utils'

export default function Donate() {
  const [activeWallet, setActiveWallet] = useState()
  const {hash} = useHash()

  useEffect(() => {
    setActiveWallet(hash)
  }, [hash])

  return (
    <Layout
      title="Donate to Idena"
      description="Support Idena by making a donation"
    >
      <section
        className="section section_content menu_section_content menu_donate"
        id="donate"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <div className="section_header">
                <h3 className="h1">Donate to Idena</h3>
              </div>

              <p>
                Support the Idena network with your donation. All the funds will
                be used for Idena development and promotion.
              </p>

              <div className="donate_container">
                <Tab.Container
                  activeKey={activeWallet}
                  onSelect={e => setActiveWallet(e)}
                  defaultActiveKey="#btc-content"
                  id="tab_wallet"
                >
                  <Tab.Content>
                    <Tab.Pane eventKey="#btc-content">
                      <h4 className="h4">Bitcoin</h4>
                      <p>bc1qpy9v4ew097g4sa0eghvsp0kpult8ckturhc98j</p>
                      <img src="/static/images/btc.png" alt="btc" width="208" />
                    </Tab.Pane>
                    <Tab.Pane eventKey="#eth-content">
                      <h4 className="h4">Ethereum</h4>
                      <p>0x730f10D119058253e995BAF1FC0AD66eAbE94453</p>
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

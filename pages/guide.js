import Link from 'next/link'
import {useContext, useEffect, useState} from 'react'
import {
  Accordion,
  AccordionContext,
  Card,
  useAccordionToggle,
} from 'react-bootstrap'
import Layout from '../shared/components/layout'

import {useHash} from '../shared/utils'
import {useLatestGithubReleaseDownload} from '../public/api'

function CustomToggle({children, eventKey}) {
  const {setHashForce} = useHash()
  const currentEventKey = useContext(AccordionContext)
  const onAccordionClick = useAccordionToggle(eventKey, () => {
    setHashForce(eventKey)
  })
  const isCurrentEventKey = currentEventKey === eventKey

  return (
    <a
      style={{cursor: 'pointer'}}
      aria-expanded={isCurrentEventKey}
      onClick={onAccordionClick}
    >
      {children}
    </a>
  )
}

export default function Guide() {
  const [release, setRelease] = useState(null)
  const [activeInstall, setActiveInstall] = useState()
  const [activeRemote, setActiveRemote] = useState()
  const [activeIssues, setActiveIssues] = useState()
  const {hash} = useHash()

  useEffect(async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const releseData = await useLatestGithubReleaseDownload()
    setRelease(releseData)
  }, [])

  useEffect(() => {
    setActiveInstall(hash)
    setActiveRemote(hash)
    setActiveIssues(hash)
  }, [hash])

  return (
    <Layout
      title="IDENA Installation and troubleshooting guide"
      description="We are here to help to you with running the Idena Node. Browse through the known issues and most frequently asked questions."
    >
      <section
        className="section section_content menu_section_content menu_guide"
        id="guide"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <div className="section_header">
                <h3 className="h1">Installation and troubleshooting guide</h3>
                <p className="hint text-center">
                  You can find step by step Idena installation guide at{' '}
                  <a href="https://idena.site/" rel="nofollow">
                    idena.site
                  </a>{' '}
                  developed by Idena community member @rioda. <br />
                  Can’t find an answer? Email us at{' '}
                  <a href="mailto:info@idena.io">info@idena.io</a>.
                </p>
              </div>

              <h3>Idena installation</h3>
              <Accordion
                activeKey={activeInstall}
                onSelect={e => setActiveInstall(e)}
              >
                <Card id="guide-install-1">
                  <Card.Header>
                    <CustomToggle eventKey="#guide-install-1">
                      How to install the Idena node on macOS?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-install-1">
                    <div className="card-body">
                      <ul>
                        <li>
                          Create an Idena folder on your desktop where the node
                          will run
                        </li>
                        <li>
                          Download the latest version of the Idena node:{' '}
                          <a className="node_darwin_latest">
                            idena-node-mac-
                            <span className="node_version">
                              {release ? release.nodeVersion : 'x.xx.x'}
                            </span>
                          </a>
                        </li>
                        <li>
                          Move the downloaded file into the newly created Idena
                          folder
                        </li>
                        <li>Open the terminal</li>
                        <li>Switch to the Idena folder by typing cd: </li>
                        <p>
                          <code>cd ~/Desktop/Idena</code>
                        </p>
                        <li>
                          Make the file executable by typing chmod +x command:
                        </li>
                        <p>
                          <code>
                            chmod +x idena-node-mac-
                            <span className="node_version">
                              {release ? release.nodeVersion : 'x.xx.x'}
                            </span>
                          </code>
                        </p>
                        <li>Run the node:</li>
                        <p>
                          <code>
                            ./idena-node-mac-
                            <span className="node_version">
                              {release ? release.nodeVersion : 'x.xx.x'}
                            </span>
                          </code>
                        </p>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="guide-install-2">
                  <Card.Header>
                    <CustomToggle eventKey="#guide-install-2">
                      How to install the Idena client on macOS?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-install-2">
                    <div className="card-body">
                      <ul>
                        <li>
                          Download the latest{' '}
                          <a className="client_darwin_latest">Idena Client</a>{' '}
                          and install it
                        </li>
                        <li>Open Idena as a normal app</li>
                        <li>
                          If macOS complains about an unidentified developer
                          please follow the{' '}
                          <a href="https://support.apple.com/kb/ph25088?locale=en_US">
                            macOS User Guide
                          </a>
                        </li>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="guide-install-3">
                  <Card.Header>
                    <CustomToggle eventKey="#guide-install-3">
                      How to backup the private key?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-install-3">
                    <div className="card-body">
                      <ul>
                        <p>
                          The private key is generated automatically once the
                          node is launched for the first time. You can find the
                          private key in the directory where the node is
                          located:
                        </p>

                        <b>MacOS (built-in node)</b>
                        <p>
                          <code>
                            cd ~/Library/Application\
                            Support/Idena/node/datadir/nodekey/
                            <br />
                            open .
                          </code>
                        </p>

                        <b>Windows (built-in node)</b>
                        <p>
                          <code>
                            %appdata%/Idena/node/datadir/keystore/nodekey
                          </code>
                        </p>

                        <b>Linux (built-in node)</b>
                        <p>
                          <code>~/.config/Idena/node/datadir/keystore</code>
                        </p>

                        <b>Remote node</b>
                        <p>
                          <code>./datadir/keystore/nodekey</code>
                        </p>
                        <p>
                          Make sure to backup the <code>nodekey</code> file
                          securely since the current node version{' '}
                          <span className="node_version">
                            {release ? release.nodeVersion : 'x.xx.x'}
                          </span>{' '}
                          does not support private key encryption.
                        </p>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="guide-install-4">
                  <Card.Header>
                    <CustomToggle eventKey="#guide-install-4">
                      How to move my identity address to another computer?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-install-4">
                    <div className="card-body">
                      <p>
                        In order to run the node with your existing address on
                        another computer, make a copy of your node's private
                        key. You can find the private key file in the directory
                        where the node is located:
                      </p>
                      <p>
                        <code>./datadir/keystore/nodekey</code>
                      </p>
                      <p>
                        Copy the <code>nodekey</code> file to the new location
                        and restart the node there.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="guide-install-5">
                  <Card.Header>
                    <CustomToggle eventKey="#guide-install-5">
                      How to build the Idena client from source?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-install-5">
                    <div className="card-body">
                      <ul>
                        <li>Install npm</li>
                        <li>
                          Get the Idena client source code from the{' '}
                          <a href="https://github.com/idena-network/idena-desktop">
                            github repository
                          </a>
                        </li>
                        <li>Install the dependencies:</li>
                        <code>npm install</code>
                        <li>Run the app:</li>
                        <code>npm run start</code>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h3>Running the Idena node on a remote server</h3>
              <Accordion
                activeKey={activeRemote}
                onSelect={e => setActiveRemote(e)}
              >
                <Card id="guide-remote-0">
                  <Card.Header>
                    <CustomToggle eventKey="#guide-remote-0">
                      What are the minimum requirements for VPS to run the Idena
                      node?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-remote-0">
                    <div className="card-body">
                      <p>
                        You can use the following minimum VPS configuration for
                        running the Idena node:
                      </p>
                      <ul>
                        <li>Linux/x64</li>
                        <li>1 CPU core</li>
                        <li>2 Gb RAM</li>
                        <li>100 Gb HDD</li>
                        <li>100 Mbps uplink</li>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="guide-remote-1">
                  <Card.Header>
                    <CustomToggle eventKey="#guide-remote-1">
                      How to run the Idena node on VPS?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-remote-1">
                    <div className="card-body">
                      <p>
                        <b>1. Check your VPS ports settings</b>
                      </p>
                      <p>
                        Open the following port to allow discovering of your
                        node by other peers:
                      </p>
                      <ul>
                        <li>
                          <code>40405</code>
                        </li>
                      </ul>
                      <p>
                        The Idena node RPC is running at <code>9009</code> port
                        by default. Please make sure that <code>9009</code> port
                        is closed. If you want to connect to your node remotely
                        use a tunnel connection.
                      </p>

                      <p>
                        <b>2. Disable private IP addresses scanning</b>
                      </p>
                      <p>
                        Create the following config file at the same folder
                        where the node is located (download example:{' '}
                        <Link href="/examples/guide-remote-1/config.json">
                          <a>config.json</a>
                        </Link>
                        ):
                      </p>

                      <code>{'{ "IpfsConf": { "Profile": "server" } }'}</code>

                      <br />
                      <br />
                      <p>
                        Run the node with the <code>--config</code> parameter:
                      </p>
                      <code>
                        idena-node-linux-
                        <span className="node_version">
                          {release ? release.nodeVersion : 'x.xx.x'}
                        </span>{' '}
                        --config=config.json
                      </code>

                      <br />
                      <br />
                      <p>
                        <b>3. More details</b>
                      </p>
                      <p>
                        Read tutorial provided by Idena community member{' '}
                        <code>@realRioda</code> on the{' '}
                        <a href="https://idena.site/faq_tutorials.php">
                          https://idena.site/faq_tutorials...
                        </a>{' '}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="guide-remote-2">
                  <Card.Header>
                    <CustomToggle eventKey="#guide-remote-2">
                      How to connect to my Idena node running on a remote server
                      from my local computer?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-remote-2">
                    <div className="card-body">
                      <p>
                        <b>1. Establish tunnel connection (using PuTTy)</b>
                      </p>

                      <ul>
                        <li>Install PuTTY on your local computer</li>
                        <li>
                          Connect to your server with PuTTY using the following
                          tunnel configuration:
                        </li>
                        <div className="fig">
                          <img src="/static/images/tunnel.jpg" alt="" />
                          <p>PuTTY tunnel connection configuration</p>
                        </div>

                        <p>
                          <b>Using ssh</b>
                        </p>
                        <p>You can also setup tunnel connection using ssh:</p>
                        <p>
                          <code>ssh -L 9999:localhost:9009 YOUR_VPS_IP</code>
                        </p>
                      </ul>

                      <p>
                        <b>2. Specify Idena node connection parameters</b>
                      </p>

                      <ul>
                        <li>Open Settings page in the Idena app</li>
                        <li>
                          Activate <code>'Connect to remote node'</code> toggle
                        </li>

                        <div className="fig">
                          <img
                            src="/static/images/myapikey.png"
                            alt="Idena remote node connection settings"
                          />
                          <p>Idena remote node connection settings</p>
                        </div>

                        <li>
                          Specify remote node connection address as follows:
                        </li>
                        <br />
                        <p>
                          <code>http://localhost:9999</code>
                        </p>

                        <li>
                          Specify node api-key parameter for the secure
                          connection.
                        </li>
                        <p>Api-key can be found in the following flie:</p>
                        <p>
                          <code>./datadir/api.key</code>
                        </p>
                        <p>
                          You can also run the node with a custom api-key using{' '}
                          <code>apikey</code> parameter:
                        </p>
                        <p>
                          <code>
                            idena-node-linux-
                            <span className="node_version">
                              {release ? release.nodeVersion : 'x.xx.x'}
                            </span>{' '}
                            --apikey=MY_API_KEY
                          </code>
                        </p>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h3>Troubleshooting</h3>
              <Accordion
                activeKey={activeIssues}
                onSelect={e => setActiveIssues(e)}
              >
                <Card id="guide-issues-1">
                  <Card.Header>
                    <CustomToggle eventKey="#guide-issues-1">
                      I'm having a bad Internet connection. How to reduce the
                      upload traffic produced by the node?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-issues-1">
                    <div className="card-body">
                      <p>
                        Run the node with the <code>lowpower</code> profile
                        parameter specified:
                      </p>
                      <p>
                        <b>Windows</b>
                      </p>
                      <p>
                        <code>
                          idena-node-win-
                          <span className="node_version">
                            {release ? release.nodeVersion : 'x.xx.x'}
                          </span>
                          .exe --profile=lowpower
                        </code>
                      </p>

                      <p>
                        <b>macOS</b>
                      </p>
                      <p>
                        <code>
                          ./idena-node-mac-
                          <span className="node_version">
                            {release ? release.nodeVersion : 'x.xx.x'}
                          </span>{' '}
                          --profile=lowpower
                        </code>
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="guide-issues-3">
                  <Card.Header>
                    <CustomToggle eventKey="#guide-issues-3">
                      Where can I find the Idena node log file?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-issues-3">
                    <div className="card-body">
                      <b>MacOS (built-in node)</b>
                      <p>
                        <code>
                          cd&nbsp;~/Library/Application\&nbsp;Support/Idena/node/datadir/logs/
                          <br />
                          open .
                        </code>
                      </p>

                      <b>Windows (built-in node)</b>
                      <p>
                        <code>%appdata%/Idena/node/datadir/logs/</code>
                      </p>

                      <b>Linux (built-in node)</b>
                      <p>
                        <code>~/.config/Idena/node/datadir/logs/</code>
                      </p>

                      <b>Remote node</b>
                      <p>
                        The log file can be found in the same directory where
                        the Idena node is located:
                      </p>
                      <p>
                        <code>./datadir/logs/output.log</code>
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="guide-issues-4">
                  <Card.Header>
                    <CustomToggle eventKey="#guide-issues-4">
                      Where can I find the Idena client log file?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-issues-4">
                    <div className="card-body">
                      <p>
                        <b>Windows</b>
                      </p>
                      <p>
                        In order to find the Idena client log files, open the
                        following directory in the Windows file explorer:
                      </p>
                      <p>
                        <code>%appdata%/Idena/Logs/</code>
                      </p>

                      <p>
                        <b>macOS</b>
                      </p>
                      <p>
                        In order to find the Idena client log files, type the
                        following in the terminal:
                      </p>
                      <p>
                        <code>cd ~/Library/Logs/Idena</code>
                        <br />
                        <code>open .</code>
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

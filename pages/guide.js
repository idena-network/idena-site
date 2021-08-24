import {useEffect, useState} from 'react'
import {Accordion, Card} from 'react-bootstrap'
import {Trans, useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Layout from '../shared/components/layout'

import {useHash} from '../shared/useHash'
import {useLatestGithubReleaseDownload} from '../shared/api'
import {CustomToggle} from '../shared/components/toggle'
import {LinkText} from '../shared/utils/utils'

export default function Guide() {
  const [release, setRelease] = useState(null)

  const [activeHash, setActiveHash] = useState()
  const [hash] = useHash()

  const {t} = useTranslation('guide')

  useEffect(async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const releseData = await useLatestGithubReleaseDownload()
    releseData.clientAssets.forEach(asset => {
      if (asset.name.search(/.dmg$/) !== -1) {
        releseData.darwinClientLink = asset.browser_download_url
      }
    })
    releseData.nodeAssets.forEach(asset => {
      if (asset.name.search(/^idena-node-mac-.*/) !== -1) {
        releseData.darwinNodeLink = asset.browser_download_url
      }
    })
    setRelease(releseData)
  }, [])

  useEffect(() => {
    setActiveHash(hash)
  }, [hash])

  return (
    <Layout
      title={t('IDENA Installation and troubleshooting guide', {ns: 'guide'})}
      description={t(
        'We are here to help to you with running the Idena Node. Browse through the known issues and most frequently asked questions.',
        {ns: 'guide'}
      )}
    >
      <section
        className="section section_content menu_section_content menu_guide"
        id="guide"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <div className="section_header">
                <h3 className="h1">
                  {t('Installation and troubleshooting guide', {ns: 'guide'})}
                </h3>
                <p className="hint text-center">
                  <Trans i18nKey="idenaSiteHint" t={t} ns="guide">
                    You can find step by step Idena installation guide at{' '}
                    <a href="https://idena.site/" rel="nofollow">
                      idena.site
                    </a>{' '}
                    developed by Idena community member @rioda. <br />
                    Can’t find an answer? Email us at{' '}
                    <a href="mailto:info@idena.io">info@idena.io</a>.
                  </Trans>
                </p>
              </div>

              <h3>{t('Idena installation', {ns: 'guide'})}</h3>
              <Accordion
                activeKey={activeHash}
                onSelect={e => setActiveHash(e)}
              >
                <Card id="guide-install-1">
                  <Card.Header>
                    <CustomToggle eventKey="#guide-install-1">
                      {t('How to install the Idena node on macOS?', {
                        ns: 'guide',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-install-1">
                    <div className="card-body">
                      <ul>
                        <li>
                          {t(
                            'Create an Idena folder on your desktop where the node will run',
                            {ns: 'guide'}
                          )}
                        </li>
                        <li>
                          {t('Download the latest version of the Idena node:', {
                            ns: 'guide',
                            nsSeparator: '!',
                          })}{' '}
                          <a
                            href={release ? release.darwinNodeLink : ''}
                            className="node_darwin_latest"
                          >
                            idena-node-mac-
                            <span className="node_version">
                              {release ? release.nodeVersion : 'x.xx.x'}
                            </span>
                          </a>
                        </li>
                        <li>
                          {t(
                            'Move the downloaded file into the newly created Idena folder',
                            {ns: 'guide'}
                          )}
                        </li>
                        <li>{t('Open the terminal', {ns: 'guide'})}</li>
                        <li>
                          {t('Switch to the Idena folder by typing cd:', {
                            ns: 'guide',
                            nsSeparator: '!',
                          })}{' '}
                        </li>
                        <p>
                          <code>cd ~/Desktop/Idena</code>
                        </p>
                        <li>
                          {t(
                            'Make the file executable by typing chmod +x command:',
                            {ns: 'guide', nsSeparator: '!'}
                          )}
                        </li>
                        <p>
                          <code>
                            chmod +x idena-node-mac-
                            <span className="node_version">
                              {release ? release.nodeVersion : 'x.xx.x'}
                            </span>
                          </code>
                        </p>
                        <li>
                          {t('Run the node:', {ns: 'guide', nsSeparator: '!'})}
                        </li>
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
                      {t('How to install the Idena client on macOS?', {
                        ns: 'guide',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-install-2">
                    <div className="card-body">
                      <ul>
                        <li>
                          <Trans i18nKey="dowloadMacLink" t={t} ns="guide">
                            Download the latest{' '}
                            <a
                              href={release ? release.darwinClientLink : ''}
                              className="client_darwin_latest"
                            >
                              Idena Client
                            </a>{' '}
                            and install it
                          </Trans>
                        </li>
                        <li>
                          {t('Open Idena as a normal app', {ns: 'guide'})}
                        </li>
                        <li>
                          <Trans i18nKey="macUserGuuideLink" t={t} ns="guide">
                            If macOS complains about an unidentified developer
                            please follow the{' '}
                            <a href="https://support.apple.com/kb/ph25088?locale=en_US">
                              macOS User Guide
                            </a>
                          </Trans>
                        </li>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="guide-install-3">
                  <Card.Header>
                    <CustomToggle eventKey="#guide-install-3">
                      {t('How to backup the private key?', {ns: 'guide'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-install-3">
                    <div className="card-body">
                      <ul>
                        <p>
                          {t(
                            'The private key is generated automatically once the node is launched for the first time. You can find the private key in the directory where the node is located:',
                            {ns: 'guide', nsSeparator: '!'}
                          )}
                        </p>

                        <b>MacOS ({t('built-in node', {ns: 'guide'})})</b>
                        <p>
                          <code>
                            cd ~/Library/Application\
                            Support/Idena/node/datadir/nodekey/
                            <br />
                            open .
                          </code>
                        </p>

                        <b>Windows ({t('built-in node', {ns: 'guide'})})</b>
                        <p>
                          <code>
                            %appdata%/Idena/node/datadir/keystore/nodekey
                          </code>
                        </p>

                        <b>Linux ({t('built-in node', {ns: 'guide'})})</b>
                        <p>
                          <code>~/.config/Idena/node/datadir/keystore</code>
                        </p>

                        <b>{t('Remote node', {ns: 'guide'})}</b>
                        <p>
                          <code>./datadir/keystore/nodekey</code>
                        </p>
                        <p>
                          <Trans
                            i18nKey="backupNodekeyFileHint"
                            t={t}
                            ns="guide"
                          >
                            Make sure to backup the <code>nodekey</code> file
                            securely since the current node version{' '}
                            <span className="node_version">
                              {{
                                release: release
                                  ? release.nodeVersion
                                  : 'x.xx.x',
                              }}
                            </span>{' '}
                            does not support private key encryption.
                          </Trans>
                        </p>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="guide-install-4">
                  <Card.Header>
                    <CustomToggle eventKey="#guide-install-4">
                      {t(
                        'How to move my identity address to another computer?',
                        {ns: 'guide'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-install-4">
                    <div className="card-body">
                      <p>
                        {t(
                          `In order to run the node with your existing address on another computer, make a copy of your node's private key. You can find the private key file in the directory where the node is located:`,
                          {ns: 'guide', nsSeparator: '!'}
                        )}
                      </p>
                      <p>
                        <code>./datadir/keystore/nodekey</code>
                      </p>
                      <p>
                        <Trans i18nKey="copyNodekeyFile" t={t} ns="guide">
                          Copy the <code>nodekey</code> file to the new location
                          and restart the node
                        </Trans>
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="guide-install-5">
                  <Card.Header>
                    <CustomToggle eventKey="#guide-install-5">
                      {t('How to build the Idena client from source?', {
                        ns: 'guide',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-install-5">
                    <div className="card-body">
                      <ul>
                        <li>Install npm</li>
                        <li>
                          <Trans
                            i18nKey="idenaClientGuthubLink"
                            t={t}
                            ns="guide"
                          >
                            Get the Idena client source code from the{' '}
                            <a href="https://github.com/idena-network/idena-desktop">
                              github repository
                            </a>
                          </Trans>
                        </li>
                        <li>
                          {t('Install the dependencies:', {
                            ns: 'guide',
                            nsSeparator: '!',
                          })}
                        </li>
                        <code>npm install</code>
                        <li>
                          {t('Run the app:', {ns: 'guide', nsSeparator: '!'})}
                        </li>
                        <code>npm run start</code>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h3>
                {t('Running the Idena node on a remote server', {ns: 'guide'})}
              </h3>
              <Accordion
                activeKey={activeHash}
                onSelect={e => setActiveHash(e)}
              >
                <Card id="guide-remote-0">
                  <Card.Header>
                    <CustomToggle eventKey="#guide-remote-0">
                      {t(
                        'What are the minimum requirements for VPS to run the Idena node?',
                        {ns: 'guide'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-remote-0">
                    <div className="card-body">
                      <p>
                        {t(
                          'You can use the following minimum VPS configuration for running the Idena node:',
                          {ns: 'guide', nsSeparator: '!'}
                        )}
                      </p>
                      <ul>
                        <li>Linux/x64</li>
                        <li>2 CPU core</li>
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
                      {t('How to run the Idena node on VPS?', {ns: 'guide'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-remote-1">
                    <div className="card-body">
                      <p>
                        <b>
                          {t('1. Check your VPS ports settings', {ns: 'guide'})}
                        </b>
                      </p>
                      <p>
                        {t(
                          'Open the following port to allow discovering of your node by other peers:',
                          {ns: 'guide', nsSeparator: '!'}
                        )}
                      </p>
                      <ul>
                        <li>
                          <code>40405</code>
                        </li>
                      </ul>
                      <p>
                        <Trans i18nKey="defaultNodePort" t={t} ns="guide">
                          The Idena node RPC is running at <code>9009</code>{' '}
                          port by default. Please make sure that{' '}
                          <code>9009</code> port is closed. If you want to
                          connect to your node remotely use a tunnel connection.
                        </Trans>
                      </p>

                      <p>
                        <b>
                          {t('2. Disable private IP addresses scanning', {
                            ns: 'guide',
                          })}
                        </b>
                      </p>
                      <p>
                        <Trans i18nKey="createConfigFile" t={t} ns="guide">
                          Create the following config file at the same folder
                          where the node is located (download example:{' '}
                          <LinkText href="/examples/guide-remote-1/config.json">
                            <a>config.json</a>
                          </LinkText>
                          ):
                        </Trans>
                      </p>

                      <code>{'{ "IpfsConf": { "Profile": "server" } }'}</code>

                      <br />
                      <br />
                      <p>
                        <Trans i18nKey="runConfigParameter" t={t} ns="guide">
                          Run the node with the <code>--config</code> parameter:
                        </Trans>
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
                        <b>{t('3. More details', {ns: 'guide'})}</b>
                      </p>
                      <p>
                        <Trans
                          i18nKey="communityMembetTutorial"
                          t={t}
                          ns="guide"
                        >
                          Read tutorial provided by Idena community member{' '}
                          <code>@realRioda</code> on the{' '}
                          <a href="https://idena.site/faq_tutorials.php">
                            https://idena.site/faq_tutorials...
                          </a>{' '}
                        </Trans>
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="guide-remote-2">
                  <Card.Header>
                    <CustomToggle eventKey="#guide-remote-2">
                      {t(
                        'How to connect to my Idena node running on a remote server from my local computer?',
                        {ns: 'guide'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-remote-2">
                    <div className="card-body">
                      <p>
                        <b>
                          {t('1. Establish tunnel connection (using PuTTy)', {
                            ns: 'guide',
                          })}
                        </b>
                      </p>

                      <ul>
                        <li>
                          {t('Install PuTTY on your local computer', {
                            ns: 'guide',
                          })}
                        </li>
                        <li>
                          {t(
                            'Connect to your server with PuTTY using the following tunnel configuration:',
                            {ns: 'guide', nsSeparator: '!'}
                          )}
                        </li>
                        <div className="fig">
                          <img src="/static/images/tunnel.jpg" alt="" />
                          <p>
                            {t('PuTTY tunnel connection configuration', {
                              ns: 'guide',
                            })}
                          </p>
                        </div>

                        <p>
                          <b>{t('Using ssh', {ns: 'guide'})}</b>
                        </p>
                        <p>
                          {t(
                            'You can also setup tunnel connection using ssh:',
                            {ns: 'guide', nsSeparator: '!'}
                          )}
                        </p>
                        <p>
                          <code>ssh -L 9999:localhost:9009 YOUR_VPS_IP</code>
                        </p>
                      </ul>

                      <p>
                        <b>
                          {t('2. Specify Idena node connection parameters', {
                            ns: 'guide',
                          })}
                        </b>
                      </p>

                      <ul>
                        <li>
                          {t('Open Settings page in the Idena app', {
                            ns: 'guide',
                          })}
                        </li>
                        <li>
                          <Trans i18nKey="connectToRemoteNode" t={t} ns="guide">
                            Activate <code>'Connect to remote node'</code>{' '}
                            toggle
                          </Trans>
                        </li>

                        <div className="fig">
                          <img
                            src="/static/images/myapikey.png"
                            alt="Idena remote node connection settings"
                          />
                          <p>
                            {t('Idena remote node connection settings', {
                              ns: 'guide',
                            })}
                          </p>
                        </div>

                        <li>
                          {t(
                            'Specify remote node connection address as follows:',
                            {ns: 'guide', nsSeparator: '!'}
                          )}
                        </li>
                        <br />
                        <p>
                          <code>http://localhost:9999</code>
                        </p>

                        <li>
                          {t(
                            'Specify node api-key parameter for the secure connection.',
                            {ns: 'guide'}
                          )}
                        </li>
                        <p>Api-key can be found in the following flie:</p>
                        <p>
                          <code>./datadir/api.key</code>
                        </p>
                        <p>
                          <Trans
                            i18nKey="runUsingCustomApiKey"
                            t={t}
                            ns="guide"
                          >
                            You can also run the node with a custom api-key
                            using <code>apikey</code> parameter:
                          </Trans>
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

              <h3>{t('Troubleshooting', {ns: 'guide'})}</h3>
              <Accordion
                activeKey={activeHash}
                onSelect={e => setActiveHash(e)}
              >
                <Card id="guide-issues-1">
                  <Card.Header>
                    <CustomToggle eventKey="#guide-issues-1">
                      {t(
                        `I'm having a bad Internet connection. How to reduce the upload traffic produced by the node?`,
                        {ns: 'guide'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-issues-1">
                    <div className="card-body">
                      <p>
                        <Trans i18nKey="runNodeWithLowpower" t={t} ns="guide">
                          Run the node with the <code>lowpower</code> profile
                          parameter specified:
                        </Trans>
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
                      {t('Where can I find the Idena node log file?', {
                        ns: 'guide',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-issues-3">
                    <div className="card-body">
                      <b>MacOS ({t('built-in node', {ns: 'guide'})})</b>
                      <p>
                        <code>
                          cd&nbsp;~/Library/Application\&nbsp;Support/Idena/node/datadir/logs/
                          <br />
                          open .
                        </code>
                      </p>

                      <b>Windows ({t('built-in node', {ns: 'guide'})})</b>
                      <p>
                        <code>%appdata%/Idena/node/datadir/logs/</code>
                      </p>

                      <b>Linux ({t('built-in node', {ns: 'guide'})})</b>
                      <p>
                        <code>~/.config/Idena/node/datadir/logs/</code>
                      </p>

                      <b>{t('Remote node', {ns: 'guide'})}</b>
                      <p>
                        {t(
                          'The log file can be found in the same directory where the Idena node is located:',
                          {ns: 'guide', nsSeparator: '!'}
                        )}
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
                      {t('Where can I find the Idena client log file?', {
                        ns: 'guide',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#guide-issues-4">
                    <div className="card-body">
                      <p>
                        <b>Windows</b>
                      </p>
                      <p>
                        {t(
                          'In order to find the Idena client log files, open the following directory in the Windows file explorer:',
                          {ns: 'guide', nsSeparator: '!'}
                        )}
                      </p>
                      <p>
                        <code>%appdata%/Idena/Logs/</code>
                      </p>

                      <p>
                        <b>macOS</b>
                      </p>
                      <p>
                        {t(
                          'In order to find the Idena client log files, type the following in the terminal:',
                          {ns: 'guide', nsSeparator: '!'}
                        )}
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

export const getStaticProps = async ({locale}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['guide', 'common'])),
  },
})

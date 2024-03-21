import Link from 'next/link'
import {useEffect, useState} from 'react'
import {Tab, Tabs} from 'react-bootstrap'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {Trans, useTranslation} from 'next-i18next'
import Layout from '../shared/components/layout'
import {useLatestGithubReleaseDownload} from '../shared/api'
import {LinkText} from '../shared/utils/utils'

function GetFileSize(s) {
  return `${Math.round((s / 1024 / 1024) * 100) / 100}\xA0Mb`
}

function GetFileDate(dt) {
  return new Date(dt).toISOString().slice(0, 10)
}

function getAssetData({t}, clientVersion, clientAsset, nodeVersion, nodeAsset) {
  const result = {}

  result.client = {
    link: clientAsset.browser_download_url,
    description: `${t('Size', {ns: 'download'})}:\xA0${GetFileSize(
      clientAsset.size
    )} \n${t('Published', {ns: 'download'})}:\xA0${GetFileDate(
      clientAsset.created_at
    )} \n${t('Version', {ns: 'download'})}:\xA0${clientVersion}`,
  }
  result.node = {
    description: `${t('Size', {ns: 'download'})}:\xA0${GetFileSize(
      nodeAsset.size
    )} ${t('Published', {ns: 'download'})}:\xA0${GetFileDate(
      nodeAsset.created_at
    )} ${t('Version', {ns: 'download'})}:\xA0${nodeVersion}`,
    linkRow: (
      <tr>
        <td>
          <Link href={nodeAsset.browser_download_url}>{nodeAsset.name}</Link>
        </td>
        <td>{GetFileSize(nodeAsset.size)}</td>
        <td>{nodeVersion}</td>
        <td>{GetFileDate(nodeAsset.created_at)}</td>
      </tr>
    ),
  }

  return result
}

export default function Download() {
  const [osWindows, setOsWindows] = useState(null)
  const [osDarwin, setOsDarwin] = useState(null)
  const [osLinux, setOsLinux] = useState(null)

  const {t} = useTranslation('download')

  useEffect(() => {
    async function FetchData() {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const releseData = await useLatestGithubReleaseDownload()
      const rawAssets = {}

      releseData.clientAssets.forEach(asset => {
        if (asset.name.search(/.exe$/) !== -1) {
          rawAssets.clientWindows = asset
        } else if (asset.name.search(/.dmg$/) !== -1) {
          rawAssets.clientDarwin = asset
        } else if (asset.name.search(/.deb$/) !== -1) {
          rawAssets.clientLinux = asset
        }
      })
      releseData.nodeAssets.forEach(asset => {
        if (asset.name.search(/^idena-node-win-.*.exe$/) !== -1) {
          rawAssets.nodeWindows = asset
        } else if (asset.name.search(/^idena-node-mac-.*/) !== -1) {
          rawAssets.nodeDarwin = asset
        } else if (
          asset.name.search(/^idena-node-linux-.*/) !== -1 &&
          asset.name.search(/^idena-node-linux-aarch64-.*/) === -1
        ) {
          rawAssets.nodeLinux = asset
        }
      })

      setOsWindows(
        getAssetData(
          {t},
          releseData.clientVersion,
          rawAssets.clientWindows,
          releseData.nodeVersion,
          rawAssets.nodeWindows
        )
      )
      setOsDarwin(
        getAssetData(
          {t},
          releseData.clientVersion,
          rawAssets.clientDarwin,
          releseData.nodeVersion,
          rawAssets.nodeDarwin
        )
      )
      setOsLinux(
        getAssetData(
          {t},
          releseData.clientVersion,
          rawAssets.clientLinux,
          releseData.nodeVersion,
          rawAssets.nodeLinux
        )
      )
    }
    FetchData()
  }, [t])

  return (
    <Layout
      title={t('Download Idena Node', {ns: 'download'})}
      description={t(
        'Download stable builds of Idena Node and Desktop Idena App.',
        {ns: 'download'}
      )}
    >
      <section
        className="section section_content menu_section_content menu_download"
        id="download"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <div className="section_header">
                <h1 className="h1">
                  {t('Download node', {
                    ns: 'download',
                  })}
                </h1>
                <p className="hint text-center">
                  <Trans i18nKey="download_1" t={t} ns="download">
                    Download the latest 64-bit builds of the Idena node for the
                    supported platforms below.
                  </Trans>
                  <br />
                  <Trans i18nKey="nodeBuildGuideLink_2" t={t} ns="download">
                    See <LinkText href="/guide">guide</LinkText> if you're
                    experiencing issues with Idena node.
                  </Trans>
                </p>
              </div>

              <div className="" style={{marginBottom: '50px'}}>
                <div className="row justify-content-center">
                  <div className="col-md-12 col-lg-12 section_panel__cell section_black">
                    <div className="container">
                      <h2 className="h2 h2-light text-center1">
                        {t('Validation ceremony risk', {
                          ns: 'download',
                        })}
                      </h2>

                      <p className="disclaimer-hint">
                        <Trans
                          i18nKey="DownloadNodeValidationWarning"
                          t={t}
                          ns="download"
                        >
                          Your Idena node requires stable Internet connection
                          and consumes more memory and CPU resources during the
                          validation ceremony. If peers are disconnected you may
                          fail validation. We recommend you to keep your{' '}
                          <LinkText href="https://app.idena.io">
                            Web app
                          </LinkText>{' '}
                          open in case of your node crash.
                        </Trans>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="h2">
                {t('Desktop App with built-in node', {
                  ns: 'download',
                })}
              </h2>

              <p>
                {t(
                  'Download the Desktop Idena app to run it on your computer. The Idena node will be downloaded automatically with the first start.',
                  {ns: 'download'}
                )}
              </p>
              <p>
                <Trans i18nKey="remoreNodeGuideLink" t={t} ns="download">
                  You can also connect to your remote Idena node if you run it
                  separately or on VPS (see the{' '}
                  <LinkText href="/guide#guide-remote-2">guide</LinkText>
                  ).
                </Trans>
              </p>

              <div className="block_list">
                <div className="row justify-content-center">
                  <div className="col-sm-6">
                    <div className="block text-center section_gray">
                      <div className="block__title">
                        <i className="icon icon--macos"></i>
                        <span>macOS</span>
                      </div>
                      <div className="block__action">
                        <Link
                          href={osDarwin ? osDarwin.client.link : '#'}
                          className="btn btn-secondary btn-sm client_darwin_latest"
                        >
                          {t('Download', {ns: 'download'})}
                        </Link>
                      </div>
                      <div className="block__hint client_darwin_latest_size">
                        {osDarwin
                          ? osDarwin.client.description
                          : t('Loading...', {ns: 'download'})}
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="block text-center section_gray">
                      <div className="block__title">
                        <i className="icon icon--windows"></i>
                        <span>Windows</span>
                      </div>
                      <div className="block__action">
                        <Link
                          href={osWindows ? osWindows.client.link : '#'}
                          className="btn btn-secondary btn-sm client_windows_latest"
                        >
                          {t('Download', {ns: 'download'})}
                        </Link>
                      </div>
                      <div className="block__hint client_windows_latest_size">
                        {osWindows
                          ? osWindows.client.description
                          : t('Loading...', {ns: 'download'})}
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="block text-center section_gray">
                      <div className="block__title">
                        <i className="icon icon--linux"></i>
                        <span>Linux</span>
                      </div>
                      <div className="block__action">
                        <Link
                          href={osLinux ? osLinux.client.link : '#'}
                          className="btn btn-secondary btn-sm client_linux_latest"
                        >
                          {t('Download', {ns: 'download'})}
                        </Link>
                      </div>
                      <div className="block__hint client_linux_latest_size">
                        {osLinux
                          ? osLinux.client.description
                          : t('Loading...', {ns: 'download'})}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                {t('All builds of the Desktop Idena App are available on', {
                  ns: 'download',
                })}{' '}
                <a
                  href="https://github.com/idena-network/idena-desktop/releases"
                  rel="nofollow"
                >
                  Github
                </a>
                .
                <br />
                <Trans i18nKey="buildFromSourceGuideLink" t={t} ns="download">
                  You can also build the Desktop Idena app from source (see the{' '}
                  <LinkText href="/guide#guide-install-5">guide</LinkText>
                  ).
                </Trans>
              </p>

              <br />
              <br />

              <h2 className="h2">{t('Idena Node', {ns: 'download'})}</h2>

              <p>
                <Trans i18nKey="remoteNodeGuideLink" t={t} ns="download">
                  Download Idena node if you want to run it separately or on
                  your remote VPS (please check the{' '}
                  <LinkText href="/guide#guide-remote-0">
                    minimum requirements for VPS
                  </LinkText>
                  ).
                </Trans>
              </p>

              <Tabs
                defaultActiveKey="#node_darwin"
                transition={false}
                id="tab_node"
              >
                <Tab eventKey="#node_darwin" title="macOS">
                  <div
                    className="tab-content block section_gray"
                    id="tab_node_content"
                  >
                    <div className="table-responsive">
                      <table className="table" id="node_darwin_table">
                        <tbody>
                          <tr>
                            <th>{t('Build', {ns: 'download'})}</th>
                            <th>{t('Size', {ns: 'download'})}</th>
                            <th>{t('Version', {ns: 'download'})}</th>
                            <th>{t('Published', {ns: 'download'})}</th>
                          </tr>
                          {osDarwin && osDarwin.node.linkRow}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="#node_windows" title="Windows">
                  <div
                    className="tab-content block section_gray"
                    id="tab_node_content"
                  >
                    <div className="table-responsive">
                      <table className="table" id="node_windows_table">
                        <tbody>
                          <tr>
                            <th>{t('Build', {ns: 'download'})}</th>
                            <th>{t('Size', {ns: 'download'})}</th>
                            <th>{t('Version', {ns: 'download'})}</th>
                            <th>{t('Published', {ns: 'download'})}</th>
                          </tr>
                          {osWindows && osWindows.node.linkRow}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="#node_linux" title="Linux">
                  <div
                    className="tab-content block section_gray"
                    id="tab_node_content"
                  >
                    <div className="table-responsive">
                      <table className="table" id="node_linux_table">
                        <tbody>
                          <tr>
                            <th>{t('Build', {ns: 'download'})}</th>
                            <th>{t('Size', {ns: 'download'})}</th>
                            <th>{t('Version', {ns: 'download'})}</th>
                            <th>{t('Published', {ns: 'download'})}</th>
                          </tr>
                          {osLinux && osLinux.node.linkRow}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Tab>
              </Tabs>

              <p>
                <Trans i18nKey="allBuildsGithubLink" t={t} ns="download">
                  All builds of the Idena node are available on{' '}
                  <a
                    href="https://github.com/idena-network/idena-go/releases"
                    rel="nofollow"
                  >
                    Github
                  </a>
                  .
                  <br />
                  You can also build the Idena node from{' '}
                  <a href="https://github.com/idena-network" rel="nofollow">
                    source
                  </a>
                  .
                </Trans>
              </p>
              <br />
              <br />

              <p className="disclaimer-hint">
                {t(
                  '* DISCLAIMER: Idena makes no representations or warranties of any kind concerning the safety, suitability, lack of viruses or inaccuracies of this software. There are inherent dangers in the use of any software, and you are solely responsible for determining whether Idena is compatible with your equipment and other software installed on your equipment. Furthermore, users commit themselves to a legally appropriate use of Idena according to the respective national as well as international law. You are also solely responsible for the protection of your equipment and backup of your data, and the provider will not be liable for any damages or loss of iDNA you may suffer in connection with using, modifying, or distributing this software.',
                  {ns: 'download'}
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps = async ({locale}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['download', 'common'])),
  },
})

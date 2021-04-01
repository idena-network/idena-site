import Link from 'next/link'
import {useEffect, useState} from 'react'
import {Tab, Tabs} from 'react-bootstrap'
import Layout from '../shared/components/layout'
import {useLatestGithubReleaseDownload} from '../public/api'
import {useHash} from '../shared/utils'

function GetFileSize(s) {
  return `${Math.round((s / 1024 / 1024) * 100) / 100}\xA0Mb`
}

function GetFileDate(dt) {
  return new Date(dt).toISOString().slice(0, 10)
}

function getAssetData(clientVersion, clientAsset, nodeVersion, nodeAsset) {
  const result = {}

  result.client = {
    link: clientAsset.browser_download_url,
    description: `Size:\xA0${GetFileSize(
      clientAsset.size
    )} \nPublished:\xA0${GetFileDate(
      clientAsset.created_at
    )} \nVersion:\xA0${clientVersion}`,
  }
  result.node = {
    description: `Size:\xA0${GetFileSize(
      nodeAsset.size
    )} Published:\xA0${GetFileDate(
      nodeAsset.created_at
    )} Version:\xA0${nodeVersion}`,
    linkRow: (
      <tr>
        <td>
          <Link href={nodeAsset.browser_download_url}>
            <a>{nodeAsset.name}</a>
          </Link>
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

  useEffect(async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const releseData = await useLatestGithubReleaseDownload()
    const rawAssets = {} // Как-то плохо это выглядит #typization

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
      } else if (asset.name.search(/^idena-node-linux-.*/) !== -1) {
        rawAssets.nodeLinux = asset
      }
    })

    setOsWindows(
      getAssetData(
        releseData.clientVersion,
        rawAssets.clientWindows,
        releseData.nodeVersion,
        rawAssets.nodeWindows
      )
    )
    setOsDarwin(
      getAssetData(
        releseData.clientVersion,
        rawAssets.clientDarwin,
        releseData.nodeVersion,
        rawAssets.nodeDarwin
      )
    )
    setOsLinux(
      getAssetData(
        releseData.clientVersion,
        rawAssets.clientLinux,
        releseData.nodeVersion,
        rawAssets.nodeLinux
      )
    )
  }, [])

  return (
    <Layout
      title="Download Idena Node"
      description="Download stable and develop builds of Idena Node and Idena Client."
    >
      <section
        className="section section_content menu_section_content menu_download"
        id="download"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <div className="section_header">
                <h3 className="h1">Download</h3>
                <p className="hint text-center">
                  You can download the latest 64-bit develop builds of the Idena
                  app and node for the supported platforms below.
                  <br />
                  See{' '}
                  <Link href="/guide">
                    <a>Installation and troubleshooting guide</a>
                  </Link>{' '}
                  if you're experiencing issues with installation and running
                  the Idena node.
                  <br />
                  DISCLAIMER: You run this software at your own risk(*)
                </p>
              </div>

              <h3>Idena app (client with a built-in node)</h3>

              <p>
                Download the Idena app to run it on your desktop. The Idena node
                will be downloaded automatically with the first start.
              </p>
              <p>
                You can also connect to your remote Idena node if you run it
                separately or on VPS (see the{' '}
                <Link href="/guide#guide-remote-2">
                  <a>guide</a>
                </Link>
                ).
              </p>

              <div className="block_list">
                <div className="row justify-content-center">
                  <div className="col-sm-6">
                    <div className="block text-center">
                      <div className="block__title">
                        <i className="icon icon--macos"></i>
                        <span>macOS</span>
                      </div>
                      <div className="block__action">
                        <Link href={osDarwin ? osDarwin.client.link : '#'}>
                          <a className="btn btn-secondary btn-sm client_darwin_latest">
                            Download
                          </a>
                        </Link>
                      </div>
                      <div className="block__hint client_darwin_latest_size">
                        {osDarwin ? osDarwin.client.description : 'Loading...'}
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="block text-center">
                      <div className="block__title">
                        <i className="icon icon--windows"></i>
                        <span>Windows</span>
                      </div>
                      <div className="block__action">
                        <Link href={osWindows ? osWindows.client.link : '#'}>
                          <a className="btn btn-secondary btn-sm client_windows_latest">
                            Download
                          </a>
                        </Link>
                      </div>
                      <div className="block__hint client_windows_latest_size">
                        {osWindows
                          ? osWindows.client.description
                          : 'Loading...'}
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="block text-center">
                      <div className="block__title">
                        <i className="icon icon--linux"></i>
                        <span>Linux</span>
                      </div>
                      <div className="block__action">
                        <Link href={osLinux ? osLinux.client.link : '#'}>
                          <a className="btn btn-secondary btn-sm client_linux_latest">
                            Download
                          </a>
                        </Link>
                      </div>
                      <div className="block__hint client_linux_latest_size">
                        {osLinux ? osLinux.client.description : 'Loading...'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                All builds of the Idena client are available on{' '}
                <a
                  href="https://github.com/idena-network/idena-desktop/releases"
                  rel="nofollow"
                >
                  Github
                </a>
                .
                <br />
                You can also build the Idena app from source (see the{' '}
                <Link href="/guide#guide-install-5">
                  <a>guide</a>
                </Link>
                ).
              </p>

              <br />
              <br />

              <h3>Idena node builds</h3>

              <p>
                Download Idena node if you want to run it separately or on your
                remote VPS (please check the{' '}
                <Link href="/guide#guide-remote-1">
                  <a>guide</a>
                </Link>
                ).
              </p>

              <Tabs
                defaultActiveKey="#node_darwin"
                transition={false}
                id="tab_node"
              >
                <Tab eventKey="#node_darwin" title="macOS">
                  <div className="tab-content block" id="tab_node_content">
                    <div className="table-responsive">
                      <table className="table" id="node_darwin_table">
                        <tr>
                          <th>Build</th>
                          <th>Size</th>
                          <th>Version</th>
                          <th>Published</th>
                        </tr>
                        {osDarwin && osDarwin.node.linkRow}
                      </table>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="#node_windows" title="Windows">
                  <div className="tab-content block" id="tab_node_content">
                    <div className="table-responsive">
                      <table className="table" id="node_windows_table">
                        <tr>
                          <th>Build</th>
                          <th>Size</th>
                          <th>Version</th>
                          <th>Published</th>
                        </tr>
                        {osWindows && osWindows.node.linkRow}
                      </table>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="#node_linux" title="Linux">
                  <div className="tab-content block" id="tab_node_content">
                    <div className="table-responsive">
                      <table className="table" id="node_linux_table">
                        <tr>
                          <th>Build</th>
                          <th>Size</th>
                          <th>Version</th>
                          <th>Published</th>
                        </tr>
                        {osLinux && osLinux.node.linkRow}
                      </table>
                    </div>
                  </div>
                </Tab>
              </Tabs>

              <p>
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
              </p>
              <br />
              <br />

              <p className="disclaimer-hint">
                * DISCLAIMER: Idena makes no representations or warranties of
                any kind concerning the safety, suitability, lack of viruses or
                inaccuracies of this software. There are inherent dangers in the
                use of any software, and you are solely responsible for
                determining whether Idena is compatible with your equipment and
                other software installed on your equipment. Furthermore, users
                commit themselves to a legally appropriate use of Idena
                according to the respective national as well as international
                law. You are also solely responsible for the protection of your
                equipment and backup of your data, and the provider will not be
                liable for any damages or loss of iDNA you may suffer in
                connection with using, modifying, or distributing this software.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

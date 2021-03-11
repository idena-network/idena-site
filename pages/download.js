import Link from 'next/link'
import Layout from '../shared/components/layout'

export default function Download() {
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
                <Link href="/guide">
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
                        <a
                          href="#"
                          className="btn btn-secondary btn-sm client_darwin_latest"
                        >
                          Download
                        </a>
                      </div>
                      <div className="block__hint client_darwin_latest_size">
                        Loading...
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
                        <a
                          href="#"
                          className="btn btn-secondary btn-sm client_windows_latest"
                        >
                          Download
                        </a>
                      </div>
                      <div className="block__hint client_windows_latest_size">
                        Loading...
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
                        <a
                          href="#"
                          className="btn btn-secondary btn-sm client_linux_latest"
                        >
                          Download
                        </a>
                      </div>
                      <div className="block__hint client_linux_latest_size">
                        Loading...
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
                <Link href="/guide">
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
                <Link href="/guide">
                  <a>guide</a>
                </Link>
                ).
              </p>

              <ul className="nav nav-tabs" id="tab_node" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="node_darwin_tab"
                    data-toggle="tab"
                    href="#node_darwin"
                    role="tab"
                    aria-controls="node_darwin"
                    aria-selected="true"
                  >
                    macOS
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="node_windows_tab"
                    data-toggle="tab"
                    href="#node_windows"
                    role="tab"
                    aria-controls="node_windows"
                    aria-selected="false"
                  >
                    Windows
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="node_linux_tab"
                    data-toggle="tab"
                    href="#node_linux"
                    role="tab"
                    aria-controls="node_linux"
                    aria-selected="false"
                  >
                    Linux
                  </a>
                </li>
              </ul>
              <div className="tab-content block" id="tab_node_content">
                <div
                  className="tab-pane"
                  id="node_windows"
                  role="tabpanel"
                  aria-labelledby="client_windows_tab"
                >
                  <div className="table-responsive">
                    <table className="table" id="node_windows_table">
                      <tr>
                        <th>Build</th>
                        <th>Size</th>
                        <th>Version</th>
                        <th>Published</th>
                      </tr>
                    </table>
                  </div>
                </div>
                <div
                  className="tab-pane"
                  id="node_linux"
                  role="tabpanel"
                  aria-labelledby="node_linux_tab"
                >
                  <div className="table-responsive">
                    <table className="table" id="node_linux_table">
                      <tr>
                        <th>Build</th>
                        <th>Size</th>
                        <th>Version</th>
                        <th>Published</th>
                      </tr>
                    </table>
                  </div>
                </div>
                <div
                  className="tab-pane show active"
                  id="node_darwin"
                  role="tabpanel"
                  aria-labelledby="node_darwin_tab"
                >
                  <div className="table-responsive">
                    <table className="table" id="node_darwin_table">
                      <tr>
                        <th>Build</th>
                        <th>Size</th>
                        <th>Version</th>
                        <th>Published</th>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>

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

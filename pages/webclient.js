import Link from 'next/link'
import Layout from '../shared/components/layout'

export default function Webclient() {
  return (
    <Layout
      title="Idena web client"
      description="Join mining Idena with your browser."
    >
      <section
        className="section section_content menu_section_content menu_webclient"
        id="webclient"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <div className="section_header">
                <h3 className="h1">Idena web client</h3>
                <p className="hint text-center">
                  Get access to Idena in your browser
                </p>
              </div>

              <h4>Starting the Idena web client</h4>

              <p>
                Use the Idena web client if you do not have access to your
                computer during the validation ceremony or have problems with
                your node synchronization.
              </p>

              <div className="block_list">
                <div className="row justify-content-center">
                  <div className="col-sm-6">
                    <div className="block text-center">
                      <div className="block__title">
                        <i className="icon icon--web1"></i>
                        <span>Idena web client</span>
                      </div>
                      <div className="block__action">
                        <a
                          href="https://app.idena.io"
                          className="btn btn-secondary btn-sm web-client"
                        >
                          Start
                        </a>
                      </div>
                      <div className="block__hint">https://app.idena.io</div>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                You can run the web client from the{' '}
                <a
                  href="https://github.com/idena-network/idena-web"
                  rel="nofollow"
                >
                  source code
                </a>
                .
              </p>

              <h4>Using a shared node</h4>

              <p>
                To use the Idena web client, you need to connect to one of the
                shared nodes provided by Idena community members or Idena core
                team.
              </p>
              <p>
                Request an API key in the{' '}
                <a href="https://t.me/IdenaSharedNodes">Telegram chat</a>.
              </p>

              <h4>How can use my existing identity on the web?</h4>
              <p>
                In order to have web access to the account that you have on your
                desktop version of Idena app, you need to export the private key
                at the Settings page.
              </p>
              <p>
                The private key should be imported into the web client. It will
                be stored in the browser encrypted with a password. The private
                key never leaves your browser and is used to sign transactions
                that are sent to the shared node.
              </p>

              <h4>Can I mine iDNA coins using Idena web client?</h4>
              <p>
                When using the web client, you can only earn validation rewards
                (50% of possible rewards). In order to mine coins, you need to{' '}
                <Link href="/download">
                  <a>download</a>
                </Link>{' '}
                and run your own node.
              </p>

              <h4>How can I share my Idena node?</h4>
              <p>
                If you want to share your node hosted on a VPS with other users,
                follow the{' '}
                <a
                  href="https://discuss.idena.website/d/36-running-your-own-shared-node-step-by-step-tutorial"
                  nofollow
                >
                  instructions
                </a>
                .
              </p>

              <h4>
                Why cannot I send my iDNA coins using the Idena web client?
              </h4>
              <p>
                Wallets page is not yet availble in the web client. Please use
                the{' '}
                <Link href="/download">
                  <a>Idena app</a>
                </Link>{' '}
                instead.
              </p>
              <p>
                <a href="https://medium.com/idena/democratizing-access-to-crypto-idena-is-now-in-your-web-browser-84d22cda6539">
                  Learn more
                </a>{' '}
                about the Idena web client development.
              </p>

              <br />
              <br />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

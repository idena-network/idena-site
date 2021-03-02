import Link from 'next/link'
import Layout from '../shared/components/layout'

export default function Manifesto() {
  return (
    <Layout
      title="Idena Manifesto: Digital personhood is the building block of the decentralized future"
      description="The Internet democratized information sharing, but like any complex socio-technical system, it tends to concentrate power. There is a call for a solution..."
    >
      <section
        className="section section_content menu_section_content menu_manifesto"
        id="manifesto"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <div className="section_header">
                <h3 className="h1">Manifesto</h3>
              </div>
              <p>
                The Internet has democratized information sharing, but, like any
                complex socio-technical system, it tends to{' '}
                <strong>concentrate power</strong>.
              </p>
              <p>
                The World Wide Web is centered around the cloud infrastructure
                of super conglomerates like Amazon, Microsoft, and Facebook.
                They enjoy economy of scale and have access to the best
                engineering teams to create even more gravity for the solid
                core.
              </p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <blockquote>We are all citizens of Google and Apple.</blockquote>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <p>
                We are happier, fitter, more productive, but...{' '}
                <strong>dependent, monetized, surveilled</strong>.
              </p>
              <p>
                Even best-in-class secure email and messaging services like
                ProtonMail or Signal{' '}
                <strong>require us to disclose our identity</strong> one way or
                another for long-term storage on their servers.
              </p>
              <p>
                Ten years ago, Bitcoin paved the way for reliable
                censorship-resistant digital cash, truly distributed
                infrastructure, and innovative leaderless governance. It was
                followed by Ethereum, which has proven the concept of global
                general-purpose computing and formed a vibrant ecosystem of
                decentralized application developers.
              </p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <blockquote>
                While blockchain technology is still in its infancy, it has
                already experienced its own concentration of power.
              </blockquote>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <p>
                Over time, the validation of public blockchains got pooled in
                the hands of a few miners, making it easy to form cartels and
                distort governance. There are{' '}
                <strong>
                  13 controlling pools in Bitcoin, 20 distinct miners in
                  Ethereum, and 21 block producers in EOS
                </strong>
                . Fifty percent of Ethers are owned by 400 addresses. The “Proof
                of Stake” mechanism will only make the distribution more extreme
                — the rich become richer. Such is the nature of money.
              </p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <blockquote>
                We believe that cryptoidentity is the building block of
                the&nbsp;decentralized future
              </blockquote>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <p>
                There is a call for a to the growing imbalance of power in
                blockchain and Internet applications.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section section_content menu_section_content menu_manifesto"
        id="values"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <h3>Why Idena</h3>

              <h4>Unique cryptoidentity</h4>
              <p>
                We believe that a cryptoidentity is the building block of the
                decentralized future. Such an identity can be constructed to be
                anonymous, self-managed, and valid globally, no matter where the
                person lives. No trusted authorities are needed to achieve this.
                All we need to know about the account is that there is a single
                living person to whom that account belongs. We call it Idena.
              </p>

              <h4>One person - one vote</h4>
              <p>
                One person - one vote is a fundamental principle for democracy
                and a foundation for the future blockchain technology. We
                believe in distributed governance and the wisdom of the crowd to
                achieve stability. Advanced voting mechanisms like{' '}
                <a
                  href="https://en.wikipedia.org/wiki/Quadratic_voting"
                  rel="nofollow"
                >
                  quadratic voting
                </a>{' '}
                could improve distributed governance for everyone.
              </p>

              <h4>Decentralized web</h4>
              <p>
                A peer-to-peer web without servers and censors would empower
                people, not wealth or authority, and give them control over
                sharing information and value. No personal data should be
                required to access a service, send a message, or buy a coffee in
                a decentralized world.
              </p>

              <h4>Universal basic income</h4>
              <p>
                Blockchain mining must be democratic: The blockchain node should
                be light enough to run on an average computer or laptop. In
                Idena all participants are empowered to maintain the network.
                Participation in Idena is rewarded in a form of a UBI.
              </p>

              <h4>Freedom of speech</h4>
              <p>
                Every voice has a right to be heard. Spreading information
                should be seamless, and publications should be
                censorship-resistant.
              </p>

              <h4>Scalability, decentralization, security</h4>
              <p>
                We believe that a scalable blockchain can be built without
                compromising its safety. The basis for genuine scalability and
                safety is a transparent and redundant decentralization.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section section_content menu_section_content menu_manifesto"
        id="team"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <h3>Who we are</h3>
              <p>
                We are an anonymous group of like-minded engineers and computer
                scientists who stand for the human right to share information
                and exchange value freely and privately.
              </p>
              <p>
                We believe that{' '}
                <Link href="/technology">
                  <a>there is a way</a>
                </Link>{' '}
                to redesign the way software systems in general and blockchains
                in particular work to achieve greater decentralization and
                scalability.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        class="section section_content menu_section_content menu_manifesto"
        id="concept_paper"
      >
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-7 col-lg-6">
              <div class="download_block">
                <div class="download_block__image">
                  <img
                    src="/static/images/pdf_icon@2x.png"
                    alt="flip"
                    height="68px"
                  />
                </div>

                <div class="download_block__content">
                  <div class="download_block__title">
                    <a href="/IdenaOnePager.pdf">
                      <span>One pager</span>
                      <i class="icon icon--download-stroke"></i>
                    </a>
                  </div>
                  <div class="download_block__desc">(0,2 Mb)</div>
                </div>
              </div>

              <div class="download_block">
                <div class="download_block__image">
                  <img
                    src="/static/images/pdf_icon@2x.png"
                    alt="flip"
                    height="68px"
                  />
                </div>
                <div class="download_block__content">
                  <div class="download_block__title">
                    <a href="/IdenaPitchDeck.pdf">
                      <span>Pitch deck</span>
                      <i class="icon icon--download-stroke"></i>
                    </a>
                  </div>
                  <div class="download_block__desc">(4 Mb)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

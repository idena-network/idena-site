import Link from 'next/link'
import Layout from '../shared/components/layout'

export default function Technology() {
  return (
    <Layout
      title="Proof-of-Person blockchain: how it works"
      description="Idena blockchain allows for proof of humanity and uniqueness for an identity. We call it Proof-of-Person. Every node is linked to one single anonymous person."
    >
      <section
        className="section section_content menu_section_content menu_technology"
        id="technology"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <div className="section_header">
                <h3 className="h1">How Idena works</h3>
              </div>
              <h4>Proof of person</h4>
              <p>
                The Idena network allows for a proof of humanity and proof of
                uniqueness for its participants. We call it Proof-of-Person
                (PoP). Idena does not require any personal data sharing, does
                not reveal a person’s identity, and does not need a third-party
                identification center. Idena is based on a network of people
                mutually validating their humanness and uniqueness. How is it
                possible?
              </p>
              <p>
                Idena employs regular checkpoint rituals — synchronous
                validation sessions — to certify a participants’ humanness for
                the consequent epoch. The validation requires solving of{' '}
                <Link href="/flip-challenge">
                  <a> “flips-puzzles”</a>
                </Link>{' '}
                easy for a human, difficult for a bot.
              </p>
              <div className="fig">
                <img src="/static/images/idena-validation-flow.png?1" alt="" />
                <p>Fig 1. Idena validation flow for a single epoch</p>
              </div>
              <p>
                The uniqueness of participants is proven by the fact that they
                must solve flip synchronously. Flips are decrypted at the same
                time worldwide. A single person is not able to validate herself
                multiple times because of the limited timeframe for the answers
                submission.
              </p>

              <p>
                After the validation session is over, the network reaches
                consensus about the new list of validated participants, and the
                date of the next validation session is scheduled. The bigger the
                network is, the less frequently the validation sessions happen.
              </p>
              <p>
                The validation status of a participant is not forever. It
                expires when the next epoch starts. Participants should prolong
                their validation status for every new epoch.
              </p>
              <p>
                To be allowed to take part in the next validation round, the
                participant must provide a certain number of newly created
                flips.
              </p>
              <p>
                To{' '}
                <Link href="/faq#faq-start-1">
                  <a>join the network</a>
                </Link>
                , a new person must get an invitation from a validated
                participant.
              </p>

              <h4>Idena blockchain</h4>
              <p>
                The Idena blockchain is based on a proof-of-person Sybil control
                mechanism. Every validated participant has an equal voting power
                in the network to produce blocks and validate transactions.
                Randomly selected participants generate block proposals and
                broadcast them into the network. A random committee is selected
                to reach consensus about whether to include a block into the
                blockchain.
              </p>

              <h4>Blockchain scalability</h4>
              <p>
                Unlike many blockchains that utilize centralization to increase
                capacity, we solve the scalability problem by exaggerating
                decentralization. It might be considered as a counterintuitive
                approach because of the well-known
                “Scalability-Security-Decentralization” trilemma. However, Idena
                offers decentralization-based scalability without sacrificing
                security.
              </p>
              <p>
                Idena provides a secure way to run multiple sub-chains in
                parallel driven by different sets of independent participants in
                a process called <em>sharding</em>. A network with millions of
                nodes driven by diverse people could be safely split into
                thousands of groups (shards) processing transactions at the same
                time.
              </p>

              <h4>Decentralization</h4>
              <p>
                The Idena protocol formalizes the notion of the human on the
                blockchain. We believe that it brings decentralization to a new
                level and supports the creation of a fair consensus by avoiding
                network centralization despite the nature of capital to
                concentrate. The Idena network is truly decentralized since
                every node is linked to a single person.
              </p>
              <p>
                Technically, an account can be sold and bought. However, the
                Idena protocol introduces economic incentives to prevent
                participants from doing that. The person who sells an account is
                able to kill the cryptoidentity right after it was sold to
                unlock unspendable coins frozen in a special wallet linked to
                the account.
              </p>

              <h4>Minting</h4>
              <p>
                Idena enables democratic access to mining: Neither expensive
                mining hardware nor a bunch of money for stake is needed, but
                rather an average laptop that is online.
              </p>
              <p>
                All validated participants are encouraged to do useful work for
                the network (hosting their nodes, creating and solving flips,
                inviting new users, and so on). This resource sharing is
                rewarded with a universal basic income (UBI). The UBI for a
                single participant is enough to cover the fees for 1000
                transactions on the Idena blockchain per day.
              </p>

              <h4>Governance</h4>
              <p>
                The Idena network will have various types of internal governance
                mechanisms: network improvements proposals (soft forks); network
                upgrade proposals (hard forks); global fund proposals, and
                allocations.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section section_content menu_section_content menu_technology"
        id="usecases"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <h3>Use cases</h3>
              <p>
                There are various use cases that can be facilitated by the Idena
                network.
              </p>

              <h4>Fair voting in online communities</h4>
              <p>
                Governance is one of the most important killer apps of
                blockchains. DAOs effectively recreate cross-border
                organizational structures at miniscule administrative costs and
                near-zero compliance burden. However, governance mechanisms in
                permissionless communities can only be based on the stake of
                tokens; hence, they are inherently plutocratic. Large
                stakeholders can collude to dominate the outcome of voting,
                discouraging others from participation. A unique cryptoidentity
                (one account per person) can be used to distribute voting
                credits to the individual members of the community to ensure
                fairness. Modern voting technologies such as Quadratic Voting
                can be implemented to engage the crowd to participate in the
                collective decision-making process.
              </p>

              <h4>Oracles</h4>
              <p>
                For most use cases, smart contracts and DAOs need to be fed with
                factual information from the outside world. This requires
                oracles to supply offchain data to the blockchain. The Idena
                network is essentially a ready-made network of oracles. There
                will be mechanisms that enable every validated Idena user to
                have an equal chance of being selected as an oracle. Randomly
                chosen participants will receive information requests published
                by smart contracts. The selected oracles will provide the data
                and will stake coins to guarantee its accuracy. When the
                consensus on the information is reached, the oracles will be
                rewarded or penalized depending on the quality of the
                information they provided.
              </p>

              <h4>Direct marketing and value airdrops</h4>
              <p>
                Current business models of most Internet services imply the
                monetization of personal information collected about the user's
                behavior, interests, social connections, in many cases without
                the user's consent. The new business model could be based on the
                consensual self-monetization of personal information and
                proactive intentional disclosure initiated by the user. Based on
                such intentional information-sharing, advertisers could provide
                the best deals and pay the user directly to view and utilize
                them. Internet services and apps could distribute utility
                tokens, rewards, tokenized coupons, and discounts. This model
                would be possible only when advertisers and businesses are
                protected from Sybil attacks.
              </p>

              <h4>Serverless messenger and in-chat payments</h4>
              <p>
                The network of independent nodes can securely store a queue of
                undelivered P2P-encrypted messages. Spam attacks are prevented
                by assigning a minor friction in the form of a transaction fee
                and a decentralized storage rent fee. The native cryptocurrency
                of the Idena network can be used to transact value between users
                as a special type of message inside the P2P chat. Trustless
                decentralized two-way bridges are to be developed to tokenize
                and transact major cryptocurrencies (BTC, ETH) as tokens on the
                Idena blockchain.
              </p>

              <h4>Free speech publishing</h4>
              <p>
                The Idena network can be used as a decentralized storage for
                publications and whistleblowing information to build
                censorship-free publishing platforms, which are protected from
                bots manipulating content discovery.
              </p>

              <h4>Global universal basic income (UBI)</h4>
              <p>
                A full node of the Idena blockchain could be light enough to run
                on an average laptop. Participation in the network is rewarded
                with minting and can be considered as a form of the universal
                basic income sufficient to cover network services (for example,
                sending messages) as well as the bill for the Internet service
                and electricity consumed. At a certain stage the Idena network
                can be attractive for international organizations to distribute
                unconditional rewards to network participants.
              </p>

              {/* <h4>Attestation of human uniqueness for SSI</h4> */}
              {/* <p>The anonymous unique personhood provider can be integrated with other self-sovereign identity systems to verify claims of uniqueness.</p> */}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

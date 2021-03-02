import Layout from '../shared/components/layout'

export default function Technology() {
  return (
    <Layout
      title="Proof-of-Person blockchain: how it works"
      description="Idena blockchain allows for proof of humanity and uniqueness for an identity. We call it Proof-of-Person. Every node is linked to one single anonymous person."
    >
      <section
        class="section section_content menu_section_content menu_technology"
        id="technology"
      >
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-7 col-lg-6">
              <div class="section_header">
                <h3 class="h1">How Idena works</h3>
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
                <a href="/flip-challenge"> “flips-puzzles”</a> easy for a human,
                difficult for a bot.
              </p>
              <div class="fig">
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
                To <a href="/invitation">join the network</a>, a new person must
                get an invitation from a validated participant.
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
    </Layout>
  )
}

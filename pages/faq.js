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
import {useNextValidationTime} from '../public/api'

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

export default function Faq() {
  const [validationTime, setValidationTime] = useState(null)
  const [activePop, setActivePop] = useState()
  const [activeValidation, setActiveValidation] = useState()
  const [activeNetwork, setActiveNetwork] = useState()
  const [activeChallenge, setActiveChallenge] = useState()
  const [activeCreation, setActiveCreation] = useState()
  const [activeEconomy, setActiveEconomy] = useState()
  const [activeAttacks, setActiveAttacks] = useState()
  const {hash} = useHash()

  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const nextValidation = await useNextValidationTime()
      setValidationTime(nextValidation.localeTime)
    }
    fetchData()
  }, [])

  useEffect(() => {
    setActivePop(hash)
    setActiveValidation(hash)
    setActiveNetwork(hash)
    setActiveChallenge(hash)
    setActiveCreation(hash)
    setActiveEconomy(hash)
    setActiveAttacks(hash)
  }, [hash])

  return (
    <Layout
      title="IDENA FAQ"
      description="We are here to help you. Browse through the most frequently asked questions. Can�t find an answer? Email us at info@idena.io"
    >
      <section
        className="section section_content menu_section_content menu_faq"
        id="faq"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <div className="section_header">
                <h3 className="h1">FAQ</h3>
                <p className="hint text-center">
                  Browse through the most frequently asked questions. See{' '}
                  <Link href="/guide">
                    <a>Installation and troubleshooting guide</a>
                  </Link>{' '}
                  if you're experiencing issues with installation and running
                  the Idena Node. Can’t find an answer? Email us at{' '}
                  <a href="mailto:info@idena.io">info@idena.io</a>.
                </p>
                <p className="hint text-center"></p>
              </div>

              <h3>Proof of person</h3>
              <Accordion activeKey={activePop} onSelect={e => setActivePop(e)}>
                <Card id="faq-pop-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-pop-1">
                      How do you ensure that the network does not have duplicate
                      users?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-pop-1">
                    <div className="card-body">
                      <p>
                        The uniqueness of participants is proven by the fact
                        that they must solve and provide the answers for
                        flip-puzzles synchronously. A single person is not able
                        to validate herself multiple times because of the very
                        limited timeframe for the submission of the answers.
                      </p>
                      <p>
                        The validation status of a participant is not forever.
                        It expires when the next epoch starts. Participants
                        should prolong their validation status for every new
                        epoch.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-pop-2">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-pop-2">
                      How do you prevent users from buying or selling their
                      accounts?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-pop-2">
                    <div className="card-body">
                      <p>
                        Technically, an account can be sold and bought. However,
                        the Idena protocol introduces economic incentives to
                        prevent participants from doing that. A person who sells
                        their account can simply kill the cryptoidentity
                        afterwards to unlock their frozen coins (frozen coins
                        accumulate for each account as a part of UBI and cannot
                        be spent while the account is valid).
                      </p>
                      <p>
                        To sell an account, the seller provides a copy of the
                        account's private key. The buyer cannot be sure that
                        another copy of the private key will not stay with the
                        seller. Thus, the private key enables the seller to kill
                        the cryptoidentity at any time, and the buyer would not
                        have an economic reason to buy an Idena account.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h3>Where to start</h3>
              <Accordion
                activeKey={activeNetwork}
                onSelect={e => setActiveNetwork(e)}
              >
                <Card id="faq-network-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-network-1">
                      How do I join the network?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-network-1">
                    <div className="card-body">
                      <p>
                        To use Idena for sending coins, you just need to
                        download the app. To create a cryptoidentity, you should
                        receive an invitation code from a validated participant
                        of the network and use the code to apply for validation.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-network-2">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-network-2">
                      How can I get an invitation?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-network-2">
                    <div className="card-body">
                      <p>
                        New invitations can only be sent out by validated
                        members. Join the official{' '}
                        <a href="https://t.me/IdenaNetworkPublic">
                          Idena Telegram chat
                        </a>{' '}
                        and follow instructions in the pinned message to get an
                        invitation from validated members or the Idena team.
                        Invitations should be granted for free. Do not pay money
                        for an invitation because the person who sells an
                        invitation can terminate the invitation and issue a new
                        one.
                      </p>
                      <p>
                        Please notice that validated members have limited number
                        of invites (1 or 2 invites). The person who invites you
                        gets invitation rewards for 3 subsequent validations
                        passed by you. If you are not going to participate in
                        the upcoming validation, please notify the person who
                        invited you so he/she could have a chance to find
                        another invitee and get an invitation reward.
                      </p>
                      <p>
                        Be aware that person who invites you can terminate your
                        cryptoidentity until you get Verified status. In this
                        case he/she can take 1/6 of your stake if you are not
                        going to participate in the upcoming validation.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-start-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-start-1">
                      How do I start using Idena?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-start-1">
                    <div className="card-body">
                      <ul>
                        <li>
                          <a href="./?view=download">Download and install</a>{' '}
                          the Idena Node and Idena Client executable files or{' '}
                          <a href="https://github.com/idena-network">
                            build them from source
                          </a>
                          .
                        </li>
                        <li>
                          Subscribe to the{' '}
                          <a href="https://t.me/IdenaAnnouncements">
                            Idena Announcements
                          </a>{' '}
                          Telegram channel to follow updates.
                        </li>
                        <li>
                          Join the official{' '}
                          <a href="https://t.me/IdenaNetworkPublic">
                            Idena Telegram chat
                          </a>{' '}
                          and follow instructions in the pinned message to get
                          an invitation code.
                        </li>
                        <li>
                          Make sure your node is synchronized, and activate the
                          invitation code. Check your identity status; it should
                          be "Candidate."
                        </li>
                        <li>
                          Check the next validation time:{' '}
                          <span className="NextValidationDateTime">
                            {validationTime === null ? '..' : validationTime}
                          </span>
                          . Your node must be synchronized before the session
                          starts.
                        </li>
                        <li>
                          Learn how to solve flips: read{' '}
                          <a href="https://medium.com/idena/how-to-prove-your-identity-anonymously-919bdfe5249a">
                            the article
                          </a>{' '}
                          in our blog and{' '}
                          <a href="https://flips.idena.io/?pass=idena.io">
                            test yourself
                          </a>
                          .
                        </li>
                        <li>
                          Solve the flips during the validation time. Be agile.
                          The first 6 flips must be submitted in less than 2
                          minutes.
                        </li>
                        <li>
                          Once your account is validated, keep your node up and
                          running in order to mine coins.
                        </li>
                        <li>
                          Learn how to create flips. Don't forget to create
                          three flips before the next validation in advance.
                          Schedule your next validation.
                        </li>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-network-3">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-network-3">
                      Why do you need an invitation to join the Idena network?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-network-3">
                    <div className="card-body">
                      <p>
                        The pace of network growth is restricted to minimize the
                        probability of a Sybil attack.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-network-4">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-network-4">
                      Does the Idena protocol prevent users from buying or
                      selling invitations?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-network-4">
                    <div className="card-body">
                      <p>
                        The Idena protocol introduces incentives to prevent
                        participants from buying and selling invitations. The
                        person who sells an invitation can kill the invited
                        participant and get the staked/locked coins during the
                        next several epochs before their status is "Verified".
                        The seller can double-spend the invitation by selling it
                        multiple times. Invitations should be granted for free
                        to trusted people only (relatives, friends, and so on).
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-network-5">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-network-5">
                      What is the invitations distribution?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-network-5">
                    <div className="card-body">
                      <p>
                        The targeted number of invitations in the network is
                        calculated as 50% of the network size after each
                        validation (Idena foundation invitations remaining
                        extra).
                      </p>
                      <p>Invitations are distributed as follows:</p>

                      <ul>
                        <li>
                          {' '}
                          Identities with the Human status get one invitation
                          starting with the highest Total score.
                        </li>
                        <li>
                          {' '}
                          If there are non-distributed invitations left,
                          identities with the Human or Verified status get one
                          invitation starting from the highest total score.
                        </li>
                        <li>
                          {' '}
                          After the distribution, the minimal Total score of
                          those entitled to receive invitations is known.
                        </li>
                        <li>
                          {' '}
                          All identities with this minimal Total score receive
                          invitations. If needed, additional invitations are
                          issued by the Idena protocol to cover the demand.{' '}
                        </li>
                      </ul>

                      <p>
                        The core Idena team is granted to issue a limited number
                        of invitations per epoch to support the network growth.
                        The number of available invitations for the foundation
                        address is limited to{' '}
                        <code>min(500, max(50, 1/3*NetworkSize))</code>
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-start-2">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-start-2">
                      What is a stake in Idena?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-start-2">
                    <div className="card-body">
                      <p>
                        Every account in Idena has two wallets: the Idena wallet
                        and the stake. The stake is like your pension account:
                        20% of all your Idena rewards (mining, validation
                        rewards, flip rewards, valid invitation rewards, and so
                        on) accumulate in the stake, while the remaining 80%
                        goes directly to your Idena wallet.
                      </p>

                      <p>
                        The stake cannot be spent while your account is valid.
                        You receive these coins in your Idena wallet only when
                        you voluntary terminate your Idena account - that is,
                        when you “kill” your cryptoidentity.
                      </p>

                      <p>
                        When your account is killed by the network protocol, you
                        lose your stake.
                      </p>

                      <p>
                        Idena does not use the stake for governance purposes.
                      </p>

                      <p>
                        <b>
                          Discrimination of identities with the Newbie status
                        </b>
                      </p>

                      <p>
                        Only 20% of earned coins is mined to the main wallet for
                        Newbies. The rest 80% is mined to the stake: in total
                        60% of earned coins is temporary locked in the stake
                        until a Newbie becomes Verified.
                      </p>
                      <p>
                        60% of earned coins will be sent back to the main wallet
                        once a Newbie becomes Verified.
                      </p>
                      <p>
                        Newbies cannot terminate their identities to withdraw
                        the stake.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h3>Validation session</h3>
              <Accordion
                activeKey={activeValidation}
                onSelect={e => setActiveValidation(e)}
              >
                <Card id="faq-validation-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-1">
                      How do I find out when the next validation session starts?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-1">
                    <div className="card-body">
                      <p>
                        The date of the validation session is calculated by the
                        network and is shown in the Idena app. The time is
                        always fixed: 13:30 UTC.
                      </p>

                      <p>
                        The bigger the network is, the less frequently the
                        validation sessions happen.
                      </p>
                      <p>
                        The validation date will be adjusted to Saturdays once
                        the network reaches 9441 identities. The total epoch
                        duration is limited to 28 days.
                      </p>

                      <div className="tab-content block">
                        <div className="tab-pane show active" role="tabpanel">
                          <div className="table-responsive">
                            <table className="table">
                              <tr>
                                <th>Network size</th>
                                <th>
                                  Frequency, <br /> days
                                </th>
                              </tr>
                              <tr>
                                <td>17+</td>
                                <td>3</td>
                              </tr>

                              <tr>
                                <td>45+</td>
                                <td>4</td>
                              </tr>

                              <tr>
                                <td>96+</td>
                                <td>5</td>
                              </tr>

                              <tr>
                                <td>176+</td>
                                <td>6</td>
                              </tr>

                              <tr>
                                <td>291+</td>
                                <td>7</td>
                              </tr>

                              <tr>
                                <td>449+</td>
                                <td>8</td>
                              </tr>

                              <tr>
                                <td>
                                  <code>N</code>
                                </td>
                                <td>
                                  <code>round(N^0.33)</code>
                                </td>
                              </tr>

                              <tr>
                                <td>...</td>
                                <td>...</td>
                              </tr>

                              <tr>
                                <td>9441+</td>
                                <td>
                                  <code>
                                    21 if Saturday <br /> 20 otherwise
                                  </code>
                                </td>
                              </tr>

                              <tr>
                                <td>
                                  <code>N</code>
                                </td>
                                <td>
                                  <code>round(N^(0.33)/7)*7</code>
                                </td>
                              </tr>

                              <tr>
                                <td>...</td>
                                <td>...</td>
                              </tr>

                              <tr>
                                <td>16203+</td>
                                <td>28</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-validation-2">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-2">
                      Do you think the chosen validation time is fair for all
                      countries?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-2">
                    <div className="card-body">
                      <p>
                        The validation time of 13:30 UTC covers most countries
                        when most people are awake. These are the local times
                        for some of the world's cities (as of June 1, 2019):
                      </p>
                      <ul>
                        <li>San Francisco, USA 6:30</li>
                        <li>New York, USA 9:30</li>
                        <li>Tunis, Tunisia 14:30</li>
                        <li>Berlin, Germany 15:30</li>
                        <li>Moscow, Russia 16:30</li>
                        <li>Delhi, India 19:00</li>
                        <li>Beijing, China 21:30</li>
                        <li>Sydney, Australia 23:30</li>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-validation-3">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-3">
                      Why are there actually two sessions — a short and a long
                      one — during the validation ceremony?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-3">
                    <div className="card-body">
                      <p>
                        The short validation session has a very limited time
                        frame, less than two minutes, and consists of six flips,
                        each of which is received only by 1–4 participants in
                        the network (depending on the network size). This
                        session’s task is conducting a Turing test: telling
                        humans from AI.
                      </p>
                      <p>
                        The long flip qualification session lasts 30 minutes and
                        consists of 25-30 flips, each of which is received by a
                        larger number of network participants (depending on the
                        network size). This session enables the network to
                        achieve a consensus on flip quality and the right answer
                        to a flip.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-validation-4">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-4">
                      What validation score do I need to be validated?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-4">
                    <div className="card-body">
                      <p>
                        To get validated, you need to meet these three
                        requirements during each validation session:
                      </p>
                      <ul>
                        <li>
                          Your current short validation session’s score should
                          be 60% or more.
                        </li>
                        <li>
                          Your total score for the last 10 short validations
                          (including the current validation session and all the
                          previous ones) should be 75% or more.
                        </li>
                        <li>
                          Your current long session’s score should be 75% or
                          more.
                        </li>
                        <br />
                        <p>
                          In addition, you need to solve flips both correctly
                          and fast. The first 6 flips must be solved in less
                          than 2 minutes.
                        </p>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-validation-5">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-5">
                      What if I miss the validation? Can I still mine coins?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-5">
                    <div className="card-body">
                      <p>
                        The validation status of a participant is not forever.
                        It expires when the next epoch starts. Participants
                        should prolong their validation status for every new
                        epoch. A validated person may miss two validation
                        sessions in a row without losing her cryptoidentity. But
                        then this person cannot mine coins during the epochs
                        when validations have been missed.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-validation-6">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-6">
                      Are all participants in Idena equal?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-6">
                    <div className="card-body">
                      <p>
                        There are different statuses of participants in Idena:
                        <div className="fig">
                          <img
                            src="/static/images/Idena-Identity-Status-Flow-1.png?1"
                            alt=""
                          />
                          <p>
                            Fig: Identity status flow (Candidate, Newbie,
                            Verified, Human)
                          </p>
                        </div>
                        <li>
                          <b>Candidate.</b> A participant who has just joined
                          the network via an invitation can participate in the
                          subsequent validation session only.
                        </li>
                        <li>
                          <b>Newbie.</b> A newly validated identity can
                          participate in subsequent validation sessions, mine
                          coins, and create flips, but cannot send out
                          invitations or miss validations.
                        </li>
                        <li>
                          <b>Verified.</b> A cryptoidentity validated at least
                          three times in a row and having the{' '}
                          <code>Total score{'>'}=75%</code> can do the same as a
                          Newbie plus
                          <br />- send out invitations
                          <br />- submit one extra flip
                          <br />- miss up to two validations in a row
                          <br />A Verified cannot fail neither a short nor a
                          long session.
                        </li>
                        <li>
                          <b>Human.</b> A cryptoidentity validated at least four
                          times and having the <code>Total score{'>'}=92%</code>{' '}
                          can do the same as a Verified plus
                          <br />- submit two extra flips (five in total)
                          <br />- fail a short and long session without being
                          killed
                          <div className="fig">
                            <img
                              src="/static/images/Idena-Identity-Status-Flow-2.png"
                              alt=""
                            />
                            <p>Fig: Identity status flow (Suspended, Zombie)</p>
                          </div>
                        </li>
                        <li>
                          <b>Suspended.</b> A verified cryptoidentity that has
                          missed one validation session can do the same as a
                          Candidate and can miss one validation session.
                        </li>
                        <li>
                          <b>Zombie.</b> A verified cryptoidentity that has
                          missed two validation sessions is equal to a
                          Candidate.
                        </li>
                        <li>
                          <b>Killed.</b> The account is not part of the network
                          anymore.
                        </li>
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-validation-7">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-7">
                      Why can’t Idena have several validations at different
                      times to make it more convenient for participants in
                      different time zones?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-7">
                    <div className="card-body">
                      <p>
                        The validation time needs to be synchronized for people
                        all over the world to verify the uniqueness of network
                        participants. Otherwise, it would be possible to verify
                        a different account at each of the various validation
                        ceremonies.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-validation-8">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-8">
                      Am I allowed to participate in a validation ceremony if I
                      have not submitted flips?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-8">
                    <div className="card-body">
                      <p>
                        Newbies and verified accounts must submit flips before
                        the next validation ceremony. Not submitting flips is
                        equal to missing a validation.{' '}
                      </p>

                      <p>
                        Candidates, suspended accounts, and zombies do not
                        submit flips for the validation ceremony.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-validation-9">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-9">
                      Will I lose the coins I have mined in Idena when my
                      cryptoidentity is killed?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-9">
                    <div className="card-body">
                      <p>
                        If your cryptoidentity is killed by the network, you
                        lose your stake: 20% of all your rewards (mining,
                        validation rewards, flip rewards, valid invitation
                        rewards, and so on), which cannot be spent while your
                        Idena account is valid and which can be received only
                        when you voluntary terminate your account.
                      </p>

                      <p>
                        The remaining 80% of all your Idena earnings go directly
                        to your Idena wallet. You keep those coins even if your
                        cryptoidentity is killed (by you or by the network
                        protocol).
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-validation-10">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-10">
                      I have passed the validation but I haven’t received any
                      rewards. Why?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-10">
                    <div className="card-body">
                      <p>It is possible in the one of following cases:</p>

                      <p>
                        - if one of your flips is reported by the majority of
                        qualification committee (please see What if one of my
                        flips is reported)
                      </p>
                      <p>or</p>

                      <p>
                        - if all of your flips have status No consensus which
                        means that the network could not reached consensus about
                        the right answer for these flips.
                      </p>

                      <p>
                        Please notice that flips are the key element of Idena
                        network security. That is why the protocol imposes
                        severe penalties on users that create flips in breach of
                        the rules.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h3>Flip challenge</h3>
              <Accordion
                activeKey={activeChallenge}
                onSelect={e => setActiveChallenge(e)}
              >
                <Card id="faq-challenge-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-1">
                      Who creates flips in the network?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-1">
                    <div className="card-body">
                      <p>
                        Validated participants create flips to be able to take
                        part in the next validation session.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-2">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-2">
                      How can people whose disabilities prevent them from
                      completing a traditional flip validation session be
                      validated?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-2">
                    <div className="card-body">
                      <p>
                        For now, they can't. But Idena is designed as an
                        open-source project, and we hope that there will be
                        teams with specific expertise in this area who will be
                        motivated to develop means for people with disabilities
                        to get validated in the network, such as audio flips,
                        for example.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-3">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-3">
                      Who specifies the right answer for a flip? Does the author
                      publish the right answer?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-3">
                    <div className="card-body">
                      <p>
                        A flip is submitted without the right answer. The
                        network comes to a consensus about the right answer
                        after the validation session.
                      </p>
                      <p>
                        If consensus is not reached, then the flip is
                        disqualified. Answers for disqualified flips are not
                        counted. Authors of disqualified flips get no reward for
                        making them.
                      </p>

                      <p>
                        Flip has strong consensus if there are not less than 75%
                        of participants agreed with the answer. Participants who
                        gave right answer get 1 point, otherwise 0.
                      </p>

                      <p>
                        Flip has weak consensus if there are at least 66% of
                        participants agreed with the answer. Participants who
                        gave right answer get 1 point, otherwise 0,5.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-4">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-4">
                      What if a flip cannot be solved by a human?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-4">
                    <div className="card-body">
                      <p>
                        The network comes to a consensus about the right answer
                        after the validation session. If consensus is not
                        reached, then the flip is disqualified. Answers for such
                        disqualified flips are not counted.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-5">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-5">
                      How are flips distributed for the validation session? Are
                      flips individual?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-5">
                    <div className="card-body">
                      <p>
                        As the network grows, the number of people solving the
                        same flip goes down: In a network of 10,000 users, only
                        two different participants will have the same flip to
                        solve. When the network reaches 30,000 users, one single
                        flip will appear in a validation session of only one
                        participant.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-6">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-6">
                      How are newly created flips secured so that they do not
                      leak before the validation session?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-6">
                    <div className="card-body">
                      <p>
                        The flips are stored as encrypted data in the network
                        before validation, and then they are algorithmically
                        distributed.
                      </p>
                      <p>
                        The flips are encrypted according to the following
                        protocol:
                      </p>
                      <ol>
                        <li>
                          Every flip has a public and a hidden part:
                          <br />- the public part is available for everyone
                          after the validation (2 images)
                          <br />- the hidden part is available only for the
                          participants who solve the flip
                        </li>
                        <li>
                          An author generates 2 keys for flip encryption:
                          <br />- <code>FlipPublicSecret</code> for the
                          encryption of the public part of the flip
                          <br />- <code>FlipHiddenSecret</code> for the
                          encryption of the hidden part of the flip
                        </li>
                        <li>
                          All flips created by the author are encrypted using
                          these 2 keys and broadcasted into the IPFS
                        </li>

                        <li>
                          Flip lottery
                          <br />- The author calculates the list of candidates
                          who must solve the flips in order to send them
                          FlipHiddenSecret
                          <br />- <code>FlipRecipients[N]</code> array is
                          produced: <code>FlipHiddenSecret</code> is encrypted N
                          times with candidates' public keys (N is the number of
                          participants who must solve the flip)
                          <br />- <code>FlipRecipients[N]</code> array is
                          encrypted with <code>FlipPublicSecret</code> and
                          broadcasted to the IPFS
                          <br />- Candidates download arrays{' '}
                          <code>FlipRecipients[N]</code> corresponding to the
                          flips they have to solve
                        </li>
                        <li>
                          Once the validation ceremony starts at 1:30pm UTC, all
                          the authors broadcast their{' '}
                          <code>FlipPublicSecret</code>.
                          <br />- Candidates decrypt arrays{' '}
                          <code>FlipRecipients[N]</code> corresponding to the
                          flips they need and extract the{' '}
                          <code>FlipHiddenSecret</code> using their private key.
                          <br />- Other participants can decrypt only public
                          parts of the flips using shared{' '}
                          <code>FlipPublicSecret</code>.
                        </li>
                      </ol>

                      {/* </p> */}
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-7">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-7">
                      What if someone develops AI instruments to solve flips?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-7">
                    <div className="card-body">
                      <p>
                        Flips belong to the class of AI-hard problems. There is
                        no single pattern for flips since they are created by
                        humans according to randomly selected keywords.
                      </p>
                      <p>
                        Flips do not fall under the class of "recognition"
                        problems, which are easily solved by neural networks.
                        Solving a flip demands understanding the meaning of a
                        story, using common-sense reasoning.
                      </p>
                      <p>
                        The example of the Winograd Schema Challenge shows that
                        introducing a larger database does not lead to better
                        results with AI-hard tasks.
                      </p>
                      <p>
                        In addition, adversarial noise can be added to flip
                        images to make a neural network result in incorrect
                        outputs.
                      </p>
                      <p>
                        Thus, current AI instruments or even a large database of
                        flips will not achieve the results that can be compared
                        to those demonstrated by humans.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-8">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-8">
                      What types of flips are to be reported during the long
                      sessions?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-8">
                    <div className="card-body">
                      <p>
                        You should report the flip when you see one of the
                        following:
                      </p>
                      <ul>
                        <li>One of the keywords is not relevant to the flip</li>
                        <li>
                          You need to read the text in the flip to solve it
                        </li>
                        <li>You see inappropriate content</li>
                        <li>
                          You see numbers or letters or other labels on top of
                          the images indicating their order
                        </li>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-9">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-9">
                      How are participants motivated to report bad flips?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-9">
                    <div className="card-body">
                      <p>
                        Every successful report of a flip is rewarded: The
                        reward for the reported flip which is not paid to the
                        flip creator is distributed between the committee
                        members who reported the flip.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-10">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-10">
                      What if someone reports all the flips?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-10">
                    <div className="card-body">
                      <p>
                        The number of flips that can be reported is limited to
                        1/3. So participants are motivated to pick which flip to
                        report first relying on objective criteria (e.g. both
                        keywords relevance).
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-11">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-11">
                      What if one of my flips is reported?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-11">
                    <div className="card-body">
                      <p>
                        Flips are the key element of Idena network security. The
                        protocol imposes severe penalties on users that create
                        flips in breach of the rules. If one of the flips is
                        reported during the validation, the user that created
                        this flip will not get any rewards for the validation. A
                        flip cannot get status Reported by accident. This status
                        is given if more than 50% of qualification committee
                        have reported this flip during the long session. Every
                        member of qualification committee can report only 1/3 of
                        flips that are shown to them.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h3>Flip creation</h3>
              <Accordion
                activeKey={activeCreation}
                onSelect={e => setActiveCreation(e)}
              >
                <Card id="faq-creation-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-creation-1">
                      What is the procedure to create a new flip?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-creation-1">
                    <div className="card-body">
                      <p>
                        To create a flip, you use two keywords randomly selected
                        by the protocol as associative hints to think up a story
                        within the general template of “Before – Something
                        happens – After.” You upload four images from your
                        device or from the Internet to tell the story. Then you
                        create an alternative – a meaningless sequence of the
                        images that you have chosen by shuffling – and submit
                        the pair of sequences to the network.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-creation-rule-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-creation-rule-1">
                      What are the rules to create flips?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-creation-rule-1">
                    <div className="card-body">
                      <p>These are the following rules for flip creation:</p>
                      <p>- a flip should be relevant to both keywords;</p>
                      <p>
                        - a flip should not contain any inappropriate content;
                      </p>
                      <p>
                        - a flip should not content any text that is necessary
                        to understand to solve this flip;
                      </p>
                      <p>
                        - a flip should not contain any numbers or letters or
                        other labels on top of the images indicating their
                        order.
                      </p>
                      <p>
                        If you don’t follow these rules when creating a flip, it
                        can be reported at the qualification session. Please
                        keep in mind that in this case you will not be paid for
                        validation (see{' '}
                        <a href="#faq-challenge-11">
                          What if one of my flips is reported
                        </a>
                        ).
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-creation-2">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-creation-2">
                      Why do I need to use the suggested keywords to create a
                      flip?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-creation-2">
                    <div className="card-body">
                      <p>
                        These two random keywords selected from a large
                        dictionary are a sort of associative hint for
                        stimulating your creativity. You are required to use
                        them for two reasons. First, doing so helps to ensure
                        the non-repeatability and unpredictability of flip
                        types, which makes flips truly AI-resistant. Second, it
                        enables the Idena protocol to detect and punish protocol
                        abuse such as submitting a number of random pictures
                        instead of a flip or the same flip repeatedly.
                      </p>

                      <p>
                        Network participants must create flips relevant to the
                        suggested keywords. If you are not sure of the meanings
                        of the word, or if you cannot think of a story with the
                        suggested words, click the <i>Change my words</i>{' '}
                        button, and a new pair of words will appear. You are
                        given 9 pairs of words to create three flips each epoch.
                      </p>

                      <p>
                        The relevance of the flip to the keywords is tested
                        during the long qualification session. Participants who
                        create flips that are irrelevant to the keywords are
                        penalized by the protocol. Identities will be killed for
                        repeatedly ignoring keywords when creating flips.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-creation-3">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-creation-3">
                      Who can create flips?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-creation-3">
                    <div className="card-body">
                      <p>Flips are created by validated identities.</p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-creation-4">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-creation-4">
                      What if someone creates an invalid flip?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-creation-4">
                    <div className="card-body">
                      <p>
                        The network comes to the consensus about the right
                        answer after the validation session. If consensus is not
                        reached, then the flip is disqualified. Answers for
                        disqualified flips are not counted, and the authors of
                        these flips are not rewarded.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-creation-5">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-creation-5">
                      If I create more flips than requested, may I keep them as
                      drafts and submit them for the next epoch?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-creation-5">
                    <div className="card-body">
                      <p>
                        You cannot keep flip drafts for the next epoch, because
                        the keywords used for flip creation are generated for
                        the current epoch. All the drafts will be burnt after
                        the validation session, and you will have to create new
                        flips.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-creation-6">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-creation-6">
                      What if someone deliberately creates bad flips or uses
                      inappropriate images for them?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-creation-6">
                    <div className="card-body">
                      <p>
                        Users creating meaningless flips or spam or flips with
                        inappropriate content or flips irrelevant to the
                        keywords are to be punished.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-distribution-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-distribution-1">
                      How are flips distributed during a validation session?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-distribution-1">
                    <div className="card-body">
                      <p>
                        Flips are distributed randomly. Participants are not
                        allowed to solve flips created by themselves.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h3>Economy</h3>
              <Accordion
                activeKey={activeEconomy}
                onSelect={e => setActiveEconomy(e)}
              >
                <Card id="faq-economy-2">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-economy-2">
                      What is the total supply limit?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-economy-2">
                    <div className="card-body">
                      <p>Total supply is not limited.</p>
                      <p>
                        Total minting is capped at 51,840 coins per day. Half of
                        the cap (50%) is mined while producing the blocks. The
                        rest of the coins are minted during validation sessions.
                      </p>
                      <p>
                        Block reward: 6 iDNA
                        <br />
                        Maximum number of blocks per day: 4,320
                        <br />
                        Mining cap per day: 25,920 iDNA (50%)
                        <br />
                        Accumulating fund per day: 25,920 iDNA (50%)
                        <br />
                        Total cap: 51,840 iDNA
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-economy-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-economy-1">
                      Is the Idena coin (iDNA) based on an inflation model?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-economy-1">
                    <div className="card-body">
                      <p>
                        There are the following cases for supply utilization:
                      </p>
                      <ul>
                        <li>20% of minted coins are frozen in stakes</li>
                        <li>Stakes of non-validated identities are burnt</li>
                        <li>Mining penalties are burnt</li>
                        <li>90% of transaction fees are burnt</li>
                        <li>
                          1% of the minted coins are frozen in the zero wallet
                        </li>
                        <li>
                          100% of ad payments will be burnt:{' '}
                          <a href="#faq-economy-5">read more</a>{' '}
                        </li>
                        <li>
                          The bigger the network the more coinholders will just
                          hold newly minted coins without spending them
                        </li>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-economy-6">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-economy-6">
                      What is the mining penalty?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-economy-6">
                    <div className="card-body">
                      <p>
                        The mining penalty is charged if a node is being offline
                        for more that 1 hour with the miner status activated.
                        The miner status for the penalized node is deactivated
                        automatically.
                      </p>
                      <p>
                        In order to continue mining, the mining status has to be
                        activated manually. All the newly mined coins will be
                        spent to cover the penalty. Once the penalty is paid,
                        mining will continue as usual. All mining penalties are
                        discarded when a new epoch starts.
                      </p>

                      <p>
                        The penalty size depends on the network size:
                        PenaltySize = 6 iDNA x 1800 blocks / NetworkSize
                      </p>

                      <b>How is the mining penalty charged?</b>
                      <p>
                        Every node tracks activity of other nodes when new
                        blocks are produced. There are two subsequent blocks
                        that have to be mined to penalize an offline node:
                      </p>
                      <ul>
                        1. Penalty proposal block (<code>OfflinePropose</code>{' '}
                        bit is activated)
                        <br />
                        Nodes are voting for a penalty proposal by a special bit
                        in their vote messages: <code>TurnOffline</code>.
                      </ul>
                      <ul>
                        2. Penalty execution block (<code>OfflineCommit</code>{' '}
                        bit is activated)
                        <br />
                        The block is created if consensus for the penalty
                        proposal mined in the previous block is reached.
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-economy-7">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-economy-7">
                      What is the transaction fee in Idena?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-economy-7">
                    <div className="card-body">
                      <p>
                        The transaction fee is calculated automatically by
                        protocol. The fee goes up or down based on how full the
                        previous block was, targeting an average block
                        utilization of 50%. When the previous block is more than
                        50% full, the transaction fee goes up proportionally.
                        When it is below 50% usage, fees go down. A user can
                        specify the maximum fee limit for the transaction.
                      </p>
                      <br />
                      <p>
                        <code>
                          transactionFee = currFeeRate x transactionSize
                        </code>
                        <br />
                        <br />
                        <code>currFeeRate = max(</code> <br />
                        <code>&nbsp;&nbsp;&nbsp;&nbsp; 1e-16, </code>
                        <br />
                        <code>&nbsp;&nbsp;&nbsp;&nbsp; 0.1/networkSize, </code>
                        <br />
                        <code>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          prevFeeRate*(1+0.25*(prevBlockSize/300Kb-0.5))
                        </code>
                        <br />
                        <code>&nbsp;&nbsp;&nbsp;&nbsp;)</code>
                        <br />
                        <br />
                      </p>
                      <div className="fig">
                        <p>Fig: Transaction fee calculation</p>
                      </div>

                      <p>
                        Validation ceremony transactions are not charged.
                        However, they affect the fee rate because of the block
                        consumtion.
                      </p>

                      <p>
                        90% of paid fees are burnt. The rest 10% are paid to the
                        block proposer.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-economy-3">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-economy-3">
                      What is the Idena coins minting structure?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-economy-3">
                    <div className="card-body">
                      <p>
                        There is a fixed cap for minting Idena coins equal to
                        51,840 iDNA per day:
                      </p>
                      <ul>
                        <li>Block mining cap: 50%</li>
                        <li>Validation reward fund: 12%</li>
                        <li>Flip reward fund: 16%</li>
                        <li>Invitation reward fund: 16%</li>
                        <li>Idena foundation payouts: 5%</li>
                        <li>Zero wallet fund: 1%</li>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-economy-4">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-economy-4">
                      How are rewards for the validation session distributed?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-economy-4">
                    <div className="card-body">
                      <p>
                        The validation session fund is capped at 25,920 iDNA per
                        day. It accumulates daily (according to the number of
                        blocks issued) and gets distributed at the end of the
                        validation session as follows:
                      </p>
                      <ul>
                        <li>
                          <b>Validation reward fund: 24%</b>
                        </li>
                        The validation reward is distributed according to age
                        (proportional to <i>age</i>
                        <sup>&#8531;</sup>). Older participants get more than
                        younger ones.
                        <li>
                          <b>Flip reward fund: 32%</b>
                        </li>
                        The flip reward fund is distributed equally to all
                        validated participants proportionally to the number of
                        their qualified flips. Non-qualified flips are not paid
                        for.
                        <li>
                          <b>Invitation reward fund: 32%</b>
                        </li>
                        The invitation reward fund is distributed to all
                        identities whose invitations have been validated.
                        Invitation reward is paid up to 3 epochs in a row
                        proportionally to the invited person's age:
                        <br />
                        - A reward for the second validation of an invitee is 3
                        times bigger than a basic reward for a validated
                        Candidate.
                        <br />
                        - A reward for a Verified invitee is 6 times bigger than
                        a basic reward for a validated Candidate.
                        <br />
                        - A person who does not share their invitation is
                        rewarded with at least 1/3 of the basic invitation
                        reward with 50% probability to win 2/3 of the basic
                        invitation reward for a non-spent invitation.
                        <br />
                        <br />
                        Invitation rewards for the 2nd and 3rd validation are
                        not paid to the Idena foundation.
                        <li>
                          <b>Idena foundation payouts: 10%</b>
                        </li>
                        <li>
                          <b>Zero wallet fund: 2%</b>
                        </li>
                      </ul>

                      <p>
                        No rewards are paid to those participants who fall into
                        one of the following groups:
                      </p>

                      <ol type="1">
                        <li>
                          Participants who have at least one flip irrelevant to
                          key words
                        </li>
                        <li>Participants who have no qualified flips</li>
                        <li>
                          Participants who provided invalid data instead of flip
                          images
                        </li>
                      </ol>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-economy-55">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-economy-5">
                      What is the Idena coin utility?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-economy-5">
                    <div className="card-body">
                      <p>
                        Idena formalizes people on the blockchain and there
                        might be use cases that we can not anticipate yet.
                      </p>
                      <b>Onchain marketing</b>
                      <p>
                        Idena participants voluntarily agree to consume ads
                        published by a valid address which burns coins. Multiple
                        advertisers compete for attention of a certain group of
                        users by burning coins. This is an auction: Whoever
                        burns more coins has the right to show their ad. Burnt
                        coins are removed from the total supply. Newly mined
                        coins are equally distributed among the network
                        participants and then can be sold to advertisers who
                        will have shortage of coins.
                      </p>

                      <div className="fig">
                        <img
                          src="/static/images/idena-coin-economy.png?2"
                          alt="Idena coin utility"
                        />
                        <p>
                          Fig: Closed tokenomics fuels the demand for the Idena
                          coin
                        </p>
                      </div>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-economy-8">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-economy-8">
                      What is the zero wallet?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-economy-8">
                    <div className="card-body">
                      <p>
                        1% of all issued coins is accumulated at{' '}
                        <a href="https://scan.idena.io/address?address=0x0000000000000000000000000000000000000000">
                          the zero wallet address
                        </a>
                        . We believe that a governance for the zero wallet fund
                        allocation will be established in future. It can be used
                        for the external projects funding, covering someones
                        losses or for some other purporses the network agrees
                        on.
                      </p>
                      <p>
                        There is no private key for the zero address. The
                        network must reach consensus in order to spend it.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h3>Attacks</h3>
              <Accordion
                activeKey={activeAttacks}
                onSelect={e => setActiveAttacks(e)}
              >
                <Card id="faq-attacks-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-attacks-1">
                      If an attacker is more than 1/3 of the validated
                      participants, will the honest contingent be able to
                      recover?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-attacks-1">
                    <div className="card-body">
                      <p>
                        This is a general safety assumption applicable to any
                        permissionless blockchain and it is not possible to
                        overcome it: More than 2/3 of honest participants are
                        needed to guarantee safety.
                      </p>
                      <p>
                        Let's look at Bitcoin proof-of-work. Consider{' '}
                        <a
                          href="https://arxiv.org/abs/1811.08263"
                          rel="nofollow"
                        >
                          selfish mining
                        </a>{' '}
                        when the biggest miners are getting bigger. As a result,
                        small miners do not invest in Bitcoin mining since it
                        contributes to their losses. As a matter of fact, there
                        is highly concentrated mining in Bitcoin that cannot
                        ever be reverted. There are thirteen controlling pools
                        in Bitcoin. There are three pools controlling more than
                        50 percent of the Bitcoin network.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-attacks-2">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-attacks-2">
                      Would Mechanical Turk obliterate the validation?
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-attacks-2">
                    <div className="card-body">
                      <p>
                        The captcha test starts synchronously at the same time
                        worldwide. Answers must be submitted within an
                        aggressive timeframe. An attack requires extensive
                        coordination of a high number of unique workers.
                      </p>
                      <p>
                        In addition, since the validation timeframe is
                        relatively small (1–2 minutes), the workers might be
                        interested in validating their own identities instead of
                        selling their time during the validation time.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-attacks-3">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-attacks-3">
                      "Flip service" attack
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-attacks-3">
                    <div className="card-body">
                      <p>
                        <i>
                          Attack: An adversary offers a flip service that
                          creates high quality flips using the set of words you
                          specify. Participants who don't want to spend time
                          creating flips can outsource this job to the service.
                          If the service has enough users it can auto-solve a
                          significant number of flips.
                        </i>
                      </p>

                      <p>
                        The threat can be mitigated by introducing a punishment
                        mechanism: An account can be killed for submitting a
                        compromised flip for validation. A flip is considered
                        compromised if it has been seen by other people before
                        the validation time. A hash of the proof published on
                        the blockchain prior the validation can be considered as
                        evidence. The person who provides the evidence earns
                        percentage of the stake of the terminated account.
                      </p>
                      <p>
                        Effectively, once you decide to submit at least one flip
                        provided by a flip service, you take a risk that your
                        account may be terminated by this service in future.
                      </p>
                      <p>
                        A flip service can not prove that it does not publish
                        evidence of compromised flips. It will hardly be
                        profitable to build such a service on reputation since
                        there is a strong incentive to kill accounts later on
                        when more accounts are compromised and the total stake
                        of those accounts is big enough.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-attacks-4">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-attacks-4">
                      "Friendly flips" attack
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-attacks-4">
                    <div className="card-body">
                      <p>
                        <i>
                          Attack: Users in an attacking pool share the flips
                          they submitted to the network with other users in the
                          pool before the validation. This allows the pool to
                          validate Sybil accounts.
                        </i>
                      </p>

                      <p>
                        Assume the total network size is 1000. An adversary has
                        a pool of 100 people colluded. the adversary knows the
                        answers for 10% of flips in advance. This means the
                        adversary can validate 1% of Sybils by colluding (10
                        accounts).
                      </p>
                      <p>
                        On the next round the adversary knows 11% of the flips
                        so they can validate 1.1% of Sybils (11 accounts). The
                        adversary can only grow extensively: More and more real
                        people have to collude.
                      </p>

                      <p>
                        Compared to PoS, getting 10% of the actual humans in the
                        network to collude is harder than merely having capital
                        equivalent to 10% of the network’s market cap.
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-attacks-5">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-attacks-5">
                      Artificial intelligence attack
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-attacks-5">
                    <div className="card-body">
                      <p>
                        <i>
                          Attack: AI can learn to solve flips by having a huge
                          dataset of flips produced by a big network: 1 million
                          network of people will generate millions of flips per
                          epoch which is enough for machine learning.
                        </i>
                      </p>

                      <p>
                        The threat is mitigated by flips encryption. Each flip
                        is available only for those participants who solve it
                        during the validation session. There are around 10-15
                        persons who see it. The flips that have been used for
                        validation are encrypted: Only 2 out of 4 images of a
                        flip are publicly available to make it impossible to
                        easily collect huge datasets.
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

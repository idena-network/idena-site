/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import {useEffect, useState} from 'react'
import {Accordion, Card} from 'react-bootstrap'
import {Trans, useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Layout from '../shared/components/layout'

import {useHash} from '../shared/useHash'
import {useNextValidationTime} from '../shared/api'
import {CustomToggle} from '../shared/components/toggle'
import {LinkText} from '../shared/utils/utils'

export default function Faq() {
  const {localeTime: validationTime} = useNextValidationTime()

  const [activeHash, setActiveHash] = useState()
  const [hash] = useHash()
  const {t} = useTranslation('faq')

  useEffect(() => {
    setActiveHash(hash)
  }, [hash])

  return (
    <Layout
      title={t('IDENA FAQ', {ns: 'faq'})}
      description={t(
        'We are here to help you. Browse through the most frequently asked questions. Can’t find an answer? Email us at info@idena.io',
        {ns: 'faq'}
      )}
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
                  <Trans i18nKey="faqGuideLink" t={t} ns="faq">
                    Browse through the most frequently asked questions. See{' '}
                    <LinkText href="/guide">
                      <a>Installation and troubleshooting guide</a>
                    </LinkText>{' '}
                    if you're experiencing issues with installation and running
                    the Idena Node. Can’t find an answer? Email us at{' '}
                    <a href="mailto:info@idena.io">info@idena.io</a>.
                  </Trans>
                </p>
                <p className="hint text-center"></p>
              </div>

              <h3>{t('Proof of person', {ns: 'faq'})}</h3>
              <Accordion
                activeKey={activeHash}
                onSelect={e => setActiveHash(e)}
              >
                <Card id="faq-pop-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-pop-1">
                      {t(
                        'How do you ensure that the network does not have duplicate users?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-pop-1">
                    <div className="card-body">
                      <p>
                        {t(
                          'The uniqueness of participants is proven by the fact that they must solve and provide the answers for flip-puzzles synchronously. A single person is not able to validate herself multiple times because of the very limited timeframe for the submission of the answers.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'The validation status of a participant is not forever. It expires when the next epoch starts. Participants should prolong their validation status for every new epoch.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-pop-2">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-pop-2">
                      {t(
                        'How do you prevent users from buying or selling their accounts?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-pop-2">
                    <div className="card-body">
                      <p>
                        {t(
                          'Technically, an account can be sold and bought. However, the Idena protocol introduces economic incentives to prevent participants from doing that. A person who sells their account can simply kill the cryptoidentity afterwards to unlock their frozen coins (frozen coins accumulate for each account as a part of UBI and cannot be spent while the account is valid).',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          `To sell an account, the seller provides a copy of the account's private key. The buyer cannot be sure that another copy of the private key will not stay with the seller. Thus, the private key enables the seller to kill the cryptoidentity at any time, and the buyer would not have an economic reason to buy an Idena account.`,
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h3>{t('Where to start', {ns: 'faq'})}</h3>
              <Accordion
                activeKey={activeHash}
                onSelect={e => setActiveHash(e)}
              >
                <Card id="faq-network-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-network-1">
                      {t('How do I join the network?', {ns: 'faq'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-network-1">
                    <div className="card-body">
                      <p>
                        {t(
                          'To use Idena only for sending coins, you just need to download the app. To create a cryptoidentity and start mining coins, you should receive an invitation code from a validated participant of the network and use the code to apply for validation.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-network-2">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-network-2">
                      {t('How can I get an invitation?', {ns: 'faq'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-network-2">
                    <div className="card-body">
                      <p>
                        <Trans i18nKey="joinOfficialTelegram" t={t} ns="faq">
                          New invitations can only be sent out by validated
                          members. Join the official{' '}
                          <a href="https://t.me/IdenaNetworkPublic">
                            Idena Telegram chat
                          </a>{' '}
                          and follow instructions in the pinned message to get
                          an invitation from validated members or the Idena
                          team. Invitations should be granted for free. Do not
                          pay money for an invitation because the person who
                          sells an invitation can terminate the invitation and
                          issue a new one.
                        </Trans>
                      </p>
                      <p>
                        {t(
                          'Please notice that validated members have limited number of invites (1 or 2 invites). The person who invites you gets invitation rewards for 3 subsequent validations passed by you. If you are not going to participate in the upcoming validation, please notify the person who invited you so he/she could have a chance to find another invitee and get an invitation reward.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'Be aware that person who invites you can terminate your cryptoidentity until you pass your first validation.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-start-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-start-1">
                      {t('How do I start using Idena?', {ns: 'faq'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-start-1">
                    <div className="card-body">
                      <ul>
                        <li>
                          <Trans
                            i18nKey="downloadIdenaBuildsLink"
                            t={t}
                            ns="faq"
                          >
                            <a href="./?view=download">Download and install</a>{' '}
                            the Idena Node and Idena Client executable files or{' '}
                            <a href="https://github.com/idena-network">
                              build them from source
                            </a>
                            .
                          </Trans>
                        </li>
                        <li>
                          <Trans i18nKey="subscribeTelegramLink" t={t} ns="faq">
                            Subscribe to the{' '}
                            <a href="https://t.me/IdenaAnnouncements">
                              Idena Announcements
                            </a>{' '}
                            Telegram channel to follow updates.
                          </Trans>
                        </li>
                        <li>
                          <Trans i18nKey="loinOfficialTelegram" t={t} ns="faq">
                            Join the official{' '}
                            <a href="https://t.me/IdenaNetworkPublic">
                              Idena Telegram chat
                            </a>{' '}
                            and follow instructions in the pinned message to get
                            an invitation code.
                          </Trans>
                        </li>
                        <li>
                          {t(
                            'Make sure your node is synchronized, and activate the invitation code. Check your identity status; it should be "Candidate."',
                            {ns: 'faq'}
                          )}
                        </li>
                        <li>
                          <Trans
                            i18nKey="nextValidationTimeCheck"
                            t={t}
                            ns="faq"
                          >
                            Check the next validation time:{' '}
                            <span className="NextValidationDateTime">
                              {{
                                validationTime:
                                  validationTime === null
                                    ? '..'
                                    : validationTime,
                              }}
                            </span>
                            . Your node must be synchronized before the session
                            starts.
                          </Trans>
                        </li>
                        <li>
                          <Trans i18nKey="flipSolveLearningLink" t={t} ns="faq">
                            Learn how to solve flips: read{' '}
                            <a href="https://medium.com/idena/how-to-prove-your-identity-anonymously-919bdfe5249a">
                              the article
                            </a>{' '}
                            in our blog and{' '}
                            <a href="https://flips.idena.io/?pass=idena.io">
                              test yourself
                            </a>
                            .
                          </Trans>
                        </li>
                        <li>
                          {t(
                            'Solve the flips during the validation time. Be agile. The first 6 flips must be submitted in less than 2 minutes.',
                            {ns: 'faq'}
                          )}
                        </li>
                        <li>
                          {t(
                            'Once your account is validated, keep your node up and running in order to mine coins.',
                            {ns: 'faq'}
                          )}
                        </li>
                        <li>
                          {t(
                            `Learn how to create flips. Don't forget to create three flips before the next validation in advance. Schedule your next validation.`,
                            {ns: 'faq'}
                          )}
                        </li>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-network-3">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-network-3">
                      {t(
                        'Why do you need an invitation to join the Idena network?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-network-3">
                    <div className="card-body">
                      <p>
                        {t(
                          'The pace of network growth is restricted to minimize the probability of a Sybil attack.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-network-4">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-network-4">
                      {t(
                        'Does the Idena protocol prevent users from buying or selling invitations?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-network-4">
                    <div className="card-body">
                      <p>
                        {t(
                          'The Idena protocol introduces incentives to prevent participants from buying and selling invitations. Invitations can be terminated after they are issued if it is done before the upcoming validation. The seller can double-spend the invitation by selling it multiple times. Invitations should be granted for free to trusted people only (relatives, friends, and so on).',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-network-5">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-network-5">
                      {t('What is the invitations distribution?', {ns: 'faq'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-network-5">
                    <div className="card-body">
                      <p>
                        {t(
                          'The targeted number of invitations in the network is calculated as 50% of the network size after each validation (Idena foundation invitations remaining extra).',
                          {ns: 'faq'}
                        )}
                      </p>
                      <Trans i18nKey="invitationDistribution" t={t} ns="faq">
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
                      </Trans>

                      <p>
                        <Trans
                          i18nKey="availableInvitationsNumber"
                          t={t}
                          ns="faq"
                        >
                          The core Idena team is granted to issue a limited
                          number of invitations per epoch to support the network
                          growth. The number of available invitations for the
                          foundation address is limited to{' '}
                          <code>max(500, NetworkSize*0.1)</code>
                        </Trans>
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-start-2">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-start-2">
                      {t('What is a stake in Idena?', {ns: 'faq'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-start-2">
                    <div className="card-body">
                      <p>
                        {t(
                          'Every account in Idena has two wallets: the Idena wallet and the stake. The stake is like your pension account: 20% of all your Idena rewards (mining, validation rewards, flip rewards, valid invitation rewards, and so on) accumulate in the stake, while the remaining 80% goes directly to your Idena wallet.',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>

                      <p>
                        {t(
                          'The stake cannot be spent while your account is valid. You receive these coins in your Idena wallet only when you voluntary terminate your Idena account - that is, when you “kill” your cryptoidentity.',
                          {ns: 'faq'}
                        )}
                      </p>

                      <p>
                        {t(
                          'When your account is killed by the network protocol, you lose your stake.',
                          {ns: 'faq'}
                        )}
                      </p>

                      <p>
                        {t(
                          'Idena does not use the stake for governance purposes.',
                          {ns: 'faq'}
                        )}
                      </p>

                      <p>
                        <b>
                          {t(
                            'Discrimination of identities with the Newbie status',
                            {ns: 'faq'}
                          )}
                        </b>
                      </p>

                      <p>
                        {t(
                          'Only 20% of earned coins is mined to the main wallet for Newbies. The rest 80% is mined to the stake: in total 60% of earned coins is temporary locked in the stake until a Newbie becomes Verified.',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>
                      <p>
                        {t(
                          '60% of earned coins will be sent back to the main wallet once a Newbie becomes Verified.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'Newbies cannot terminate their identities to withdraw the stake.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'Newbies cannot participate in the governance of the network. While adresses with this status can get rewards for mining and participating in oracle votes, their votes are not counted and do not make a difference in the final outcome of a voting: they cannot influence a hard fork voting or an oracle voting.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h3>{t('Validation session', {ns: 'faq'})}</h3>
              <Accordion
                activeKey={activeHash}
                onSelect={e => setActiveHash(e)}
              >
                <Card id="faq-validation-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-1">
                      {t(
                        'How do I find out when the next validation session starts?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-1">
                    <div className="card-body">
                      <p>
                        {t(
                          'The date of the validation session is calculated by the network and is shown in the Idena app. The time is always fixed: 13:30 UTC.',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>

                      <p>
                        {t(
                          'The bigger the network is, the less frequently the validation sessions happen.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'The validation date will be adjusted to Saturdays once the network reaches 9441 identities. The total epoch duration is limited to 28 days.',
                          {ns: 'faq'}
                        )}
                      </p>

                      <div className="tab-content block">
                        <div className="tab-pane show active" role="tabpanel">
                          <div className="table-responsive">
                            <table className="table">
                              <tr>
                                <th>{t('Network size', {ns: 'faq'})}</th>
                                <th>
                                  <Trans
                                    i18nKey="frequencyInDays"
                                    t={t}
                                    ns="faq"
                                  >
                                    Frequency, <br /> days
                                  </Trans>
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
                                    <Trans
                                      i18nKey="frequencyWith9441NetworkSize"
                                      t={t}
                                      ns="faq"
                                    >
                                      21 if Saturday <br /> 20 otherwise
                                    </Trans>
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
                      {t(
                        'Do you think the chosen validation time is fair for all countries?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-2">
                    <div className="card-body">
                      <p>
                        {t(
                          `The validation time of 13:30 UTC covers most countries when most people are awake. These are the local times for some of the world's cities (as of June 1, 2019):`,
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>
                      <ul>
                        <li>
                          {t('San Francisco, USA 6:30', {
                            ns: 'faq',
                            nsSeparator: '!',
                          })}
                        </li>
                        <li>
                          {t('New York, USA 9:30', {
                            ns: 'faq',
                            nsSeparator: '!',
                          })}
                        </li>
                        <li>
                          {t('Tunis, Tunisia 14:30', {
                            ns: 'faq',
                            nsSeparator: '!',
                          })}
                        </li>
                        <li>
                          {t('Berlin, Germany 15:30', {
                            ns: 'faq',
                            nsSeparator: '!',
                          })}
                        </li>
                        <li>
                          {t('Moscow, Russia 16:30', {
                            ns: 'faq',
                            nsSeparator: '!',
                          })}
                        </li>
                        <li>
                          {t('Delhi, India 19:00', {
                            ns: 'faq',
                            nsSeparator: '!',
                          })}
                        </li>
                        <li>
                          {t('Beijing, China 21:30', {
                            ns: 'faq',
                            nsSeparator: '!',
                          })}
                        </li>
                        <li>
                          {t('Sydney, Australia 23:30', {
                            ns: 'faq',
                            nsSeparator: '!',
                          })}
                        </li>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-validation-3">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-3">
                      {t(
                        'Why are there actually two sessions — a short and a long one — during the validation ceremony?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-3">
                    <div className="card-body">
                      <p>
                        {t(
                          'The short validation session has a very limited time frame, less than two minutes, and consists of six flips, each of which is received only by 1–4 participants in the network (depending on the network size). This session’s task is conducting a Turing test: telling humans from AI.',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>
                      <p>
                        {t(
                          'The long flip qualification session lasts 30 minutes and consists of 25-30 flips, each of which is received by a larger number of network participants (depending on the network size). This session enables the network to achieve a consensus on flip quality and the right answer to a flip.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-validation-4">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-4">
                      {t('What validation score do I need to be validated?', {
                        ns: 'faq',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-4">
                    <div className="card-body">
                      <p>
                        {t(
                          'To get validated, you need to meet these three requirements during each validation session:',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>
                      <ul>
                        <li>
                          {t(
                            'Your current short validation session’s score should be 60% or more.',
                            {ns: 'faq'}
                          )}
                        </li>
                        <li>
                          {t(
                            'Your total score for the last 10 short validations (including the current validation session and all the previous ones) should be 75% or more.',
                            {ns: 'faq'}
                          )}
                        </li>
                        <li>
                          {t(
                            'Your current long session’s score should be 75% or more.',
                            {ns: 'faq'}
                          )}
                        </li>
                        <br />
                        <p>
                          {t(
                            'In addition, you need to solve flips both correctly and fast. The first 6 flips must be solved in less than 2 minutes.',
                            {ns: 'faq'}
                          )}
                        </p>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-validation-5">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-5">
                      {t(
                        'What if I miss the validation? Can I still mine coins?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-5">
                    <div className="card-body">
                      <p>
                        {t(
                          'The validation status of a participant is not forever. It expires when the next epoch starts. Participants should prolong their validation status for every new epoch. A validated person may miss two validation sessions in a row without losing her cryptoidentity. But then this person cannot mine coins during the epochs when validations have been missed.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-validation-6">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-6">
                      {t('Are all participants in Idena equal?', {ns: 'faq'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-6">
                    <div className="card-body">
                      <p>
                        {t(
                          'There are different statuses of participants in Idena:',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                        <div className="fig">
                          <img
                            src="/static/images/Idena-Identity-Status-Flow-1.png?1"
                            alt=""
                          />
                          <p>
                            {t(
                              'Fig: Identity status flow (Candidate, Newbie, Verified, Human)',
                              {ns: 'faq', nsSeparator: '!'}
                            )}
                          </p>
                        </div>
                        <li>
                          <Trans i18nKey="candidateDescription" t={t} ns="faq">
                            <b>Candidate.</b> A participant who has just joined
                            the network via an invitation can participate in the
                            subsequent validation session only.
                          </Trans>
                        </li>
                        <li>
                          <Trans i18nKey="newbieDescription" t={t} ns="faq">
                            <b>Newbie.</b> A newly validated identity can
                            participate in subsequent validation sessions, mine
                            coins, and create flips, but cannot send out
                            invitations or miss validations.
                          </Trans>
                        </li>
                        <li>
                          <Trans i18nKey="verifiedDescription" t={t} ns="faq">
                            <b>Verified.</b> A cryptoidentity validated at least
                            three times in a row and having the{' '}
                            <code>Total score{'>'}=75%</code> can do the same as
                            a Newbie plus
                            <br />- send out invitations
                            <br />- submit one extra flip
                            <br />- miss up to two validations in a row
                            <br />A Verified cannot fail neither a short nor a
                            long session.
                          </Trans>
                        </li>
                        <li>
                          <Trans i18nKey="humanDescription" t={t} ns="faq">
                            <b>Human.</b> A cryptoidentity validated at least
                            four times and having the{' '}
                            <code>Total score{'>'}=92%</code> can do the same as
                            a Verified plus
                            <br />- submit two extra flips (five in total)
                            <br />- fail a short and long session without being
                            killed
                          </Trans>
                          <div className="fig">
                            <img
                              src="/static/images/Idena-Identity-Status-Flow-2.png"
                              alt=""
                            />
                            <p>
                              {t(
                                'Fig: Identity status flow (Suspended, Zombie)',
                                {ns: 'faq', nsSeparator: '!'}
                              )}
                            </p>
                          </div>
                        </li>
                        <li>
                          <Trans i18nKey="suspendedDescription" t={t} ns="faq">
                            <b>Suspended.</b> A verified cryptoidentity that has
                            missed one validation session can do the same as a
                            Candidate and can miss one validation session.
                          </Trans>
                        </li>
                        <li>
                          <Trans i18nKey="zombieDescription" t={t} ns="faq">
                            <b>Zombie.</b> A verified cryptoidentity that has
                            missed two validation sessions is equal to a
                            Candidate.
                          </Trans>
                        </li>
                        <li>
                          <Trans i18nKey="killedDescription" t={t} ns="faq">
                            <b>Killed.</b> The account is not part of the
                            network anymore.
                          </Trans>
                        </li>
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-validation-7">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-7">
                      {t(
                        'Why can’t Idena have several validations at different times to make it more convenient for participants in different time zones?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-7">
                    <div className="card-body">
                      <p>
                        {t(
                          'The validation time needs to be synchronized for people all over the world to verify the uniqueness of network participants. Otherwise, it would be possible to verify a different account at each of the various validation ceremonies.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-validation-8">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-8">
                      {t(
                        'Am I allowed to participate in a validation ceremony if I have not submitted flips?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-8">
                    <div className="card-body">
                      <p>
                        {t(
                          'Newbies and verified accounts must submit flips before the next validation ceremony. Not submitting flips is equal to missing a validation.',
                          {ns: 'faq'}
                        )}{' '}
                      </p>

                      <p>
                        {t(
                          'Candidates, suspended accounts, and zombies do not submit flips for the validation ceremony.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-validation-9">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-9">
                      {t(
                        'Will I lose the coins I have mined in Idena when my cryptoidentity is killed?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-9">
                    <div className="card-body">
                      <p>
                        {t(
                          'If your cryptoidentity is killed by the network, you lose your stake: 20% of all your rewards (mining, validation rewards, flip rewards, valid invitation rewards, and so on), which cannot be spent while your Idena account is valid and which can be received only when you voluntary terminate your account.',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>

                      <p>
                        {t(
                          'The remaining 80% of all your Idena earnings go directly to your Idena wallet. You keep those coins even if your cryptoidentity is killed (by you or by the network protocol)',
                          {ns: 'faq'}
                        )}
                        .
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-validation-10">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-10">
                      {t(
                        'I have passed the validation but I haven’t received any rewards. Why?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-10">
                    <div className="card-body">
                      <Trans i18nKey="flipReportingSituations" t={t} ns="faq">
                        <p>It is possible in the one of following cases:</p>
                        <ul>
                          <li>
                            If one of your flips is reported by the majority of
                            qualification committee (please see{' '}
                            <a href="#faq-challenge-11">
                              What if one of my flips is reported
                            </a>
                            )
                          </li>
                          <br />
                          <p>or</p>
                          <li>
                            If all of your flips have status No consensus which
                            means that the network could not reached consensus
                            about the right answer for these flips.
                          </li>
                        </ul>
                        <p>
                          Please notice that flips are the key element of Idena
                          network security. That is why the protocol imposes
                          severe penalties on users that create flips in breach
                          of the rules.
                        </p>
                      </Trans>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-validation-11">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-validation-11">
                      {t(
                        'Why do I get Late submission even though I’m sure I’ve submitted my answers in time?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-validation-11">
                    <div className="card-body">
                      <p>
                        {t(
                          'As Idena is a decentralized and distributed network it uses a gossip peer-to-peer protocol to ensure data disseminated to the network.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'To consider your answers valid they should reach more than 50% of validated nodes no later than 13:32 UTC.',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>
                      <p>
                        {t(
                          'Also, the keys of your flips (for previously validated users) should spread across the network no later than 30 secs from the beginning of validation.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'If your node lost connection while submitting the answers/keys and connection was restored after the above time, the validation attempt will be considered as failed with the Late submission reason.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        <Trans
                          i18nKey="validationConnectionLost"
                          t={t}
                          ns="faq"
                        >
                          Node disconnection happens if your node doesn’t have
                          enough peers to maintain the stable data channel. This
                          could be in 2 cases:
                          <ol>
                            <li>Low-performance computer or home router;</li>
                            <li>
                              You have synced the node right before validation
                              and the node did not manage to find enough peers
                              for stable connection.
                            </li>
                          </ol>
                        </Trans>
                      </p>
                      <p>
                        <Trans
                          i18nKey="desktopNodeSyncRecommendation"
                          t={t}
                          ns="faq"
                        >
                          We recommend you to keep your desktop node
                          synchronized at least 30 mins before validation,
                          upgrade your hardware if possible or use Idena web app
                          (
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://app.idena.io/"
                          >
                            app.idena.io
                          </a>
                          ) with a connection to one of shared nodes for
                          validation.
                        </Trans>
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h3>{t('Flip challenge', {ns: 'faq'})}</h3>
              <Accordion
                activeKey={activeHash}
                onSelect={e => setActiveHash(e)}
              >
                <Card id="faq-challenge-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-1">
                      {t('Who creates flips in the network?', {ns: 'faq'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-1">
                    <div className="card-body">
                      <p>
                        {t(
                          'Validated participants create flips to be able to take part in the next validation session.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-2">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-2">
                      {t(
                        'How can people whose disabilities prevent them from completing a traditional flip validation session be validated?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-2">
                    <div className="card-body">
                      <p>
                        {t(
                          `For now, they can't. But Idena is designed as an open-source project, and we hope that there will be teams with specific expertise in this area who will be motivated to develop means for people with disabilities to get validated in the network, such as audio flips, for example.`,
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-3">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-3">
                      {t(
                        'Who specifies the right answer for a flip? Does the author publish the right answer?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-3">
                    <div className="card-body">
                      <p>
                        {t(
                          'A flip is submitted without the right answer. The network comes to a consensus about the right answer after the validation session.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'If consensus is not reached, then the flip is disqualified. Answers for disqualified flips are not counted. Authors of disqualified flips get no reward for making them.',
                          {ns: 'faq'}
                        )}
                      </p>

                      <p>
                        {t(
                          'Flip has strong consensus if there are not less than 75% of participants agreed with the answer. Participants who gave right answer get 1 point, otherwise 0.',
                          {ns: 'faq'}
                        )}
                      </p>

                      <p>
                        {t(
                          'Flip has weak consensus if there are at least 66% of participants agreed with the answer. Participants who gave right answer get 1 point, otherwise 0,5.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-4">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-4">
                      {t('What if a flip cannot be solved by a human?', {
                        ns: 'faq',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-4">
                    <div className="card-body">
                      <p>
                        {t(
                          'The network comes to a consensus about the right answer after the validation session. If consensus is not reached, then the flip is disqualified. Answers for such disqualified flips are not counted.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-5">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-5">
                      {t(
                        'How are flips distributed for the validation session? Are flips individual?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-5">
                    <div className="card-body">
                      <p>
                        {t(
                          'As the network grows, the number of people solving the same flip goes down: In a network of 10,000 users, only two different participants will have the same flip to solve. When the network reaches 30,000 users, one single flip will appear in a validation session of only one participant.',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-6">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-6">
                      {t(
                        'How are newly created flips secured so that they do not leak before the validation session?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-6">
                    <div className="card-body">
                      <p>
                        {t(
                          'The flips are stored as encrypted data in the network before validation, and then they are algorithmically distributed.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'The flips are encrypted according to the following protocol:',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>
                      <ol>
                        <li>
                          <Trans i18nKey="faqFlipParts" t={t} ns="faq">
                            Every flip has a public and a hidden part:
                            <br />- the public part is available for everyone
                            after the validation (2 images)
                            <br />- the hidden part is available only for the
                            participants who solve the flip
                          </Trans>
                        </li>
                        <li>
                          <Trans i18nKey="faqFlipEncryption" t={t} ns="faq">
                            An author generates 2 keys for flip encryption:
                            <br />- <code>FlipPublicSecret</code> for the
                            encryption of the public part of the flip
                            <br />- <code>FlipHiddenSecret</code> for the
                            encryption of the hidden part of the flip
                          </Trans>
                        </li>
                        <li>
                          {t(
                            'All flips created by the author are encrypted using these 2 keys and broadcasted into the IPFS',
                            {ns: 'faq'}
                          )}
                        </li>

                        <li>
                          <Trans
                            i18nKey="flipLotteryDescription1"
                            t={t}
                            ns="faq"
                          >
                            Flip lottery
                            <br />- The author calculates the list of candidates
                            who must solve the flips in order to send them
                            FlipHiddenSecret
                            <br />- <code>FlipRecipients[N]</code> array is
                            produced: <code>FlipHiddenSecret</code> is encrypted
                            N times with candidates' public keys (N is the
                            number of participants who must solve the flip)
                            <br />- <code>FlipRecipients[N]</code> array is
                            encrypted with <code>FlipPublicSecret</code> and
                            broadcasted to the IPFS
                            <br />- Candidates download arrays{' '}
                            <code>FlipRecipients[N]</code> corresponding to the
                            flips they have to solve
                          </Trans>
                        </li>
                        <li>
                          <Trans
                            i18nKey="flipLotteryDescription2"
                            t={t}
                            ns="faq"
                          >
                            Once the validation ceremony starts at 1:30pm UTC,
                            all the authors broadcast their{' '}
                            <code>FlipPublicSecret</code>.
                            <br />- Candidates decrypt arrays{' '}
                            <code>FlipRecipients[N]</code> corresponding to the
                            flips they need and extract the{' '}
                            <code>FlipHiddenSecret</code> using their private
                            key.
                            <br />- Other participants can decrypt only public
                            parts of the flips using shared{' '}
                            <code>FlipPublicSecret</code>.
                          </Trans>
                        </li>
                      </ol>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-7">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-7">
                      {t(
                        'What if someone develops AI instruments to solve flips?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-7">
                    <div className="card-body">
                      <p>
                        {t(
                          'Flips belong to the class of AI-hard problems. There is no single pattern for flips since they are created by humans according to randomly selected keywords.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'Flips do not fall under the class of "recognition" problems, which are easily solved by neural networks. Solving a flip demands understanding the meaning of a story, using common-sense reasoning.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'The example of the Winograd Schema Challenge shows that introducing a larger database does not lead to better results with AI-hard tasks.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'In addition, adversarial noise can be added to flip images to make a neural network result in incorrect outputs.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'Thus, current AI instruments or even a large database of flips will not achieve the results that can be compared to those demonstrated by humans.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-8">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-8">
                      {t(
                        'What types of flips are to be reported during the long sessions?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-8">
                    <div className="card-body">
                      <p>
                        {t(
                          'You should report the flip when you see one of the following:',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>
                      <ul>
                        <li>
                          {t(
                            'One of the keywords is not relevant to the flip',
                            {ns: 'faq'}
                          )}
                        </li>
                        <li>
                          {t(
                            'You need to read the text in the flip to solve it',
                            {ns: 'faq'}
                          )}
                        </li>
                        <li>
                          {t('You see inappropriate content', {ns: 'faq'})}
                        </li>
                        <li>
                          {t(
                            'You see numbers or letters or other labels on top of the images indicating their order',
                            {ns: 'faq'}
                          )}
                        </li>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-9">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-9">
                      {t(
                        'How are participants motivated to report bad flips?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-9">
                    <div className="card-body">
                      <p>
                        {t(
                          'Every successful report of a flip is rewarded: The reward for the reported flip which is not paid to the flip creator is distributed between the committee embers who reported the flip.',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-10">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-10">
                      {t('What if someone reports all the flips?', {ns: 'faq'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-10">
                    <div className="card-body">
                      <p>
                        {t(
                          'The number of flips that can be reported is limited to 1/3. So participants are motivated to pick which flip to report first relying on objective criteria (e.g. both keywords relevance).',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-challenge-11">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-challenge-11">
                      {t('What if one of my flips is reported?', {ns: 'faq'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-challenge-11">
                    <div className="card-body">
                      <p>
                        <Trans i18nKey="flipReportingAftermath" t={t} ns="faq">
                          Flips are the key element of Idena network security.
                          The protocol imposes severe penalties on users that
                          create flips in breach of the{' '}
                          <a href="#faq-creation-rule-1">rules</a>. If one of
                          the flips is reported during the validation, the user
                          that created this flip will not get any rewards for
                          the validation. A flip cannot get status Reported by
                          accident. This status is given if more than 50% of
                          qualification committee have reported this flip during
                          the long session. Every member of qualification
                          committee can report only 1/3 of flips that are shown
                          to them.
                        </Trans>
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h3>{t('Flip creation', {ns: 'faq'})}</h3>
              <Accordion
                activeKey={activeHash}
                onSelect={e => setActiveHash(e)}
              >
                <Card id="faq-creation-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-creation-1">
                      {t('What is the procedure to create a new flip?', {
                        ns: 'faq',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-creation-1">
                    <div className="card-body">
                      <p>
                        {t(
                          'To create a flip, you use two keywords randomly selected by the protocol as associative hints to think up a story within the general template of “Before – Something happens – After.” You upload four images from your device or from the Internet to tell the story. Then you create an alternative – a meaningless sequence of the images that you have chosen by shuffling – and submit the pair of sequences to the network.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-creation-rule-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-creation-rule-1">
                      {t('What are the rules to create flips?', {ns: 'faq'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-creation-rule-1">
                    <div className="card-body">
                      <Trans i18nKey="flipCreationRules" t={t} ns="faq">
                        <p>Please follow the rules when creating flips:</p>
                        <ul>
                          <li>flips should be relevant to both keywords</li>
                          <li>
                            flips should not contain any inappropriate content
                          </li>
                          <li>
                            flips should not content any text that is necessary
                            to understand to solve this flip
                          </li>
                          <li>
                            flips should not contain any numbers or letters or
                            other labels on top of the images indicating their
                            order
                          </li>
                        </ul>
                        <p>
                          If you don’t follow these rules when creating a flip,
                          it can be reported at the qualification session.
                          Please keep in mind that in this case you will not be
                          paid for validation (see{' '}
                          <a href="#faq-challenge-11">
                            What if one of my flips is reported
                          </a>
                          ).
                        </p>
                      </Trans>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-creation-2">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-creation-2">
                      {t(
                        'Why do I need to use the suggested keywords to create a flip?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-creation-2">
                    <div className="card-body">
                      <p>
                        {t(
                          'These two random keywords selected from a large dictionary are a sort of associative hint for stimulating your creativity. You are required to use them for two reasons. First, doing so helps to ensure the non-repeatability and unpredictability of flip types, which makes flips truly AI-resistant. Second, it enables the Idena protocol to detect and punish protocol abuse such as submitting a number of random pictures instead of a flip or the same flip repeatedly.',
                          {ns: 'faq'}
                        )}
                      </p>

                      <p>
                        <Trans
                          i18nKey="relevantWordFlipRequirement"
                          t={t}
                          ns="faq"
                        >
                          Network participants must create flips relevant to the
                          suggested keywords. If you are not sure of the
                          meanings of the word, or if you cannot think of a
                          story with the suggested words, click the{' '}
                          <i>Change my words</i> button, and a new pair of words
                          will appear. You are given 9 pairs of words to create
                          three flips each epoch.
                        </Trans>
                      </p>

                      <p>
                        {t(
                          'The relevance of the flip to the keywords is tested during the long qualification session. Participants who create flips that are irrelevant to the keywords are penalized by the protocol. Identities will be killed for repeatedly ignoring keywords when creating flips.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-creation-3">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-creation-3">
                      {t('Who can create flips?', {ns: 'faq'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-creation-3">
                    <div className="card-body">
                      <p>
                        {t('Flips are created by validated identities.', {
                          ns: 'faq',
                        })}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-creation-4">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-creation-4">
                      {t('What if someone creates an invalid flip?', {
                        ns: 'faq',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-creation-4">
                    <div className="card-body">
                      <p>
                        {t(
                          'The network comes to the consensus about the right answer after the validation session. If consensus is not reached, then the flip is disqualified. Answers for disqualified flips are not counted, and the authors of these flips are not rewarded.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-creation-5">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-creation-5">
                      {t(
                        'If I create more flips than requested, may I keep them as drafts and submit them for the next epoch?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-creation-5">
                    <div className="card-body">
                      <p>
                        {t(
                          'You cannot keep flip drafts for the next epoch, because the keywords used for flip creation are generated for the current epoch. All the drafts will be burnt after the validation session, and you will have to create new flips.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-creation-6">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-creation-6">
                      {t(
                        'What if someone deliberately creates bad flips or uses inappropriate images for them?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-creation-6">
                    <div className="card-body">
                      <p>
                        {t(
                          'Users creating meaningless flips or spam or flips with inappropriate content or flips irrelevant to the keywords are to be punished.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-distribution-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-distribution-1">
                      {t(
                        'How are flips distributed during a validation session?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-distribution-1">
                    <div className="card-body">
                      <p>
                        {t(
                          'Flips are distributed randomly. Participants are not allowed to solve flips created by themselves.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h3>{t('Delegation', {ns: 'faq'})}</h3>
              <Accordion
                activeKey={activeHash}
                onSelect={e => setActiveHash(e)}
              >
                <Card id="faq-delegation-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-delegation-1">
                      {t('What is delegation of mining status?', {
                        ns: 'faq',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-delegation-1">
                    <div className="card-body">
                      <p>
                        {t(
                          'You can delegate your mining status to another address which in this case will act as a pool.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'For example, if several members of your family have Idena nodes, you can benefit from delegation to one pool. Only this pool node has to be online to mine coins for delegated nodes. Pool rewards for block mining will be equal to those of a single identity.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'Mining and validation rewards will go to the pool address. Your address will get only the part of rewards that goes to your stake.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'Please keep in mind that your identity could be terminated by the pool owner and you can lose your stake. That is why we strongly recommend to use delegation only if you trust the pool owner.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'You can disable delegation in the next epoch only. After you undelegate you can not delegate your mining status for 3 epochs to a different pool.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-delegation-2">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-delegation-2">
                      {t(
                        'Does a pool owner get my private key if I delegate mining to him?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-delegation-2">
                    <div className="card-body">
                      <p>
                        {t(
                          'No keys are transferred from the delegating node to the pool. The fact of the delegation is stored only on the blockchain.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'However, the pool owner can terminate your identity and take your stake.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-delegation-3">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-delegation-3">
                      {t('Does the pool address need to be validated?', {
                        ns: 'faq',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-delegation-3">
                    <div className="card-body">
                      <p>
                        {t(
                          'Any validated user can delegate their mining status to a not validated address which will become a pool.',
                          {
                            ns: 'faq',
                          }
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-delegation-4">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-delegation-4">
                      {t('Do I need to get validated if I delegated mining?', {
                        ns: 'faq',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-delegation-4">
                    <div className="card-body">
                      <p>
                        {t(
                          'Yes, you need to stay validated so that the pool can keep mining coins for you.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-delegation-5">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-delegation-5">
                      {t(
                        'Can I participate in Oracle voting if I delegated mining?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-delegation-5">
                    <div className="card-body">
                      <p>
                        {t(
                          'Yes, you can vote in any Oracle voting and get rewards in accordance with the specific oracle voting. These rewards will go to the pool address.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'However, to determine the results of the Oracle voting only the last vote sent from the pool is counted.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h3>{t('Economy', {ns: 'faq'})}</h3>
              <Accordion
                activeKey={activeHash}
                onSelect={e => setActiveHash(e)}
              >
                <Card id="faq-economy-2">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-economy-2">
                      {t('What is the total supply limit?', {ns: 'faq'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-economy-2">
                    <div className="card-body">
                      <p>{t('Total supply is not limited.', {ns: 'faq'})}</p>
                      <p>
                        {t(
                          'Total minting is capped at 51,840 coins per day. Half of the cap (50%) is mined while producing the blocks. The rest of the coins are minted during validation sessions.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        <Trans i18nKey="rewardExplanation" t={t} ns="faq">
                          Block reward: 6 iDNA
                          <br />
                          Maximum number of blocks per day: 4,320
                          <br />
                          Mining cap per day: 25,920 iDNA (50%)
                          <br />
                          Accumulating fund per day: 25,920 iDNA (50%)
                          <br />
                          Total cap: 51,840 iDNA
                        </Trans>
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-economy-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-economy-1">
                      {t(
                        'Is the Idena coin (iDNA) based on an inflation model?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-economy-1">
                    <div className="card-body">
                      <p>
                        {t(
                          'There are the following cases for supply utilization:',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>
                      <ul>
                        <Trans i18nKey="coinsAllocation" t={t} ns="faq">
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
                            The bigger the network the more coinholders will
                            just hold newly minted coins without spending them
                          </li>
                        </Trans>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-economy-6">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-economy-6">
                      {t('What is the mining penalty?', {ns: 'faq'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-economy-6">
                    <div className="card-body">
                      <p>
                        {t(
                          'The mining penalty is charged if a node is being offline for more than 1.5 hours with the miner status activated. The miner status for the penalized node is deactivated automatically.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'In order to continue mining, the mining status has to be activated manually. All the newly mined coins will be spent to cover the penalty. Once the penalty duration passes, mining will continue as usual. All mining penalties are discarded when a new epoch starts.',
                          {ns: 'faq'}
                        )}
                      </p>

                      <p>
                        {t(
                          'The penalty duration is set to 8 hours',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>

                      <b>
                        {t('How is the mining penalty charged?', {ns: 'faq'})}
                      </b>
                      <p>
                        {t(
                          'Every node tracks activity of other nodes when new blocks are produced. There are two subsequent blocks that have to be mined to penalize an offline node:',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>
                      <ul>
                        <Trans i18nKey="penaltyProposalBlock" t={t} ns="faq">
                          1. Penalty proposal block (<code>OfflinePropose</code>{' '}
                          bit is activated)
                          <br />
                          Nodes are voting for a penalty proposal by a special
                          bit in their vote messages: <code>TurnOffline</code>.
                        </Trans>
                      </ul>
                      <ul>
                        <Trans i18nKey="penaltyExecutionBlock" t={t} ns="faq">
                          2. Penalty execution block (<code>OfflineCommit</code>{' '}
                          bit is activated)
                          <br />
                          The block is created if consensus for the penalty
                          proposal mined in the previous block is reached.
                        </Trans>
                      </ul>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-economy-7">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-economy-7">
                      {t('What is the transaction fee in Idena?', {ns: 'faq'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-economy-7">
                    <div className="card-body">
                      <p>
                        {t(
                          'The transaction fee is calculated automatically by protocol. The fee goes up or down based on how full the previous block was, targeting an average block utilization of 50%. When the previous block is more than 50% full, the transaction fee goes up proportionally. When it is below 50% usage, fees go down. A user can specify the maximum fee limit for the transaction.',
                          {ns: 'faq'}
                        )}
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
                        <p>
                          {t('Fig: Transaction fee calculation', {
                            ns: 'faq',
                            nsSeparator: '!',
                          })}
                        </p>
                      </div>

                      <p>
                        {t(
                          'Validation ceremony transactions are not charged. However, they affect the fee rate because of the block consumtion.',
                          {ns: 'faq'}
                        )}
                      </p>

                      <p>
                        {t(
                          '90% of paid fees are burnt. The rest 10% are paid to the block proposer.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-economy-3">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-economy-3">
                      {t('What is the Idena coins minting structure?', {
                        ns: 'faq',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-economy-3">
                    <div className="card-body">
                      <Trans i18nKey="fixedMiningCaps" t={t} ns="faq">
                        <p>
                          There is a fixed cap for minting Idena coins equal to
                          51,840 iDNA per day:
                        </p>
                        <ul>
                          <li>Block mining cap: 50%</li>
                          <li>Staking reward fund: 9%</li>
                          <li>Candidate reward fund: 1%</li>
                          <li>Flip reward fund: 17.5%</li>
                          <li>Invitation reward fund: 9%</li>
                          <li>Report reward fund: 7.5%</li>
                          <li>Idena foundation payouts: 5%</li>
                          <li>Zero wallet fund: 1%</li>
                        </ul>
                      </Trans>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-economy-4">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-economy-4">
                      {t(
                        'How are rewards for the validation session distributed?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-economy-4">
                    <div className="card-body">
                      <p>
                        {t(
                          'The validation session fund is capped at 25,920 iDNA per day. It accumulates daily (according to the number of blocks issued) and gets distributed at the end of the validation session as follows:',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>
                      <ul>
                        <Trans i18nKey="stakingRewardFund" t={t} ns="faq">
                          <li>
                            <b>Staking reward fund: 18%</b>
                          </li>
                          The staking reward is distributed according to stake.
                          (proportional to <i>stake</i>
                          <sup>0.9</sup>).
                        </Trans>
                        <Trans i18nKey="candidateRewardFund" t={t} ns="faq">
                          <li>
                            <b>Candidate reward fund: 2%</b>
                          </li>
                          The candidate reward fund is distributed to new users for passing their validation.
                        </Trans>
                        <Trans i18nKey="flipRewardFund" t={t} ns="faq">
                          <li>
                            <b>Flip reward fund: 35%</b>
                          </li>
                          The flip reward fund is distributed equally to all
                          validated participants proportionally to the number of
                          their qualified flips. Non-qualified flips are not
                          paid for.
                        </Trans>
                        <Trans i18nKey="invitationRewardFund" t={t} ns="faq">
                          <li>
                            <b>Invitation reward fund: 18%</b>
                          </li>
                          The invitation reward fund is distributed to all
                          identities whose invitations have been validated.
                          Invitation reward is paid up to 3 epochs in a row
                          proportionally to the invited person's age:
                          <br />
                          - A reward for the second validation of an invitee is
                          3 times bigger than a basic reward for a validated
                          Candidate.
                          <br />
                          - A reward for a Verified invitee is 6 times bigger
                          than a basic reward for a validated Candidate.
                          <br />
                          <br />
                          Invitation rewards for the 2nd and 3rd validation are
                          not paid to the Idena foundation.
                        </Trans>
                        <Trans i18nKey="reportRewardFund" t={t} ns="faq">
                          <li>
                            <b>Report reward fund: 15%</b>
                          </li>
                          The report reward fund is distributed for every reported flip to the identities who reported it.
                        </Trans>
                        <li>
                          <b>
                            {t('Idena foundation payouts: 10%', {
                              ns: 'faq',
                              nsSeparator: '!',
                            })}
                          </b>
                        </li>
                        <li>
                          <b>
                            {t('Zero wallet fund: 2%', {
                              ns: 'faq',
                              nsSeparator: '!',
                            })}
                          </b>
                        </li>
                      </ul>

                      <p>
                        {t(
                          'No rewards are paid to those participants who fall into one of the following groups:',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>

                      <ol type="1">
                        <li>
                          {t(
                            'Participants who have at least one flip irrelevant to key words',
                            {ns: 'faq'}
                          )}
                        </li>
                        <li>
                          {t('Participants who have no qualified flips', {
                            ns: 'faq',
                          })}
                        </li>
                        <li>
                          {t(
                            'Participants who provided invalid data instead of flip images',
                            {ns: 'faq'}
                          )}
                        </li>
                      </ol>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-economy-55">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-economy-5">
                      {t('What is the Idena coin utility?', {ns: 'faq'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-economy-5">
                    <div className="card-body">
                      <p>
                        {t(
                          'Idena formalizes people on the blockchain and there might be use cases that we can not anticipate yet.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <b>{t('Onchain marketing', {ns: 'faq'})}</b>
                      <p>
                        {t(
                          'Idena participants voluntarily agree to consume ads published by a valid address which burns coins. Multiple advertisers compete for attention of a certain group of users by burning coins. This is an auction: Whoever burns more coins has the right to show their ad. Burnt coins are removed from the total supply. Newly mined coins are equally distributed among the network participants and then can be sold to advertisers who will have shortage of coins.',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>

                      <div className="fig">
                        <img
                          src="/static/images/idena-coin-economy.png?2"
                          alt="Idena coin utility"
                        />
                        <p>
                          {t(
                            'Fig: Closed tokenomics fuels the demand for the Idena coin',
                            {ns: 'faq', nsSeparator: '!'}
                          )}
                        </p>
                      </div>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-economy-8">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-economy-8">
                      {t('What is the zero wallet?', {ns: 'faq'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-economy-8">
                    <div className="card-body">
                      <p>
                        <Trans i18nKey="onePercentWallet" t={t} ns="faq">
                          1% of all issued coins is accumulated at{' '}
                          <a href="https://scan.idena.io/address/0x0000000000000000000000000000000000000000">
                            the zero wallet address
                          </a>
                          . We believe that a governance for the zero wallet
                          fund allocation will be established in future. It can
                          be used for the external projects funding, covering
                          someones losses or for some other purporses the
                          network agrees on.
                        </Trans>
                      </p>
                      <p>
                        {t(
                          'There is no private key for the zero address. The network must reach consensus in order to spend it.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h3>{t('How to buy iDNA?', {ns: 'faq'})}</h3>
              <Accordion
                activeKey={activeHash}
                onSelect={e => setActiveHash(e)}
              >
                <Card id="faq-buy-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-buy-1">
                      {t('How to buy iDNA on a centralized exchange?', {
                        ns: 'faq',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-buy-1">
                    <div className="card-body">
                      <p>
                        <Trans i18nKey="idnaCentralizedExchange" t={t} ns="faq">
                          Create an account on one of the{' '}
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://www.coingecko.com/en/coins/idena#markets"
                          >
                            exchanges where iDNA is traded
                          </a>
                          . Trade iDNA and{' '}
                          <a href="#faq-buy-2">withdraw it to your wallet</a>.
                          If you want to hold iDNA long-term, we do not
                          recommend storing your coins on the exchange for
                          safety reasons.
                        </Trans>
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-buy-2">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-buy-2">
                      {t('How to withdraw iDNA to your Idena wallet?', {
                        ns: 'faq',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-buy-2">
                    <div className="card-body">
                      <p>
                        <Trans i18nKey="idnaWalletWithdraw" t={t} ns="faq">
                          You can use the Idena Web App or one of the{' '}
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://docs.idena.io/docs/community/resources/#wallets"
                          >
                            Idena wallets created by the community
                          </a>{' '}
                          to store your iDNA. Choose a wallet you want to use,
                          generate your address and use it to transfer your
                          Idena coins. In general, storing coins in a private
                          wallet is safer than keeping them on an exchange.
                        </Trans>
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-buy-3">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-buy-3">
                      {t('How to buy iDNA on a decentralized exchange?', {
                        ns: 'faq',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-buy-3">
                    <div className="card-body">
                      <p>
                        <Trans
                          i18nKey="idnaDecentralizedExchange"
                          t={t}
                          ns="faq"
                        >
                          You can buy wrapped iDNA on a decentralized exchange
                          using your metamask wallet. Open{' '}
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://pancakeswap.info/token/0x0de08c1abe5fb86dd7fd2ac90400ace305138d5b"
                          >
                            pancakeswap
                          </a>
                          , click Trade and connect your wallet. Read{' '}
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain"
                          >
                            more
                          </a>{' '}
                          about using your metamask wallet with BSC blockchain
                          to trade iDNA.
                        </Trans>
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-buy-4">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-buy-4">
                      {t(
                        'How to transfer wrapped iDNA to the Idena blockchain?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-buy-4">
                    <div className="card-body">
                      <p>
                        <Trans i18nKey="idnaBscTransfer" t={t} ns="faq">
                          If you have traded wrapped iDNA on BSC blockchain and
                          want to store them on the Idena blockchain, you can{' '}
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://bridge.idena.io/faq"
                          >
                            swap your iDNA using the Idena Bridge
                          </a>
                          .
                        </Trans>
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <h3>{t('Attacks', {ns: 'faq  '})}</h3>
              <Accordion
                activeKey={activeHash}
                onSelect={e => setActiveHash(e)}
              >
                <Card id="faq-attacks-1">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-attacks-1">
                      {t(
                        'If an attacker is more than 1/3 of the validated participants, will the honest contingent be able to recover?',
                        {ns: 'faq'}
                      )}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-attacks-1">
                    <div className="card-body">
                      <p>
                        {t(
                          'This is a general safety assumption applicable to any permissionless blockchain and it is not possible to overcome it: More than 2/3 of honest participants are needed to guarantee safety.',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>
                      <p>
                        <Trans i18nKey="bitcoinPow" t={t} ns="faq">
                          Let's look at Bitcoin proof-of-work. Consider{' '}
                          <a
                            href="https://arxiv.org/abs/1811.08263"
                            rel="nofollow"
                          >
                            selfish mining
                          </a>{' '}
                          when the biggest miners are getting bigger. As a
                          result, small miners do not invest in Bitcoin mining
                          since it contributes to their losses. As a matter of
                          fact, there is highly concentrated mining in Bitcoin
                          that cannot ever be reverted. There are thirteen
                          controlling pools in Bitcoin. There are three pools
                          controlling more than 50 percent of the Bitcoin
                          network.
                        </Trans>
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-attacks-2">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-attacks-2">
                      {t('Would Mechanical Turk obliterate the validation?', {
                        ns: 'faq',
                      })}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-attacks-2">
                    <div className="card-body">
                      <p>
                        {t(
                          'The captcha test starts synchronously at the same time worldwide. Answers must be submitted within an aggressive timeframe. An attack requires extensive coordination of a high number of unique workers.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'In addition, since the validation timeframe is relatively small (1–2 minutes), the workers might be interested in validating their own identities instead of selling their time during the validation time.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-attacks-3">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-attacks-3">
                      {t('"Flip service" attack', {ns: 'faq'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-attacks-3">
                    <div className="card-body">
                      <p>
                        <i>
                          {t(
                            `Attack: An adversary offers a flip service that creates high quality flips using the set of words you specify. Participants who don't want to spend time creating flips can outsource this job to the service. If the service has enough users it can auto-solve a significant number of flips.`,
                            {ns: 'faq', nsSeparator: '!'}
                          )}
                        </i>
                      </p>

                      <p>
                        {t(
                          'The threat can be mitigated by introducing a punishment mechanism: An account can be killed for submitting a compromised flip for validation. A flip is considered compromised if it has been seen by other people before the validation time. A hash of the proof published on the blockchain prior the validation can be considered as evidence. The person who provides the evidence earns percentage of the stake of the terminated account.',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>
                      <p>
                        {t(
                          'Effectively, once you decide to submit at least one flip provided by a flip service, you take a risk that your account may be terminated by this service in future.',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'A flip service can not prove that it does not publish evidence of compromised flips. It will hardly be profitable to build such a service on reputation since there is a strong incentive to kill accounts later on when more accounts are compromised and the total stake of those accounts is big enough.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-attacks-4">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-attacks-4">
                      {t('"Friendly flips" attack', {ns: 'faq'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-attacks-4">
                    <div className="card-body">
                      <p>
                        <i>
                          {t(
                            'Attack: Users in an attacking pool share the flips they submitted to the network with other users in the pool before the validation. This allows the pool to validate Sybil accounts.',
                            {ns: 'faq', nsSeparator: '!'}
                          )}
                        </i>
                      </p>

                      <p>
                        {t(
                          'Assume the total network size is 1000. An adversary has a pool of 100 people colluded. the adversary knows the answers for 10% of flips in advance. This means the adversary can validate 1% of Sybils by colluding (10 accounts).',
                          {ns: 'faq'}
                        )}
                      </p>
                      <p>
                        {t(
                          'On the next round the adversary knows 11% of the flips so they can validate 1.1% of Sybils (11 accounts). The adversary can only grow extensively: More and more real people have to collude.',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
                      </p>

                      <p>
                        {t(
                          'Compared to PoS, getting 10% of the actual humans in the network to collude is harder than merely having capital equivalent to 10% of the network’s market cap.',
                          {ns: 'faq'}
                        )}
                      </p>
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Card id="faq-attacks-5">
                  <Card.Header>
                    <CustomToggle eventKey="#faq-attacks-5">
                      {t('Artificial intelligence attack', {ns: 'faq'})}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="#faq-attacks-5">
                    <div className="card-body">
                      <p>
                        <i>
                          {t(
                            'Attack: AI can learn to solve flips by having a huge dataset of flips produced by a big network: 1 million network of people will generate millions of flips per epoch which is enough for machine learning.',
                            {ns: 'faq', nsSeparator: '!'}
                          )}
                        </i>
                      </p>

                      <p>
                        {t(
                          'The threat is mitigated by flips encryption. Each flip is available only for those participants who solve it during the validation session. There are around 10-15 persons who see it. The flips that have been used for validation are encrypted: Only 2 out of 4 images of a flip are publicly available to make it impossible to easily collect huge datasets.',
                          {ns: 'faq', nsSeparator: '!'}
                        )}
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
    ...(await serverSideTranslations(locale, ['faq', 'common'])),
  },
})

import React from "react"
import MetaHead from "../components/common/MetaHead"
import stitches from "../stitches"
import Divider from "../components/common/Divider"
import BottomHero from "../components/common/BottomHero"
import MaxContainer from "../components/common/MaxContainer"

const Container = stitches.styled("div", {
  display: "flex",
  position: "relative",
  flexDirection: "column",
  width: "100%",
  minHeight: "100vh",
  height: "fit-content",
  backgroundColor: "$paIce",
})

const Content = stitches.styled("div", {
  position: "relative",
  flex: "1 1 100%",
  marginTop: "7rem",
  padding: "$lg",
})

const Message = stitches.styled("div", {
  fontFamily: "$proxima",
  color: "$paDark",
  fontWeight: 200,
  fontSize: "$rg",
  lineHeight: 2,
})

const H1 = stitches.styled("h1", {
  fontSize: "$md",
  color: "$paGrey",
  fontWeight: 600,
  textTransform: "uppercase",
})

const OrderedList = stitches.styled("ol", {
  listStyleType: "none",
  counterReset: "item",
  margin: 0,
  padding: 0,
  "> li": {
    display: "table",
    counterIncrement: "item",
    marginBottom: "0.6rem",
    "> ol": {
      "> li": {
        margin: 0,
        color: "$paDark",
      },
      "> li:before": {
        content: `counters(item, ".") ". "`,
        paddingRight: "$sm",
        color: "$paDark",
      },
    },
  },
  "> li:before": {
    content: `counters(item, ".") ". "`,
    display: "inline-block",
    fontWeight: 600,
    paddingRight: "$sm",
    "@bp2": {
      display: "table-cell",
    },
  },
})

const LetterList = stitches.styled("ol", {
  counterReset: "subitem",
  ">li": {
    display: "table",
  },
  "> li:before": {
    content: `"(" counter(subitem, lower-alpha) ")" !important`,
    display: "table-cell",
    counterIncrement: "subitem",
    paddingRight: "$sm",
  },
})

const NumberList = stitches.styled("ol", {
  counterReset: "subnum",
  ">li": {
    display: "table",
  },
  "> li:before": {
    content: `"(" counter(subnum) ")" !important`,
    display: "table-cell",
    counterIncrement: "subnum",
    paddingRight: "$sm",
  },
})

const NFTLicensePage = () => (
  <Container>
    <MetaHead
      title="Psychedelics Anonymous | NFT LICENSE"
      description="We are the night."
      link="/nftlicense"
    />
    <MaxContainer>
      <Content>
        <H1>Voltura Labs NFT Terms of Sale</H1>
        <Divider full />
        <Message>
          <p>
            When you (<strong>Purchaser, you</strong>) purchase Psychedelics
            Anonymous non-fungible tokens (<strong>NFTs</strong>) from Voltura
            Labs Pty Ltd (ACN 655 142 644) (
            <strong>Voltura Labs, us, we</strong>) you must agree to the terms
            and conditions set out in this document (<strong>NFT Terms</strong>)
            and the licence set out in the Annexure to these NFT Terms (
            <strong>Licence</strong>), which apply to you and any subsequent
            person to whom you sell the NFT(s) you purchased from us in the
            first instance.
          </p>
        </Message>
        <H1>Operative clauses</H1>
        <Divider full />
        <Message>
          <OrderedList>
            <li>
              <strong>Applicability of NFT Terms </strong>
              <LetterList>
                <li>
                  All NFTs purchased or procured by you are subject to these NFT
                  Terms and the Licence, unless otherwise agreed in writing and
                  by purchasing or pre-purchasing any NFT you are agreeing to be
                  bound by these NFT Terms and the Licence.
                </li>
                <li>
                  The use of any NFTs is subject to, without limitation our
                  Website Terms and our Privacy Policy and any ancillary
                  document relating to the Licence referred to in the Annexure.
                </li>
                <li>
                  Termination of these NFT Terms for any reason will not affect
                  any obligations which have arisen prior to termination.
                </li>
              </LetterList>
            </li>
            <Divider full />
            <li>
              <strong>Purchasing NFTs</strong>
              <OrderedList>
                <li>
                  <strong>Sale of NFTs</strong>
                  <LetterList>
                    <li>
                      We may list NFTs for sale from time to time, which may be
                      stand-alone or as part of a bundle of other digital goods.
                    </li>
                    <li>
                      Orders placed for NFTs are non-refundable, cannot be
                      cancelled for change of mind, require payment in full of
                      the Purchase Price at the time of purchase and may require
                      that you connect or provide a Digital Wallet for delivery
                      of the NFT at the time of sale.
                    </li>
                    <li>
                      If you engage in a secondary sale of your NFT to another
                      purchaser, that transaction may involve third party
                      platforms or blockchain digital wallets which are not
                      associated with us, and may be subject to transaction fees
                      charged by that network. Should any transfer be conducted
                      using a marketplace we provide, then fees and charges may
                      apply to those transactions payable to us at the time of
                      the transaction.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>Pre-conditions to sale</strong>
                  <LetterList>
                    <li>
                      You must make payment in full in any nominated Digital
                      Currency or via any other nominated payment method as a
                      pre-condition to any purchase of an NFT.
                    </li>
                    <li>
                      In the case of a primary sale, we will have no obligation
                      to transfer any NFT to you until we have received the
                      Purchase Price in full for any NFT. If you make payment to
                      our Digital Wallet, you must ensure your transfer is made
                      to the correct wallet address.
                    </li>
                    <li>
                      In the event that any payment is reversed or becomes
                      invalid, including via either a double spend attack or
                      recall or refund request by a payment processor, you agree
                      to immediately return to us any NFTs the subject of a sale
                      where the Purchase Price has no longer been retained in
                      full by us.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>Title and risk</strong>
                  <p>
                    Risk and title in any NFT purchase transfers to you upon
                    purchase of the NFT and you are responsible for ensuring
                    your Digital Wallet is accurately linked. If you lose your
                    private key or login or seed phrase for your Digital Wallet
                    you will likely lose access permanently to your NFTs stored
                    in your Digital Wallet. We cannot recover any private key or
                    seed phrase for your Digital Wallet
                  </p>
                </li>
                <li>
                  <strong>Refunds - Risk in value of Digital Currency </strong>
                  <p>
                    We do not offer refunds for purchases. However, where the
                    Purchase Price has been paid in a Digital Currency and you
                    are entitled to a refund for any reason, you agree the
                    refund is to be made in the same form of Digital Currency
                    used in the initial transaction, or at our option in
                    Australian dollars equivalent to the value of the Digital
                    Currency used in the initial transaction on the date the
                    Purchase Price was paid, whether or not that is a greater or
                    lesser sum.
                  </p>
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Intellectual Property Licence in NFTs</strong>
              <p>
                You acknowledge and agree that we own all legal right, title and
                interest in all Intellectual Property Rights in the Art. Your
                rights in the NFT you Own are limited to those expressly stated
                in the Licence. We reserve all rights and ownership in and to
                the Intellectual Property Rights in the NFT you Own that are not
                expressly granted in the Licence.
              </p>
            </li>
            <Divider full />
            <li>
              <strong>Termination</strong>
              <OrderedList>
                <li>
                  <strong>Termination with cause</strong>
                  <p>
                    These NFT Terms and the Licence may be terminated with
                    immediate effect:
                  </p>
                  <LetterList>
                    <li>
                      by us if any of the Purchaser warranties in clause 6 are
                      breached by you; or
                    </li>
                    <li>
                      by us if the limitations of the Licence in clauses 1.6 or
                      1.8(c) are breached; or
                    </li>
                    <li>
                      by either party if the other party commits any material
                      breach of its obligations under these NFT Terms and fails
                      to remedy such breach (if capable of remedy) within 30
                      days of receipt of notice from the non-defaulting party
                      requiring it to do so.
                    </li>
                  </LetterList>
                  <p>
                    Termination of these NFT Terms does not affect the rights of
                    the parties which have accrued prior to termination.
                  </p>
                </li>
                <li>
                  <strong>Effect of termination</strong>
                  <p>
                    Upon termination of these NFT Terms or the Licence, the
                    rights under the Licence will cease, including the rights to
                    use, copy, display, and enjoy the Art associated with the
                    NFT you Own, save that any physical objects you have created
                    showing the art for your personal use shall be deemed to
                    have a continuing personal licence to use.
                  </p>
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Acknowledgements</strong>
              <p>You acknowledge and agree that:</p>
              <LetterList>
                <li>
                  we own all legal right, title and interest in and to all other
                  elements of the Website, and all Intellectual Property Rights
                  therein (including, without limitation, all Art, designs,
                  systems, methods, information, computer code, software,
                  services , “look and feel”, organisation, compilation of the
                  content, code, data, and all other elements of the Website
                  (collectively, Website Materials));
                </li>
                <li>
                  the Website Materials are protected by copyright, trade dress,
                  patent, and trademark laws, international conventions, other
                  relevant intellectual property and proprietary rights, and
                  applicable laws. All Website Materials are the copyrighted
                  property of us or our licensors, and all trademarks, service
                  marks, and trade names associated with the Website or
                  otherwise contained in the Website Materials are proprietary
                  to us or our licensors;
                </li>
                <li>
                  we provide NFTs solely on a proprietary basis and if we
                  transact with you we do so solely on a bilateral basis;
                </li>
                <li>
                  NFTs are not intended for speculative use, are not sold or
                  represented to be financial product and nothing we publish is
                  in any way financial advice to you or any other person;
                </li>
                <li>
                  NFTs may experience or may have extreme price volatility,
                  including being worthless in the future;
                </li>
                <li>
                  we are not providing and will not provide any fiduciary,
                  advisory, brokerage, exchange or other similar services to you
                  or any other person;
                </li>
                <li>
                  you are solely responsible for any decision to enter into a
                  transaction subject to these NFT Terms, including the
                  evaluation of any and all risks related to any such
                  transaction;
                </li>
                <li>
                  a significant degree of IT sophistication is required to
                  safely deal in and store NFTs of any kind using a Digital
                  Wallet;
                </li>
                <li>
                  we are not a custodian for the purposes of the Corporations
                  Act, and transfers of any NFTs are for transaction purposes
                  only;
                </li>
                <li>
                  all transactions entered into and conducted under these NFT
                  Terms are deemed to have occurred within the jurisdiction of
                  New South Wales, Australia;
                </li>
                <li>
                  we are not responsible for any Loss caused by your failure to
                  act in accordance with our policies, procedures or in
                  accordance with our reasonable directions;
                </li>
                <li>
                  you purchase NFTs entirely at your own risk and understanding
                  and we have not made any representations or warranties as to
                  the IT security or ongoing availability of such NFTs or the
                  Art or that your access to use your NFTs will be
                  uninterrupted, timely or secure at all times;
                </li>
                <li>
                  you understand and acknowledge that your ownership of NFTs
                  remains contingent upon you remaining in control of the seed
                  phrases and private key(s) associated with your Digital Wallet
                  and that we will not store any information in connection with
                  your Digital Wallet beyond that required for the sale of NFTs;
                </li>
                <li>
                  we do not and cannot guarantee there will be any use for, or
                  any particular price available for any NFT you purchase from
                  us; and
                </li>
                <li>
                  we do not represent or guarantee any outcomes, or any
                  financial return from your acquisition of any NFT from us,
                  save the ability to Own the NFT and enjoy the Licence.
                </li>
              </LetterList>
            </li>
            <Divider full />
            <li>
              <strong>Wallet</strong>
              <OrderedList>
                <li>
                  <strong>Our Warranties</strong>
                  <p>We represent and warrant that:-</p>
                  <LetterList>
                    <li>
                      we own, or have the right to use under licence, the Art in
                      the NFTs which we sell and are legally entitled to, and
                      are capable of, selling the NFTs offered for sale; and
                    </li>
                    <li>
                      we will give you notice before we discontinue or alter the
                      rights or features of any NFTs which you have purchased.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>Purchaser warranties</strong>
                  <p>
                    You warrant and assure us that in acquiring an NFT (from us
                    or from a third party or existing NFT holder):
                  </p>
                  <LetterList>
                    <li>
                      you are sufficiently experienced and educated to make
                      decisions regarding the procurement or purchase of NFTs
                      from us, including sufficient experience in dealing with
                      and storing NFTs using a Digital Wallet;
                    </li>
                    <li>
                      you have all necessary experience, resources,
                      certificates, licences, permits and approvals to procure
                      or purchase of NFTs applicable in Your Jurisdiction, and
                      that any transactions under these NFT Terms or in your use
                      of the NFT will be legal under the applicable laws of Your
                      Jurisdiction;
                    </li>
                    <li>
                      all information you supply is true and accurate as at the
                      time it is given, and that any Digital Wallet address you
                      provide to us has been generated in accordance with best
                      practice security measures and no other party, other than
                      you or your authorised representative, has used, or has
                      access to, the seed phrases, private keys or analogous
                      passwords required to effect transfers from, the Digital
                      Wallet;
                    </li>
                    <li>
                      as far as you are aware, there are no facts, circumstances
                      or other information which both:
                      <NumberList>
                        <li>
                          you have not fully and fairly disclosed to us in a
                          manner and to an extent that it would impact out
                          ability to make a reasonable assessment of those
                          facts, matters and circumstances prior to entering
                          into a transaction to sell you an NFT; and
                        </li>
                        <li>
                          is of such nature and materiality that a reasonable
                          person, had it been made aware of, could not
                          reasonably be expected to consider prior to entering
                          into a transaction for the sale of NFTs;
                        </li>
                      </NumberList>
                    </li>
                    <li>
                      you are not involved in any capacity in any claim, legal
                      action, proceeding, suit, litigation, prosecution,
                      investigation, enquiry, mediation or arbitration (nor
                      which are pending or threatened) concerning NFTs;
                    </li>
                    <li>
                      if we request, you will identify and substantiate the
                      source of funds involved in transactions to acquire NFTs;
                    </li>
                    <li>
                      no Digital Currency transferred to us as part of a
                      Purchase Price has been derived from any illegal or
                      unlawful activity;
                    </li>
                    <li>
                      you are the lawful owner of any Digital Wallet nominated
                      for delivery of NFTs and each Digital Wallet is owned and
                      operated solely for your benefit, and no person has any
                      right, title or interest in your nominated Digital Wallet;
                      and
                    </li>
                    <li>
                      you have had the opportunity to obtain independent legal
                      advice in relation to the terms and effect of these NFT
                      Terms.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>Continuous warranties</strong>
                  <p>
                    You represent and warrant to us that each of the Purchaser
                    Warranties is true and accurate, and not misleading or
                    deceptive as at the date of these NFT Terms and, except as
                    expressly stated, will be true, accurate and not misleading
                    or deceptive each time an NFT or NFTs are provided to you.
                  </p>
                </li>
                <li>
                  <strong>Notification</strong>
                  <p>
                    You must disclose to us anything that has or will constitute
                    a material breach of a Purchaser&apos;s Warranty or cause a
                    Purchaser&apos;s Warranty to be untrue or inaccurate, as
                    soon as practicable after you become aware of it.
                  </p>
                </li>
                <li>
                  <strong>Mutual warranties</strong>
                  <p>Each party warrants and assures the other party that:</p>
                  <LetterList>
                    <li>
                      if it is a company, it is duly incorporated and validly
                      exists under the law of its place of incorporation;
                    </li>
                    <li>it is not subject to an Insolvency Event; and</li>
                    <li>
                      these terms constitute a legal, valid and binding terms
                      enforceable in accordance with its terms by appropriate
                      legal remedy.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>Consumer Guarantees</strong>
                  <LetterList>
                    <li>
                      Certain legislation, including the Australian Consumer Law
                      (ACL) contained in the Competition and Consumer Act 2010
                      (Cth) and similar consumer protection laws and
                      regulations, may provide you with rights, warranties,
                      guarantees and remedies relating to your purchase of NFTs
                      which cannot be excluded, restricted or modified in these
                      NFT Terms (Statutory Rights).
                    </li>
                    <li>
                      Nothing in these NFT Terms does, or is intended to,
                      exclude any Statutory Rights to which you are entitled.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>Knowledge and awareness</strong>
                  <p>
                    Where a warranty is given &apos;to the best of a
                    party&apos;s knowledge, belief and awareness&apos;, or
                    &apos;as far as the party is aware&apos; or with a similar
                    qualification as to the relevant party&apos;s awareness or
                    knowledge, the party giving the warranty will be deemed to
                    know or be aware of a particular fact, matter or
                    circumstance if that party&apos;s directors or senior
                    management employees are aware of that fact, matter or
                    circumstance, or would have become aware if they had made
                    reasonable enquires as at the date of these NFT Terms.
                  </p>
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Indemnity</strong>
              <LetterList>
                <li>
                  You agree to indemnify us and our Personnel and will keep us
                  and our Personnel indemnified at all times to the fullest
                  extent permitted by law in respect of any Loss or Claim which
                  we or our Personnel may suffer, sustain or incur arising from,
                  or connected with, a breach of a Purchaser Warranty without
                  limitation.
                </li>
                <li>
                  In addition, you must indemnify us and our Personnel and keep
                  us and our Personnel indemnified at all times to the fullest
                  extent permitted by law in respect of any Claim which we or
                  our Personnel may suffer, sustain or incur arising from, or
                  connected with, any breach of these NFT Terms, other than a
                  breach of a Purchaser Warranty, or any breach of all
                  applicable laws, reduced to the extent of the Loss in respect
                  of the Claim was caused by the negligent act or omission of us
                  or our Personnel.
                </li>
              </LetterList>
            </li>
            <Divider full />
            <li>
              <strong>Limitation of liability</strong>
              <OrderedList>
                <li>
                  <strong>Limitation of liability</strong>
                  <p>
                    In the absence of a material breach of these NFT Terms by us
                    or the gross negligence, fraud or wilful misconduct by us
                    when providing NFTs to you under these NFT Terms, we will
                    not be liable to you on account of anything done, omitted or
                    suffered by us acting in good faith when providing NFTs to
                    you pursuant to these NFT Terms, including in respect of a
                    Force Majeure Event.
                  </p>
                </li>
                <li>
                  <strong>Third party services</strong>
                  <p>
                    Subject to clause 8.1, we will not be liable for the
                    performance, errors or omissions of unaffiliated, nationally
                    or regionally recognised third parties or decentralised
                    networks such as, by way of example and not limitation:
                    blockchain networks (whether private/permissioned or
                    public), courier companies, national postal services and
                    other delivery, telecommunications and other companies not
                    under our reasonable control, and third parties not under
                    our reasonable control providing services to the blockchain
                    industry generally, such as, by way of example and not
                    limitation, companies and other entities providing
                    processing and payment or transaction services (including
                    “Layer 2” or similar “roll-up” or optimisation services),
                    banking partners, custody services, market making services
                    and/or third party pricing services and decentralised
                    blockchain networks such as, by way of example and not
                    limitation, the blockchain(s) upon which any NFT depends or
                    forks of those blockchain(s).
                  </p>
                </li>
                <li>
                  <strong>
                    Compliance with laws – No monitoring responsibilities
                  </strong>
                  <LetterList>
                    <li>
                      We will have no liability or responsibility for your
                      compliance with laws or regulations governing the transfer
                      and use of NFTs. Further, you are solely responsible for
                      compliance with all applicable requirements of any laws,
                      rules, and regulations of governmental authorities in Your
                      Jurisdiction.
                    </li>
                    <li>
                      You further acknowledge that neither we nor any of our
                      Personnel is, and will not be, by virtue of providing NFTs
                      to you, an advisor or fiduciary to you.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>No liability for consequential loss</strong>
                  <p>
                    Neither party will be liable to the other for any Loss or
                    Claim in the nature of consequential or indirect loss,
                    including without limitation loss of profits, loss of
                    chance, loss of expectations, or loss or opportunity.
                  </p>
                </li>
                <li>
                  <strong>Liability Cap</strong>
                  <p>
                    Our total liability to you under any circumstances is
                    limited to the amount for which an NFT was originally sold
                    by us to you and we shall not be liable for any amount above
                    that sum.
                  </p>
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Tax</strong>
              <OrderedList>
                <li>
                  The Purchase Price for any transaction will be considered to
                  be inclusive of any applicable Sales Tax.
                </li>
                <li>
                  If any additional Sales Tax is applicable by virtue of any law
                  under Your Jurisdiction, you agree to pay such amount as is
                  payable on behalf of us, and inform us of that payment
                  forthwith.
                </li>
                <li>
                  Any reference to a cost or expense incurred by a party in
                  these NFT Terms excludes any amount of Sales Tax forming part
                  of the relevant cost or expense when incurred by the party for
                  which the party can claim an input tax credit.
                </li>
                <li>
                  Each party is solely responsible for any taxation which arises
                  as a result of dealing in the NFTs, including capital gains or
                  income tax and no party shall have a Claim for any Loss
                  against the other in respect of any taxation amounts how so
                  ever arising.
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Notices</strong>
              <OrderedList>
                <li>
                  Unless a provision of these NFT Terms expressly state
                  otherwise, a notice, consent, approval, waiver or other
                  communication (notice) in connection with these NFT Terms must
                  be in writing and in English and sent to, in the case of us,
                  our nominated email, of in the case of you, to your nominated
                  email or published on the Website with public access to such
                  notice.
                </li>
                <li>
                  Any notice will be deemed to be received within 24 hours of
                  sending the electronic message (unless a rejection message is
                  received) or publication online.
                </li>
                <li>
                  A party must immediately notify the other party in writing of
                  any changes to its contact details.
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Disputes</strong>
              <OrderedList>
                <li>
                  <strong>Proceedings suspended</strong>
                  <p>
                    You must not begin legal proceedings in connection with a
                    dispute arising out of or in connection with these NFT Terms
                    unless the steps in this clause 11 have been followed.
                    However, this limitation does not apply:
                  </p>
                  <LetterList>
                    <li>
                      to a party who wants to apply for equitable relief or
                      urgent interlocutory relief; or
                    </li>
                    <li>
                      to a party who attempts in good faith to comply with
                      clauses 11.2, 11.3 and 11.4 but cannot do so because the
                      other party does not comply with those clauses.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>Notice of dispute</strong>
                  <p>
                    If a dispute arises out of or in connection with these NFT
                    Terms (including the validity, breach or termination of it),
                    a party may notify the other party to the dispute. The
                    notice must specify the dispute and indicate that the
                    notifying party wants the dispute to be referred to
                    mediation.
                  </p>
                </li>
                <li>
                  <strong>Commencement of mediation</strong>
                  <LetterList>
                    <li>
                      If the dispute is not resolved within 10 Business Days
                      after a notice under clause 11.2 has been served (Notice
                      Period), the dispute is by this clause 11.3 submitted to
                      mediation.
                    </li>
                    <li>
                      The mediation must be conducted in New South Wales,
                      Australia in accordance with the mediation guidelines /
                      rules of the Resolution Institute, save any process in
                      these NFT Terms which is inconsistent with those
                      guidelines or rules will take precedence to the extent of
                      any inconsistency.
                    </li>
                    <li>
                      If the parties have not agreed on the mediator and the
                      mediator&apos;s remuneration within 5 Business Days after
                      the end of the Notice Period:
                      <NumberList>
                        <li>the mediator is the person appointed by; and</li>
                        <li>
                          the remuneration of the mediator is the amount or rate
                          determined by,
                        </li>
                        <p>
                          the President of the Law Society of New South Wales or
                          the Presiden&apos;s nominee, acting on the request of
                          any party.
                        </p>
                      </NumberList>
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>If dispute not resolved</strong>
                  <p>
                    If the dispute is not resolved within 1 month after the
                    appointment of the mediator, you may take legal proceedings
                    in connection with the dispute
                  </p>
                </li>
                <li>
                  <strong>Confidentiality</strong>
                  <p>
                    Each party must keep confidential, all information relating
                    to the subject matter of a dispute as disclosed during or
                    for the purposes of dispute resolution under this clause 11,
                    unless that party is compelled by an regulatory or
                    government authority, court or tribunal to disclose that
                    information.
                  </p>
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>General</strong>
              <OrderedList>
                <li>
                  <strong>Governing law and jurisdiction</strong>
                  <p>
                    These NFT Terms are governed by the laws of New South Wales
                    and Australia. The parties irrevocably submit to the
                    exclusive jurisdiction of the courts of New South Wales and
                    the New South Wales division of the Federal Court of
                    Australia and the courts of appeal from them.
                  </p>
                </li>
                <li>
                  <strong>Amendment</strong>
                  <p>
                    We reserve the right to amend these NFT Terms from time to
                    time in our absolute discretion. Amendments will be
                    effective as soon as such changes are notified to you in
                    writing from time to time.
                  </p>
                </li>
                <li>
                  <strong>Precedence</strong>
                  <p>
                    Where there is inconsistency between these NFT Terms and
                    other content displayed as part of the Platform concerning
                    the sale of NFTs, the content of these NFT Terms will
                    prevail to the extent of any inconsistency
                  </p>
                </li>
                <li>
                  <strong>Force Majeure</strong>
                  <p>
                    We will not be liable for any delay or failure to perform
                    our obligations under these NFT Terms if such delay is due
                    to any circumstances beyond our reasonable control
                    (including but not limited to epidemics, pandemics,
                    blockchain congestion or attacks, Government sanctions or
                    orders, whether known or unknown at the time the parties
                    enter into these NFT Terms) (Force Majeure Event).
                  </p>
                </li>
                <li>
                  <strong>Waiver</strong>
                  <p>
                    A provision of these NFT Terms or a right created under it
                    may not be waived except in writing signed by the party
                    granting the waiver.
                  </p>
                </li>
                <li>
                  <strong>Exercise of a right</strong>
                  <p>
                    A party may exercise a right at its discretion and
                    separately or together with another right. If a party
                    exercises a single right or only partially exercises a
                    right, then that party may still exercise that right or any
                    other right later. If a party fails to exercise a right or
                    delays in exercising a right, then that party may still
                    exercise that right later.
                  </p>
                </li>
                <li>
                  <strong>Remedies cumulative</strong>
                  <p>
                    The rights and remedies provided in these NFT Terms are
                    cumulative with and not exclusive of the rights and remedies
                    provided by law independently of these NFT Terms.
                  </p>
                </li>
                <li>
                  <strong>No merger</strong>
                  <p>
                    The rights and obligations of the parties (including under
                    the warranties) will not merge on completion of any
                    transaction under these NFT Terms. They will survive the
                    execution and delivery of any assignment or other document
                    entered into for the purpose of implementing any
                    transaction.
                  </p>
                </li>
                <li>
                  <strong>Assignment</strong>
                  <LetterList>
                    <li>
                      These NFT Terms are for the benefit of the parties and
                      their successors and assigns. The parties and their
                      successors and assigns are bound by these NFT Terms.
                    </li>
                    <li>
                      To the extent that any party purchases an NFT from you,
                      they are deemed to have taken an assignment of these NFT
                      Terms as published at the time of the purchase and you
                      must provide that party with a link or copy of these NFT
                      Terms.
                    </li>
                    <li>
                      We may assign our rights under these NFT Terms without
                      your consent, including at any time.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>Severance</strong>
                  <p>
                    If any provision of these NFT Terms are void, voidable,
                    unenforceable, illegal, prohibited or otherwise invalid in a
                    jurisdiction, in that jurisdiction the provision must be
                    read down to the extent it can be to save it but if it
                    cannot be saved by reading it down, words must be severed
                    from the provision to the extent they can be to save it but
                    if that also fails to save it the whole provision must be
                    severed. That will not invalidate the remaining provisions
                    of these NFT Terms nor affect the validity or enforceability
                    of that provision in any other jurisdiction where it is not
                    invalid.
                  </p>
                </li>
                <li>
                  <strong>Entire agreement</strong>
                  <LetterList>
                    <li>
                      These NFT Terms constitute the entire agreement of the
                      parties in respect of the subject matter of these NFT
                      Terms and supersedes all prior discussions,
                      representations, undertakings and agreements.
                    </li>
                    <li>
                      None of our agents or representatives are authorised to
                      make any representations, conditions or agreements not
                      expressed by us in writing nor are we bound by any such
                      statements.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>Further assurances</strong>
                  <p>
                    Each party must, at its own expense, do everything
                    reasonably necessary to give effect to these NFT Terms and
                    the transactions contemplated by it, including but not
                    limited to the execution of documents.
                  </p>
                </li>
                <li>
                  <strong>Relationship</strong>
                  <p>
                    Nothing in these NFT Terms constitutes the parties as
                    partners or agents of the other and no party has any
                    authority to bind the other legally or equitably save as
                    expressly stated in these NFT Terms.
                  </p>
                </li>
                <li>
                  <strong>Knowledge</strong>
                  <p>
                    In these NFT Terms, a reference to the awareness or
                    knowledge by you is a reference to the actual knowledge,
                    information and belief you have as at the date of any
                    transaction taking place pursuant to these NFT Terms.
                  </p>
                </li>
                <li>
                  <strong>Costs</strong>
                  <p>
                    Each party must pay its own fees, costs and expenses
                    incurred by it incident to or in connection with the
                    negotiation, preparation, execution, delivery and completion
                    of these NFT Terms and the transactions contemplated by
                    these NFT Terms including without limitation its own legal,
                    accounting and corporate advisory fees.
                  </p>
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Definitions</strong>
              <p>In these NFT Terms:</p>
              <p>
                <strong>Art</strong> means any art, design, wording and drawings
                (in any form or media, including, without limitation, video or
                photographs) that are associated with an NFT that you Own;
              </p>
              <p>
                <strong>Business Day</strong> means any day except a Saturday or
                a Sunday or other public holiday in New South Wales, Australia;
              </p>
              <p>
                <strong>Claim</strong> includes a claim, notice, demand, action,
                proceeding, litigation, investigation, however arising whether
                present, unascertained, immediate, future or contingent, whether
                based in contract, tort or statute and whether involving a third
                party or a party to these NFT Terms and where and to the extent
                the context permits, includes all associated Loss;
              </p>
              <p>
                <strong>Corporations Act</strong> means the Corporations Act
                2001 (Cth);
              </p>
              <p>
                <strong>Digital Currency</strong> means a cryptographically
                secured virtual currency or virtual asset which we identify as
                an acceptable means of payment or transacting with us;
              </p>
              <p>
                <strong>Digital Wallet</strong> means the applicable “Metamask”
                location, public key or wallet address, account or storage
                device which we choose to support for the delivery of the NFTs
                provided by us;
              </p>
              <p>
                <strong>Insolvency Event</strong> means the happening of any of
                the following events in relation to a body corporate:
                <LetterList>
                  <li>
                    the body corporate becomes an externally-administered body
                    corporate;
                  </li>
                  <li>
                    a person is appointed a controller (as defined in section 9
                    of the Corporations Act), administrator, receiver,
                    provisional liquidator, trustee for creditors in bankruptcy
                    or an analogous appointment is made in respect of the body
                    corporate;
                  </li>
                  <li>
                    in Australia, the body corporate is taken to have failed to
                    comply with a statutory demand within the meaning of section
                    459F of the Corporations Act;
                  </li>
                  <li>
                    the body corporate suspends payment of its debts, or enters,
                    or takes any step towards entering, a compromise or
                    arrangement with, or assignment for the benefit of, any of
                    its members or creditors;
                  </li>
                  <li>
                    a secured creditor of the body corporate enforces its
                    security in relation to its debt for an amount in excess of
                    $50,000; or
                  </li>
                  <li>
                    the body corporate is, or its directors state that it is,
                    unable to pay its debts as and when they become due and
                    payable;
                  </li>
                </LetterList>
              </p>
              <p>
                <strong>Intellectual Property Rights</strong> means any and all
                present and future intellectual property rights, conferred by
                statute, at common law or in equity and wherever existing,
                including:
                <LetterList>
                  <li>
                    patents, inventions, discoveries, designs, copyright, moral
                    rights, trade marks, service marks, trade names, brand
                    names, business names, product names, domain names or rights
                    in designs, art, images, drawings, know how, product names,
                    trading styles, get-up, processes, methodologies, trade
                    secrets and any other rights subsisting in the results of
                    intellectual effort in any field, whether or not registered
                    or capable of registration;
                  </li>
                  <li>
                    any application or right to apply for registration of any of
                    these rights or other rights of a similar nature arising or
                    capable of arising under statute or at common law anywhere
                    in the world;
                  </li>
                  <li>
                    other intellectual property as defined in Article 2 of the
                    Convention Establishing the World Intellectual Property
                    Organisation 1967;
                  </li>
                  <li>
                    any registration of any of those rights or any registration
                    of any application referred to in paragraph (b); and
                  </li>
                  <li>all renewals and extensions of these rights;</li>
                </LetterList>
              </p>
              <p>
                <strong>Loss</strong> includes any loss, damage, cost, charge,
                liability or expense (including legal costs and expenses);
              </p>
              <p>
                <strong>Own</strong> means, with respect to an NFT, any NFT we
                have issued, that you have purchased or otherwise rightfully
                acquired from a legitimate source, where proof of ownership is
                recorded on a blockchain system and you control the private key
                associated with a Digital Wallet to which the NFT is associated
                or located;
              </p>
              <p>
                <strong>Personnel</strong> means any employee, contractor,
                subcontractor, agent, partner, shareholder, ultimate beneficial
                owner, director or officer of a party;
              </p>
              <p>
                <strong>Platform</strong> means the Voltura Labs platform;
              </p>
              <p>
                <strong>Privacy Policy</strong> means the privacy policy on the
                Website as may be varied from time to time.
              </p>
              <p>
                <strong>Purchase Price</strong> means the amount advertised for
                the purchase (or pre-purchase) of any NFT or bundle containing
                an NFT, which may be denominated in a Digital Currency;
              </p>
              <p>
                <strong>Purchaser Warranties</strong> means the warranties set
                out in clause 6.2.
              </p>
              <p>
                <strong>Sales Tax</strong> means any form of value added tax
                including GST as defined in section 195-1 of the A New Tax
                System (Goods and Services Tax) Act 1999 (Cth) or other similar
                sales tax;
              </p>
              <p>
                <strong>Third Party IP</strong> means any third party
                Intellectual Property Rights;
              </p>
              <p>
                <strong>Website</strong> means https://psychedelicsanonymous.com
                and/or any other website we may operate from time to time.
              </p>
              <p>
                <strong>Website Terms</strong> means the terms and conditions on
                the Website as may be varied from time to time; and
              </p>
              <p>
                <strong>Your Jurisdiction</strong> means the country or state
                where you are ordinarily resident or from which you enter into
                any agreement with us.
              </p>
            </li>
            <Divider full />
            <li>
              <strong>Interpretation</strong>
              <p>
                The following rules of interpretation apply in these NFT Terms
                unless the context requires otherwise:
              </p>
              <LetterList>
                <li>singular includes plural and plural includes singular;</li>
                <li>
                  reference to legislation includes any amendments to it, any
                  legislation substituted for it, and any statutory instruments
                  issued under it and in force;
                </li>
                <li>
                  reference to a person includes a corporation, joint venture,
                  association, government body, firm and any other entity;
                </li>
                <li>
                  reference to a thing (including a right) includes a part of
                  that thing;
                </li>
                <li>
                  reference to a party includes that part&apos;s personal
                  representatives, successors and permitted assigns;
                </li>
                <li>
                  references to time mean that time in New South Wales,
                  Australia;
                </li>
                <li>
                  if a party comprises two or more persons:
                  <NumberList>
                    <li>
                      reference to a party means each of the persons
                      individually and any two or more of them jointly;
                    </li>
                    <li>
                      a promise by that party binds each of them individually
                      and all of them jointly;
                    </li>
                    <li>
                      a right given to that party is given to each of them
                      individually;
                    </li>
                    <li>
                      a representation, warranty or undertaking by that party is
                      made by each of them individually;
                    </li>
                  </NumberList>
                </li>
                <li>headings do not affect interpretation;</li>
                <li>
                  another grammatical form of a defined expression has a
                  corresponding meaning;
                </li>
                <li>
                  a provision must not be construed against a party only because
                  that party put the provision forward; and
                </li>
                <li>
                  a provision must be read down to the extent necessary to be
                  valid; if it cannot be read down to that extent, it must be
                  severed.
                </li>
              </LetterList>
            </li>
          </OrderedList>
        </Message>
        <Divider full />
        <Message>
          <H1>Annexure</H1>
          <strong>Summary of Licence</strong>
          <ul>
            <li>
              You have complete freedom to use the Art and NFT for commercial
              and personal use including to make sales of derivative works, for
              so long as you own the NFT.
            </li>
            <li>
              To protect our community and the value of our collection, the
              licence has some limitations, specifically on the use of our NFTs
              in connection with damaging behaviour, for example hate crimes or
              racism, and we retain the underlying copyright to enable us to
              enforce this.
            </li>
          </ul>
        </Message>
        <Divider full />
        <Message>
          <OrderedList>
            <li>
              <strong>Licence in NFTs</strong>
              <OrderedList>
                <li>
                  We, Voltura Labs Pty Ltd (ACN 655 142 644) (Voltura Labs, us,
                  we) grant, to the party who Owns an NFT we have issued
                  (Licensee, you), for the time that party Owns the NFT, a
                  worldwide, non-exclusive, royalty-free licence in respect of
                  the Art associated with the NFT purchase (Licence).
                </li>
                <li>
                  Subject to clause 3 of this Licence, the Licence is
                  assignable, transferrable and revocable to use, copy, display,
                  and enjoy the Art associated with the NFT you Own:
                  <LetterList>
                    <li>
                      for your own personal, and limited commercial use pursuant
                      to clause 2 of this Licence; or
                    </li>
                    <li>
                      as part of a Marketplace or online gallery that permits
                      the sale or transfer of the NFT you Own.
                    </li>
                  </LetterList>
                </li>
                <li>
                  Upon the sale of any NFT you Own, the Licence transfers to the
                  purchaser who then Owns the NFT and the ownership of that NFT
                  will be subject to and conditional upon compliance with the
                  terms and conditions set out in this Licence. For the
                  avoidance of doubt, the transfer of the Licence does not
                  constitute commercial use for the purposes of clause 1.2.
                </li>
                <li>
                  With immediate effect upon your sale of the NFT you Own, your
                  rights under the Licence pursuant to clauses 1.1 and 1.2 shall
                  cease to apply and will no longer be in force and effect.
                </li>
                <li>
                  Except as expressly stated in this Licence, nothing in this
                  Licence is intended to, or shall operate to, give you
                  ownership of any Intellectual Property Rights in, or other
                  rights in respect of the Art.
                </li>
                <li>
                  The NFT may not be used in any way which would:
                  <LetterList>
                    <li>
                      use the Art in connection with images depicting hatred,
                      violence, intolerance, cruelty, or other inappropriate
                      behaviour that could be reasonably considered to bring the
                      owner of the Art into disrepute, or that could be
                      reasonably considered to infringe on the rights of others;
                      or
                    </li>
                    <li>
                      seek to trademark or acquire Intellectual Property Rights
                      in the Art; or take, appropriate, or represent any
                      ownership in the Art; or
                    </li>
                    <li>
                      involve the issue of an NFT which claims an association
                      with the Art or which purports to be an NFT of the Art; or
                    </li>
                    <li>
                      assert any right to or over the Art in any manner
                      inconsistent with the rights under this Licence; or
                    </li>
                    <li>
                      take any action which would or might invalidate,
                      challenge, oppose, infringe, or otherwise put in dispute
                      the owner&apos;s title to the Art; or
                    </li>
                    <li>
                      be reasonably seen to disparage the Intellectual Property
                      Rights of the owner; or
                    </li>
                    <li>
                      cause, permit, or assist any other person directly or
                      indirectly to do any of the above acts.
                    </li>
                  </LetterList>
                </li>
                <li>
                  You understand and agree that if the Art associated with the
                  NFT you Own may contain Third Party IP, that:
                  <LetterList>
                    <li>
                      you will not have the right to use such Third Party IP in
                      any way except as incorporated in the Art, and subject to
                      this Licence;
                    </li>
                    <li>
                      depending on the nature of the licence granted from the
                      owner of the Third Party IP, we may need to, subject to
                      our discretion, place additional restrictions on the
                      Licence; and
                    </li>
                    <li>
                      to the extent that we inform you in writing of additional
                      restrictions under clause 1.7(b) of this Licence, you will
                      be responsible for complying with all such restrictions
                      from the date that you receive such written notice, and
                      that failure to do so will be deemed a breach of this
                      Licence.
                    </li>
                  </LetterList>
                </li>
                <li>
                  For the avoidance of any doubt:
                  <LetterList>
                    <li>
                      the restrictions on the Licence survive termination or
                      assignment transfer of this Licence;
                    </li>
                    <li>
                      this Licence is limited to the time you Own the NFT and
                      upon your sale of the NFT to another party the Licence is
                      assigned to the purchaser of the NFT and your rights under
                      the Licence cease to have any effect, and you must draw to
                      the other party&apos;s attention the contents of this
                      Licence prior to your sale of the NFT; and
                    </li>
                    <li>
                      the sale of your NFT does not constitute a “commercial
                      use” of your NFT for the purposes of this Licence.
                    </li>
                  </LetterList>
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Commercial and derivative rights</strong>
              <OrderedList>
                <li>
                  You acknowledge that the NFT you Own contains individual
                  layered files and traits that are owned by us.
                </li>
                <li>
                  The NFT you Own may only be used for commercial purposes in
                  its entirety as a whole, or as a basis for derivative works
                  which are substantially altered from the original NFT and Art,
                  but the NFT and Art may not be used to:
                  <LetterList>
                    <li>
                      create merchandise using the NFT, once you no longer Own
                      that NFT; or
                    </li>
                    <li>
                      create, sell or promote Counterfeit NFTs or associated
                      collections.
                    </li>
                  </LetterList>
                </li>
                <li>
                  The Owner of commercial products or derivative works created
                  using the Art from an NFT in accordance with this Licence
                  shall not be liable to pay any Revenue Share on transfer of
                  those goods. Any derivative works created in accordance with
                  the terms of this Licence will be deemed to be sub-licenced
                  under the terms of this Licence and subject to the terms of
                  this Licence (other than any obligation to pay Revenue Share).
                </li>
                <li>
                  For the avoidance of doubt, the individual layered files,
                  traits and Art of the NFT you Own may not be used
                  individually, separately or in combination of each other,
                  other than as provided above, for commercial or any other
                  purpose.
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Permissible transfers of the NFT you Own</strong>
              <OrderedList>
                <li>
                  You and any future owner of the NFT you Own have a limited
                  right to transfer the NFT you Own (Secondary Sale), provided
                  that:
                  <LetterList>
                    <li>
                      the transferee accepts all of the terms of this Licence
                      and the current NFT Terms;
                    </li>
                    <li>
                      prior to the transfer, you have not breached this Licence
                      or the current NFT Terms; and
                    </li>
                    <li>
                      we will be paid the Revenue Share percentage of the gross
                      amounts paid by such party to the Secondary Sale.
                    </li>
                  </LetterList>
                </li>
                <li>
                  For the avoidance of doubt, the additional fees under clause
                  3.1(c) of this Licence do not include, and are not intended to
                  cover, any additional fees imposed or required by the platform
                  through which any Secondary Sale is being conducted.
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Termination</strong>
              <OrderedList>
                <li>
                  In the event that the Owner of an NFT breaches the terms of
                  this Licence, then we may terminate the Licence without notice
                  and may take further steps including publishing the
                  termination of the Licence and/or taking steps to seek to
                  block the Art or the listing of an NFT subject to termination
                  from any third party sites. Upon Termination any right to use
                  the Art associated with an NFT which is Owned immediately
                  ceases.
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Definitions</strong>
              <p>In this Licence:</p>
              <p>
                <strong>Art</strong> means any art, design, wording and drawings
                (in any form or media, including, without limitation, video or
                photographs) that are associated with an NFT that you Own;
              </p>
              <p>
                <strong>Counterfeit NFT</strong> means an NFT that contains art
                that is identical or substantially indistinguishable from the
                NFT you Own, including:
                <LetterList>
                  <li>
                    an NFT described as a knock-off, replica, imitation, clone,
                    faux, fake, mirror image, or similar term used to described
                    an NFT; or
                  </li>
                  <li>
                    an NFT that mimics the layers, features or traits of the NFT
                    you Own,
                  </li>
                  <li>
                    in an attempt to pass it off as a genuine creation by us;
                  </li>
                </LetterList>
              </p>
              <p>
                <strong>Digital Wallet</strong> means the applicable “Metamask”
                location, public key or wallet address, account or storage
                device which we choose to support for the delivery of the NFTs
                provided by us;
              </p>
              <p>
                <strong>Intellectual Property Rights</strong> means any and all
                present and future intellectual property rights, conferred by
                statute, at common law or in equity and wherever existing,
                including:
                <LetterList>
                  <li>
                    patents, inventions, discoveries, designs, copyright, moral
                    rights, trade marks, service marks, trade names, brand
                    names, business names, product names, domain names or rights
                    in designs, art, images, drawings, know how, product names,
                    trading styles, get-up, processes, methodologies, trade
                    secrets and any other rights subsisting in the results of
                    intellectual effort in any field, whether or not registered
                    or capable of registration;
                  </li>
                  <li>
                    any application or right to apply for registration of any of
                    these rights or other rights of a similar nature arising or
                    capable of arising under statute or at common law anywhere
                    in the world;
                  </li>
                  <li>
                    other intellectual property as defined in Article 2 of the
                    Convention Establishing the World Intellectual Property
                    Organisation 1967;
                  </li>
                  <li>
                    any registration of any of those rights or any registration
                    of any application referred to in paragraph (b); and
                  </li>
                  <li>all renewals and extensions of these rights;</li>
                </LetterList>
              </p>
              <p>
                <strong>Marketplace</strong> means a software platform or
                software (including a Blockchain digital wallet) which permits
                the transfer, purchase or sale of an NFT, provided that the
                Marketplace at all times cryptographically verifies the NFT
                owner&apos;s right to Own the NFT;
              </p>
              <p>
                <strong>Own</strong> means, with respect to an NFT, any NFT we
                have issued, that you have purchased or otherwise rightfully
                acquired from a legitimate source, where proof of ownership is
                recorded on a blockchain system and you control the private key
                associated with a Digital Wallet to which the NFT is associated
                or located;
              </p>
              <p>
                <strong>Revenue Share</strong> means 5%;
              </p>
              <p>
                <strong>Third Party IP</strong> means any third party
                Intellectual Property Rights; and
              </p>
              <p>
                <strong>Website</strong> means https://psychedelicsanonymous.com
                and/or any other website we may operate from time to time.
              </p>
            </li>
          </OrderedList>
        </Message>
      </Content>
    </MaxContainer>
    <BottomHero />
  </Container>
)

export default NFTLicensePage

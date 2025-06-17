import React from "react"
import MetaHead from "../components/common/MetaHead"
import stitches from "../stitches"
import MaxContainer from "../components/common/MaxContainer"
import BottomHero from "../components/common/BottomHero"
import Divider from "../components/common/Divider"

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
  "> h1": {
    fontSize: "$rg",
    color: "$paGrey",
    fontWeight: 600,
    textTransform: "uppercase",
  },
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
    color: "$paGrey",
    "> p": {
      color: "$paDark",
    },
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
    color: "$paGrey",
    "@bp2": {
      display: "table-cell",
    },
  },
})

const LetterList = stitches.styled("ol", {
  counterReset: "subitem",
  margin: 0,
  padding: 0,
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

const PsyTermsPage = () => (
  <Container>
    <MetaHead
      title="Psychedelics Anonymous | PsyPoints Terms & Conditions"
      description="We are the night."
      link="/psy-terms"
    />
    <MaxContainer>
      <Content>
        <Message>
          <h1>Voltura Labs PSY Points Terms and Conditions</h1>
          <Divider full />
          <p>
            When you (you) acquire points (PSY Points) from Voltura Labs Pty Ltd
            (ACN 655 142 644) (Voltura Labs, us, we) you must agree to the terms
            and conditions set out in this document (PSY Points Terms), the NFT
            Licence (Licence), the NFT Terms of Sale (Terms of Sale) and Privacy
            Policy (Privacy Policy) available on our Website which apply to you.
          </p>
          <div>Operative clauses</div>
          <Divider full />
        </Message>
        <Message>
          <OrderedList>
            <li>
              <strong>Applicability of PSY Terms</strong>
              <LetterList>
                <li>
                  All PSY Points acquired by you are subject to these PSY Points
                  Terms and the Licence, unless otherwise agreed in writing and
                  by acquiring PSY Points, you are agreeing to be bound by these
                  PSY Points Terms and the Licence.
                </li>
                <li>
                  The use of any NFTs or Traits redeemed for PSY Points are
                  subject to, without limitation our Website Terms and our
                  Privacy Policy and any ancillary document relating to the
                  Licence and the terms and conditions of any Participating
                  Website.
                </li>
                <li>
                  Termination of these PSY Points Terms for any reason will not
                  affect any obligations which have arisen prior to termination.
                </li>
                <li>
                  We may, in our absolute discretion, change these PSY Point
                  Terms for any reason without notice to you.
                </li>
              </LetterList>
            </li>
            <Divider full />
            <li>
              <strong>Member Eligibility</strong>
              <LetterList>
                <li>
                  Membership of the PSY Points Program is only open to
                  individuals. Membership is not open to families or groups,
                  companies or partnerships, trusts, agencies, other entities,
                  government departments, animals or anything other than an
                  individual person.
                </li>
                <li>
                  Voltura reserves the right to reject or withdraw any persons
                  membership to the PSY Points Program at any time.
                </li>
                <li>
                  Persons wishing to be Members must:
                  <NumberList>
                    <li>
                      connect their Digital Wallet with one of our Participating
                      Websites or otherwise have a registered account with a
                      Participating Website;
                    </li>
                    <li>
                      have been notified with a username for the PSY Points
                      Program by a Participating Website (which will always be
                      your unique Digital Wallet address);
                    </li>
                    <li>
                      meet any Qualifying Action as advertised through social
                      media (including but not limited to Twitter, Facebook and
                      Instagram) from time to time, which we may change in our
                      absolute discretion and without notice to you; and
                    </li>
                    <li>
                      comply with these PSY Points Terms at all times and any
                      ancillary terms and conditions of a Participating Website
                      without limitation.
                    </li>
                  </NumberList>
                </li>
              </LetterList>
            </li>
            <Divider full />
            <li>
              <strong>Acquiring PSY Points</strong>
              <OrderedList>
                <li>
                  <strong>Distribution of PSY Points</strong>
                  <LetterList>
                    <li>
                      You may only acquire PSY Points by holding an NFT you Own
                      or NFTs you Own from our NFT Collections in your Digital
                      Wallet;
                    </li>
                    <li>
                      The amount of PSY Points you may be eligible to acquire
                      will be directly referrable to the length of time you have
                      held an NFT or NFTs from our NFT Collections in your
                      Digital Wallet;
                    </li>
                    <li>
                      If, for any reason, you cease holding an NFT or NFTs from
                      our NFT Collections in your Digital Wallet, then you will
                      no longer be eligible to acquire any PSY Points referable
                      to that NFT or NFTs;
                    </li>
                    <li>
                      Details on current rates and holding times for acquiring
                      PSY Points will be advertised on Participating Websites
                      from time to time or as advertised through Qualifying
                      Actions, which we may change in our absolute discretion
                      and without notice to you;
                    </li>
                    <li>
                      The PSY Points Program is intended to reward Members for
                      their continuing support and patronage to Voltura and its
                      Participating Websites, Voltura reserves the right in its
                      absolute discretion to penalise, reduce, remove or revise
                      your PSY Points balance if you breach these PSY Points
                      Terms for any reason or fail to comply with any ancillary
                      terms and conditions of a Participating Website without
                      limitation, including the terms of the Licence or Terms of
                      Sale;
                    </li>
                    <li>
                      PSY Points transferred to you are your own responsibility;
                    </li>
                    <li>
                      PSY Points will not expire provided you are an Active
                      Member. If you are not an Active Member PSY Points may
                      expire at any time at our discretion and once expired will
                      not be restored. PSY Points have no monetary value and
                      upon expiration you have no claim against us of any kind
                      whatsoever;
                    </li>
                    <li>
                      PSY Point balances are managed centrally by us on our
                      internal database and are not recorded on a blockchain.
                      You are not able to view other Members&rsquo; PSY Point
                      balances under a wallet address or by any other means;
                    </li>
                    <li>
                      PSY Points may be awarded for other activities and subject
                      to Qualifying Actions as advertised by us on Participating
                      Websites from time to time, which may include activities
                      such as using our app or software and participating in our
                      forums or ecosystem in ways we consider, in our absolute
                      discretion, beneficial to our ecosystem.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>Member Benefits</strong>
                  <LetterList>
                    <li>
                      Other than as set out in clause 4, Member Benefits may be
                      advertised from time to time on Participating Websites.
                    </li>
                    <li>
                      Member Benefits may include bonus points or special offers
                      which may require you to comply with Qualifying Actions or
                      other eligibility requirements.
                    </li>
                    <li>
                      Any Member Benefits advertised on Participating Websites
                      may be subject to further Terms and Conditions which you
                      may need to comply with, and we reserve the right to
                      withdraw or revise any advertised benefit at any time
                      without reason and in our absolute discretion.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>Acknowledgements &ndash; NFT features</strong>
                  <LetterList>
                    <li>
                      Without limiting clause 3, Voltura does not make any
                      representations or give any warranties, assurances or
                      conditions about:
                      <NumberList>
                        <li>the value and/or price of the NFTs or Traits;</li>
                        <li>the functionality of the NFTs or Traits;</li>
                        <li>
                          the NFTs (or Traits) status or compliance with any
                          laws (including whether the NFTs would be considered
                          to be a security or financial product in any
                          jurisdiction); or
                        </li>
                        <li>
                          the fitness or suitability of the NFTs or Traits for
                          any purpose.
                        </li>
                      </NumberList>
                    </li>
                    <li>
                      You acknowledge that we will not be liable to you for any
                      Loss or Claim in connection with the conditions and or
                      features of the NFTs or Traits.
                    </li>
                    <li>
                      You acknowledge that if you purchase NFTs, the NFTs are
                      not sold as, or represented to be, a security or other
                      financial product and nothing we publish is in any way
                      financial or investment advice to you or any other person.
                    </li>
                    <li>
                      You acknowledge that you are solely responsible for
                      seeking tax advice and legal advice in connection with any
                      purchase of the NFTs.
                    </li>
                    <li>
                      Your rights in the NFT you Own are limited to those
                      expressly stated in the Licence. We (and our licensors)
                      reserve all rights and ownership in and to the
                      Intellectual Property Rights in the art associated with an
                      NFT you Own that are not expressly granted in the Licence.
                    </li>
                  </LetterList>
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Redeeming PSY Points</strong>
              <OrderedList>
                <li>
                  <strong>Redeeming NFTs</strong>
                  <LetterList>
                    <li>
                      From time to time we will allow you to redeem NFTs from
                      our NFT Collections with your PSY Points.
                    </li>
                    <li>
                      NFTs redeemed with PSY Points will be subject to the Terms
                      of Sale and Licence.
                    </li>
                    <li>
                      The Purchase Price for any NFT may be advertised as
                      denominated in Digital Currency or PSY Points, NFTs
                      purchased with PSY Points are not redeemable for the same
                      Purchase Price in Digital Currency.
                    </li>
                    <li>
                      Any NFT where a Purchase Price is advertised as
                      denominated in PSY Points may only be purchased for that
                      total amount of PSY Points, NFTs are not able to be
                      partially purchased in PSY Points and Digital Currency.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>Redeeming Traits</strong>
                  <LetterList>
                    <li>
                      From time to time we will allow you to use your PSY Points
                      to redeem Traits from the New Dawn Marketplace;
                    </li>
                    <li>
                      Traits redeemed with PSY Points must be used as part of
                      the Extraction and Construction processes set out on the
                      New Dawn Marketplace and can not be used for other
                      purposes; and
                    </li>
                    <li>
                      Unused or expired Traits will not be re-credited to you.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>Redeeming Coupons</strong>
                  <LetterList>
                    <li>
                      From time to time we may allow you to use your PSY Points
                      to be redeemed for Coupons;
                    </li>
                    <li>
                      You acknowledge that, upon receipt of the Coupon, we shall
                      not be liable to you for any Loss referrable to the Coupon
                      including by your failure to redeem or recover any
                      information associated with the Coupon;
                    </li>
                    <li>
                      Unused or expired Coupons will not be re-credited to you;
                    </li>
                    <li>
                      Coupons cannot be exchanged for money or replaced if lost,
                      stolen, damaged or destroyed and is subject to the terms
                      and conditions described as part of the award of the
                      Coupon;
                    </li>
                    <li>
                      Coupons can only be used for the purposes described as
                      part of the award of that Coupon.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>Other ways to redeem</strong>
                  <LetterList>
                    <li>
                      PSY Points may be redeemed other activities including
                      other Member Benefits and subject to Qualifying Actions as
                      advertised by us on Participating Websites from time to
                      time, which we consider, in our absolute discretion,
                      beneficial to our ecosystem.
                    </li>
                  </LetterList>
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Transferring PSY Points</strong>
              <OrderedList>
                <li>
                  <strong>Transfers</strong>
                  <div>
                    You may transfer PSY Points only to another account which
                    they own and control and may not under any circumstances
                    transfer PSY Points to any other Member. Such a transfer may
                    have tax implications and you should check with your
                    accountant or tax adviser for further information. Any
                    transfer made in breach of this clause may result in voiding
                    of the PSY Points held by you.
                  </div>
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Obligations</strong>
              <OrderedList>
                <li>
                  <strong>Voltura obligations</strong>
                  <LetterList>
                    <li>
                      We will endeavour to maintain our database of PSY Points
                      and keep up-to-date all PSY Point balances referrable to
                      you.
                    </li>
                    <li>
                      Requests by you to redeem PSY Points for NFTs, Traits,
                      Coupons or other Member Benefits will be honoured unless
                      we have legitimate reason not to or unless you have
                      breached, or we have good reason to suspect you have
                      breached, these PSY Point Terms or any ancillary terms and
                      conditions.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>Member obligations</strong>
                  <LetterList>
                    <li>
                      You are responsible for ensuring that you have sufficient
                      PSY Points to redeem for any NFT, Trait, Coupon or other
                      Member Benefit you may request.
                    </li>
                    <li>
                      You must not:
                      <NumberList>
                        <li>
                          do any thing or act in any way that breaches any of
                          the terms in these PSY Points Terms or in any
                          ancillary terms and conditions including on a
                          Participating Website without limitation;
                        </li>
                        <li>
                          abuse or misuse the PSY Points Program or any benefits
                          accorded to you as a result of membership in the PSY
                          Points Program;
                        </li>
                        <li>engage in illegal or fraudulent activities;</li>
                        <li>
                          supply false of misleading information to us or
                          through a Participating Website;
                        </li>
                        <li>
                          sell, assign or transfer their PSY Points or their
                          membership in the PSY Points Program other than in
                          accordance with these PSY Points Terms;
                        </li>
                        <li>
                          act in a hostile, abusive, aggressive, unruly or
                          unreasonable manner to us, or our Personnel, through
                          any means including social media;
                        </li>
                        <li>
                          refuse to follow the reasonable instructions of us, or
                          our Personnel, in relation to the PSY Points Program
                          or with regards to participating in any services
                          provided by us to you or through a Participating
                          Website.
                        </li>
                      </NumberList>
                    </li>
                    <li>
                      You are responsible for, and we are not responsible for
                      your failure to:
                      <NumberList>
                        <li>
                          regularly check any PSY Points balance associated with
                          your username/Digital Wallet; or
                        </li>
                        <li>
                          immediately notify us of any omissions, incorrect
                          amounts, incorrect transactions or other discrepancies
                          referrable to the PSY Points balance associated with
                          your username/Digital Wallet.
                        </li>
                      </NumberList>
                    </li>
                  </LetterList>
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Termination</strong>
              <OrderedList>
                <li>
                  <strong>Termination</strong>
                  <div>
                    We may terminate this agreement and expire any PSY Points
                    you hold:
                  </div>
                  <LetterList>
                    <li>
                      with immediate effect if you breach any of the Member
                      Warranties in clause 9.2; or
                    </li>
                    <li>
                      if you commit a material breach of your obligations under
                      these PSY Points Terms and fail to remedy such breach (if
                      capable of remedy) within 30 days of receipt of notice
                      requiring you to do so.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>Effect of termination</strong>
                  <LetterList>
                    <li>
                      Other than as set out below, termination of this agreement
                      does not affect the rights of the parties which have
                      accrued prior to termination.
                    </li>
                    <li>
                      All PSY Points acquired by you and existing on the date of
                      termination but not yet redeemed or transferred will be
                      reversed or cancelled or expire automatically and you
                      shall have no claim of any kind against us in respect of
                      such reversal, cancellation or expiration.
                    </li>
                    <li>
                      We may cancel or refuse to honour any benefits, purchases,
                      or both, that have been redeemed by or provided by you.
                    </li>
                  </LetterList>
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Acknowledgements</strong>
              <div>You acknowledge and agree that:</div>
              <LetterList>
                <li>
                  The amount of PSY Points, conditions and Qualifying Actions
                  required to redeem any NFTs, Traits, Coupons or other Member
                  Benefit will be determined by us in our absolute and sole
                  discretion;
                </li>
                <li>
                  The conditions for redeeming PSY Points are calculated in the
                  manner set out on our Website or Participating Websites which
                  we may in our sole discretion change without notice;
                </li>
                <li>
                  We do not give warranty or make any representation in relation
                  to the underlying value of any PSY Points;
                </li>
                <li>
                  PSY Points are for use with the PSY Points Program and are not
                  Digital Currency or money and cannot be used as a form of
                  currency to pay for goods or services;
                </li>
                <li>
                  We do not give warranty or make any representation that PSY
                  Points will have any ongoing utility or value and may have no
                  utility or value at any point in time;
                </li>
                <li>
                  We may, in our absolute discretion, end the PSY Points Program
                  and discontinue the use of any PSY Points referrable to you;
                </li>
                <li>
                  Your Personal Information will be handled in accordance with
                  our Privacy Policy;
                </li>
                <li>
                  you are solely responsible for any decision to enter into a
                  transaction in connection with the PSY Points Program,
                  including the evaluation of any and all risks related to any
                  such transaction;
                </li>
                <li>
                  a significant degree of IT sophistication is required to
                  safely deal in and store Digital Currency of any kind using a
                  Digital Wallet;
                </li>
                <li>
                  we are not a custodian for the purposes of any securities or
                  financial product legislation, and transfers of any PSY Points
                  are for transaction purposes only;
                </li>
                <li>
                  we are not responsible for any Loss caused by your failure to
                  act in accordance with our policies, procedures or in
                  accordance with our reasonable directions which relate to
                  Qualifying Actions;
                </li>
                <li>
                  you engage in Qualifying Actions entirely at your own risk and
                  understanding and we have not made any representations or
                  warranties as to the IT security or ongoing availability of
                  such services or that your access to PSY Points will be
                  uninterrupted, timely or secure at all times;
                </li>
                <li>
                  you understand and acknowledge that your access to your PSY
                  Points remains contingent upon you remaining in control of the
                  seed phrases and private key(s) associated with your Digital
                  Wallet and that we will not store any information in
                  connection with your Digital Wallet beyond that required for
                  providing the PSY Points;
                </li>
                <li>
                  we do not and cannot guarantee there will be any use for, or
                  any particular amount available for any thing you may redeem
                  the PSY Points for;
                </li>
                <li>
                  we do not represent or guarantee any outcomes, or any
                  financial return from your acquisition of any PSY Points from
                  us;
                </li>
                <li>
                  PSY Points are not intended for speculative use, are not
                  offered, and are not intended to be a security or financial
                  product and nothing we publish is in any way financial advice
                  to you or any other person;
                </li>
                <li>
                  NFTs may experience or may have extreme price volatility,
                  including being worthless in the future; and
                </li>
                <li>
                  we are not providing and will not provide any fiduciary,
                  advisory, brokerage, exchange or other similar services to you
                  or any other person.
                </li>
                <li>
                  The regulatory status of digital assets including NFTs and
                  Digital Currencies are uncertain and these PSY Points Terms
                  may be amended from time to time to reflect a changing
                  climate. We may consider matching a PSY Point to an ERC-20
                  token on a one-to-one basis, if and when there is regulatory
                  certainty in Australia and the United States of America with
                  respect to the status of a cryptographic token, however you
                  acknowledge and agree that Voltura is not obliged to convert
                  your PSY Points into cryptographic tokens at any time.
                </li>
              </LetterList>
            </li>
            <Divider full />
            <li>
              <strong>Warranties</strong>
              <OrderedList>
                <li>
                  <strong>Our Warranties</strong>
                  <div>
                    We represent and warrant that we will provide notice to you
                    before we discontinue or alter the rights or features of the
                    PSY Points Program.
                  </div>
                </li>
                <li>
                  <strong>Member Warranties</strong>
                  <div>
                    You warrant and assure us that in acquiring PSY Points from
                    us:
                  </div>
                  <LetterList>
                    <li>
                      all information you supply is true and accurate as at the
                      time it is given, including your acknowledge in accordance
                      with these PSY Points Terms, and that any Digital Wallet
                      address you provide to us has been generated in accordance
                      with best practice security measures and no other party,
                      other than you or your authorised representative, has
                      used, or has access to, the seed phrases, private keys or
                      analogous passwords required to effect transfers from, the
                      Digital Wallet; and
                    </li>
                  </LetterList>
                </li>
                <li>
                  you are the lawful owner of any Digital Wallet nominated by
                  you, and no person has any right, title or interest in your
                  nominated Digital Wallet.
                </li>
                <li>
                  <strong>Continuous warranties</strong>
                  <div>
                    You represent and warrant to us that each of the Member
                    Warranties is true and accurate, and not misleading or
                    deceptive as at the date of these PSY Points Terms and,
                    except as expressly stated, will be true, accurate and not
                    misleading or deceptive each time PSY Points are provided to
                    you.
                  </div>
                </li>
                <li>
                  <strong>Notification</strong>
                  <div>
                    You must disclose to us anything that has or will constitute
                    a material breach of a Member Warranty or cause a Member
                    Warranty to be untrue or inaccurate, as soon as you become
                    aware of it.
                  </div>
                </li>
                <li>
                  <strong>Mutual warranties</strong>
                  <div>
                    Each party warrants and assures the other party that:
                  </div>
                  <LetterList>
                    <li>
                      if it is a company, it is duly incorporated and validly
                      exists under the law of its place of incorporation;
                    </li>
                    <li>it is not subject to an Insolvency Event; and</li>
                    <li>
                      these PSY Points Terms constitute legal, valid and binding
                      terms enforceable in accordance with its terms by
                      appropriate legal remedy.
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
                      guarantees and remedies relating to your redeeming PSY
                      Points acquired by you which cannot be excluded,
                      restricted or modified in these PSY Points Terms
                      (Statutory Rights).
                    </li>
                    <li>
                      Nothing in these PSY Points Terms does, or is intended to,
                      exclude any Statutory Rights to which you are entitled.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>Knowledge and awareness</strong>
                  <div>
                    Where a warranty is given &lsquo;to the best of a
                    party&rsquo;s knowledge, belief and awareness&rsquo;, or
                    &lsquo;as far as the party is aware&rsquo; or with a similar
                    qualification as to the relevant party&rsquo;s awareness or
                    knowledge, the party giving the warranty will be deemed to
                    know or be aware of a particular fact, matter or
                    circumstance if that party&rsquo;s directors or senior
                    management employees are aware of that fact, matter or
                    circumstance, or would have become aware if they had made
                    reasonable enquires as at the date of these PSY Points
                    Terms.
                  </div>
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Indemnity</strong>
              <OrderedList>
                <li>
                  You agree to indemnify us and our Personnel and will keep us
                  and our Personnel indemnified at all times to the fullest
                  extent permitted by law in respect of any Loss or Claim which
                  we or our Personnel may suffer, sustain or incur arising from,
                  or connected with, a breach of these PSY Points Terms without
                  limitation.
                </li>
                <li>
                  In addition, you must indemnify us and our Personnel and keep
                  us and our Personnel indemnified at all times to the fullest
                  extent permitted by law in respect of any Claim which we or
                  our Personnel may suffer, sustain or incur arising from, or
                  connected with, any breach of these PSY Points Terms, or any
                  breach of all applicable laws, reduced to the extent of the
                  Loss in respect of the Claim was caused by the negligent act
                  or omission of us or our Personnel.
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Limitation of liability</strong>
              <OrderedList>
                <li>
                  <strong>Limitation of liability</strong>
                  <div>
                    In the absence of a material breach of these terms by us or
                    the gross negligence, fraud or wilful misconduct by us when
                    providing you PSY Points, we will not be liable to you on
                    account of anything done, omitted or suffered by us acting
                    in good faith when providing you PSY pursuant to these PSY
                    Points Terms, including in respect of a Force Majeure Event.
                  </div>
                </li>
                <li>
                  <strong>Third party services</strong>
                  <div>
                    Subject to clause 11.1, we will not be liable for the
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
                    limitation, the blockchain(s) upon which any delivery of
                    NFTs depends or forks of those blockchain(s).
                  </div>
                </li>
                <li>
                  <strong>No liability for consequential loss</strong>
                  <div>
                    Neither party will be liable to the other for any Loss or
                    Claim in the nature of consequential or indirect loss,
                    including without limitation loss of profits, loss of
                    chance, loss of expectations, or loss or opportunity.
                  </div>
                </li>
                <li>
                  <strong>
                    Compliance with laws &ndash; No monitoring responsibilities
                  </strong>
                  <LetterList>
                    <li>
                      We will have no liability or responsibility for your
                      compliance with laws or regulations governing the use of
                      the PSY Points. Further, you are solely responsible for
                      compliance with all applicable requirements of any laws,
                      rules, and regulations of governmental authorities in Your
                      Jurisdiction.
                    </li>
                    <li>
                      You further acknowledge that neither we nor any of our
                      Personnel is, and will not be, by virtue of providing you
                      PSY Points, an advisor or fiduciary to you.
                    </li>
                  </LetterList>
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Tax</strong>
              <OrderedList>
                <li>
                  You acknowledge that Voltura distributes any PSY Points to you
                  freely and for no monetary value as a result of your
                  participation in the PSY Points Program and Voltura bears no
                  tax liability for such distribution under any circumstances.
                </li>
                <li>
                  You are responsible any tax liability in connection with you
                  participating in the PSY Points Program and your use of any
                  NFTs, Traits, Coupons or Member Benefits and all taxes, GST,
                  duties, levies, fees, charges or other liabilities in
                  connection with your participation and in connection with any
                  PSY Points you may request.
                </li>
                <li>
                  In addition to the PSY Points required to redeem anything
                  mentioned in clause 4, the redemption of PSY Points and the
                  supply of NFTs, Traits, Coupons or Member Benefits may be
                  subject to taxes, GST, duties, levies, fees, charges or other
                  liabilities. You are responsible for paying all taxes, GST,
                  duties, levies, fees, charges or other liabilities. This
                  applies to all items you may be able to redeem your PSY Points
                  for without limitation. This clause survives termination or
                  expiry of these PSY Points Terms and PSY Points Program.
                </li>
                <li>
                  We recommends you consult an accountant or tax adviser to
                  ensure you understand any possible tax (including fringe
                  benefits tax) implications in relation to the PSY Program and
                  any PSY Points you may request
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Notices</strong>
              <OrderedList>
                <li>
                  Unless a provision of these PSY Points Terms expressly state
                  otherwise, a notice, consent, approval, waiver or other
                  communication (notice) in connection with these PSY Points
                  Terms must be in writing and in English and sent to, in the
                  case of us, our nominated email, or in the case of you, to
                  your nominated email or published on the Website with public
                  access to such notice.
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
            <li>
              <strong>Disputes</strong>
              <OrderedList>
                <li>
                  <strong>Proceedings suspended</strong>
                  <div>
                    You must not begin legal proceedings in connection with a
                    dispute arising out of or in connection with these PSY
                    Points Terms unless the steps in this clause 14 have been
                    followed. However, this limitation does not apply:
                  </div>
                  <LetterList>
                    <li>
                      to a party who wants to apply for equitable relief or
                      urgent interlocutory relief; or
                    </li>
                    <li>
                      to a party who attempts in good faith to comply with
                      clauses 14.2, 14.3 and 14.4 but cannot do so because the
                      other party does not comply with those clauses.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong> Notice of dispute</strong>
                  <div>
                    If a dispute arises out of or in connection with these PSY
                    Points Terms (including the validity, breach or termination
                    of it), a party may notify the other party to the dispute.
                    The notice must specify the dispute and indicate that the
                    notifying party wants the dispute to be referred to
                    mediation.
                  </div>
                </li>
                <li>
                  <strong>Commencement of mediation</strong>
                  <LetterList>
                    <li>
                      If the dispute is not resolved within 10 Business Days
                      after a notice under clause 14.2 has been served (Notice
                      Period), the dispute is by this clause 14.3 submitted to
                      mediation.
                    </li>
                    <li>
                      The mediation must be conducted in New South Wales,
                      Australia in accordance with the mediation guidelines /
                      rules of the Resolution Institute, save any process in
                      these PSY Points Terms which is inconsistent with those
                      guidelines or rules will take precedence to the extent of
                      any inconsistency.
                    </li>
                    <li>
                      If the parties have not agreed on the mediator and the
                      mediator&rsquo;s remuneration within 5 Business Days after
                      the end of the Notice Period:
                      <NumberList>
                        <li>the mediator is the person appointed by; and</li>
                        <li>
                          the remuneration of the mediator is the amount or rate
                          determined by,
                          <div>
                            the President of the Law Society of New South Wales
                            or the President&rsquo;s nominee, acting on the
                            request of any party.
                          </div>
                        </li>
                      </NumberList>
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>If dispute not resolved</strong>
                  <div>
                    If the dispute is not resolved within 1 month after the
                    appointment of the mediator, you may take legal proceedings
                    in connection with the dispute.
                  </div>
                </li>
                <li>
                  <strong>Confidentiality</strong>
                  <div>
                    Each party must keep confidential, all information relating
                    to the subject matter of a dispute as disclosed during or
                    for the purposes of dispute resolution under this clause 14,
                    unless that party is compelled by an regulatory or
                    government authority, court or tribunal to disclose that
                    information.
                  </div>
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>General</strong>
              <OrderedList>
                <li>
                  <strong>Governing law and jurisdiction</strong>
                  <div>
                    These PSY Points Terms are governed by the laws of New South
                    Wales and Australia. The parties irrevocably submit to the
                    exclusive jurisdiction of the courts of New South Wales and
                    the New South Wales division of the Federal Court of
                    Australia and the courts of appeal from them.
                  </div>
                </li>
                <li>
                  <strong>Amendment</strong>
                  <div>
                    We reserve the right to amend these PSY Points Terms from
                    time to time in our absolute discretion. Amendments will be
                    effective as soon as such changes are notified to you in
                    writing from time to time.
                  </div>
                </li>
                <li>
                  <strong>Precedence</strong>
                  <div>
                    Where there is inconsistency between these PSY Points Terms
                    and other content displayed as part of the Website, the
                    content of these PSY Points Terms will prevail to the extent
                    of any inconsistency.
                  </div>
                </li>
                <li>
                  <strong>Force Majeure</strong>
                  <div>
                    We will not be liable for any delay or failure to perform
                    our obligations under these PSY Points Terms if such delay
                    is due to any circumstances beyond our reasonable control
                    (including but not limited to epidemics, pandemics,
                    blockchain congestion or attacks, government sanctions or
                    orders, whether known or unknown at the time the parties
                    enter into these PSY Points Terms) (Force Majeure Event).
                  </div>
                </li>
                <li>
                  <strong>Waiver</strong>
                  <div>
                    A provision of these PSY Points Terms or a right created
                    under it may not be waived except in writing signed by the
                    party granting the waiver.
                  </div>
                </li>
                <li>
                  <strong>Exercise of a right</strong>
                  <div>
                    A party may exercise a right at its discretion and
                    separately or together with another right. If a party
                    exercises a single right or only partially exercises a
                    right, then that party may still exercise that right or any
                    other right later. If a party fails to exercise a right or
                    delays in exercising a right, then that party may still
                    exercise that right later.
                  </div>
                </li>
                <li>
                  <strong>Remedies cumulative</strong>
                  <div>
                    The rights and remedies provided in these PSY Points Terms
                    are cumulative with and not exclusive of the rights and
                    remedies provided by law independently of these PSY Points
                    Terms.
                  </div>
                </li>
                <li>
                  <strong>No merger</strong>
                  <div>
                    The rights and obligations of the parties (including under
                    the warranties) will not merge on completion of any
                    transaction under these PSY Points Terms. They will survive
                    the execution and delivery of any assignment or other
                    document entered into for the purpose of implementing any
                    transaction.
                  </div>
                </li>
                <li>
                  <strong>Assignment</strong>
                  <LetterList>
                    <li>
                      These PSY Points Terms are for the benefit of the parties
                      and their successors and assigns. The parties and their
                      successors and assigns are bound by these PSY Points
                      Terms.
                    </li>
                    <li>
                      We may assign our rights under these PSY Points Terms
                      without your consent, including at any time.
                    </li>
                  </LetterList>
                </li>
                <li>
                  <strong>Severance</strong>
                  <div>
                    If any provision of these PSY Points Terms are void,
                    voidable, unenforceable, illegal, prohibited or otherwise
                    invalid in a jurisdiction, in that jurisdiction the
                    provision must be read down to the extent it can be to save
                    it but if it cannot be saved by reading it down, words must
                    be severed from the provision to the extent they can be to
                    save it but if that also fails to save it the whole
                    provision must be severed. That will not invalidate the
                    remaining provisions of these PSY Points Terms nor affect
                    the validity or enforceability of that provision in any
                    other jurisdiction where it is not invalid.
                  </div>
                </li>
                <li>
                  <strong>Entire agreement</strong>
                  <LetterList>
                    <li>
                      These PSY Points Terms constitute the entire agreement of
                      the parties in respect of the subject matter of these PSY
                      Points Terms and supersedes all prior discussions,
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
                  <div>
                    Each party must, at its own expense, do everything
                    reasonably necessary to give effect to these PSY Points
                    Terms and the transactions contemplated by it, including but
                    not limited to the execution of documents.
                  </div>
                </li>
                <li>
                  <strong>Relationship</strong>
                  <div>
                    Nothing in these PSY Points Terms constitutes the parties as
                    partners or agents of the other and no party has any
                    authority to bind the other legally or equitably save as
                    expressly stated in these PSY Points Terms.
                  </div>
                </li>
                <li>
                  <strong>Knowledge</strong>
                  <div>
                    In these PSY Points Terms, a reference to the awareness or
                    knowledge by you is a reference to the actual knowledge,
                    information and belief you have as at the date of any
                    transaction taking place pursuant to these PSY Points Terms.
                  </div>
                </li>
              </OrderedList>
            </li>
            <Divider full />
            <li>
              <strong>Definitions</strong>
              <div>In these PSY Points Terms:</div>
              <div>
                <strong>Active Member</strong> means, at any point in time, a
                Member who has used the services of us or a Participating
                Website in the previous consecutive 18 month period from that
                point in time;
              </div>
              <div>
                <strong>Business Day</strong> means any day except a Saturday or
                a Sunday or other public holiday in New South Wales, Australia;
              </div>
              <div>
                <strong>Claim</strong> includes a claim, notice, demand, action,
                proceeding, litigation, investigation, however arising whether
                present, unascertained, immediate, future or contingent, whether
                based in contract, tort or statute and whether involving a third
                party or a party to these NFT Terms and where and to the extent
                the context permits, includes all associated Loss;
              </div>
              <div>
                <strong>Corporations Act</strong> means the Corporations Act
                2001 (Cth);
              </div>
              <div>
                <strong>Coupons</strong> means coupons, tickets or receipts
                (usually in the form of a code or number string) awarded to
                Members by us in our absolute discretion which may be redeemable
                for discounts on merchandise and other goods offered by us;
              </div>
              <div>
                <strong>Digital Currency</strong> means a cryptographically
                secured virtual currency or virtual asset which we identify as
                an acceptable means of payment or transacting with us;
              </div>
              <div>
                <strong>Digital Wallet</strong> means the applicable “Metamask”
                location, public key or wallet address, account or storage
                device which we choose to support for the delivery of the NFTs
                provided by us;
              </div>
              <div>
                <strong>Extraction and Construction</strong> means the processes
                of the same names offered as part of the services under the New
                Dawn Marketplace
              </div>
              <div>
                <strong>Intellectual Property Rights</strong> means any and all
                present and future intellectual property rights, conferred by
                statute, at common law or in equity and wherever existing,
                including:
              </div>
              <LetterList>
                <li>
                  patents, inventions, discoveries, designs, copyright, moral
                  rights, trade marks, service marks, trade names, brand names,
                  business names, product names, domain names or rights in
                  designs, art, images, drawings, know how, product names,
                  trading styles, get-up, processes, methodologies, trade
                  secrets and any other rights subsisting in the results of
                  intellectual effort in any field, whether or not registered or
                  capable of registration;
                </li>
                <li>
                  any application or right to apply for registration of any of
                  these rights or other rights of a similar nature arising or
                  capable of arising under statute or at common law anywhere in
                  the world;
                </li>
                <li>
                  other intellectual property as defined in Article 2 of the
                  Convention Establishing the World Intellectual Property
                  Organisation 1967;
                </li>
                <li>
                  any registration of any of those rights or any registration of
                  any application referred to in paragraph (b); and
                </li>
                <li>all renewals and extensions of these rights;</li>
              </LetterList>
              <div>
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
              </div>
              <div>
                <strong>Loss</strong> includes any loss, damage, cost, charge,
                liability or expense (including legal costs and expenses);
              </div>
              <div>
                <strong>Members</strong> means any individual participating in
                the PSY Points Program in accordance with these PSY Points
                Terms;
              </div>
              <div>
                <strong>Member Benefits</strong> means any of the facilities,
                discounts, services or arrangements offered or available to a
                Member as a result of the PSY Points Program;
              </div>
              <div>
                <strong>NFT Collection</strong> means the Psychedelics Anonymous
                collection and any other NFT Collection we may advertise from
                time to time on any Participating Website
              </div>
              <div>
                <strong>New Dawn Marketplace</strong> means
                https://newdawn.xyz/nft-license and the platform or software
                (including a Blockchain Digital Wallet) which permits the
                transfer, purchase or sale of an NFTs and the acquisition of
                Traits, provided that the New Dawn Marketplace at all times
                cryptographically verifies the NFT owner&rsquo;s right to Own
                the NFT or Trait;
              </div>
              <div>
                <strong>Participating Website</strong> means any website owned
                or run by us, or run by one of our partners which allows Members
                to participate in the PSY Points Program in accordance with
                these PSY Points Terms;
              </div>
              <div>
                <strong>Personal Information</strong> has the meaning set out in
                the Privacy Act;
              </div>
              <div>
                <strong>Privacy Act</strong> means the Privacy Act 1988 (Cth as
                amended from time to time.
              </div>
              <div>
                <strong>Personnel</strong> means any employee, contractor,
                subcontractor, agent, partner, shareholder, ultimate beneficial
                owner, director or officer of a party;
              </div>
              <div>
                <strong>Privacy Policy</strong> means the privacy policy on the
                Website as may be varied by us from time to time;
              </div>
              <div>
                <strong>Purchase Price</strong> means the amount advertised for
                the purchase (or pre-purchase) of any NFT or bundle containing
                an NFT, which may be dominated in a Digital Currency or with PSY
                Points;
              </div>
              <div>
                <strong>PSY Points Program</strong> means the loyalty program
                whereby Members may be eligible to acquire PSY Points under
                these PSY Points Terms.
              </div>
              <div>
                <strong>Own</strong> means, with respect to an NFT, any NFT we
                have issued, that you have purchased or otherwise rightfully
                acquired from a legitimate source, where proof of ownership is
                recorded on a blockchain system and you control the private key
                associated with a Digital Wallet to which the NFT is associated
                or located;
              </div>
              <div>
                <strong>Qualifying Action</strong> means any action or
                requirement to participate in the PSY Points Program or to
                redeem or acquire PSY Points as advertised on a Participating
                Website, or through social media operated by us, from time to
                time;
              </div>
              <div>
                <strong>Traits</strong> means individual components comprising
                an NFT which include characteristics that affect the look and
                rarity of the NFT which are deconstructed and acquired through
                the New Dawn Marketplace;
              </div>
              <div>
                <strong>Website</strong> means https://psychedelicsanonymous.com
                and/or any other website we may operate from time to time;
              </div>
              <div>
                <strong>Website Terms</strong> means the terms and conditions on
                the Website as may be varied from time to time; and
              </div>
              <div>
                <strong>Your Jurisdiction</strong> means the country or state
                where you are ordinarily resident or from which you enter into
                any agreement with us.
              </div>
            </li>
            <Divider full />
            <li>
              <strong>Interpretation</strong>
              <div>
                The following rules of interpretation apply in these PSY Points
                Terms unless the context requires otherwise:
              </div>
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
                  reference to a party includes that party&rsquo;s personal
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
      </Content>
    </MaxContainer>
    <BottomHero />
  </Container>
)

export default PsyTermsPage

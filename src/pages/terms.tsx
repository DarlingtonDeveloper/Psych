import React from "react"
import MetaHead from "../components/common/MetaHead"
import stitches from "../stitches"
import MaxContainer from "../components/common/MaxContainer"
import BottomHero from "../components/common/BottomHero"

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

const TermsPage = () => (
  <Container>
    <MetaHead
      title="Psychedelics Anonymous | Terms of Use"
      description="We are the night."
      link="/terms"
    />
    <MaxContainer>
      <Content>
        <Message>
          <h1>Voltura Labs Website Terms and Conditions</h1>
          <p>
            By accessing or continuing to use our Website and related services,
            you agree to abide by these terms and conditions, including our
            Privacy Policy. If you do not agree with any of these terms, or the
            terms of our privacy policy you should cease using our Website.
          </p>
        </Message>
        <Message>
          <OrderedList>
            <li>
              <strong>General</strong>
              <OrderedList>
                <li>
                  This website is owned and operated by Voltura Labs Pty Limited
                  (ACN 655 142 644) (hereafter referred to as Voltura Labs,
                  &lsquo;us&rsquo;, &lsquo;we&rsquo; and &lsquo;our&rsquo;). As
                  noted above, your continued use of our Website indicates your
                  agreement to these terms and conditions of use (Website
                  Terms).
                </li>
                <li>
                  Please read the following Website Terms to understand your
                  rights and obligations when accessing our Website.
                </li>
                <li>
                  We provide a platform that permits the purchase of NFTs and
                  other digital assets (the Services). To use the Services you
                  will also need to agree to our NFT Terms of Sale which will be
                  separately available.
                </li>
                <li>
                  We may also offer additional products and services from time
                  to time to you. By browsing or accessing our Website using the
                  Services, you agree to be bound by these Website Terms and
                  acknowledge that you have read and understood them. If you do
                  not accept these Website Terms, you must immediately cease
                  using our Website.
                </li>
                <li>
                  We reserve the right to amend these Website Terms from time to
                  time. Amendments will be effective as soon as such changes are
                  notified on the Website. Your continued use of the Website and
                  our Services following such notification constitutes agreement
                  by you to be bound by these Website Terms as amended.
                </li>
                <li>
                  You should regularly review these Website Terms. Where there
                  is inconsistency between the content on the Website and these
                  Website Terms, the Website Terms shall prevail to the extent
                  of any inconsistency.
                </li>
                <li>
                  These Website Terms constitute the entire agreement between
                  you and us with respect to their subject matter and supersede
                  all prior agreements and understandings between you and us in
                  connection with the Website.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Information contained on our Website</strong>
              <OrderedList>
                <li>
                  The content and information we present on our Website is
                  intended to provide a summary of the subject matter covered.
                  While we use all reasonable steps to ensure the accuracy and
                  completeness of information and content on our Website, to the
                  greatest extent permitted by law, including the Australian
                  Consumer Law, we give you no warranty concerning the accuracy
                  or completeness of our content or information. Content and
                  information on our Website may change without notice to you,
                  but we do not warrant that we will keep this content or
                  information updated. We are not liable to you or anyone else
                  if the content or information on our Website is not
                  up-to-date, accurate or complete.
                </li>
                <li>
                  We are not liable to you or anyone else if any part of our
                  Website (or a website we link to) causes interference with or
                  damage to your computer systems (including your mobile
                  devices). You must take such precautions as you feel are
                  sufficient to protect yourself from any malware, viruses or
                  any other way in which our Website (or a website we link to)
                  could damage your computer systems (including your mobile
                  devices).
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Consumer Guarantees</strong>
              <OrderedList>
                <li>
                  In Australia, our services come with guarantees that cannot be
                  excluded under Schedule 2 to the Competition and Consumer Act
                  2010 (Cth) (Australian Consumer Law).
                </li>
                <li>
                  Nothing in these terms and conditions purports to modify or
                  exclude the conditions, warranties and undertakings, and any
                  other legal rights, arising under Australian Consumer Law or
                  any other laws. Any and all other warranties or conditions
                  which are not guaranteed by the Australian Consumer Law or the
                  Competition and Consumer Regulation 2010 (Cth) are expressly
                  excluded where permitted, including liability for loss of
                  expectations, loss of profits, incidental or consequential
                  loss or damage caused by breach of any express or implied
                  warranty or condition.
                </li>
                <li>
                  To the extent that we are in breach of any consumer guarantee,
                  your sole remedy will be for us to provide to you the features
                  or service that was previously provided, or to pay for those
                  features or services to be re-performed for you.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Warranties and Disclaimer</strong>
              <OrderedList>
                <li>
                  Nothing in these Website Terms excludes, restricts or modifies
                  or purports to exclude, restrict the conditions, warranties
                  and undertakings arising under the Australian Consumer Law.
                  Our liability for death or personal injury arising from our
                  negligence or for any condition, warranty, right or liability
                  implied in these Website Terms by law cannot be excluded.
                </li>
                <li>
                  Our Website is provided to you strictly on an “as is” and “as
                  available” basis. You acknowledge that:
                  <LetterList>
                    <li>
                      your use of the Website and Services is at your own risk
                      and is also subject to the terms and conditions of the
                      websites, products and services of our Affiliates that you
                      access via our Website or Services;
                    </li>
                    <li>
                      prior to accepting these Website Terms you have been given
                      a reasonable opportunity to examine and satisfy yourself
                      as to the contents of these Website Terms; and
                    </li>
                    <li>
                      at no time prior to accepting these Website Terms have you
                      relied on our skill or judgement, and you acknowledge that
                      it would be unreasonable for you to do so.
                    </li>
                  </LetterList>
                </li>
                <li>
                  To the maximum extent permitted by law, all other warranties
                  or conditions which are not guaranteed by law are expressly
                  excluded, including liability for loss of expectations, loss
                  of profits, incidental or consequential loss or damage caused
                  by breach of any express or implied warranty or condition. In
                  particular, we do not warrant:
                  <LetterList>
                    <li>
                      that your access to the Website or our Services will be
                      free from interruptions, errors or viruses; or
                    </li>
                    <li>
                      the accuracy, adequacy or completeness of information on
                      the Website (nor do we undertake to keep the Website
                      updated).
                    </li>
                  </LetterList>
                </li>
                <li>
                  To the extent that we are in breach of any consumer guarantee
                  or any other warranty or condition that cannot be excluded
                  from these Website Terms:
                  <LetterList>
                    <li>
                      your sole remedy will be for us to provide the features or
                      services that were previously provided; and
                    </li>
                    <li>
                      our maximum liability to you is limited to the purchase
                      price of the goods or services you purchased in your last
                      transaction using our Services or $100, whichever is
                      lower.
                    </li>
                  </LetterList>
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Limitation of Liability</strong>
              <OrderedList>
                <li>
                  To the maximum extent permitted by law, we do not accept
                  responsibility for any loss or damage (including indirect,
                  special or consequential loss or damage), however caused and
                  whether or not foreseeable (whether in contract, tort, for
                  breach of statutory duty or otherwise), even if we have
                  previously been advised of the possibility of such loss or
                  damage which you may directly or indirectly suffer in
                  connection with:
                  <LetterList>
                    <li>
                      your use of the Website or our Services or any linked
                      website, content, products and services (together, the
                      linked services) (including interference with or damage to
                      your computer or mobile devices arising in connection with
                      any such use);
                    </li>
                    <li>
                      the Website or our Services being interrupted or
                      unavailable;
                    </li>
                    <li>
                      errors or omissions from the Website or our Services;
                    </li>
                    <li>
                      any failure or lack of any security measures by us, or any
                      third party including in relation to the storage or
                      transfer of;
                    </li>
                    <li>
                      viruses, malicious codes or other forms of interference
                      effecting the Website or our Services or any linked
                      services;
                    </li>
                    <li>
                      your use of or reliance on information contained on or
                      accessed through the Website or our Services or any linked
                      services, which information may be incorrect, incomplete,
                      inadequate or outdated;
                    </li>
                    <li>
                      goods or services supplied pursuant to or in any way
                      connected with the Website or our Services;
                    </li>
                    <li>
                      unauthorised access to or use of, our servers and/or any
                      information stored on them; or
                    </li>
                    <li>
                      any failure or omission on our part to comply with our
                      obligations as set out in these Website Terms.
                    </li>
                  </LetterList>
                </li>
                <li>
                  We do not accept responsibility for inaccuracies or errors in
                  any information about, or advertisements in respect of, goods
                  and services, contained in the Website which are supplied by
                  our Affiliates. The placement of such advertisements does not
                  constitute a recommendation or endorsement by us of the
                  relevant goods or services and the third party or owner of the
                  linked services is solely responsible for any representations
                  made in connection with information in respect of it and its
                  goods and services displayed on the Website.
                </li>
                <li>
                  To the maximum extent permitted by law, you agree to indemnify
                  and keep indemnified Voltura Labs, our Affiliates and their
                  Personnel against any action, liability, cost, claim, loss,
                  damage, proceeding or expense suffered or incurred directly or
                  indirectly in connection with your use of the Website or the
                  Services, or from your violation of these Website Terms.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Specific Warnings</strong>
              <OrderedList>
                <li>
                  You must ensure that your access to the Website and our
                  Services is not illegal or prohibited by laws which apply to
                  you in the jurisdiction in which you are located.
                </li>
                <li>
                  You must take your own precautions to ensure that the process
                  which you employ for accessing the Website and our Services
                  does not expose you to the risk of viruses, malicious computer
                  code or other forms of interference emanating from the Website
                  or our Services (or any linked services) which may damage your
                  own computer system.
                </li>
                <li>
                  You agree that you will not rely on any information contained
                  on the Website or the availability of such information and
                  that any decision you make in relation to the Website or our
                  Services will be as a result of your own independent
                  assessment of such information.
                </li>
                <li>
                  Even though we intend on providing accurate information on the
                  Website, we cannot guarantee that the information on the
                  Website is accurate, complete or updated, or free from
                  technical inaccuracies or typos. In an effort to continue
                  providing you with complete and accurate information to the
                  extent possible, the information on the Website may change or
                  be updated from time to time without advance notice.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Copyright</strong>
              <OrderedList>
                <li>
                  All legal rights, title and interest in and to all elements of
                  the Website, our Services and the content of the Website and
                  our Services (including its &ldquo;look and feel&rdquo;, text,
                  graphics (all art, drawings and artistic works), images,
                  logos, icons, photographs, editorial content, films, sound
                  recordings, literary works, software, design , systems,
                  methods, information, computer codes, compilation of content,
                  other codes, data and other material) (Intellectual Property),
                  and all intellectual property rights in and associated with
                  the Intellectual Property (including without limitations all
                  copyright, trademarks, service marks and trading names) is
                  owned by us or licensed to us by third parties and protected
                  under applicable laws.
                </li>
                <li>
                  Other than for the purposes of, and subject to the conditions
                  prescribed under, the Copyright Act 1968 (Cth) and similar
                  legislation which applies in the jurisdiction in which you are
                  located, and except as expressly authorised by these Website
                  Terms or in writing by us, you may not in any form or by any
                  means:
                  <LetterList>
                    <li>
                      copy, adapt, reproduce, store, distribute, print, display,
                      perform, publish or create derivative works from any part
                      of the Website, the Services or the Intellectual Property;
                      or
                    </li>
                    <li>
                      commercialise any information, products or services
                      obtained from any part of the Website, the Services or the
                      Intellectual Property.
                    </li>
                  </LetterList>
                </li>
                <li>
                  All rights not expressly granted under these Website Terms are
                  expressly reserved.
                </li>
                <li>
                  Subject to the terms and conditions in these Website Terms
                  (including clause11), we grant you a limited licence to access
                  the Website and view and use the content (and Materials).
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Restricted Use</strong>
              <OrderedList>
                <li>
                  The Website is provided for your personal, non-commercial use
                  only.
                </li>
                <li>
                  You warrant to us and agree that you are 18 years of age or
                  over and have full legal capacity to access the Website under
                  the laws of Australia or the laws of the jurisdiction in which
                  you reside. If you are between the ages of 13 and 18 years
                  old, you may access the Website with the prior permission of
                  your parent or legal guardian, and you represent and warrant
                  to us that you have such permission and that your parent or
                  legal guardian has reviewed and discussed these Website Terms
                  with you.
                </li>
                <li>
                  You may not modify, copy, distribute, transmit, display,
                  perform, reproduce, publish, licence, commercially exploit,
                  create derivative works from, transfer, or sell any content,
                  software, products or services contained within or derived
                  from the Website or the Services without our prior written
                  approval.
                </li>
                <li>
                  You may not use the Website or the Services, or any of our
                  content, to further any commercial purpose, including any
                  advertising or advertising revenue generation activity on your
                  own website without our express, prior written consent.
                </li>
                <li>
                  Your use of the Website and our Services is subject to
                  international export controls and financial export
                  requirements. By transacting tokens via the Services, you
                  declare and undertake that you are aware of and subject to
                  these requirements. Without limiting the foregoing, you are
                  not entitled to use the Services if:
                  <LetterList>
                    <li>
                      You are a citizen or resident of Cuba, Iran, North Korea,
                      Sudan or Syria or any other country subject to US embargo,
                      UN sanctions, the HM financial sanctions regime, or if you
                      are on the list of specific citizens by the US Ministry of
                      Finances or the list of people denied by the US Ministry
                      of Trade, a non-verified list, the financial sanctions
                      regime of the Ministry of Finances; or
                    </li>
                    <li>
                      you intend on supplying any digital asset purchased or
                      stored to Cuba, Iran, North Korea, Sudan or Syria or any
                      other country subject to US embargo or the HM financial
                      sanctions regime (or to a citizen or resident of any of
                      these countries), or to a person on the list of specific
                      persons, the list of denied persons, the non-verified
                      list, the list of entities of the financial sanctions
                      regime of HM.
                    </li>
                  </LetterList>
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Links in the Services</strong>
              <OrderedList>
                <li>
                  The Website may contain links to linked services. Those links
                  are provided for convenience only and may not remain current
                  or be updated by us.
                </li>
                <li>
                  We are not responsible for the content or privacy policies or
                  practices of persons or companies associated with linked
                  services. We will not be liable to you or any other person for
                  any loss or cost arising in respect of use or access to linked
                  services. When you access any linked services you do so
                  entirely at your own risk.
                </li>
                <li>
                  Linked services should not be construed as an endorsement,
                  approval or recommendation by us of the owners or operators of
                  those linked services, or of any information, graphics,
                  materials, products or services referred to or contained on
                  those Linked Websites, unless and to the extent stipulated to
                  the contrary.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Links to the Website</strong>
              <OrderedList>
                <li>
                  You may find links to access our Website from third-party
                  websites and services. We do not control or are responsible
                  for such links (including the validity and security of such
                  links).
                </li>
                <li>
                  We will not be liable to you or any other person for any loss
                  or cost arising in respect of use or access (actual or
                  purported) to our Website and services from links from
                  third-party websites and services. When you access any such
                  links you do so entirely at your own risk.
                </li>
                <li>
                  Links to our Website from third-party websites and services
                  should not be construed as an endorsement, approval or
                  recommendation by us of the owners or operators of those third
                  party websites and services, or of any information, graphics,
                  materials, products or services referred to or contained on
                  those third party websites and services, unless and to the
                  extent stipulated to the contrary.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Intellectual Property</strong>
              <OrderedList>
                <li>
                  We, or our third-party licensors, own all intellectual
                  property rights in or in connection with the Intellectual
                  Property.
                </li>
                <li>
                  We do not grant you any intellectual property rights in any
                  thing (including the Intellectual Property and other
                  information and content, whether in a material form or not) on
                  or accessible via the Website (Materials).
                </li>
                <li>
                  Your use of our Website, any Services or Materials does not
                  grant you any intellectual property rights in, ownership
                  rights of or other rights in, or in connection with the
                  Intellectual Property, the Website, any Services or Materials.
                </li>
                <li>
                  We reserve all rights to the Materials not expressly granted
                  to you in these Website Terms.
                </li>
                <li>
                  You must not reproduce the Materials or communicate the
                  Materials to the public (including via any form of linking)
                  without our prior written approval. Any permitted use or
                  disclosure (including reproductions and communications to the
                  public) of any Materials by you are on the basis that:
                  <LetterList>
                    <li>
                      such use and disclosure is at your own risk, including the
                      risk of being sued for intellectual property infringement
                      or misleading or deceptive conduct;
                    </li>
                    <li>
                      you ensure that all links to Materials are presented or
                      used in a way that makes it clear that our Website and
                      Services are the source of the Materials;
                    </li>
                    <li>
                      you ensure that anyone who uses or reproduces your links
                      to the Materials does so on the same terms as a person who
                      accesses the Materials directly from the Services;
                    </li>
                    <li>
                      you ensure that anyone who uses or reproduces your links
                      to the Materials is not able to circumvent the limits
                      (including technological restrictions and as to location)
                      applying in respect of the Materials were the Materials to
                      be accessed or sought to be accessed directly from the
                      Services rather than via their links;
                    </li>
                    <li>
                      you do not link the Materials in a way that damages or
                      takes advantage of our reputation, including in a way that
                      suggests or implies that you have any association or
                      affiliation with us or approval or endorsement; and
                    </li>
                    <li>
                      you otherwise comply with our directions, including any
                      take down or cease or desist directions.
                    </li>
                  </LetterList>
                </li>
                <li>
                  Subject to the terms and conditions of these Website Terms,
                  you must not, or permit any third party to, do or attempt to
                  do, any of the following without our express prior written
                  consent in each case (consent could be withheld at absolute
                  our discretion):
                  <LetterList>
                    <li>
                      apply for, register, or otherwise use any intellectual
                      property rights in the Intellectual Property or Materials,
                      or substantially similar to the Intellectual Property or
                      Materials, anywhere in the world;
                    </li>
                    <li>
                      sell, distribute for commercial gain or otherwise
                      commercialise merchandise that includes, contains or
                      consists of the Intellectual Property or Materials.
                    </li>
                  </LetterList>
                </li>
                <li>
                  To the extent that you use our Website (and any Materials)
                  which contain third party intellectual property, you
                  acknowledge and agree that:
                  <LetterList>
                    <li>
                      You will not have the right to use that third-party
                      intellectual property except as provided for in the
                      Website and subject to these Website Terms;
                    </li>
                    <li>
                      You might be subject to additional restrictions regarding
                      the use of that third-party intellectual property
                      depending on the licences from the third-party to us;
                    </li>
                    <li>
                      You will be responsible for complying with any
                      restrictions regarding the use of that third-party
                      intellectual property.
                    </li>
                  </LetterList>
                </li>
                <li>
                  Your licence under these Website Terms to use the content of
                  the Website and Intellectual Property (and Materials) applies
                  when using any services available on our Website and is
                  subject to any further limitations set out in any terms of
                  use, or terms and conditions for additional products and/or
                  services.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Proper Use</strong>
              <OrderedList>
                <li>
                  You must only use the Website and our Services for lawful
                  purposes. You are prohibited from doing any act that we,
                  acting reasonably, consider to be inappropriate, or which is
                  unlawful or prohibited by any laws applicable to the Website
                  and our Services, including but not limited to any act which
                  would constitute a breach of privacy, using the Services to
                  defame or libel us, our employees or any other person.
                </li>
                <li>
                  You must not:
                  <LetterList>
                    <li>
                      reverse engineer the code contained in the Website or
                      upload files which contain viruses or malware which may
                      cause damage to our property or the property of other
                      individuals or post or transmit to our Website any
                      material which we have not authorised including material
                      which is, in our sole opinion, likely to cause annoyance,
                      or which is racist, defamatory, obscene, threatening,
                      pornographic or otherwise or which is detrimental to or in
                      violation of our security protocols;
                    </li>
                    <li>
                      damage, disrupt, interfere with or misuse the Website,
                      including by data mining, hacking, data harvesting or
                      scraping or using similar data gathering and extraction
                      tools in respect of the Website;
                    </li>
                    <li>
                      launch any automated program or script, including web
                      crawlers, web robots, web indexers, bots, viruses or worms
                      or any program which makes multiple server requests per
                      second or impairs the operation and/or performance of the
                      Website;
                    </li>
                    <li>
                      use any device, software or routine intended to damage or
                      interfere with the proper working of the Website or to
                      intercept or sequester any system, data, images or other
                      multimedia elements from the Website; or
                    </li>
                    <li>
                      use the Website in any way that would breach any other
                      provision of these Website Terms including the provisions
                      of clauses 8 to 13
                    </li>
                  </LetterList>
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Visitor Material</strong>
              <OrderedList>
                <li>
                  Other than information about an identifiable individual, which
                  is covered under our Privacy Policy, any material you post,
                  transmit or upload to the Website (including without
                  limitation, reviews, comments, bug reports, ideas or other
                  feedback) (Visitor Material) will be considered
                  non-confidential and non-proprietary.
                </li>
                <li>
                  You consent to any act or omission which would otherwise
                  constitute an infringement of your moral rights you may have
                  in respect of Visitor Material. This consent survives any
                  termination of these Website Terms.
                </li>
                <li>
                  You agree that we will have no obligations with respect to any
                  Visitor Material, and that we and anyone we designate will be
                  free to copy, disclose, distribute, incorporate and otherwise
                  use any Visitor Material and all data images, sounds, text and
                  other things embodied in the Visitor Material for any and all
                  commercial and non-commercial purposes.
                </li>
                <li>
                  By posting, uploading or transmitting any Visitor Material,
                  you represent and warrant that any Visitor Material does not
                  and will not:
                  <LetterList>
                    <li>breach any applicable law;</li>
                    <li>contain any viruses or any other harmful program;</li>
                    <li>
                      contain any defamatory, obscene or offensive material;
                    </li>
                    <li>promote violence or discrimination;</li>
                    <li>
                      infringe the intellectual property rights of another
                      person;
                    </li>
                    <li>
                      breach any legal duty owed to a third party (such as a
                      duty of confidence);
                    </li>
                    <li>
                      promote illegal activity or breach the privacy of any
                      other person;
                    </li>
                    <li>
                      be threatening, abusive or invade another person’s privacy
                      or be likely to harass, upset, embarrass or annoy any
                      other person;
                    </li>
                    <li>
                      give the impression that the Visitor Material originates
                      from us;
                    </li>
                    <li>
                      be used to impersonate another person or to misrepresent
                      your affiliation with another person; or
                    </li>
                    <li>
                      contain any unsanctioned advertising, promotional
                      materials, or other forms of unsanctioned solicitation,
                      including without limitation, junk mail, spam, chain
                      letters or any unsolicited mass distribution of email.
                    </li>
                  </LetterList>
                </li>
                <li>
                  The prohibited acts set out in clause 13.4 are not exhaustive.
                  We reserve the right (but do not undertake, unless required by
                  law, any obligation) to edit or remove any Visitor Material
                  without notice to you, in our sole discretion.
                </li>
                <li>
                  You grant us an irrevocable, perpetual, exclusive,
                  transferable, royalty free worldwide licence to use, copy,
                  modify and distribute any Visitor Material in any manner we
                  think fit (including without limitation, by reproducing,
                  altering or communicating the Visitor Material to the public).
                  You also grant us the right to sublicense these rights.
                </li>
                <li>
                  All Visitor Material contained on the Website is for
                  information purposes only and does not constitute advice from
                  us. Visitor Materials reflect the opinions of users who have
                  used the Website and any statements, advice or opinions
                  provided by such persons are theirs alone. To the maximum
                  extent permitted by law, including any restrictions contained
                  in the Australian Consumer Law, we assume no responsibility or
                  liability to any person for any Visitor Materials, including
                  without limitation, any errors, defamatory statements,
                  obscenity, omissions or misrepresentations in any such Visitor
                  Materials.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Promotions</strong>
              <p>
                From time to time we may make certain offers, or carry out
                promotions or contests. Additional terms may apply to those
                offers, promotions or contests and you must agree to those
                additional terms. In the event of any inconsistency between
                these Website Terms and the terms of any offer, promotion or
                contest, the terms of the offer, promotion or campaign prevail
                over these Website Terms to the extent of any inconsistency.
              </p>
            </li>
            <li>
              <strong>Privacy Policy</strong>
              <OrderedList>
                <li>
                  We undertake to comply with the terms of our Privacy Policy
                  which is available on our Website.
                </li>
                <li>
                  Your continued usage of our Website and/or Services will be
                  taken to indicate your acceptance of the terms of our Privacy
                  Policy insofar as it relates to our Website.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Security of Information</strong>
              <OrderedList>
                <li>
                  No data transmission over the internet can be guaranteed as
                  totally secure. Whilst we strive to protect such information,
                  we do not warrant and cannot ensure the security of any
                  information which you transmit to us.
                </li>
                <li>
                  Any information which you transmit to us is transmitted at
                  your own risk. Once we receive your transmission, we will take
                  reasonable steps to preserve the security of such information.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Service Access</strong>
              <p>
                While we endeavour to ensure the Website is available 24 hours a
                day, we are not under any obligation to do so, and will not be
                liable to you if the Website is unavailable at any time or for
                any period. Your access to the Website or our Services may also
                be restricted at our discretion.
              </p>
            </li>
            <li>
              <strong>Termination of Access</strong>
              <OrderedList>
                <li>
                  Your access to the Website or the Services may be terminated
                  at any time by us without notice to you. Following termination
                  we will have no further obligations or liabilities to you. Any
                  exclusions of liability or other provisions contained in these
                  Website Terms which by their nature survive termination of
                  these Website Terms will survive any such termination.
                </li>
                <li>
                  If your access to the Website or the Services is terminated by
                  us following your breach of these Website Terms or your
                  unlawful conduct (or suspected breach of these Website Terms
                  or suspected unlawful conduct), termination will be in
                  addition to any other rights we may have against you at law or
                  in equity.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Severability</strong>
              <p>
                If any provision of these Website Terms is held to be illegal,
                invalid or unenforceable, in whole or in part, under any law,
                such provision or part thereof will to that extent be severed
                and deemed not to form part of these Website Terms but the
                legality, validity and enforceability of all other provisions of
                these Website Terms will not be affected.
              </p>
            </li>
            <li>
              <strong>Governing Law</strong>
              <p>
                These Website Terms are governed by the laws in force in the
                State of New South Wales and you agree to submit to the
                exclusive jurisdiction of the courts of that State in respect of
                any dispute arising from these Website Terms.
              </p>
            </li>
            <li>
              <strong>Definitions</strong>
              <OrderedList>
                <li>
                  In these Website Terms:
                  <LetterList>
                    <li>
                      Affiliate means a third party with whom we have entered
                      into an agreement to assist our provision of the Website
                      or our Services, and to or from which you hereby instruct
                      us to obtain or send data, including payment instructions;
                    </li>
                    <li>
                      Personnel means any employee, contractor, subcontractor,
                      agent, partner, shareholder, ultimate beneficial owner,
                      director or officer of a party;
                    </li>
                    <li>
                      Voltura Labs, we, us and our and similar terms are a
                      reference to Voltura Labs Pty Limited (ACN 655 142 644)
                      and our related entities;
                    </li>
                    <li>
                      Website means https://psychedelicsanonymous.com and/or any
                      other website as we may operate from time to time.
                    </li>
                  </LetterList>
                </li>
              </OrderedList>
            </li>
          </OrderedList>
        </Message>
      </Content>
    </MaxContainer>
    <BottomHero />
  </Container>
)

export default TermsPage

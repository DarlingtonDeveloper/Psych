import React from "react"
import MetaHead from "../components/common/MetaHead"
import stitches from "../stitches"
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

const TableDiv = stitches.styled("div", {
  display: "table",
  "> div": {
    display: "table-row",
    "> div": {
      display: "table-cell",
      paddingLeft: "1rem",
    },
  },
})

const PrivacyPolicyPage = () => (
  <Container>
    <MetaHead
      title="Psychedelics Anonymous | Privacy Policy"
      description="We are the night."
      link="/privacypolicy"
    />
    <MaxContainer>
      <Content>
        <Message>
          <h1>Voltura Labs Pty Limited Privacy Policy</h1>
          <p>This privacy policy was last modified on 4th December 2021.</p>
        </Message>
        <Message>
          <OrderedList>
            <li>
              <strong>About our Privacy Policy</strong>
              <OrderedList>
                <li>
                  The privacy of your Personal Information is important to
                  Voltura Labs Pty Limited (ACN 655 142 644). We respect your
                  rights to privacy and rights under the Privacy Act and are
                  committed to complying with the requirements of Privacy Laws
                  in the collection and handling of your Personal Information.
                </li>
                <li>
                  This policy explains how we collect, retain, process, share,
                  transfer and handle your Personal Information and describes
                  the kinds of Personal Information we collect, use, disclose
                  and our purposes for doing so.
                </li>
                <li>
                  We use some defined terms in this policy. You can find the
                  meaning of each defined term at the end of this policy.
                </li>
                <li>
                  Personal Information is information which may be used to
                  reasonably identify you. For example, your name, address, date
                  of birth, gender, email address, telephone number is generally
                  considered to be Personal Information. Personal Information
                  may also include information we collect about your individual
                  preferences. We do not collect sensitive information from you.
                </li>
                <li>
                  This policy applies to your Personal Information when you use
                  our Website, and interact generally with us but does not apply
                  to Third Party Sites. We are not responsible for the privacy
                  policies or content of Third Party Sites.
                </li>
                <li>
                  For the avoidance of doubt, unless stated otherwise, this
                  policy will govern our collection of your Personal Information
                  irrespective of the forum.
                </li>
                <li>
                  This policy may be updated from time to time and the most up
                  to date version will be published on our Website. We encourage
                  you to check our Website periodically to ensure that you are
                  aware of our current policy.
                </li>
                <li>
                  Your continued usage of our Website and/or services will be
                  taken to indicate your acceptance of the terms of this privacy
                  policy insofar as it relates to our Website.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Why we collect Personal Information</strong>
              <OrderedList>
                <li>
                  When you visit our Website, we collect Personal Information so
                  that we can provide you with products and services and improve
                  and customise your experience with us. We only collect
                  Personal Information if it is reasonably necessary for us to
                  carry out our functions and activities.
                </li>
                <li>
                  The purposes for which we collect and hold your Personal
                  Information include:
                  <LetterList>
                    <li>to deliver our products and services to you;</li>
                    <li>to improve our products and services to you;</li>
                    <li>
                      to manage our relationship with you, evaluate our business
                      performance and build our customer database;
                    </li>
                    <li>
                      to provide you with information about our products,
                      services and activities;
                    </li>
                    <li>
                      to enable you to participate in any promotion,
                      competition, survey;
                    </li>
                    <li>
                      to enable you to subscribe to mailing lists and interact
                      or follow us on social media;
                    </li>
                    <li>to respond to your requests and seek your feedback;</li>
                    <li>
                      to provide and improve technical support and customer
                      service;
                    </li>
                    <li>
                      to conduct research, compare information for accuracy and
                      verification purposes, compile or analyse statistics
                      relevant to the operations of our business;
                    </li>
                    <li>
                      to facilitate our internal business operations, including
                      fulfilment of any legal and regulatory requirements and
                      monitoring, analysing and improving the performance and
                      functionality of our Website and investigating breaches of
                      or enforcement of any legal terms applicable to our
                      Website;
                    </li>
                    <li>
                      to protect our property, the Website or our legal rights
                      including to create backups of our business records;
                    </li>
                    <li>
                      to manage risk and protect our Website from fraud by
                      verifying your identity and helping to detect and prevent
                      fraudulent use of our Website;
                    </li>
                    <li>
                      for the direct marketing and promotional purposes as set
                      out below; and
                    </li>
                    <li>
                      to manage our business, including analysing data collected
                      from our Website concerning visits and activities of users
                      on our Website including the Analytics Services. This
                      analysis helps us run our Website more efficiently and
                      improve and personalise your experience online.
                    </li>
                  </LetterList>
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>What Personal Information do we collect?</strong>
              <OrderedList>
                <li>
                  The kinds of Personal Information we collect will depend on
                  the type of interaction you have with us. Generally, the kinds
                  of Personal Information we collect may include:
                  <LetterList>
                    <li>
                      your name, address (postal and residential), email
                      address, telephone number(s), date of birth and gender
                      when you register with us;
                    </li>
                    <li>
                      information from third party sources such as data
                      providers and credit organisations, where permitted by
                      law, including public blockchain data such as your
                      nominated public key for a digital asset wallet (including
                      any Ethereum wallet address);
                    </li>
                    <li>
                      details of the device you have used to access any part of
                      our Website, including carrier/operating system,
                      connection type, IP address, browser type and referring
                      URLs and other information may be collected and used by us
                      automatically if you use our Website, through the browser
                      on your device or otherwise;
                    </li>
                    <li>demographic information;</li>
                    <li>location data;</li>
                    <li>
                      your connections with others whose personal information we
                      may collect or hold; and
                    </li>
                    <li>
                      transaction details relating to your use of our products,
                      services or rewards including data regarding your feature
                      usage patterns, interactions on our website and
                      interactions with us.
                    </li>
                  </LetterList>
                </li>
                <li>
                  Telephone calls to us may also be recorded for training and
                  quality assurance purposes.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>With whom do we share Personal Information?</strong>
              <OrderedList>
                <li>
                  We may disclose Personal Information collected from you:
                  <LetterList>
                    <li>
                      to our related entities, employees, officers, agents,
                      contractors, other companies that provide services to us,
                      sponsors, government agencies or other third parties to
                      satisfy the purposes for which the information was
                      collected (as outlined in clause 2.2 of this policy) or
                      for another purpose if that other purpose is closely
                      related to the primary purpose of collection and an
                      individual would reasonably expect us to disclose the
                      information for that secondary purpose;
                    </li>
                    <li>
                      to third parties who help us to verify the identity of our
                      clients and customers, and other software service
                      providers who assist us to provide the services we provide
                      to you;
                    </li>
                    <li>
                      to third parties who help us analyse the information we
                      collect so that we can administer, support, improve or
                      develop our business and the services we provide to you
                      including cloud hosting services, off-site back ups and
                      customer support;
                    </li>
                    <li>
                      to third parties, including those in the blockchain and
                      fintech industry, marketing and advertising sectors, to
                      use your information in order to let you know about goods
                      and services which may be of interest to you in accordance
                      with the SPAM Act 2003 (Cth) and the Privacy Act;
                    </li>
                    <li>
                      if the disclosure is requested by law enforcement or
                      government agency, or is required by a law, or legal
                      process, such as a subpoena, court or other legal process
                      with which we are required to comply, including in
                      relation to our obligations under the Anti-Money
                      Laundering and Counter Terrorism Financing Act 2006 (Cth);
                    </li>
                    <li>
                      if disclosure is required to enforce the terms of this
                      policy or to enforce any of our terms and conditions with
                      you;
                    </li>
                    <li>
                      to our professional advisers such as consultants and
                      auditors so that we can meet our regulatory obligations,
                      and administer, support, improve or develop our business;
                    </li>
                    <li>
                      to any other person, with your consent (express or
                      implied);
                    </li>
                    <li>
                      to protect the interests of our users, clients, customers
                      and third parties from cyber security risks or incidents
                      and other risks or incidents; and
                    </li>
                    <li>
                      to maintain the integrity of our Website and protect our
                      rights, interests and property and those of third parties.
                    </li>
                  </LetterList>
                </li>
                <li>
                  In addition to the above recipients, we will disclose your
                  Personal Information if we are required to do so under law or
                  if the disclosure is made in connection with either the normal
                  operation of our business in a way that you might reasonably
                  expect, for example, if such disclosure is incidental to IT
                  services being provided to our business or for the resolution
                  of any dispute that arises between you and us. This disclosure
                  may involve your Personal Information being transmitted
                  Overseas.
                </li>
                <li>
                  In the event of a proposed restructure or sale of our business
                  (or part of our business) or where a company proposes to
                  acquire or merge with us, we may disclose Personal Information
                  to the buyer and their advisers without your consent subject
                  to compliance with Privacy Laws. If we sell the business and
                  the sale is structured as a share sale, you acknowledge that
                  this transaction will not constitute the ‘transfer’ of
                  Personal Information.
                </li>
                <li>
                  We may disclose de-identified, aggregated data with third
                  parties for marketing, advertising, and analytics purposes. We
                  do not sell or trade your personal information to third
                  parties.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>
                How we collect and store data and transmit Personal Information
              </strong>
              <OrderedList>
                <li>
                  We usually collect and store information including in
                  electronic form provided by you when you communicate with us
                  by email, web-based form, letter or other means, including
                  when:
                  <LetterList>
                    <li>
                      we provide you with our services via email or our Website;
                    </li>
                    <li>
                      we provide you with assistance or support for our products
                      or services;
                    </li>
                    <li>
                      you participate in our functions, events or activities or
                      on our social media pages;
                    </li>
                    <li>
                      you request that we provide you with information
                      concerning our products or services;
                    </li>
                    <li>
                      you upload or submit information to us or our Website; or
                    </li>
                    <li>
                      you complete any forms requesting information from you,
                      including on registration with us, complete any survey or
                      provide feedback to us concerning our products or
                      services.
                    </li>
                  </LetterList>
                </li>
                <li>
                  Where practicable we will only collect information from you
                  personally. However, we will also collect your Personal
                  Information through our partners and third parties who supply
                  services to us.
                </li>
                <li>
                  Please note that we use our own and third party computer
                  servers including our Website hosts, data backups and payment
                  gateway(s), which may be located Overseas and your Personal
                  Information will likely be stored and transmitted Overseas as
                  part of the normal operation of our business.
                </li>
                <li>
                  We also collect information from your computer or mobile
                  device automatically when you browse our Website. This
                  information may include:
                  <LetterList>
                    <li>the date and time of your visit;</li>
                    <li>your domain;</li>
                    <li>locality;</li>
                    <li>operating system;</li>
                    <li>
                      the server your computer or mobile is using to access our
                      Website;
                    </li>
                    <li>your browser and version number;</li>
                    <li>
                      search terms you have entered to find our Website or
                      access our Website;
                    </li>
                    <li>
                      pages and links you have accessed both on our Website and
                      on other websites;
                    </li>
                    <li>the last website you visited;</li>
                    <li>the pages of our Website that you access; </li>
                    <li>the device you use to access our Website; and </li>
                    <li>your IP Address.</li>
                  </LetterList>
                </li>
                <li>
                  While we do not use some of this information to identify
                  personally, we may record certain information about your use
                  of our Website such as which pages you visit and the time and
                  date of your visit and that information could potentially be
                  used to identify you.
                </li>
                <li>
                  It may be possible for us to identify you from information
                  collected automatically from your visit(s) to our Website. If
                  you have registered an account with us, we will able to
                  identify you through your user name and password when you log
                  into our Website. Further, if you access our Website via links
                  in an email we have sent you, we will be able to identify you.
                </li>
                <li>
                  The device you use to access our Website may collect
                  information about you including your location using longitude
                  and latitude co-ordinates obtained through GPS, Wi-Fi or cell
                  site tri-angulation. For information about your ability to
                  restrict the collection and use of such information, please
                  use the settings available on your device.
                </li>
                <li>
                  We may use statistical analytics software tools and software
                  known as cookies which transmit data to third party servers
                  located Overseas. To our knowledge, our analytic providers do
                  not identify individual users or associate your IP Address
                  with any other data held by them.
                </li>
                <li>
                  We will retain your Personal Information for any time period
                  we consider necessary to provide our products and services to
                  you and to comply with our legal obligations. The period may
                  vary depending on the type of Personal Information we hold. If
                  we no longer need your personal information for these purposes
                  we will take steps to destroy the information or ensure it is
                  de-identified.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>How we protect your Personal Information</strong>
              <OrderedList>
                <li>
                  We will endeavour to take all reasonable steps to keep secure
                  and protect any Personal Information which we hold about you,
                  including:
                  <LetterList>
                    <li>
                      securing our physical premises and digital storage media;
                    </li>
                    <li>
                      using computer safeguards such as Secure Socket Layer
                      (SSL) technology to ensure that your information is
                      encrypted and sent across the Internet securely;
                    </li>
                    <li>
                      placing password protection and access control over our
                      information technology systems and databases to limit
                      access and protect electronic information from
                      unauthorised interference, access, modification and
                      disclosure; and
                    </li>
                    <li>taking regular back-ups of our electronic systems.</li>
                  </LetterList>
                </li>
                <li>
                  Notwithstanding that we will take all reasonable steps to keep
                  your Personal Information secure, data transmission over the
                  internet is never guaranteed to be completely secure. We do
                  not and cannot warrant the security of any information you
                  transmit to us or from any online services.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Use of Cookies</strong>
              <OrderedList>
                <li>
                  When you visit our Website or the website of any of our
                  partners, we and our partners may use cookies and other
                  tracking technology (Cookies) to recognise you and customise
                  your online experience. Cookies are small files that store
                  information on your computer, mobile phone or other device.
                  They enable us to recognise you across different websites,
                  services, devices and/or browsing sessions. Cookies also
                  assist us to customise online content and advertising, save
                  your preferences for future visits to the Website, measure the
                  effectiveness of our promotions, prevent potential fraud and
                  analyse your and other users’ interactions with the Website.
                </li>
                <li>
                  If you do not wish to grant us the right to use cookies to
                  gather information about you while you are using our Website,
                  then you may set your browser settings to delete, disable or
                  block certain Cookies. The following browsers have publically
                  available information about how to adjust cookie preferences:
                  Microsoft Internet Explorer, Mozilla Firefox, Google Chrome
                  and Apple Safari.
                </li>
                <li>
                  You may be requested to consent to use of Cookies when you
                  access certain parts of our Website, for example, when you are
                  asked if you want the Website to “remember” certain things
                  about you.
                </li>
                <li>
                  Certain aspects and features of the Website are only available
                  through use of Cookies. If you disable Cookies, your use of
                  the Website may be limited or not possible or parts of our
                  Website may not function properly when you use them.
                </li>
                <li>
                  Upon your first visit to our Website (or the first visit after
                  you delete your Cookies), you may be prompted by a banner to
                  accept our use of Cookies and other tracking technology
                  (Cookies policy). Unless you have adjusted your browser
                  setting so that it will refuse cookies and or declined to
                  accept our Cookies policy, our system will issue Cookies when
                  you access our Website.
                </li>
                <li>
                  Our Website may contain web beacons (also called single-pixel
                  gifs) or similar technologies (Web Beacons) which are
                  electronic images that we use:
                  <LetterList>
                    <li>to help deliver Cookies;</li>
                    <li>to count users who have visited our Website; and</li>
                    <li>
                      in our promotional materials, to determine whether and
                      when you open and act on them.
                    </li>
                  </LetterList>
                </li>
                <li>
                  We may also work with third-parties:
                  <LetterList>
                    <li>
                      to place Web Beacons on their websites or in their
                      promotional materials as part of our business development
                      and data analysis; and
                    </li>
                    <li>
                      to allow Web Beacons to be placed on our Website from
                      Analytics Services to help us compile aggregated
                      statistics about the effectiveness of our promotional
                      campaigns or other operations.
                    </li>
                  </LetterList>
                </li>
                <li>
                  The Web Beacons of Analytics Services may enable such
                  providers to place Cookies or other identifiers on your
                  device, through which they may collect information about your
                  online activities across applications, websites or other
                  products.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>
                How we use Personal Information for communicating with you and
                direct marketing
              </strong>
              <OrderedList>
                <li>
                  We may communicate with you by email, SMS or push
                  notification, to inform you about existing and new products
                  and services that may be of interest to you including
                  administering contests, promotions, surveys or other site
                  features.
                </li>
                <li>
                  We will ensure that any email we send as direct marketing
                  complies with the SPAM Act 2003 (Cth) and contain an
                  ‘unsubscribe’ option so that you can remove yourself from any
                  further marketing communications. To opt-out of communications
                  via SMS, reply with “STOP”. You may decline marketing messages
                  sent by push notifications by refusing the relevant permission
                  in your phone or tablet settings, however this setting will
                  prevent you from receiving other messages from us via push
                  notification. You may also opt-out of receiving marketing
                  materials from us using the contact details set out below or
                  adjusting your user dashboard on our Website.
                </li>
                <li>
                  You can also write to us to request that your details be
                  removed from our direct marketing list. We will endeavour to
                  remove your details from our direct marketing list within a
                  reasonable time (ordinarily 5 working days).
                </li>
                <li>
                  Our direct marketing list may be operated by software and
                  servers located Overseas and your Personal Information may be
                  sent Overseas as part of our marketing.
                </li>
                <li>
                  We will also send communications that are required or
                  necessary to send to users of our Website that contain
                  information about important changes or developments to or the
                  operation of the Website or as well as other communications
                  you request from us. You may not opt out of receiving these
                  communications but you may be able to adjust the media and
                  format through which you receive these notices.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Not identifying yourself</strong>
              <OrderedList>
                <li>
                  It may be impracticable to deal with you on an anonymous basis
                  or using a pseudonym.
                </li>
                <li>
                  We may be able to provide you with limited information in the
                  absence of your identifying yourself but generally we will be
                  unable to provide you with any information, goods and/or
                  services unless you have identified yourself.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>
                How to access or correct your Personal Information or make an
                enquiry or complaint
              </strong>
              <OrderedList>
                <li>
                  If you have any queries in relation to this policy, wish to
                  access or correct the Personal Information we hold about you,
                  or make a complaint, please contact us in writing at:
                  <TableDiv>
                    <div>
                      <div>Email:</div>
                      <div>hello@volturalabs.com; or</div>
                    </div>
                    <div>
                      <div>Mail:</div>
                      <div>
                        <div>Privacy Officer</div>
                        <div>Voltura Labs Pty Ltd</div>
                        <div>65 Hill Street, Roseville.</div>
                      </div>
                    </div>
                  </TableDiv>
                </li>
                <li>
                  We aim to acknowledge receipt of all privacy complaints from
                  you within 5 working days and resolve all complaints within 30
                  business days. Where we cannot resolve a complaint within that
                  period, we will notify you of the reason for the delay as well
                  as advising the time by which we expect to resolve the
                  complaint.
                </li>
                <li>
                  In order to disclose information to you in response to a
                  request for access we may require you to provide us with
                  certain information to verify your identity. There are
                  exceptions under Privacy Laws which may affect your right to
                  access your Personal Information – these exceptions include
                  where (amongst other things):
                  <LetterList>
                    <li>
                      access would pose a serious threat to the life, health or
                      safety of any individual;
                    </li>
                    <li>
                      access would have an unreasonable impact on the privacy of
                      others;
                    </li>
                    <li>the request for access is frivolous or vexatious; </li>
                    <li>
                      the information relates to existing or anticipated legal
                      proceedings between you and us and the information would
                      not otherwise be accessible by the process of discovery;
                    </li>
                    <li>
                      giving access would reveal our intentions in relation to
                      negotiations with you;
                    </li>
                    <li>giving access would be unlawful; </li>
                    <li>
                      denying access is required or authorised by or under an
                      Australia law or a court/tribunal;
                    </li>
                    <li>
                      the information relates to commercial sensitive decision
                      making process; or
                    </li>
                    <li>
                      giving access would prejudice enforcement related action.
                    </li>
                  </LetterList>
                </li>
                <li>
                  We may (depending on the request) charge you a fee to access
                  the Personal Information. We will inform you of any fees
                  payable in respect of accessing your Personal Information
                  prior to actioning your request. All requests for Personal
                  Information will be handled in a reasonable period of time
                  (within 30 calendar days after the request is made).
                </li>
                <li>
                  If you wish to have your Personal Information deleted, please
                  contact us using the details above and we will take reasonable
                  steps to delete the information (unless we are obliged to keep
                  it for legal or auditing purposes). To the extent that any
                  Personal Information is stored on a blockchain it may be
                  impracticable, unfeasible or impossible to delete.
                </li>
                <li>
                  In the event that you believe that there has been a breach of
                  Privacy Laws, we invite you to contact us as soon as possible.
                </li>
                <li>
                  If you are not satisfied with our handling of a complaint or
                  the outcome of a complaint you may make an application to:
                  <LetterList>
                    <li>
                      the Office of the Australian Information Commissioner by
                      visiting www.oaic.gov.au, emailing enquiries@oaic.gov.au;
                      or writing to GPO Box 5218 Sydney NSW 2001; or
                    </li>
                    <li>
                      the Privacy Commissioner in your State or Territory.
                    </li>
                  </LetterList>
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Notifiable Data Breach</strong>
              <OrderedList>
                <li>
                  We are bound by the Privacy Act and are committed to complying
                  with the Notifiable Data Breaches Scheme (NDB) established by
                  the Privacy Amendment (Notifiable Data Breaches) Act 2017.
                </li>
                <li>
                  The NDB requires that where a data breach is likely to result
                  in serious harm to any individuals to whom the information
                  relates, we are required to notify those individuals and the
                  Office of the Australian Information Commissioner.
                </li>
                <li>
                  The NDB provides greater protection to the Personal
                  Information of consumers, greater transparency in the way
                  organisations like us respond to data breaches and give you
                  the opportunity to minimise the damage caused by any
                  unauthorised use of your Personal Information.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Changes to this Privacy Policy</strong>
              <OrderedList>
                <li>
                  We may amend this privacy policy from time to time at our sole
                  discretion, particularly where we need to take into account
                  and cater for any:
                  <LetterList>
                    <li>business developments; or </li>
                    <li>legal or regulatory developments. </li>
                  </LetterList>
                </li>
                <li>
                  If we make changes, we will notify you by revising the date at
                  the top of the Privacy Policy and, in some cases, may provide
                  you with additional notice (such as adding a statement to the
                  Website homepage or sending you a notification). We recommend
                  you review the Privacy Policy whenever you access the Services
                  or otherwise interacts with us to stay informed about our
                  information practices and the ways you can help us to protect
                  your privacy.
                </li>
              </OrderedList>
            </li>
            <li>
              <strong>Definitions used in this policy</strong>
              <OrderedList>
                <li>
                  Analytics Services means any third party website analytics
                  provider and includes Google Analytics and Netlify.
                </li>
                <li>
                  Australian Privacy Principles or APPs means the principles set
                  out in Schedule 1 to the Privacy Act.
                </li>
                <li>
                  IP Address means a number automatically assigned to your
                  computer which is required when you are using the internet and
                  which may be able to be used to identify you.
                </li>
                <li>
                  Overseas means any place or country other than Australia and
                  includes the following countries: United States of America,
                  England, Scotland, Wales, Northern Ireland, France, India,
                  Israel, New Zealand, Brazil, China, Russian, Pakistan,
                  Nigeria, Hong Kong, Singapore.
                </li>
                <li>
                  Personal Information has the meaning set out in the Privacy
                  Act.
                </li>
                <li>
                  Privacy Act means the Privacy Act 1988 (Cth) as amended from
                  time to time.
                </li>
                <li>
                  Privacy Laws means such laws as may place requirements on the
                  handling of Personal Information under the Privacy Act and the
                  Australian Privacy Principles.
                </li>
                <li>
                  Third Party Sites means online websites or services that we do
                  not own or control, including websites of our partners
                </li>
                <li>
                  Website means https://psychedelicsanonymous.com and/or any
                  other website as we may operate from time to time.
                </li>
                <li>
                  we, our, us and similar terms means Voltura Labs Pty Ltd ACN
                  655 142 644 and our related entities.
                </li>
                <li>
                  you, your and similar terms means, as the context requires (1)
                  you, when you use our Website; and/or (2) you, during your
                  dealings with us as a customer; and/or (3) any agent providing
                  your Personal information to us; and/or (4) any agent dealing
                  with us on your behalf.
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

export default PrivacyPolicyPage

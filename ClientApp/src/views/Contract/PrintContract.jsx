import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Modal, Card, Row, Col } from "react-bootstrap";

import Logo from "../../assets/images/Shebelle.jpg";
import "./contract.css";

const PrintContract = ({ show, setShow, contract }) => {
  const inputEl = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => inputEl.current,
  });
  const formatNumber = (inputNumber) => {
    let formetedNumber = Number(inputNumber)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    let splitArray = formetedNumber.split(".");
    if (splitArray.length > 1) {
      formetedNumber = splitArray[0];
    }
    return formetedNumber;
  };
  const monthDiff = (d1, d2) => {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  };

  const startDate = new Date(contract.startDate);
  const endDate = new Date(contract.endDate);

  startDate.setDate(startDate.getDate() + 1);
  endDate.setDate(endDate.getDate() + 1);

  return (
    <Modal show={show} size="xl">
      <Card>
        <Card.Body className="mt-5 mx-2 print-container" ref={inputEl}>
          <Row
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            className="mb-5"
          >
            <Col lg={9.5} xl={9.5}>
              <img src={Logo} alt="logo" width={250} height={125} />
            </Col>
            <Col lg={2.5} xl={2.5}>
              <Row>
                <Col>
                  <p className="address">+251 913884376</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="address">building@shabelebank.et</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="address">Jijiga, Kabele 03, degmada 01</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3 className="header">Heshiis kiro</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="parag">
                Anagoo ah labada dhinac ee heshiis bixiyaha{" "}
                <span style={{ fontWeight: "bolder" }}>Shabelle Building</span>{" "}
                iyo heshiis qataha{" "}
                <span style={{ fontWeight: "bolder" }}>
                  {contract?.tenant?.name}
                </span>{" "}
                waxaan heshiiskan galay anagoo xorr madax banana ah
                garashadanaduna ay dhantahay oo uu wakiil kayahay Maareeye{" "}
                <span style={{ fontWeight: "bolder" }}>
                  Khadar Axmed Cabdi{" "}
                </span>
                .
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="title">1-Ujeedada Heshiiska</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="parag">
                Ujeedada heshiisku waa kala kiraysi rug ganacsi ama xafiis
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="title">2-Goobta Kirada</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="parag">
                Waxay kutaala Magaaladada jijiga degmada Kaaramardha xaafada
                06aad waxayna kamid tahay dhismaha weyn ee{" "}
                <span style={{ fontWeight: "bolder" }}> Shabelle Bank</span>.
              </p>
              <p className="parag">Faah faahinteeduna waa sidan:</p>
              <p className="parag">
                <span className="emp"> Dabaqa:</span> {contract?.room?.floorNo}
              </p>
              <p className="parag">
                <span className="emp">Numberka guriga:</span>{" "}
                {contract?.room?.roomNumber}
              </p>
              <p className="parag">
                {" "}
                <span className="emp">Baaxada(msquare/Karre): </span>
                {contract?.room?.roomSizeInSq} Karre
              </p>
              <p className="parag">
                <span className="emp"> Qiimaha halkii karre:</span>{" "}
                {formatNumber(contract?.amountPerSq)} Birr
              </p>
              <p className="parag">
                <span className="emp"> TIN No:</span> {contract?.tNo}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="title">3-Mudada Heshiiska</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="parag">
                Mudada heshiisku waa{" "}
                <span className="emp">{`${monthDiff(
                  startDate,
                  endDate
                )} billood`}</span>{" "}
                oo lakordhinkaro, wuxuuna billab mayaa{" "}
                <span className="emp">{startDate.toLocaleDateString()}</span>{" "}
                wuxuuna ku eg yahay{" "}
                <span className="emp">{endDate.toLocaleDateString()}</span>.
              </p>
              <p className="parag">
                Heshiiska sanadkiiba waxaa ku biiraya{" "}
                <span className="emp">10%</span> lacagta aad ku dagan tahay
                guriga ee hishiiska ku cad.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="title">4-Kirada iyo habka bixinta kirada</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="parag">
                Lacagta Kiradu waa etobiyan birr oo labixinayo billawga
                bilkasta.
              </p>
              <p className="parag">
                Kireeyuhu wuxuu dalban karaa horumarin billo ah ee kirada rugta.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="title">5-Waajibaadka Kiraystaha</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="parag">
                5.1. Waa inuu bixiyaa lacagta kirada billawga bilkasta
              </p>
              <p className="parag">
                5.2. Waa inuusan rugta kirada ka guuri karin isagoon qoraal ku
                ogeysiinin kireeyaha 3 bilood kahor
              </p>
              <p className="parag">
                5.3. Waa inuu rugta kirada u isticmaalo wixii loogu talogalay
                islamarkaana uudhawraa rugta, xuquuqda iyo danaha kireeyaha ee
                rugta kirada la xidhiidha.
              </p>
              <p className="parag">
                5.4. Waa in uu dhawraa nadaafadda rugta iyo agagaarkeeda iyo
                waliba xuquuqda dadka iyo goobaha dhismaha ee kale gaarahaan
                kuwa dariska ah ama u dhaw. Waxaa rugta iyo agagaarkeeda ka
                reeban qaylada, qayilaada, sigaarka iyo wixii kale dhibaya ama
                kazoo horjeeda caafimaadka, anshaxa/akhlaaqda dadweynaha,
                qawaaniinta iwm.
              </p>
              <p className="parag">
                5.5. Waa inuu bixiyaa kharashka adeegyada uu isticmaalo sida
                teleefanka, internetka, laydhka iyo biyaha.Waana inuu hagaajiyaa
                wixii uu xumeeyo ee kabaxsan wixii ku waxyeelooba isticmaalka
                caadiga ah.
              </p>
              <p className="parag">
                5.6. dayactirka ama beddelka qaybka mid ah rugta oo ay sababtay
                baahida uukiraystuhu u qabo isticmaalka caadiga ah kiraystah
                aayaa bixinaya kharashka Ku baxa; sidoo kale wuxuu bixinayaa
                kharashka ku baxa wixii uu isagu jabiyo ama si kale u
                waxyeeleeyo.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="title">6-Waajibaadka Kireeyaha</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="parag">
                6.1. Waa inuu rugta kirada u ogolaado kuna wareejiyo kiraystaha
                islamarkaana uusan wax carqalad ah kukeenin mudada heshiisku
                jiro
              </p>
              <p className="parag">
                6.2. Waa inuusan rugta kirada kabixinin kiraystaha hadduuna
                kiraystuhu jabinin qaar ama dhammaan qodobada heshiis kan.
                Haddiikireeyuhu go’aansado inuu buriyo heshiiska kirada
                siwaafaqsan qodobada heshiiskan waa inuu qoraal ku ogeysiiyaa
                kiraystaha muddo maan-gal ah oo ganac sigiisa uu ku urrursan
                karo kuna guuri karo isagoo la tixgalinayo dabeecada ganacsiga,
                macaamiisha iwm.
              </p>
              <p className="parag">
                6.3. Wuxuu bixinayaa wixii canshuura ee rugta la xidhiidha.
              </p>
              <p className="parag">
                6.4. kireeyuhu ma dammaanad qaadayo masuulna kama aha inay rugta
                kiradu noqoto ama tahay sida ay tahay sikaduwan.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="title">7-Burinta Heshiiska</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="parag">
                7.1. Heshiiska waxaa lagu burin karaa heshiis ay labada dhinacba
                udhan yihiin
              </p>
              <p className="parag">
                7.2. Labada dhinacba waxay xor u yihiin inay heshiiska kabaxaan
                haddii dhinaca kale uu kasoo bixiwaayo waajibaadkiisa.
              </p>
              <p className="parag">
                Dhinackasta waxaa waajibku ah inuu dhinaca kale ogaysiiyo kahor
                intuusan heshiiska kabixin siwaafaqsan qodobada heshiiskan.
              </p>
              <p className="parag">
                7.3. Burinta heshiisku meesha kamasaarayo sogudashada
                waajibaadka heshiiskani saaray dhinacyada iyo xuquuqaha ay
                kumuteen sababtiisa midna ilaa ay dhammaystirmaan ama la guto.
              </p>
              <p className="parag">
                7.4. waxaa jira sabab kireeyuhu heshiiska ku burin karo haddii:
              </p>
              <p className="parag">
                (b) la,ogaado in kiraystuhu sheegay xog khaldan/aanjirin oo la
                xidhiidha shakhsiyadiisa ama waraaqaha/dukumiintiga uu
                isticmaalay markiiheshiiska la galayey.
              </p>
              <p className="parag">
                (t) kirada la bixin waayo kadib markii xilligeedu gaadhay kana
                soowareegtay15 maalmood ama kabadan.
              </p>
              <p className="parag">
                (j) haddii uukiraystuhu, (1) kaco ama kicid u dhawaado, (2)
                bixin kariwaayo kiradiibisha ilaa la gaadho badhtamaha bishii
                kale uuna qirto inuusan bixin Karin kirada (3) burburayo ama uu
                la bahoobayo cid kale, (4) Maxkamad ay dabagal iyo ilaalo kusoo
                rogto maamulka hantidiisa
              </p>
              <p className="parag">
                (x) kiraystuhu rugta kirada u isticmaalo six un ama wax u
                dhimaysa kiraysta yaasha, macaamiisha iyo sumcadda dhismaha iyo
                mulkiilahaba. Si xun u isticmaalka waxaa kamid ah qayilaada,
                qaylada, qashinka, sigaarka, burburinta/jajabinta rugta kirada.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="title">8-Xaddidaada xilka/mas’uuliyadda</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="parag">
                Labadadhinac midna mas’uulkama aha wixii awoodiisa kabaxsan
                waxna uusan kaqaban Karin sida dagaalo, daadad, dab iyo wixii
                dawladd ukeento iwm.
              </p>
              <p className="parag">
                Kireeyuhu masuul kama aha wixii gudaha guriga ka dhaca isaga oo
                albaaba guriga aan la jabsan.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="title">9-Xallinta Khilaafaadka</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="parag">
                Haddii labada dhinac ay is khilaafaan waxaa khilaafka lagu
                xallin si saaxiib tinimo iyo walaalnimo ah, haddii ay taasi
                xalkeeniwaydana waxay sooxulanayaan 4qof oo midkiiba labo
                keensanayo iyo qof shanaad oo ay laba dooduba kuwada
                qanacsanyihiin oo wadahadalka haga.Haddii tallaabooyinkani
                xallinwaayaan khilaafka waxaa xalka loo raadinayaa maxkamadda
                deegaanka ee awooda u leh.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="title">10-Dhaqan-Galka Heshiiska</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="parag">
                Heshiiskani wuxuudhaqan-galayaa lagabilaabo taariikhda labada
                dhinac sixiixaan
              </p>
              <p className="parag">
                Heshiis qaate:{" "}
                <span className="emp">{contract?.tenant?.name}</span>.
              </p>
              <p className="parag">
                <span className="emp">
                  {" "}
                  sixiixa___________________________taarikhda{" "}
                  {new Date().toLocaleDateString()}
                </span>
                .
              </p>
              <p className="parag">
                Heshiis bixiye: <span className="emp">Shabelle bank</span>
              </p>
              <p className="parag">
                <span className="emp">
                  {" "}
                  sixiixa___________________________taarikhda{" "}
                  {new Date().toLocaleDateString()}
                </span>
                .
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="title">11-Markhaatiyada</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="parag">
                1- <span className="emp">{contract?.witness1}</span> saxiixa
                ________________________taarikh{" "}
                {new Date().toLocaleDateString()}
              </p>
              <p className="parag">
                2- <span className="emp">{contract?.witness2}</span> saxiixa
                ________________________taarikh{" "}
                {new Date().toLocaleDateString()}
              </p>
              {contract?.witness3 && (
                <p className="parag">
                  3- <span className="emp">{contract?.witness3}</span> saxiixa
                  ________________________taarikh{" "}
                  {new Date().toLocaleDateString()}
                </p>
              )}
            </Col>
          </Row>
        </Card.Body>
        <div className="row text-center btn-page">
          <div className="col-sm-12 invoice-btn-group text-center">
            <button
              type="button"
              className="btn btn-primary btn-print-invoice m-b-10"
              onClick={handlePrint}
            >
              Print
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-print-invoice m-b-10"
              onClick={() => setShow(false)}
            >
              Close
            </button>
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default PrintContract;

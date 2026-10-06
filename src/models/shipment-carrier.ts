import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * The carrier for the shipment. Some carriers have a global version as well as local subsidiaries.
 * The subsidiaries are repeated over many countries and might also have an entry in the global
 * list. Choose the carrier for your country. If the carrier is not available for your country,
 * choose the global version of the carrier. If your carrier name is not in the list, set `carrier`
 * to `OTHER` and set carrier name in `carrier_name_other`. For allowed values, see Carriers.
 */
export const ShipmentCarrier = {
  /** DPD Russia. */
  DpdRu: "DPD_RU",
  /** Bulgarian Posts. */
  BgBulgarianPost: "BG_BULGARIAN_POST",
  /** Koreapost (www.koreapost.go.kr). */
  KrKoreaPost: "KR_KOREA_POST",
  /** Courier IT. */
  ZaCourierit: "ZA_COURIERIT",
  /** DPD France (formerly exapaq). */
  FrExapaq: "FR_EXAPAQ",
  /** Emirates Post. */
  AreEmiratesPost: "ARE_EMIRATES_POST",
  /** GAC. */
  Gac: "GAC",
  /** Geis CZ. */
  Geis: "GEIS",
  /** SF Express. */
  SfEx: "SF_EX",
  /** Pago Logistics. */
  Pago: "PAGO",
  /** MyHermes UK. */
  Myhermes: "MYHERMES",
  /** Diamond Eurogistics Limited. */
  DiamondEurogistics: "DIAMOND_EUROGISTICS",
  /** Corporate Couriers. */
  CorporatecouriersWebhook: "CORPORATECOURIERS_WEBHOOK",
  /** Bond courier. */
  Bond: "BOND",
  /** Omni Parcel. */
  Omniparcel: "OMNIPARCEL",
  /** Slovenska pošta. */
  SkPosta: "SK_POSTA",
  /** purolator. */
  Purolator: "PUROLATOR",
  /** Mena 360 (Fetchr). */
  FetchrWebhook: "FETCHR_WEBHOOK",
  /** TDG – The Delivery Group. */
  Thedeliverygroup: "THEDELIVERYGROUP",
  /** Cello Square. */
  CelloSquare: "CELLO_SQUARE",
  /** TONDA GLOBAL. */
  Tarrive: "TARRIVE",
  /** MDS Collivery Pty (Ltd). */
  Collivery: "COLLIVERY",
  /** Mainfreight. */
  Mainfreight: "MAINFREIGHT",
  /** First Flight Couriers. */
  IndFirstflight: "IND_FIRSTFLIGHT",
  /** ACS Worldwide Express. */
  Acsworldwide: "ACSWORLDWIDE",
  /** Amstan Logistics. */
  Amstan: "AMSTAN",
  /** OkayParcel. */
  Okayparcel: "OKAYPARCEL",
  /** Envialia Reference. */
  EnvialiaReference: "ENVIALIA_REFERENCE",
  /** Seur Spain. */
  SeurEs: "SEUR_ES",
  /** Continental. */
  Continental: "CONTINENTAL",
  /** FDSEXPRESS. */
  Fdsexpress: "FDSEXPRESS",
  /** Swiship UK. */
  AmazonFbaSwiship: "AMAZON_FBA_SWISHIP",
  /** Wyngs. */
  Wyngs: "WYNGS",
  /** DHL Active Tracing. */
  DhlActiveTracing: "DHL_ACTIVE_TRACING",
  /** Zyllem. */
  Zyllem: "ZYLLEM",
  /** Ruston. */
  Ruston: "RUSTON",
  /** Xpost.ph. */
  Xpost: "XPOST",
  /** correos Express (www.correos.es). */
  CorreosEs: "CORREOS_ES",
  /** DHL France (www.dhl.com). */
  DhlFr: "DHL_FR",
  /** Pan-Asia International. */
  PanAsia: "PAN_ASIA",
  /** BRT couriers Italy (www.brt.it). */
  BrtIt: "BRT_IT",
  /** SRE Korea (www.srekorea.co.kr). */
  SreKorea: "SRE_KOREA",
  /** Spee-Dee Delivery. */
  Speedee: "SPEEDEE",
  /** TNT UK Limited (www.tnt.com). */
  TntUk: "TNT_UK",
  /** Venipak. */
  Venipak: "VENIPAK",
  /** SHREE NANDAN COURIER. */
  Shreenandancourier: "SHREENANDANCOURIER",
  /** Croshot. */
  Croshot: "CROSHOT",
  /** NIpost (www.nipost.gov.ng). */
  NipostNg: "NIPOST_NG",
  /** ePost Global. */
  EpstGlbl: "EPST_GLBL",
  /** Newgistics. */
  Newgistics: "NEWGISTICS",
  /** Post of Slovenia. */
  PostSlovenia: "POST_SLOVENIA",
  /** Jersey Post. */
  JerseyPost: "JERSEY_POST",
  /** Bombino Express Pvt. */
  Bombinoexp: "BOMBINOEXP",
  /** WMG Delivery. */
  Wmg: "WMG",
  /** XQ Express. */
  XqExpress: "XQ_EXPRESS",
  /** Furdeco. */
  Furdeco: "FURDECO",
  /** LHT Express. */
  LhtExpress: "LHT_EXPRESS",
  /** South African Post Office. */
  SouthAfricanPostOffice: "SOUTH_AFRICAN_POST_OFFICE",
  /** SPOTON Logistics Pvt Ltd. */
  Spoton: "SPOTON",
  /** Dimerco Express Group. */
  Dimerco: "DIMERCO",
  /** cyprus post. */
  CyprusPostCyp: "CYPRUS_POST_CYP",
  /** AB Custom Group. */
  Abcustom: "ABCUSTOM",
  /** deliverE. */
  IndDelivree: "IND_DELIVREE",
  /** Best Express. */
  CnBestexpress: "CN_BESTEXPRESS",
  /** DX (SFTP). */
  DxSftp: "DX_SFTP",
  /** PICK UPP. */
  PickuppMys: "PICKUPP_MYS",
  /** FMX. */
  Fmx: "FMX",
  /** Hellmann Worldwide Logistics. */
  Hellmann: "HELLMANN",
  /** Ship It Asia. */
  ShipItAsia: "SHIP_IT_ASIA",
  /** Kerry eCommerce. */
  KerryEcommerce: "KERRY_ECOMMERCE",
  /** Frete Rapido. */
  Freterapido: "FRETERAPIDO",
  /** Pitney Bowes. */
  PitneyBowes: "PITNEY_BOWES",
  /** Xpressen courier. */
  XpressenDk: "XPRESSEN_DK",
  /** Spanish Seur API. */
  SeurSpApi: "SEUR_SP_API",
  /** DELIVERYONTIME LOGISTICS PVT LTD. */
  Deliveryontime: "DELIVERYONTIME",
  /** JINSUNG TRADING. */
  Jinsung: "JINSUNG",
  /** Trans Kargo Internasional. */
  TransKargo: "TRANS_KARGO",
  /** Swiship DE. */
  SwishipDe: "SWISHIP_DE",
  /** Ivoy courier. */
  IvoyWebhook: "IVOY_WEBHOOK",
  /** Airmee couriers. */
  AirmeeWebhook: "AIRMEE_WEBHOOK",
  /** dhl benelux. */
  DhlBenelux: "DHL_BENELUX",
  /** FirstMile. */
  Firstmile: "FIRSTMILE",
  /** Fastway Ireland. */
  FastwayIr: "FASTWAY_IR",
  /** Hua Han Logistics. */
  HhExp: "HH_EXP",
  /** Mypostonline. */
  MysMypostOnline: "MYS_MYPOST_ONLINE",
  /** THT Netherland. */
  TntNl: "TNT_NL",
  /** TIPSA courier. */
  Tipsa: "TIPSA",
  /** TAQBIN Malaysia. */
  TaqbinMy: "TAQBIN_MY",
  /** KGM Hub. */
  Kgmhub: "KGMHUB",
  /** Internet Express. */
  Intexpress: "INTEXPRESS",
  /** Overseas Express. */
  OverseExp: "OVERSE_EXP",
  /** One click delivery services. */
  Oneclick: "ONECLICK",
  /** Roadbull Logistics. */
  RoadrunnerFreight: "ROADRUNNER_FREIGHT",
  /** GLS Croatia. */
  GlsCrotia: "GLS_CROTIA",
  /** MRW courier. */
  MrwFtp: "MRW_FTP",
  /** Blue Express. */
  Bluex: "BLUEX",
  /** Daylight Transport. */
  Dylt: "DYLT",
  /** DPD Ireland. */
  DpdIr: "DPD_IR",
  /** Sin Global Express. */
  SinGlbl: "SIN_GLBL",
  /** Tuffnells Parcels Express- Reference. */
  TuffnellsReference: "TUFFNELLS_REFERENCE",
  /** CJ Packet. */
  Cjpacket: "CJPACKET",
  /** Milkman courier. */
  Milkman: "MILKMAN",
  /** ASIGNA courier. */
  Asigna: "ASIGNA",
  /** One World Express. */
  Oneworldexpress: "ONEWORLDEXPRESS",
  /** RoyalShipments. */
  RoyalMail: "ROYAL_MAIL",
  /** Viaxpress. */
  ViaExpress: "VIA_EXPRESS",
  /** TIG Freight. */
  Tigfreight: "TIGFREIGHT",
  /** ZTO Express. */
  ZtoExpress: "ZTO_EXPRESS",
  /** 2GO Courier. */
  TwoGo: "TWO_GO",
  /** IML courier. */
  Iml: "IML",
  /** Intel-Valley Supply chain (ShenZhen) Co. Ltd. */
  IntelValley: "INTEL_VALLEY",
  /** EFS (E-commerce Fulfillment Service). */
  Efs: "EFS",
  /** UK mail (ukmail.com). */
  UkUkMail: "UK_UK_MAIL",
  /** RAM courier. */
  Ram: "RAM",
  /** Allied Express. */
  Alliedexpress: "ALLIEDEXPRESS",
  /** APC overnight (apc-overnight.com). */
  ApcOvernight: "APC_OVERNIGHT",
  /** Shippit. */
  Shippit: "SHIPPIT",
  /** TFM Xpress. */
  Tfm: "TFM",
  /** M Xpress Sdn Bhd. */
  MXpress: "M_XPRESS",
  /** Haidaibao (BOX). */
  HdbBox: "HDB_BOX",
  /** Clevy Links. */
  ClevyLinks: "CLEVY_LINKS",
  /** Beone Logistics. */
  Ibeone: "IBEONE",
  /** Fiege Netherlands. */
  FiegeNl: "FIEGE_NL",
  /** KWE Global. */
  KweGlobal: "KWE_GLOBAL",
  /** CTC Express. */
  CtcExpress: "CTC_EXPRESS",
  /** Amazon Shipping. */
  Amazon: "AMAZON",
  /** Morelink. */
  MoreLink: "MORE_LINK",
  /** JX courier. */
  Jx: "JX",
  /** Easy Mail. */
  EasyMail: "EASY_MAIL",
  /** A Duie Pyle. */
  Aduiepyle: "ADUIEPYLE",
  /** Panther. */
  GbPanther: "GB_PANTHER",
  /** Expresssale. */
  Expresssale: "EXPRESSSALE",
  /** Detrack. */
  SgDetrack: "SG_DETRACK",
  /** Trunkrs courier. */
  TrunkrsWebhook: "TRUNKRS_WEBHOOK",
  /** Matdespatch. */
  Matdespatch: "MATDESPATCH",
  /** GLS Logistic Systems Canada Ltd./Dicom. */
  Dicom: "DICOM",
  /** MBW Courier Inc.. */
  Mbw: "MBW",
  /** Cambodia Post. */
  KhmCambodiaPost: "KHM_CAMBODIA_POST",
  /** Sinotrans. */
  Sinotrans: "SINOTRANS",
  /** BRT Bartolini(Parcel ID). */
  BrtItParcelid: "BRT_IT_PARCELID",
  /** DHL Supply Chain APAC. */
  DhlSupplyChain: "DHL_SUPPLY_CHAIN",
  /** DHL Poland. */
  DhlPl: "DHL_PL",
  /** TopYou. */
  Topyou: "TOPYOU",
  /** PAL Express Limited. */
  Palexpress: "PALEXPRESS",
  /** dhl Singapore. */
  DhlSg: "DHL_SG",
  /** WeDo Logistics. */
  CnWedo: "CN_WEDO",
  /** Fulfillme. */
  Fulfillme: "FULFILLME",
  /** DPD delistrack. */
  DpdDelistrack: "DPD_DELISTRACK",
  /** UPS Reference. */
  UpsReference: "UPS_REFERENCE",
  /** Caribou. */
  Caribou: "CARIBOU",
  /** Locus courier. */
  LocusWebhook: "LOCUS_WEBHOOK",
  /** DSV courier. */
  Dsv: "DSV",
  /** P2P TrakPak. */
  P2PTrc: "P2P_TRC",
  /** Direct Parcels. */
  Directparcels: "DIRECTPARCELS",
  /** Nova Poshta (International). */
  NovaPoshtaInt: "NOVA_POSHTA_INT",
  /** FedEx® Poland Domestic. */
  FedexPoland: "FEDEX_POLAND",
  /** JCEX courier. */
  CnJcex: "CN_JCEX",
  /** FAR international. */
  FarInternational: "FAR_INTERNATIONAL",
  /** IDEX courier. */
  Idexpress: "IDEXPRESS",
  /** GANGBAO Supplychain. */
  Gangbao: "GANGBAO",
  /** Neway Transport. */
  Neway: "NEWAY",
  /** PostNL International. */
  PostnlInt3S: "POSTNL_INT_3_S",
  /** RPX Indonesia. */
  RpxId: "RPX_ID",
  /** Designer Transport. */
  DesignertransportWebhook: "DESIGNERTRANSPORT_WEBHOOK",
  /** GLS Slovenia. */
  GlsSloven: "GLS_SLOVEN",
  /** Parcelled.in. */
  ParcelledIn: "PARCELLED_IN",
  /** GSI EXPRESS. */
  GsiExpress: "GSI_EXPRESS",
  /** Con-way Freight. */
  ConWay: "CON_WAY",
  /** Brouwer Transport en Logistiek. */
  BrouwerTransport: "BROUWER_TRANSPORT",
  /** Captain Express International. */
  Cpex: "CPEX",
  /** Israel Post. */
  IsraelPost: "ISRAEL_POST",
  /** DTDC India. */
  DtdcIn: "DTDC_IN",
  /** PTT Post. */
  PttPost: "PTT_POST",
  /** Ximex Delivery Express. */
  XdeWebhook: "XDE_WEBHOOK",
  /** Tolos courier. */
  Tolos: "TOLOS",
  /** Giao hàng nhanh. */
  GiaoHang: "GIAO_HANG",
  /** Geodis E-space. */
  GeodisEspace: "GEODIS_ESPACE",
  /** Magyar Post. */
  MagyarHu: "MAGYAR_HU",
  /** DoorDash. */
  DoordashWebhook: "DOORDASH_WEBHOOK",
  /** Tiki shipment. */
  TikiId: "TIKI_ID",
  /** CJ Logistics International(Hong Kong). */
  CjHkInternational: "CJ_HK_INTERNATIONAL",
  /** Star Track Express. */
  StarTrackExpress: "STAR_TRACK_EXPRESS",
  /** Helthjem. */
  Helthjem: "HELTHJEM",
  /** SF International. */
  Sfb2C: "SFB2C",
  /** Freightquote by C.H. Robinson. */
  Freightquote: "FREIGHTQUOTE",
  /** Landmark Global Reference. */
  LandmarkGlobalReference: "LANDMARK_GLOBAL_REFERENCE",
  /** Parcel2Go. */
  Parcel2Go: "PARCEL2GO",
  /** Delnext. */
  Delnext: "DELNEXT",
  /** Red Carpet Logistics. */
  Rcl: "RCL",
  /** CGS Express. */
  CgsExpress: "CGS_EXPRESS",
  /** Hongkong Post (www.hongkongpost.hk). */
  HkPost: "HK_POST",
  /** SAP EXPRESS. */
  SapExpress: "SAP_EXPRESS",
  /** Parcel Post Singapore. */
  ParcelpostSg: "PARCELPOST_SG",
  /** HermesWorld UK. */
  Hermes: "HERMES",
  /** Safexpress. */
  IndSafeexpress: "IND_SAFEEXPRESS",
  /** Tophatter Express. */
  Tophatterexpress: "TOPHATTEREXPRESS",
  /** PT MGLOBAL LOGISTICS INDONESIA. */
  Mglobal: "MGLOBAL",
  /** Averitt Express. */
  Averitt: "AVERITT",
  /** leader. */
  Leader: "LEADER",
  /** 2ebox courier. */
  _2Ebox: "_2EBOX",
  /** Singapore Speedpost. */
  SgSpeedpost: "SG_SPEEDPOST",
  /** DB Schenker (www.dbschenker.com). */
  DbschenkerSe: "DBSCHENKER_SE",
  /** Israel Post Domestic. */
  IsrPostDomestic: "ISR_POST_DOMESTIC",
  /** Best Way Parcel. */
  Bestwayparcel: "BESTWAYPARCEL",
  /** asendia_de. */
  AsendiaDe: "ASENDIA_DE",
  /** nightline_uk. */
  NightlineUk: "NIGHTLINE_UK",
  /** taqbin_sg. */
  TaqbinSg: "TAQBIN_SG",
  /** TCK Express. */
  TckExpress: "TCK_EXPRESS",
  /** Endeavour Delivery. */
  EndeavourDelivery: "ENDEAVOUR_DELIVERY",
  /** Nanjing Woyuan. */
  Nanjingwoyuan: "NANJINGWOYUAN",
  /** Heppner France. */
  HeppnerFr: "HEPPNER_FR",
  /** EMPS Express. */
  EmpsCn: "EMPS_CN",
  /** Fonsen Logistics. */
  Fonsen: "FONSEN",
  /** Pickrr. */
  Pickrr: "PICKRR",
  /** APC Overnight Consignment. */
  ApcOvernightConnum: "APC_OVERNIGHT_CONNUM",
  /** Star Track Next Flight. */
  StarTrackNextFlight: "STAR_TRACK_NEXT_FLIGHT",
  /** Shanghai Aqrum Chemical Logistics Co.Ltd. */
  Dajin: "DAJIN",
  /** UPS Freight. */
  UpsFreight: "UPS_FREIGHT",
  /** Posta Plus. */
  PostaPlus: "POSTA_PLUS",
  /** CEVA LOGISTICS. */
  Ceva: "CEVA",
  /** ANSERX courier. */
  Anserx: "ANSERX",
  /** JS EXPRESS. */
  JsExpress: "JS_EXPRESS",
  /** padtf.com. */
  Padtf: "PADTF",
  /** UPS Mail Innovations. */
  UpsMailInnovations: "UPS_MAIL_INNOVATIONS",
  /** Sunyou Post. */
  Sypost: "SYPOST",
  /** Amazon Shipping + Amazon MCF. */
  AmazonShipMcf: "AMAZON_SHIP_MCF",
  /** Yusen Logistics. */
  Yusen: "YUSEN",
  /** Bring. */
  Bring: "BRING",
  /** SDA Italy. */
  SdaIt: "SDA_IT",
  /** GBA Services Ltd. */
  Gba: "GBA",
  /** Newegg Express. */
  Neweggexpress: "NEWEGGEXPRESS",
  /** Speed Couriers. */
  SpeedcouriersGr: "SPEEDCOURIERS_GR",
  /** forrun Pvt Ltd (Arpatech Venture). */
  Forrun: "FORRUN",
  /** Pickupp. */
  Pickup: "PICKUP",
  /** ECMS International Logistics Co.. */
  Ecms: "ECMS",
  /** Intelipost (TMS for LATAM). */
  Intelipost: "INTELIPOST",
  /** Flash Express. */
  Flashexpress: "FLASHEXPRESS",
  /** STO Express. */
  CnSto: "CN_STO",
  /** SEKO Worldwide. */
  SekoSftp: "SEKO_SFTP",
  /** Home Delivery Solutions Ltd. */
  HomeDeliverySolutions: "HOME_DELIVERY_SOLUTIONS",
  /** DPD Hungary. */
  DpdHgry: "DPD_HGRY",
  /** Kerry Express (Vietnam) Co Ltd. */
  KerryttcVn: "KERRYTTC_VN",
  /** Joying Box. */
  JoyingBox: "JOYING_BOX",
  /** Total Express. */
  TotalExpress: "TOTAL_EXPRESS",
  /** ZJS International. */
  ZjsExpress: "ZJS_EXPRESS",
  /** STARKEN couriers. */
  Starken: "STARKEN",
  /** DemandShip. */
  Demandship: "DEMANDSHIP",
  /** DPEX. */
  CnDpex: "CN_DPEX",
  /** AuPost China. */
  AupostCn: "AUPOST_CN",
  /** Logisters. */
  Logisters: "LOGISTERS",
  /** Global Post. */
  Goglobalpost: "GOGLOBALPOST",
  /** GLS Czech Republic. */
  GlsCz: "GLS_CZ",
  /** Paack courier. */
  PaackWebhook: "PAACK_WEBHOOK",
  /** Grab courier. */
  GrabWebhook: "GRAB_WEBHOOK",
  /** Parcelpoint. */
  Parcelpoint: "PARCELPOINT",
  /** iCumulus. */
  Icumulus: "ICUMULUS",
  /** DAI Post. */
  Daiglobaltrack: "DAIGLOBALTRACK",
  /** i-parcel. */
  GlobalIparcel: "GLOBAL_IPARCEL",
  /** Yurtici Kargo. */
  YurticiKargo: "YURTICI_KARGO",
  /** PayPal Package. */
  CnPaypalPackage: "CN_PAYPAL_PACKAGE",
  /** Parcel To Post. */
  Parcel2Post: "PARCEL_2_POST",
  /** GLS Italy. */
  GlsIt: "GLS_IT",
  /** PIL Logistics (China) Co.. */
  PilLogistics: "PIL_LOGISTICS",
  /** Heppner Internationale Spedition GmbH & Co.. */
  Heppner: "HEPPNER",
  /** Go!Express and logistics. */
  GeneralOvernight: "GENERAL_OVERNIGHT",
  /** Happy 2ThePoint. */
  Happy2Point: "HAPPY2POINT",
  /** Chit Chats. */
  Chitchats: "CHITCHATS",
  /** Smooth Couriers. */
  Smooth: "SMOOTH",
  /** CL E-Logistics Solutions Limited. */
  CleLogistics: "CLE_LOGISTICS",
  /** Fiege Logistics. */
  Fiege: "FIEGE",
  /** M&X cargo. */
  MxCargo: "MX_CARGO",
  /** Ziing Final Mile Inc. */
  Ziingfinalmile: "ZIINGFINALMILE",
  /** Dayton Freight. */
  DaytonFreight: "DAYTON_FREIGHT",
  /** TCS courier. */
  Tcs: "TCS",
  /** AEX Group. */
  Aex: "AEX",
  /** Hermes Germany. */
  HermesDe: "HERMES_DE",
  /** Routific. */
  RoutificWebhook: "ROUTIFIC_WEBHOOK",
  /** Globavend. */
  Globavend: "GLOBAVEND",
  /** CJ Logistics International. */
  CjLogistics: "CJ_LOGISTICS",
  /** The Pallet Network. */
  PalletNetwork: "PALLET_NETWORK",
  /** RAF Philippines. */
  RafPh: "RAF_PH",
  /** XDP Express. */
  UkXdp: "UK_XDP",
  /** Paper Express. */
  PaperExpress: "PAPER_EXPRESS",
  /** La Poste. */
  LaPosteSuivi: "LA_POSTE_SUIVI",
  /** Paquetexpress. */
  Paquetexpress: "PAQUETEXPRESS",
  /** liefery. */
  Liefery: "LIEFERY",
  /** Streck Transport. */
  StreckTransport: "STRECK_TRANSPORT",
  /** Pony express. */
  PonyExpress: "PONY_EXPRESS",
  /** Always Express. */
  AlwaysExpress: "ALWAYS_EXPRESS",
  /** GBS-Broker. */
  GbsBroker: "GBS_BROKER",
  /** City-Link Express. */
  CitylinkMy: "CITYLINK_MY",
  /** ALLJOY SUPPLY CHAIN. */
  Alljoy: "ALLJOY",
  /** yodel. */
  Yodel: "YODEL",
  /** Yodel Direct. */
  YodelDir: "YODEL_DIR",
  /** STONE3PL. */
  Stone3Pl: "STONE3PL",
  /** ParcelPal. */
  ParcelpalWebhook: "PARCELPAL_WEBHOOK",
  /** DHL eCommerce Asia (API). */
  DhlEcomerceAsa: "DHL_ECOMERCE_ASA",
  /** J&T Express Singapore. */
  Simplypost: "SIMPLYPOST",
  /** Kua Yue Express. */
  KyExpress: "KY_EXPRESS",
  /** shenzhen 1st International Logistics(Group)Co. */
  Shenzhen: "SHENZHEN",
  /** LaserShip. */
  UsLasership: "US_LASERSHIP",
  /** ucexpress. */
  UcExpre: "UC_EXPRE",
  /** DIDADI Logistics tech. */
  Didadi: "DIDADI",
  /** CJ Korea Express. */
  CjKr: "CJ_KR",
  /** DB Schenker B2B. */
  DbschenkerB2B: "DBSCHENKER_B2B",
  /** MXE Express. */
  Mxe: "MXE",
  /** CAE Delivers. */
  CaeDelivers: "CAE_DELIVERS",
  /** PFC Express. */
  Pfcexpress: "PFCEXPRESS",
  /** Whistl. */
  Whistl: "WHISTL",
  /** WePost Sdn Bhd. */
  Wepost: "WEPOST",
  /** DHL parcel Spain(www.dhl.com). */
  DhlParcelEs: "DHL_PARCEL_ES",
  /** DD Express Courier. */
  Ddexpress: "DDEXPRESS",
  /** Aramex Australia (formerly Fastway AU). */
  AramexAu: "ARAMEX_AU",
  /** Bneed courier. */
  Bneed: "BNEED",
  /** Kerry Express Hong Kong. */
  HkTgx: "HK_TGX",
  /** Latvijas Pasts. */
  LatvijasPasts: "LATVIJAS_PASTS",
  /** ViaEurope. */
  Viaeurope: "VIAEUROPE",
  /** Correo Uruguayo. */
  CorreoUy: "CORREO_UY",
  /** Chronopost france (www.chronopost.fr). */
  ChronopostFr: "CHRONOPOST_FR",
  /** J-Net. */
  JNet: "J_NET",
  /** 6ls.com. */
  _6Ls: "_6LS",
  /** Belpost. */
  BlrBelpost: "BLR_BELPOST",
  /** BirdSystem. */
  Birdsystem: "BIRDSYSTEM",
  /** DobroPost. */
  Dobropost: "DOBROPOST",
  /** Wahana express (www.wahana.com). */
  WahanaId: "WAHANA_ID",
  /** Weaship. */
  Weaship: "WEASHIP",
  /** Sonic Transportation & Logistics. */
  Sonictl: "SONICTL",
  /** Shenzhen Jinghuada Logistics Co.. */
  Kwt: "KWT",
  /** AFL LOGISTICS. */
  AfllogFtp: "AFLLOG_FTP",
  /** SkyNet Worldwide Express. */
  SkynetWorldwide: "SKYNET_WORLDWIDE",
  /** Nova Poshta (novaposhta.ua). */
  NovaPoshta: "NOVA_POSHTA",
  /** Seino. */
  Seino: "SEINO",
  /** SZENDEX. */
  Szendex: "SZENDEX",
  /** Bpost international. */
  BpostInt: "BPOST_INT",
  /** DB Schenker Sweden. */
  DbschenkerSv: "DBSCHENKER_SV",
  /** AO Deutschland. */
  AoDeutschland: "AO_DEUTSCHLAND",
  /** EU Fleet Solutions. */
  EuFleetSolutions: "EU_FLEET_SOLUTIONS",
  /** PCF Final Mile. */
  Pcfcorp: "PCFCORP",
  /** Link Bridge(BeiJing)international logistics co.. */
  Linkbridge: "LINKBRIDGE",
  /** PT Prima Multi Cipta. */
  Primamulticipta: "PRIMAMULTICIPTA",
  /** Urbanfox. */
  Courex: "COUREX",
  /** Zajil Express Company. */
  ZajilExpress: "ZAJIL_EXPRESS",
  /** CollectCo. */
  Collectco: "COLLECTCO",
  /** J&T EXPRESS MALAYSIA. */
  Jtexpress: "JTEXPRESS",
  /** FedEx® UK. */
  FedexUk: "FEDEX_UK",
  /** uShip courier. */
  Uship: "USHIP",
  /** PIXSELL LOGISTICS. */
  Pixsell: "PIXSELL",
  /** Shiptor. */
  Shiptor: "SHIPTOR",
  /** CDEK courier. */
  Cdek: "CDEK",
  /** ViettelPost. */
  VnmViettelpost: "VNM_VIETTELPOST",
  /** CJ Century. */
  CjCentury: "CJ_CENTURY",
  /** GSO(GLS-USA). */
  Gso: "GSO",
  /** VIWO IoT. */
  Viwo: "VIWO",
  /** SKYBOX. */
  Skybox: "SKYBOX",
  /** Kerry TJ Logistics. */
  Kerrytj: "KERRYTJ",
  /** Nhat Tin Logistics. */
  NtlogisticsVn: "NTLOGISTICS_VN",
  /** lightning monkey. */
  SdhScm: "SDH_SCM",
  /** Zinc courier. */
  Zinc: "ZINC",
  /** DPE South Africa. */
  DpeSouthAfrc: "DPE_SOUTH_AFRC",
  /** Czech Post. */
  CeskaCz: "CESKA_CZ",
  /** ACS Courier. */
  AcsGr: "ACS_GR",
  /** DealerSend. */
  Dealersend: "DEALERSEND",
  /** Jocom. */
  Jocom: "JOCOM",
  /** CSE courier. */
  Cse: "CSE",
  /** TForce Final Mile. */
  TforceFinalmile: "TFORCE_FINALMILE",
  /** ShipGate. */
  ShipGate: "SHIP_GATE",
  /** SHIPTER. */
  Shipter: "SHIPTER",
  /** National Sameday. */
  NationalSameday: "NATIONAL_SAMEDAY",
  /** YunExpress. */
  Yunexpress: "YUNEXPRESS",
  /** AliExpress Standard Shipping. */
  Cainiao: "CAINIAO",
  /** DMSMatrix. */
  DmsMatrix: "DMS_MATRIX",
  /** Directlog (www.directlog.com.br). */
  Directlog: "DIRECTLOG",
  /** Asendia USA. */
  AsendiaUs: "ASENDIA_US",
  /** 3JMS Logistics. */
  _3Jmslogistics: "_3JMSLOGISTICS",
  /** LICCARDI EXPRESS COURIER. */
  LiccardiExpress: "LICCARDI_EXPRESS",
  /** SkyPostal. */
  SkyPostal: "SKY_POSTAL",
  /** cnwangtong. */
  Cnwangtong: "CNWANGTONG",
  /** ostnord denmark. */
  PostnordLogisticsDk: "POSTNORD_LOGISTICS_DK",
  /** Logistika. */
  Logistika: "LOGISTIKA",
  /** Celeritas Transporte. */
  Celeritas: "CELERITAS",
  /** Pressio. */
  Pressiode: "PRESSIODE",
  /** Shree Maruti Courier Services Pvt Ltd. */
  ShreeMaruti: "SHREE_MARUTI",
  /** Logistic Worldwide Express (LWE Honkong). */
  LogisticsworldwideHk: "LOGISTICSWORLDWIDE_HK",
  /** eFEx (E-Commerce Fulfillment & Express). */
  Efex: "EFEX",
  /** Lotte Global Logistics. */
  Lotte: "LOTTE",
  /** Lone Star Overnight. */
  Lonestar: "LONESTAR",
  /** Aprisa Express. */
  Aprisaexpress: "APRISAEXPRESS",
  /** BEL North Russia. */
  BelRs: "BEL_RS",
  /** OSM Worldwide. */
  OsmWorldwide: "OSM_WORLDWIDE",
  /** Westgate Global. */
  WestgateGl: "WESTGATE_GL",
  /** Fasttrack. */
  Fastrack: "FASTRACK",
  /** DTD Express. */
  DtdExpr: "DTD_EXPR",
  /** AlfaTrex. */
  Alfatrex: "ALFATREX",
  /** ProMed Delivery. */
  Promeddelivery: "PROMEDDELIVERY",
  /** Thabit Logistics. */
  ThabitLogistics: "THABIT_LOGISTICS",
  /** HCT LOGISTICS CO.LTD.. */
  HctLogistics: "HCT_LOGISTICS",
  /** Carry-Flap Co.. */
  CarryFlap: "CARRY_FLAP",
  /** Old Dominion Freight Line. */
  UsOldDominion: "US_OLD_DOMINION",
  /** ANICAM BOX EXPRESS. */
  AnicamBox: "ANICAM_BOX",
  /** WanbExpress. */
  Wanbexpress: "WANBEXPRESS",
  /** An Post. */
  AnPost: "AN_POST",
  /** DPD Local. */
  DpdLocal: "DPD_LOCAL",
  /** Stallion Express. */
  Stallionexpress: "STALLIONEXPRESS",
  /** RaidereX. */
  Raiderex: "RAIDEREX",
  /** ShopfansRU LLC. */
  Shopfans: "SHOPFANS",
  /** Kyungdong Parcel. */
  KyungdongParcel: "KYUNGDONG_PARCEL",
  /** Champion Logistics. */
  ChampionLogistics: "CHAMPION_LOGISTICS",
  /** PICK UPP (Singapore). */
  PickuppSgp: "PICKUPP_SGP",
  /** Morning Express. */
  MorningExpress: "MORNING_EXPRESS",
  /** NACEX. */
  Nacex: "NACEX",
  /** SortHub courier. */
  ThenileWebhook: "THENILE_WEBHOOK",
  /** Holisol. */
  Holisol: "HOLISOL",
  /** LBC EXPRESS INC.. */
  LbcexpressFtp: "LBCEXPRESS_FTP",
  /** KURASI. */
  Kurasi: "KURASI",
  /** USF Reddaway. */
  UsfReddaway: "USF_REDDAWAY",
  /** APG eCommerce Solutions. */
  Apg: "APG",
  /** BoxC courier. */
  CnBoxc: "CN_BOXC",
  /** ECOSCOOTING. */
  Ecoscooting: "ECOSCOOTING",
  /** Mainway. */
  Mainway: "MAINWAY",
  /** Paperfly Private Limited. */
  Paperfly: "PAPERFLY",
  /** Hound Express. */
  Houndexpress: "HOUNDEXPRESS",
  /** Boxberry courier. */
  BoxBerry: "BOX_BERRY",
  /** EP-Box courier. */
  EpBox: "EP_BOX",
  /** Plus UK Logistics. */
  PlusLogUk: "PLUS_LOG_UK",
  /** Fulfilla. */
  Fulfilla: "FULFILLA",
  /** ASE KARGO. */
  Ase: "ASE",
  /** MailPlus. */
  MailPlus: "MAIL_PLUS",
  /** XPO logistics. */
  XpoLogistics: "XPO_LOGISTICS",
  /** wnDirect. */
  Wndirect: "WNDIRECT",
  /** Cloudwish Asia. */
  CloudwishAsia: "CLOUDWISH_ASIA",
  /** Zeleris. */
  Zeleris: "ZELERIS",
  /** Gio Express. */
  GioExpress: "GIO_EXPRESS",
  /** OCS WORLDWIDE. */
  OcsWorldwide: "OCS_WORLDWIDE",
  /** ARK Logistics. */
  ArkLogistics: "ARK_LOGISTICS",
  /** Aquiline. */
  Aquiline: "AQUILINE",
  /** Pilot Freight Services. */
  PilotFreight: "PILOT_FREIGHT",
  /** Qwintry Logistics. */
  Qwintry: "QWINTRY",
  /** Danske Fragtaend. */
  DanskeFragt: "DANSKE_FRAGT",
  /** Carriers courier. */
  Carriers: "CARRIERS",
  /** Rivo (Air canada). */
  AirCanadaGlobal: "AIR_CANADA_GLOBAL",
  /** PRESIDENT TRANSNET CORP. */
  PresidentTrans: "PRESIDENT_TRANS",
  /** STEP FORWARD FREIGHT SERVICE CO LTD. */
  Stepforwardfs: "STEPFORWARDFS",
  /** Skynet UK. */
  SkynetUk: "SKYNET_UK",
  /** PITT OHIO. */
  Pittohio: "PITTOHIO",
  /** Correos Express. */
  CorreosExpress: "CORREOS_EXPRESS",
  /** RL Carriers. */
  RlUs: "RL_US",
  /** Destiny Transportation. */
  Destiny: "DESTINY",
  /** Yodel (www.yodel.co.uk). */
  UkYodel: "UK_YODEL",
  /** CometTech. */
  CometTech: "COMET_TECH",
  /** DHL Parcel Russia. */
  DhlParcelRu: "DHL_PARCEL_RU",
  /** TNT Reference. */
  TntRefr: "TNT_REFR",
  /** Shree Anjani Courier. */
  ShreeAnjaniCourier: "SHREE_ANJANI_COURIER",
  /** Mikropakket Belgium. */
  MikropakketBe: "MIKROPAKKET_BE",
  /** RETS express. */
  EtsExpress: "ETS_EXPRESS",
  /** Colis Privé. */
  ColisPrive: "COLIS_PRIVE",
  /** Yunda Express. */
  CnYunda: "CN_YUNDA",
  /** AAA Cooper. */
  AaaCooper: "AAA_COOPER",
  /** Rocket Parcel International. */
  RocketParcel: "ROCKET_PARCEL",
  /** 360 Lion Express. */
  _360Lion: "_360LION",
  /** PANDU. */
  Pandu: "PANDU",
  /** PROFESSIONAL COURIERS. */
  ProfessionalCouriers: "PROFESSIONAL_COURIERS",
  /** FLYTEXPRESS. */
  Flytexpress: "FLYTEXPRESS",
  /** LOGISTICSWORLDWIDE MY. */
  LogisticsworldwideMy: "LOGISTICSWORLDWIDE_MY",
  /** CORREOS DE ESPANA. */
  CorreosDeEspana: "CORREOS_DE_ESPANA",
  /** IMX. */
  Imx: "IMX",
  /** FOUR PX EXPRESS. */
  FourPxExpress: "FOUR_PX_EXPRESS",
  /** XPRESSBEES. */
  Xpressbees: "XPRESSBEES",
  /** pickupp_vnm. */
  PickuppVnm: "PICKUPP_VNM",
  /** startrack_express. */
  StartrackExpress: "STARTRACK_EXPRESS",
  /** fr_colissimo. */
  FrColissimo: "FR_COLISSIMO",
  /** nacex_spain_reference. */
  NacexSpainReference: "NACEX_SPAIN_REFERENCE",
  /** dhl_supply_chain_au. */
  DhlSupplyChainAu: "DHL_SUPPLY_CHAIN_AU",
  /** Eshipping. */
  Eshipping: "ESHIPPING",
  /** SHREE TIRUPATI COURIER SERVICES PVT. LTD.. */
  Shreetirupati: "SHREETIRUPATI",
  /** HX Express. */
  HxExpress: "HX_EXPRESS",
  /** INDOPAKET. */
  Indopaket: "INDOPAKET",
  /** 17 Post Service. */
  Cn17Post: "CN_17POST",
  /** K1 Express. */
  K1Express: "K1_EXPRESS",
  /** CJ GLS. */
  CjGls: "CJ_GLS",
  /** GDEX courier. */
  MysGdex: "MYS_GDEX",
  /** Nationex courier. */
  Nationex: "NATIONEX",
  /** Anjun couriers. */
  Anjun: "ANJUN",
  /** FarGood. */
  Fargood: "FARGOOD",
  /** SMG Direct. */
  SmgExpress: "SMG_EXPRESS",
  /** RZY Express. */
  Rzyexpress: "RZYEXPRESS",
  /** Southeastern Freight Lines. */
  Sefl: "SEFL",
  /** TNT-Click Italy. */
  TntClickIt: "TNT_CLICK_IT",
  /** Haidaibao. */
  Hdb: "HDB",
  /** Hipshipper. */
  Hipshipper: "HIPSHIPPER",
  /** RPX Logistics. */
  Rpxlogistics: "RPXLOGISTICS",
  /** Kuehne + Nagel. */
  Kuehne: "KUEHNE",
  /** Nexive (TNT Post Italy). */
  ItNexive: "IT_NEXIVE",
  /** PTS courier. */
  Pts: "PTS",
  /** Swiss Post FTP. */
  SwissPostFtp: "SWISS_POST_FTP",
  /** Fastrak Services. */
  FastrkServ: "FASTRK_SERV",
  /** 4-72 Entregando. */
  _472: "_4_72",
  /** YRC courier. */
  UsYrc: "US_YRC",
  /** PostNL International 3S. */
  PostnlIntl3S: "POSTNL_INTL_3S",
  /** Yilian (Elian) Supply Chain. */
  ElianPost: "ELIAN_POST",
  /** Cubyn. */
  Cubyn: "CUBYN",
  /** Saudi Post. */
  SauSaudiPost: "SAU_SAUDI_POST",
  /** ABX Express. */
  AbxexpressMy: "ABXEXPRESS_MY",
  /** HUAHANG EXPRESS. */
  HuahanExpress: "HUAHAN_EXPRESS",
  /** Eshun international Logistic. */
  ZesExpress: "ZES_EXPRESS",
  /** ZeptoExpress. */
  ZeptoExpress: "ZEPTO_EXPRESS",
  /** Skynet World Wide Express South Africa. */
  SkynetZa: "SKYNET_ZA",
  /** Zeek2Door. */
  Zeek2Door: "ZEEK_2_DOOR",
  /** Blink. */
  Blinklastmile: "BLINKLASTMILE",
  /** UkrPoshta. */
  PostaUkr: "POSTA_UKR",
  /** C.H. Robinson Worldwide. */
  Chrobinson: "CHROBINSON",
  /** Post56. */
  CnPost56: "CN_POST56",
  /** Courant Plus. */
  CourantPlus: "COURANT_PLUS",
  /** Scudex Express. */
  ScudexExpress: "SCUDEX_EXPRESS",
  /** ShipEntegra. */
  Shipentegra: "SHIPENTEGRA",
  /** B2C courier Europe. */
  BTwoCEurope: "B_TWO_C_EUROPE",
  /** Cope Sensitive Freight. */
  Cope: "COPE",
  /** Gati-KWE. */
  IndGati: "IND_GATI",
  /** WishPost. */
  CnWishpost: "CN_WISHPOST",
  /** NACEX Spain. */
  NacexEs: "NACEX_ES",
  /** TAQBIN Hong Kong. */
  TaqbinHk: "TAQBIN_HK",
  /** GlobalTranz. */
  Globaltranz: "GLOBALTRANZ",
  /** Qingdao HKD International Logistics. */
  Hkd: "HKD",
  /** BJS Distribution courier. */
  Bjshomedelivery: "BJSHOMEDELIVERY",
  /** Omniva. */
  Omniva: "OMNIVA",
  /** Sutton Transport. */
  Sutton: "SUTTON",
  /** Panther Reference. */
  PantherReference: "PANTHER_REFERENCE",
  /** SFC Service. */
  Sfcservice: "SFCSERVICE",
  /** LTL COURIER. */
  Ltl: "LTL",
  /** Park N Parcel. */
  Parknparcel: "PARKNPARCEL",
  /** Spring GDS. */
  SpringGds: "SPRING_GDS",
  /** ECexpress. */
  Ecexpress: "ECEXPRESS",
  /** Interparcel Australia. */
  InterparcelAu: "INTERPARCEL_AU",
  /** Agility. */
  Agility: "AGILITY",
  /** XL Express. */
  XlExpress: "XL_EXPRESS",
  /** Ader couriers. */
  Aderonline: "ADERONLINE",
  /** Direct Couriers. */
  Directcouriers: "DIRECTCOURIERS",
  /** Planzer Group. */
  Planzer: "PLANZER",
  /** Sending Transporte Urgente y Comunicacion. */
  Sending: "SENDING",
  /** Ninjavan Webhook. */
  NinjavanWb: "NINJAVAN_WB",
  /** Nationwide Express Courier Services Bhd (www.nationwide.com.my). */
  NationwideMy: "NATIONWIDE_MY",
  /** Sendit. */
  Sendit: "SENDIT",
  /** Arrow XL. */
  GbArrow: "GB_ARROW",
  /** GoJavas. */
  IndGojavas: "IND_GOJAVAS",
  /** Korea Post. */
  Kpost: "KPOST",
  /** DHL Freight. */
  DhlFreight: "DHL_FREIGHT",
  /** Bluecare Express Ltd. */
  Bluecare: "BLUECARE",
  /** jindouyun courier. */
  Jindouyun: "JINDOUYUN",
  /** Trackon Couriers Pvt. Ltd. */
  Trackon: "TRACKON",
  /** Tuffnells Parcels Express. */
  GbTuffnells: "GB_TUFFNELLS",
  /** TRUMPCARD LLC. */
  Trumpcard: "TRUMPCARD",
  /** eTotal Solution Limited. */
  Etotal: "ETOTAL",
  /** Zeek courier. */
  SfplusWebhook: "SFPLUS_WEBHOOK",
  /** SEKO Logistics. */
  Sekologistics: "SEKOLOGISTICS",
  /** Hermes Einrichtungs Service GmbH & Co. KG. */
  Hermes2MannHandling: "HERMES_2MANN_HANDLING",
  /** DPD Local reference. */
  DpdLocalRef: "DPD_LOCAL_REF",
  /** United Delivery Service. */
  Uds: "UDS",
  /** Specialised Freight. */
  ZaSpecialisedFreight: "ZA_SPECIALISED_FREIGHT",
  /** Kerry Express Thailand. */
  ThaKerry: "THA_KERRY",
  /** SEUR International. */
  PrtIntSeur: "PRT_INT_SEUR",
  /** Correios Brazil. */
  BraCorreios: "BRA_CORREIOS",
  /** New Zealand Post. */
  NzNzPost: "NZ_NZ_POST",
  /** Equick China. */
  CnEquick: "CN_EQUICK",
  /** Malaysia Post EMS / Pos Laju. */
  MysEms: "MYS_EMS",
  /** Norsk Global. */
  GbNorsk: "GB_NORSK",
  /** MRW spain. */
  EspMrw: "ESP_MRW",
  /** Packlink. */
  EspPacklink: "ESP_PACKLINK",
  /** Kangaroo Worldwide Express. */
  KangarooMy: "KANGAROO_MY",
  /** RPX Online. */
  Rpx: "RPX",
  /** XDP Express Reference. */
  XdpUkReference: "XDP_UK_REFERENCE",
  /** ninja van (www.ninjavan.co). */
  NinjavanMy: "NINJAVAN_MY",
  /** Adicional Logistics. */
  Adicional: "ADICIONAL",
  /** Red Carpet Logistics. */
  Roadbull: "ROADBULL",
  /** Yakit courier. */
  Yakit: "YAKIT",
  /** MailAmericas. */
  Mailamericas: "MAILAMERICAS",
  /** Mikropakket. */
  Mikropakket: "MIKROPAKKET",
  /** Dynamic Logistics. */
  Dynalogic: "DYNALOGIC",
  /** DHL Spain(www.dhl.com). */
  DhlEs: "DHL_ES",
  /** DHL Parcel NL. */
  DhlParcelNl: "DHL_PARCEL_NL",
  /** DHL Global Mail Asia (www.dhl.com). */
  DhlGlobalMailAsia: "DHL_GLOBAL_MAIL_ASIA",
  /** Dawn Wing. */
  DawnWing: "DAWN_WING",
  /** Geniki Taxydromiki. */
  GenikiGr: "GENIKI_GR",
  /** hermesworld_uk. */
  HermesworldUk: "HERMESWORLD_UK",
  /** Alphafast (www.alphafast.com). */
  Alphafast: "ALPHAFAST",
  /** buylogic. */
  Buylogic: "BUYLOGIC",
  /** Ekart logistics (ekartlogistics.com). */
  Ekart: "EKART",
  /** mexico senda express. */
  MexSenda: "MEX_SENDA",
  /** SFC. */
  SfcLogistics: "SFC_LOGISTICS",
  /** Posta Serbia. */
  PostSerbia: "POST_SERBIA",
  /** Delhivery India. */
  IndDelhivery: "IND_DELHIVERY",
  /** DPD Germany. */
  DeDpdDelistrack: "DE_DPD_DELISTRACK",
  /** RPD2man Deliveries. */
  Rpd2Man: "RPD2MAN",
  /** SF Express (www.sf-express.com). */
  CnSfExpress: "CN_SF_EXPRESS",
  /** Yanwen Logistics. */
  Yanwen: "YANWEN",
  /** Skynet Malaysia. */
  MysSkynet: "MYS_SKYNET",
  /** correos mexico. */
  CorreosDeMexico: "CORREOS_DE_MEXICO",
  /** CBL Logistica. */
  CblLogistica: "CBL_LOGISTICA",
  /** Estafeta (www.estafeta.com). */
  MexEstafeta: "MEX_ESTAFETA",
  /** Austrian Post (Registered). */
  AuAustrianPost: "AU_AUSTRIAN_POST",
  /** Rincos. */
  Rincos: "RINCOS",
  /** DHL Netherland. */
  NldDhl: "NLD_DHL",
  /** Russian post. */
  RussianPost: "RUSSIAN_POST",
  /** CouriersPlease (couriersplease.com.au). */
  CouriersPlease: "COURIERS_PLEASE",
  /** PostNord Logistics. */
  PostnordLogistics: "POSTNORD_LOGISTICS",
  /** Fedex. */
  Fedex: "FEDEX",
  /** DPE Express. */
  DpeExpress: "DPE_EXPRESS",
  /** DPD. */
  Dpd: "DPD",
  /** ADSone. */
  Adsone: "ADSONE",
  /** JNE Express (Jalur Nugraha Ekakurir). */
  IdnJne: "IDN_JNE",
  /** The Courier Guy. */
  Thecourierguy: "THECOURIERGUY",
  /** CNE Express. */
  Cnexps: "CNEXPS",
  /** Chronopost Portugal. */
  PrtChronopost: "PRT_CHRONOPOST",
  /** Landmark Global. */
  LandmarkGlobal: "LANDMARK_GLOBAL",
  /** DHL International. */
  ItDhlEcommerce: "IT_DHL_ECOMMERCE",
  /** NACEX Spain. */
  EspNacex: "ESP_NACEX",
  /** CTT Portugal. */
  PrtCtt: "PRT_CTT",
  /** Kiala. */
  BeKiala: "BE_KIALA",
  /** Asendia UK. */
  AsendiaUk: "ASENDIA_UK",
  /** TNT global. */
  GlobalTnt: "GLOBAL_TNT",
  /** Iceland Post. */
  PosturIs: "POSTUR_IS",
  /** eParcel Korea. */
  EparcelKr: "EPARCEL_KR",
  /** InPost Paczkomaty. */
  InpostPaczkomaty: "INPOST_PACZKOMATY",
  /** Poste italiane (www.poste.it). */
  ItPosteItalia: "IT_POSTE_ITALIA",
  /** Bpost (www.bpost.be). */
  BeBpost: "BE_BPOST",
  /** Poczta Polska (www.poczta-polska.pl). */
  PlPocztaPolska: "PL_POCZTA_POLSKA",
  /** Malaysia Post. */
  MysMysPost: "MYS_MYS_POST",
  /** Singapore Post. */
  SgSgPost: "SG_SG_POST",
  /** Thailand Post (www.thailandpost.co.th). */
  ThaThailandPost: "THA_THAILAND_POST",
  /** LexShip. */
  Lexship: "LEXSHIP",
  /** Fastway New Zealand. */
  FastwayNz: "FASTWAY_NZ",
  /** DHL Supply Chain Australia. */
  DhlAu: "DHL_AU",
  /** Cosmetics Now. */
  Costmeticsnow: "COSTMETICSNOW",
  /** PFL. */
  Pflogistics: "PFLOGISTICS",
  /** Loomis Express. */
  LoomisExpress: "LOOMIS_EXPRESS",
  /** GLS Italy. */
  GlsItaly: "GLS_ITALY",
  /** Line Clear Express & Logistics Sdn Bhd. */
  Line: "LINE",
  /** Gel Express Logistik. */
  GelExpress: "GEL_EXPRESS",
  /** Huodull. */
  Huodull: "HUODULL",
  /** Ninja van Singapore. */
  NinjavanSg: "NINJAVAN_SG",
  /** Janio Asia. */
  Janio: "JANIO",
  /** AO Logistics. */
  AoCourier: "AO_COURIER",
  /** BRT Bartolini(Sender Reference). */
  BrtItSenderRef: "BRT_IT_SENDER_REF",
  /** SAILPOST. */
  Sailpost: "SAILPOST",
  /** Lalamove. */
  Lalamove: "LALAMOVE",
  /** NEW ZEALAND COURIERS. */
  NewzealandCouriers: "NEWZEALAND_COURIERS",
  /** Etomars. */
  Etomars: "ETOMARS",
  /** VIR Transport. */
  Virtransport: "VIRTRANSPORT",
  /** Wizmo. */
  Wizmo: "WIZMO",
  /** Palletways. */
  Palletways: "PALLETWAYS",
  /** i-dika. */
  IDika: "I_DIKA",
  /** CFL Logistics. */
  CflLogistics: "CFL_LOGISTICS",
  /** GEM Worldwide. */
  Gemworldwide: "GEMWORLDWIDE",
  /** Tai Wan Global Business. */
  GlobalExpress: "GLOBAL_EXPRESS",
  /** Transgroup courier. */
  LogistyxTransgroup: "LOGISTYX_TRANSGROUP",
  /** West Bank Courier. */
  WestbankCourier: "WESTBANK_COURIER",
  /** Arco Spedizioni SP. */
  ArcoSpedizioni: "ARCO_SPEDIZIONI",
  /** YDH express. */
  YdhExpress: "YDH_EXPRESS",
  /** Parcelink Logistics. */
  Parcelinklogistics: "PARCELINKLOGISTICS",
  /** CND Express. */
  Cndexpress: "CNDEXPRESS",
  /** NOX NightTimeExpress. */
  NoxNightTimeExpress: "NOX_NIGHT_TIME_EXPRESS",
  /** Aeronet couriers. */
  Aeronet: "AERONET",
  /** LTIAN EXP. */
  Ltianexp: "LTIANEXP",
  /** Integra2. */
  Integra2Ftp: "INTEGRA2_FTP",
  /** PARCEL ONE. */
  Parcelone: "PARCELONE",
  /** Innight Express Germany GmbH (nox NachtExpress). */
  NoxNachtexpress: "NOX_NACHTEXPRESS",
  /** China Post. */
  CnChinaPostEms: "CN_CHINA_POST_EMS",
  /** Chukou1. */
  Chukou1: "CHUKOU1",
  /** GLS General Logistics Systems Slovakia s.r.o.. */
  GlsSlov: "GLS_SLOV",
  /** OrangeDS (Orange Distribution Solutions Inc). */
  OrangeDs: "ORANGE_DS",
  /** Joom Logistics. */
  JoomLogis: "JOOM_LOGIS",
  /** StarTrack (startrack.com.au). */
  AusStartrack: "AUS_STARTRACK",
  /** dhl Global. */
  Dhl: "DHL",
  /** APC postal logistics germany. */
  GbApc: "GB_APC",
  /** Bonds Courier Service (bondscouriers.com.au). */
  Bondscouriers: "BONDSCOURIERS",
  /** Japan Post. */
  JpnJapanPost: "JPN_JAPAN_POST",
  /** United States Postal Service. */
  Usps: "USPS",
  /** WinIt. */
  Winit: "WINIT",
  /** OCA Argentina. */
  ArgOca: "ARG_OCA",
  /** Taiwan Post. */
  TwTaiwanPost: "TW_TAIWAN_POST",
  /** DMM Network. */
  DmmNetwork: "DMM_NETWORK",
  /** TNT Express. */
  Tnt: "TNT",
  /** BH Posta (www.posta.ba). */
  BhPosta: "BH_POSTA",
  /** Postnord sweden. */
  SwePostnord: "SWE_POSTNORD",
  /** Canada Post. */
  CaCanadaPost: "CA_CANADA_POST",
  /** Wiseloads. */
  Wiseloads: "WISELOADS",
  /** Asendia HonKong. */
  AsendiaHk: "ASENDIA_HK",
  /** GLS Netherland. */
  NldGls: "NLD_GLS",
  /** Redpack. */
  MexRedpack: "MEX_REDPACK",
  /** Jet-Ship Worldwide. */
  JetShip: "JET_SHIP",
  /** DHL Express. */
  DeDhlExpress: "DE_DHL_EXPRESS",
  /** Ninja van Thai. */
  NinjavanThai: "NINJAVAN_THAI",
  /** Raben Group. */
  RabenGroup: "RABEN_GROUP",
  /** ASM(GLS Spain). */
  EspAsm: "ESP_ASM",
  /** Hrvatska posta. */
  HrvHrvatska: "HRV_HRVATSKA",
  /** Estes Express Lines. */
  GlobalEstes: "GLOBAL_ESTES",
  /** Lietuvos pastas. */
  LtuLietuvos: "LTU_LIETUVOS",
  /** DHL Benelux. */
  BelDhl: "BEL_DHL",
  /** Australia Post. */
  AuAuPost: "AU_AU_POST",
  /** SPEEDEX couriers. */
  Speedexcourier: "SPEEDEXCOURIER",
  /** Colissimo. */
  FrColis: "FR_COLIS",
  /** Aramex. */
  Aramex: "ARAMEX",
  /** DPEX (www.dpex.com). */
  Dpex: "DPEX",
  /** Airpak Express. */
  MysAirpak: "MYS_AIRPAK",
  /** Cuckoo Express. */
  Cuckooexpress: "CUCKOOEXPRESS",
  /** DPD Poland. */
  DpdPoland: "DPD_POLAND",
  /** PostNL International. */
  NldPostnl: "NLD_POSTNL",
  /** Nim Express. */
  NimExpress: "NIM_EXPRESS",
  /** Quantium. */
  Quantium: "QUANTIUM",
  /** Sendle. */
  Sendle: "SENDLE",
  /** Redur Spain. */
  EspRedur: "ESP_REDUR",
  /** Matkahuolto. */
  Matkahuolto: "MATKAHUOLTO",
  /** Cpacket couriers. */
  Cpacket: "CPACKET",
  /** Posti courier. */
  Posti: "POSTI",
  /** Hunter Express. */
  HunterExpress: "HUNTER_EXPRESS",
  /** Choir Express Indonesia. */
  ChoirExp: "CHOIR_EXP",
  /** Legion Express. */
  LegionExpress: "LEGION_EXPRESS",
  /** austrian post. */
  AustrianPostExpress: "AUSTRIAN_POST_EXPRESS",
  /** Grupo ampm. */
  Grupo: "GRUPO",
  /** Post Roman (www.posta-romana.ro). */
  PostaRo: "POSTA_RO",
  /** Interparcel UK. */
  InterparcelUk: "INTERPARCEL_UK",
  /** ABF Freight. */
  GlobalAbf: "GLOBAL_ABF",
  /** Posten Norge (www.posten.no). */
  PostenNorge: "POSTEN_NORGE",
  /** Xpert Delivery. */
  XpertDelivery: "XPERT_DELIVERY",
  /** DHl (Reference number). */
  DhlRefr: "DHL_REFR",
  /** DHL HonKong. */
  DhlHk: "DHL_HK",
  /** SKYNET UAE. */
  SkynetUae: "SKYNET_UAE",
  /** Gojek. */
  Gojek: "GOJEK",
  /** Yodel International. */
  YodelIntnl: "YODEL_INTNL",
  /** Janco Ecommerce. */
  Janco: "JANCO",
  /** YTO Express. */
  Yto: "YTO",
  /** Wise Express. */
  WiseExpress: "WISE_EXPRESS",
  /** J&T Express Vietnam. */
  JtexpressVn: "JTEXPRESS_VN",
  /** FedEx International MailService. */
  FedexIntlMlserv: "FEDEX_INTL_MLSERV",
  /** VAMOX. */
  Vamox: "VAMOX",
  /** AMS Group. */
  AmsGrp: "AMS_GRP",
  /** DHL Japan. */
  DhlJp: "DHL_JP",
  /** HR Parcel. */
  Hrparcel: "HRPARCEL",
  /** GESWL Express. */
  Geswl: "GESWL",
  /** Blue Star. */
  Bluestar: "BLUESTAR",
  /** CDEK TR. */
  CdekTr: "CDEK_TR",
  /** Innovel courier. */
  Descartes: "DESCARTES",
  /** Deltec Courier. */
  DeltecUk: "DELTEC_UK",
  /** DTDC express. */
  DtdcExpress: "DTDC_EXPRESS",
  /** tourline. */
  Tourline: "TOURLINE",
  /** B&H Worldwide. */
  BhWorldwide: "BH_WORLDWIDE",
  /** OCS ANA Group. */
  Ocs: "OCS",
  /** yingnuo logistics. */
  YingnuoLogistics: "YINGNUO_LOGISTICS",
  /** United Parcel Service. */
  Ups: "UPS",
  /** Toll IPEC. */
  Toll: "TOLL",
  /** SEUR portugal. */
  PrtSeur: "PRT_SEUR",
  /** DTDC Australia. */
  DtdcAu: "DTDC_AU",
  /** Dynamic Logistics. */
  ThaDynamicLogistics: "THA_DYNAMIC_LOGISTICS",
  /** UBI Smart Parcel. */
  UbiLogistics: "UBI_LOGISTICS",
  /** FedEx Cross Border. */
  FedexCrossborder: "FEDEX_CROSSBORDER",
  /** A1Post. */
  A1Post: "A1POST",
  /** Tazmanian Freight Systems. */
  TazmanianFreight: "TAZMANIAN_FREIGHT",
  /** CJ International malaysia. */
  CjIntMy: "CJ_INT_MY",
  /** Saia LTL Freight. */
  SaiaFreight: "SAIA_FREIGHT",
  /** Qxpress. */
  SgQxpress: "SG_QXPRESS",
  /** Nhans Solutions. */
  NhansSolutions: "NHANS_SOLUTIONS",
  /** DPD France. */
  DpdFr: "DPD_FR",
  /** Coordinadora. */
  Coordinadora: "COORDINADORA",
  /** Grupo logistico Andreani. */
  Andreani: "ANDREANI",
  /** Doora Logistics. */
  Doora: "DOORA",
  /** Interparcel New Zealand. */
  InterparcelNz: "INTERPARCEL_NZ",
  /** Jam Express Philippines. */
  PhlJamexpress: "PHL_JAMEXPRESS",
  /** bel_belgium_post. */
  BelBelgiumPost: "BEL_BELGIUM_POST",
  /** us_apc. */
  UsApc: "US_APC",
  /** idn_pos. */
  IdnPos: "IDN_POS",
  /** fr_mondial. */
  FrMondial: "FR_MONDIAL",
  /** DE DHL. */
  DeDhl: "DE_DHL",
  /** hk_rpx. */
  HkRpx: "HK_RPX",
  /** dhl_pieceid. */
  DhlPieceid: "DHL_PIECEID",
  /** vnpost_ems. */
  VnpostEms: "VNPOST_EMS",
  /** rrdonnelley. */
  Rrdonnelley: "RRDONNELLEY",
  /** dpd_de. */
  DpdDe: "DPD_DE",
  /** delcart_in. */
  DelcartIn: "DELCART_IN",
  /** imexglobalsolutions. */
  Imexglobalsolutions: "IMEXGLOBALSOLUTIONS",
  /** ACOMMERCE. */
  Acommerce: "ACOMMERCE",
  /** eurodis. */
  Eurodis: "EURODIS",
  /** CANPAR. */
  Canpar: "CANPAR",
  /** GLS. */
  Gls: "GLS",
  /** Ecom Express. */
  IndEcom: "IND_ECOM",
  /** Envialia. */
  EspEnvialia: "ESP_ENVIALIA",
  /** dhl UK. */
  DhlUk: "DHL_UK",
  /** SMSA Express. */
  SmsaExpress: "SMSA_EXPRESS",
  /** TNT France. */
  TntFr: "TNT_FR",
  /** DEX-I courier. */
  DexI: "DEX_I",
  /** Budbee courier. */
  BudbeeWebhook: "BUDBEE_WEBHOOK",
  /** Copa Airlines Courier. */
  CopaCourier: "COPA_COURIER",
  /** Vietnam Post. */
  VnmVietnamPost: "VNM_VIETNAM_POST",
  /** DPD HongKong. */
  DpdHk: "DPD_HK",
  /** Toll New Zealand. */
  TollNz: "TOLL_NZ",
  /** Echo courier. */
  Echo: "ECHO",
  /** FedEx® Freight. */
  FedexFr: "FEDEX_FR",
  /** Border Express. */
  Borderexpress: "BORDEREXPRESS",
  /** MailPlus (Japan). */
  MailplusJpn: "MAILPLUS_JPN",
  /** TNT UK Reference. */
  TntUkRefr: "TNT_UK_REFR",
  /** KEC courier. */
  Kec: "KEC",
  /** DPD Romania. */
  DpdRo: "DPD_RO",
  /** TNT_JP. */
  TntJp: "TNT_JP",
  /** TH_CJ. */
  ThCj: "TH_CJ",
  /** EC_CN. */
  EcCn: "EC_CN",
  /** FASTWAY_UK. */
  FastwayUk: "FASTWAY_UK",
  /** FASTWAY_US. */
  FastwayUs: "FASTWAY_US",
  /** GLS_DE. */
  GlsDe: "GLS_DE",
  /** GLS_ES. */
  GlsEs: "GLS_ES",
  /** GLS_FR. */
  GlsFr: "GLS_FR",
  /** MONDIAL_BE. */
  MondialBe: "MONDIAL_BE",
  /** SGT_IT. */
  SgtIt: "SGT_IT",
  /** TNT_CN. */
  TntCn: "TNT_CN",
  /** TNT_DE. */
  TntDe: "TNT_DE",
  /** TNT_ES. */
  TntEs: "TNT_ES",
  /** TNT_PL. */
  TntPl: "TNT_PL",
  /** PARCELFORCE. */
  Parcelforce: "PARCELFORCE",
  /** SWISS POST. */
  SwissPost: "SWISS_POST",
  /** TOLL IPEC. */
  TollIpec: "TOLL_IPEC",
  /** AIR 21. */
  Air21: "AIR_21",
  /** AIRSPEED. */
  Airspeed: "AIRSPEED",
  /** BERT. */
  Bert: "BERT",
  /** BLUEDART. */
  Bluedart: "BLUEDART",
  /** COLLECTPLUS. */
  Collectplus: "COLLECTPLUS",
  /** COURIERPLUS. */
  Courierplus: "COURIERPLUS",
  /** COURIER POST. */
  CourierPost: "COURIER_POST",
  /** dhl_global_mail. */
  DhlGlobalMail: "DHL_GLOBAL_MAIL",
  /** dpd_uk. */
  DpdUk: "DPD_UK",
  /** DELTEC DE. */
  DeltecDe: "DELTEC_DE",
  /** deutsche_de. */
  DeutscheDe: "DEUTSCHE_DE",
  /** DOTZOT. */
  Dotzot: "DOTZOT",
  /** elta_gr. */
  EltaGr: "ELTA_GR",
  /** ems_cn. */
  EmsCn: "EMS_CN",
  /** ECARGO. */
  Ecargo: "ECARGO",
  /** ENSENDA. */
  Ensenda: "ENSENDA",
  /** fercam_it. */
  FercamIt: "FERCAM_IT",
  /** fastway_za. */
  FastwayZa: "FASTWAY_ZA",
  /** fastway_au. */
  FastwayAu: "FASTWAY_AU",
  /** first_logisitcs. */
  FirstLogisitcs: "FIRST_LOGISITCS",
  /** GEODIS. */
  Geodis: "GEODIS",
  /** GLOBEGISTICS. */
  Globegistics: "GLOBEGISTICS",
  /** GREYHOUND. */
  Greyhound: "GREYHOUND",
  /** jetship_my. */
  JetshipMy: "JETSHIP_MY",
  /** LION PARCEL. */
  LionParcel: "LION_PARCEL",
  /** AEROFLASH. */
  Aeroflash: "AEROFLASH",
  /** ONTRAC. */
  Ontrac: "ONTRAC",
  /** SAGAWA. */
  Sagawa: "SAGAWA",
  /** SIODEMKA. */
  Siodemka: "SIODEMKA",
  /** startrack. */
  Startrack: "STARTRACK",
  /** tnt_au. */
  TntAu: "TNT_AU",
  /** tnt_it. */
  TntIt: "TNT_IT",
  /** TRANSMISSION. */
  Transmission: "TRANSMISSION",
  /** YAMATO. */
  Yamato: "YAMATO",
  /** dhl_it. */
  DhlIt: "DHL_IT",
  /** dhl_at. */
  DhlAt: "DHL_AT",
  /** LOGISTICSWORLDWIDE KR. */
  LogisticsworldwideKr: "LOGISTICSWORLDWIDE_KR",
  /** gls_spain. */
  GlsSpain: "GLS_SPAIN",
  /** amazon_uk_api. */
  AmazonUkApi: "AMAZON_UK_API",
  /** dpd_fr_reference. */
  DpdFrReference: "DPD_FR_REFERENCE",
  /** dhlparcel_uk. */
  DhlparcelUk: "DHLPARCEL_UK",
  /** megasave. */
  Megasave: "MEGASAVE",
  /** qualitypost. */
  Qualitypost: "QUALITYPOST",
  /** ids_logistics. */
  IdsLogistics: "IDS_LOGISTICS",
  /** joyingbox. */
  Joyingbox: "JOYINGBOX",
  /** panther_order_number. */
  PantherOrderNumber: "PANTHER_ORDER_NUMBER",
  /** watkins_shepard. */
  WatkinsShepard: "WATKINS_SHEPARD",
  /** fasttrack. */
  Fasttrack: "FASTTRACK",
  /** up_express. */
  UpExpress: "UP_EXPRESS",
  /** elogistica. */
  Elogistica: "ELOGISTICA",
  /** ecourier. */
  Ecourier: "ECOURIER",
  /** cj_philippines. */
  CjPhilippines: "CJ_PHILIPPINES",
  /** speedex. */
  Speedex: "SPEEDEX",
  /** orangeconnex. */
  Orangeconnex: "ORANGECONNEX",
  /** tecor. */
  Tecor: "TECOR",
  /** saee. */
  Saee: "SAEE",
  /** gls_italy_ftp. */
  GlsItalyFtp: "GLS_ITALY_FTP",
  /** delivere. */
  Delivere: "DELIVERE",
  /** yycom. */
  Yycom: "YYCOM",
  /** Adicional Logistics. */
  AdicionalPt: "ADICIONAL_PT",
  /** DKSH. */
  Dksh: "DKSH",
  /** Nippon Express. */
  NipponExpressFtp: "NIPPON_EXPRESS_FTP",
  /** GO Logistics & Storage. */
  Gols: "GOLS",
  /** FUJIE EXPRESS. */
  Fujexp: "FUJEXP",
  /** QTrack. */
  Qtrack: "QTRACK",
  /** OM LOGISTICS LTD. */
  OmlogisticsApi: "OMLOGISTICS_API",
  /** GDPharm Logistics. */
  Gdpharm: "GDPHARM",
  /** MISUMI Group Inc.. */
  MisumiCn: "MISUMI_CN",
  /** Rivo. */
  AirCanada: "AIR_CANADA",
  /** City Express. */
  City56Webhook: "CITY56_WEBHOOK",
  /** Sagawa. */
  SagawaApi: "SAGAWA_API",
  /** KedaEX. */
  Kedaex: "KEDAEX",
  /** Pgeon. */
  PgeonApi: "PGEON_API",
  /** We World Express. */
  Weworldexpress: "WEWORLDEXPRESS",
  /** J&T International logistics. */
  JtLogistics: "JT_LOGISTICS",
  /** Trusk France. */
  Trusk: "TRUSK",
  /** ViaXpress. */
  Viaxpress: "VIAXPRESS",
  /** DHL Supply Chain Indonesia. */
  DhlSupplychainId: "DHL_SUPPLYCHAIN_ID",
  /** Zuellig Pharma Korea. */
  ZuelligpharmaSftp: "ZUELLIGPHARMA_SFTP",
  /** Meest. */
  Meest: "MEEST",
  /** Toll Priority. */
  TollPriority: "TOLL_PRIORITY",
  /** Mothership. */
  MothershipApi: "MOTHERSHIP_API",
  /** Capital Transport. */
  Capital: "CAPITAL",
  /** Europacket+. */
  EuropaketApi: "EUROPAKET_API",
  /** HFD. */
  Hfd: "HFD",
  /** Tourline Express. */
  TourlineReference: "TOURLINE_REFERENCE",
  /** GIO Express Inc. */
  GioEcourier: "GIO_ECOURIER",
  /** CN Logistics. */
  CnLogistics: "CN_LOGISTICS",
  /** Pandion. */
  Pandion: "PANDION",
  /** Bpost API. */
  BpostApi: "BPOST_API",
  /** Passport Shipping. */
  Passportshipping: "PASSPORTSHIPPING",
  /** Pakajo World. */
  Pakajo: "PAKAJO",
  /** DACHSER. */
  Dachser: "DACHSER",
  /** Yusen Logistics. */
  YusenSftp: "YUSEN_SFTP",
  /** Shypmax. */
  Shyplite: "SHYPLITE",
  /** Xingyunyi Logistics. */
  Xyy: "XYY",
  /** Metropolitan Warehouse & Delivery. */
  Mwd: "MWD",
  /** Faxe Cargo. */
  Faxecargo: "FAXECARGO",
  /** Groupe Mazet. */
  Mazet: "MAZET",
  /** First Logistics. */
  FirstLogisticsApi: "FIRST_LOGISTICS_API",
  /** SPRINT PACK. */
  SprintPack: "SPRINT_PACK",
  /** Hermes Germany. */
  HermesDeFtp: "HERMES_DE_FTP",
  /** Concise. */
  Concise: "CONCISE",
  /** Kerry Express TaiWan. */
  KerryExpressTwApi: "KERRY_EXPRESS_TW_API",
  /** EWE Global Express. */
  Ewe: "EWE",
  /** Fast Despatch Logistics Limited. */
  Fastdespatch: "FASTDESPATCH",
  /** AB Custom Group. */
  AbcustomSftp: "ABCUSTOM_SFTP",
  /** Chazki. */
  Chazki: "CHAZKI",
  /** Shippie. */
  Shippie: "SHIPPIE",
  /** GEODIS - Distribution & Express. */
  GeodisApi: "GEODIS_API",
  /** Naqel Express. */
  NaqelExpress: "NAQEL_EXPRESS",
  /** Papa. */
  PapaWebhook: "PAPA_WEBHOOK",
  /** Forward Air. */
  Forwardair: "FORWARDAIR",
  /** Dialogo Logistica. */
  DialogoLogisticaApi: "DIALOGO_LOGISTICA_API",
  /** Lalamove. */
  LalamoveApi: "LALAMOVE_API",
  /** Tomydoor. */
  Tomydoor: "TOMYDOOR",
  /** Kronos Express. */
  KronosWebhook: "KRONOS_WEBHOOK",
  /** J&T CARGO. */
  Jtcargo: "JTCARGO",
  /** T-cat. */
  TCat: "T_CAT",
  /** Concise. */
  ConciseWebhook: "CONCISE_WEBHOOK",
  /** Teleport. */
  TeleportWebhook: "TELEPORT_WEBHOOK",
  /** The Custom Companies. */
  CustomcoApi: "CUSTOMCO_API",
  /** Shopee Xpress. */
  SpxTh: "SPX_TH",
  /** Bollore Logistics. */
  BolloreLogistics: "BOLLORE_LOGISTICS",
  /** ClickLink. */
  ClicklinkSftp: "CLICKLINK_SFTP",
  /** M3 Logistics. */
  M3Logistics: "M3LOGISTICS",
  /** Vietnam Post. */
  VnpostApi: "VNPOST_API",
  /** Axlehire. */
  AxlehireFtp: "AXLEHIRE_FTP",
  /** Shadowfax. */
  Shadowfax: "SHADOWFAX",
  /** EVRi. */
  MyhermesUkApi: "MYHERMES_UK_API",
  /** Daiichi Freight System Inc. */
  Daiichi: "DAIICHI",
  /** Mensajeros Urbanos. */
  MensajerosurbanosApi: "MENSAJEROSURBANOS_API",
  /** PolarSpeed Inc. */
  Polarspeed: "POLARSPEED",
  /** iDexpress Indonesia. */
  IdexpressId: "IDEXPRESS_ID",
  /** Payo. */
  Payo: "PAYO",
  /** Whistl. */
  WhistlSftp: "WHISTL_SFTP",
  /** INTEX Paketdienst GmbH. */
  IntexDe: "INTEX_DE",
  /** Trans2u. */
  Trans2U: "TRANS2U",
  /** Product Care Services Limited. */
  ProductcaregroupSftp: "PRODUCTCAREGROUP_SFTP",
  /** Big Smart. */
  Bigsmart: "BIGSMART",
  /** Expeditors API Reference. */
  ExpeditorsApiRef: "EXPEDITORS_API_REF",
  /** AIT. */
  AitworldwideApi: "AITWORLDWIDE_API",
  /** World Courier. */
  Worldcourier: "WORLDCOURIER",
  /** Quiqup. */
  Quiqup: "QUIQUP",
  /** Agediss. */
  AgedissSftp: "AGEDISS_SFTP",
  /** Andreani. */
  AndreaniApi: "ANDREANI_API",
  /** CRL Express. */
  Crlexpress: "CRLEXPRESS",
  /** SMARTCAT. */
  Smartcat: "SMARTCAT",
  /** Crossflight Limited. */
  Crossflight: "CROSSFLIGHT",
  /** Pro Carrier. */
  Procarrier: "PROCARRIER",
  /** DHL (Reference number). */
  DhlReferenceApi: "DHL_REFERENCE_API",
  /** Seino. */
  SeinoApi: "SEINO_API",
  /** WSP Express. */
  Wspexpress: "WSPEXPRESS",
  /** Kronos Express. */
  Kronos: "KRONOS",
  /** Total Express. */
  TotalExpressApi: "TOTAL_EXPRESS_API",
  /** PARCLL. */
  Parcll: "PARCLL",
  /** Xpedigo. */
  Xpedigo: "XPEDIGO",
  /** StarTrack. */
  StarTrackWebhook: "STAR_TRACK_WEBHOOK",
  /** Georgian Post. */
  Gpost: "GPOST",
  /** UCS. */
  Ucs: "UCS",
  /** DMF. */
  Dmfgroup: "DMFGROUP",
  /** Coordinadora. */
  CoordinadoraApi: "COORDINADORA_API",
  /** Marken. */
  Marken: "MARKEN",
  /** NTL logistics. */
  Ntl: "NTL",
  /** Red je Pakketje. */
  Redjepakketje: "REDJEPAKKETJE",
  /** Allied Express (FTP). */
  AlliedExpressFtp: "ALLIED_EXPRESS_FTP",
  /** Mondial Relay Spain(Punto Pack). */
  MondialrelayEs: "MONDIALRELAY_ES",
  /** Naeko Logistics. */
  NaekoFtp: "NAEKO_FTP",
  /** Mhi. */
  Mhi: "MHI",
  /** Shippify, Inc. */
  Shippify: "SHIPPIFY",
  /** Malca Amit. */
  MalcaAmitApi: "MALCA_AMIT_API",
  /** J&T Express Singapore. */
  JtexpressSgApi: "JTEXPRESS_SG_API",
  /** DACHSER. */
  DachserWeb: "DACHSER_WEB",
  /** Flight Logistics Group. */
  Flightlg: "FLIGHTLG",
  /** Cago. */
  Cago: "CAGO",
  /** ComOne Express. */
  Com1Express: "COM1EXPRESS",
  /** Tonami. */
  TonamiFtp: "TONAMI_FTP",
  /** PACKFLEET. */
  Packfleet: "PACKFLEET",
  /** Purolator International. */
  PurolatorInternational: "PUROLATOR_INTERNATIONAL",
  /** Wineshipping. */
  WineshippingWebhook: "WINESHIPPING_WEBHOOK",
  /** DHL Spain Domestic. */
  DhlEsSftp: "DHL_ES_SFTP",
  /** 網家速配股份有限公司. */
  PchomeApi: "PCHOME_API",
  /** Czech Post. */
  CeskapostaApi: "CESKAPOSTA_API",
  /** Go Rush. */
  Gorush: "GORUSH",
  /** HomeRunner. */
  Homerunner: "HOMERUNNER",
  /** Amazon order. */
  AmazonOrder: "AMAZON_ORDER",
  /** Estes Forwarding Worldwide. */
  EfwnowApi: "EFWNOW_API",
  /** CBL Logistica (API). */
  CblLogisticaApi: "CBL_LOGISTICA_API",
  /** NimbusPost. */
  Nimbuspost: "NIMBUSPOST",
  /** Logwin Logistics. */
  LogwinLogistics: "LOGWIN_LOGISTICS",
  /** Sequoialog. */
  NowlogApi: "NOWLOG_API",
  /** DPD Netherlands. */
  DpdNl: "DPD_NL",
  /** Dependable Supply Chain Services. */
  Godependable: "GODEPENDABLE",
  /** Top Ideal Express. */
  Esdex: "ESDEX",
  /** Kiitäjät. */
  LogisystemsSftp: "LOGISYSTEMS_SFTP",
  /** Expeditors. */
  Expeditors: "EXPEDITORS",
  /** Snt Global Etrax. */
  SntglobalApi: "SNTGLOBAL_API",
  /** ShipX. */
  Shipx: "SHIPX",
  /** Quickstat Courier LLC. */
  QintlApi: "QINTL_API",
  /** Packs. */
  Packs: "PACKS",
  /** PostNL International. */
  PostnlInternational: "POSTNL_INTERNATIONAL",
  /** Amazon. */
  AmazonEmailPush: "AMAZON_EMAIL_PUSH",
  /** DHL. */
  DhlApi: "DHL_API",
  /** Shopee Express. */
  Spx: "SPX",
  /** AxleHire. */
  Axlehire: "AXLEHIRE",
  /** ICS COURIER. */
  Icscourier: "ICSCOURIER",
  /** Dialogo Logistica. */
  DialogoLogistica: "DIALOGO_LOGISTICA",
  /** ShunBang Express. */
  ShunbangExpress: "SHUNBANG_EXPRESS",
  /** TCS. */
  TcsApi: "TCS_API",
  /** SF Express China. */
  SfExpressCn: "SF_EXPRESS_CN",
  /** Packeta. */
  Packeta: "PACKETA",
  /** Teliway SIC Express. */
  SicTeliway: "SIC_TELIWAY",
  /** Mondial Relay France. */
  MondialrelayFr: "MONDIALRELAY_FR",
  /** InTime. */
  IntimeFtp: "INTIME_FTP",
  /** 京东物流. */
  JdExpress: "JD_EXPRESS",
  /** Fastbox. */
  Fastbox: "FASTBOX",
  /** Patheon Logistics. */
  Patheon: "PATHEON",
  /** India Post Domestic. */
  IndiaPost: "INDIA_POST",
  /** Tipsa Reference. */
  TipsaRef: "TIPSA_REF",
  /** Eco Freight. */
  Ecofreight: "ECOFREIGHT",
  /** VOX SOLUCION EMPRESARIAL SRL. */
  Vox: "VOX",
  /** Direct Freight Express. */
  DirectfreightAuRef: "DIRECTFREIGHT_AU_REF",
  /** Best Transport. */
  BesttransportSftp: "BESTTRANSPORT_SFTP",
  /** Australia Post. */
  AustraliaPostApi: "AUSTRALIA_POST_API",
  /** FragilePAK. */
  FragilepakSftp: "FRAGILEPAK_SFTP",
  /** FlipXpress. */
  Flipxp: "FLIPXP",
  /** Value Logistics. */
  ValueWebhook: "VALUE_WEBHOOK",
  /** Daeshin. */
  Daeshin: "DAESHIN",
  /** Sherpa. */
  Sherpa: "SHERPA",
  /** Metropolitan Warehouse & Delivery. */
  MwdApi: "MWD_API",
  /** SmartKargo. */
  Smartkargo: "SMARTKARGO",
  /** DNJ Express. */
  DnjExpress: "DNJ_EXPRESS",
  /** Go People. */
  Gopeople: "GOPEOPLE",
  /** mySendle. */
  MysendleApi: "MYSENDLE_API",
  /** Aramex. */
  AramexApi: "ARAMEX_API",
  /** Pidge. */
  Pidge: "PIDGE",
  /** TP Logistic. */
  Thaiparcels: "THAIPARCELS",
  /** Panther Reference. */
  PantherReferenceApi: "PANTHER_REFERENCE_API",
  /** Posta Plus. */
  Postaplus: "POSTAPLUS",
  /** BUFFALO. */
  Buffalo: "BUFFALO",
  /** U-ENVIOS. */
  UEnvios: "U_ENVIOS",
  /** Elite Express. */
  EliteCo: "ELITE_CO",
  /** Roche Internal Courier. */
  RocheInternalSftp: "ROCHE_INTERNAL_SFTP",
  /** DB Schenker Iceland. */
  DbschenkerIceland: "DBSCHENKER_ICELAND",
  /** TNT France Reference. */
  TntFrReference: "TNT_FR_REFERENCE",
  /** Newgistics API. */
  Newgisticsapi: "NEWGISTICSAPI",
  /** Glovo. */
  Glovo: "GLOVO",
  /** G.I.G. */
  GwlogisApi: "GWLOGIS_API",
  /** Spreetail. */
  SpreetailApi: "SPREETAIL_API",
  /** Moova. */
  Moova: "MOOVA",
  /** Plycon Transportation Group. */
  Plycongroup: "PLYCONGROUP",
  /** USPS Informed Visibility - Webhook. */
  UspsWebhook: "USPS_WEBHOOK",
  /** maergo. */
  Reimaginedelivery: "REIMAGINEDELIVERY",
  /** Eurodifarm. */
  EdfFtp: "EDF_FTP",
  /** DAO365. */
  Dao365: "DAO365",
  /** BioCair. */
  BiocairFtp: "BIOCAIR_FTP",
  /** Ransa. */
  RansaWebhook: "RANSA_WEBHOOK",
  /** SHIPXPRESS. */
  Shipxpres: "SHIPXPRES",
  /** Courant Plus. */
  CourantPlusApi: "COURANT_PLUS_API",
  /** SHIPA. */
  Shipa: "SHIPA",
  /** Home Logistics. */
  Homelogistics: "HOMELOGISTICS",
  /** DX. */
  Dx: "DX",
  /** Poste Italiane Paccocelere. */
  PosteItalianePaccocelere: "POSTE_ITALIANE_PACCOCELERE",
  /** Toll Group. */
  TollWebhook: "TOLL_WEBHOOK",
  /** LCT do Brasil. */
  LctbrApi: "LCTBR_API",
  /** DX Freight. */
  DxFreight: "DX_FREIGHT",
  /** DHL Express. */
  DhlSftp: "DHL_SFTP",
  /** Shiprocket X. */
  Shiprocket: "SHIPROCKET",
  /** Uber. */
  UberWebhook: "UBER_WEBHOOK",
  /** Stat Overnight. */
  Statovernight: "STATOVERNIGHT",
  /** Burd Delivery. */
  Burd: "BURD",
  /** Fastship Express. */
  Fastship: "FASTSHIP",
  /** IB Venture. */
  IbventureWebhook: "IBVENTURE_WEBHOOK",
  /** Gati-KWE. */
  GatiKweApi: "GATI_KWE_API",
  /** CryoPDP. */
  CryopdpFtp: "CRYOPDP_FTP",
  /** HUBBED. */
  Hubbed: "HUBBED",
  /** Tipsa API. */
  TipsaApi: "TIPSA_API",
  /** Aras Cargo. */
  Araskargo: "ARASKARGO",
  /** Thijs Logistiek. */
  ThijsNl: "THIJS_NL",
  /** ATS Healthcare. */
  AtshealthcareReference: "ATSHEALTHCARE_REFERENCE",
  /** 99minutos. */
  _99Minutos: "99MINUTOS",
  /** Hellenic (Greece) Post. */
  HellenicPost: "HELLENIC_POST",
  /** HSM Global. */
  HsmGlobal: "HSM_GLOBAL",
  /** MNX. */
  Mnx: "MNX",
  /** N&M Transfer Co., Inc.. */
  Nmtransfer: "NMTRANSFER",
  /** Logysto. */
  Logysto: "LOGYSTO",
  /** India Post International. */
  IndiaPostInt: "INDIA_POST_INT",
  /** Swiship IN. */
  AmazonFbaSwishipIn: "AMAZON_FBA_SWISHIP_IN",
  /** SRT Transport. */
  SrtTransport: "SRT_TRANSPORT",
  /** Bomi Group. */
  Bomi: "BOMI",
  /** Deliverr. */
  DeliverrSftp: "DELIVERR_SFTP",
  /** HSDEXPRESS. */
  Hsdexpress: "HSDEXPRESS",
  /** SimpleTire. */
  SimpletireWebhook: "SIMPLETIRE_WEBHOOK",
  /** Hunter Express. */
  HunterExpressSftp: "HUNTER_EXPRESS_SFTP",
  /** UPS. */
  UpsApi: "UPS_API",
  /** WOO YOUNG LOGISTICS CO.,LTD.. */
  WooyoungLogisticsSftp: "WOOYOUNG_LOGISTICS_SFTP",
  /** PHSE. */
  PhseApi: "PHSE_API",
  /** Wish. */
  WishEmailPush: "WISH_EMAIL_PUSH",
  /** Northline. */
  Northline: "NORTHLINE",
  /** Med Africa Logistics. */
  Medafrica: "MEDAFRICA",
  /** DPD Austria. */
  DpdAtSftp: "DPD_AT_SFTP",
  /** Anteraja. */
  Anteraja: "ANTERAJA",
  /** DHL Global Forwarding API. */
  DhlGlobalForwardingApi: "DHL_GLOBAL_FORWARDING_API",
  /** LBC EXPRESS INC.. */
  LbcexpressApi: "LBCEXPRESS_API",
  /** Sims Global. */
  Simsglobal: "SIMSGLOBAL",
  /** CDL Last Mile. */
  Cdldelivers: "CDLDELIVERS",
  /** TYP. */
  Typ: "TYP",
  /** Testing Courier. */
  TestingCourierWebhook: "TESTING_COURIER_WEBHOOK",
  /** Pandago. */
  PandagoApi: "PANDAGO_API",
  /** Royal Mail. */
  RoyalMailFtp: "ROYAL_MAIL_FTP",
  /** Thunder Express Australia. */
  Thunderexpress: "THUNDEREXPRESS",
  /** Secretlab. */
  SecretlabWebhook: "SECRETLAB_WEBHOOK",
  /** Setel Express. */
  Setel: "SETEL",
  /** JD Worldwide. */
  JdWorldwide: "JD_WORLDWIDE",
  /** DPD Russia. */
  DpdRuApi: "DPD_RU_API",
  /** Argents Express Group. */
  ArgentsWebhook: "ARGENTS_WEBHOOK",
  /** Post ONE. */
  Postone: "POSTONE",
  /** Tusk Logistics. */
  Tusklogistics: "TUSKLOGISTICS",
  /** Rhenus Logistics UK. */
  RhenusUkApi: "RHENUS_UK_API",
  /** Yamato Singapore. */
  TaqbinSgApi: "TAQBIN_SG_API",
  /** Inntralog GmbH. */
  InntralogSftp: "INNTRALOG_SFTP",
  /** Day & Ross. */
  Dayross: "DAYROSS",
  /** Correos Express (API). */
  CorreosexpressApi: "CORREOSEXPRESS_API",
  /** International Seur API. */
  InternationalSeurApi: "INTERNATIONAL_SEUR_API",
  /** Yodel API. */
  YodelApi: "YODEL_API",
  /** Hero Express. */
  Heroexpress: "HEROEXPRESS",
  /** DHL supply chain India. */
  DhlSupplychainIn: "DHL_SUPPLYCHAIN_IN",
  /** Urgent Cargus. */
  UrgentCargus: "URGENT_CARGUS",
  /** FRONTdoor Collective. */
  Frontdoorcorp: "FRONTDOORCORP",
  /** J&T Express Philippines. */
  JtexpressPh: "JTEXPRESS_PH",
  /** Parcelstars. */
  ParcelstarsWebhook: "PARCELSTARS_WEBHOOK",
  /** DPD Slovakia. */
  DpdSkSftp: "DPD_SK_SFTP",
  /** Movianto. */
  Movianto: "MOVIANTO",
  /** Ozeparts Shipping. */
  OzepartsShipping: "OZEPARTS_SHIPPING",
  /** KargomKolay (CargoMini). */
  Kargomkolay: "KARGOMKOLAY",
  /** Trunkrs. */
  Trunkrs: "TRUNKRS",
  /** Omni Returns. */
  OmnirpsWebhook: "OMNIRPS_WEBHOOK",
  /** Chile Express. */
  Chilexpress: "CHILEXPRESS",
  /** Testing Courier. */
  TestingCourier: "TESTING_COURIER",
  /** JNE (API). */
  JneApi: "JNE_API",
  /** BJS Distribution, Storage & Couriers - FTP. */
  BjshomedeliveryFtp: "BJSHOMEDELIVERY_FTP",
  /** D Express. */
  DexpressWebhook: "DEXPRESS_WEBHOOK",
  /** USPS API. */
  UspsApi: "USPS_API",
  /** TransVirtual. */
  Transvirtual: "TRANSVIRTUAL",
  /** solistica. */
  SolisticaApi: "SOLISTICA_API",
  /** Chienventure. */
  ChienventureWebhook: "CHIENVENTURE_WEBHOOK",
  /** DPD UK. */
  DpdUkSftp: "DPD_UK_SFTP",
  /** InPost. */
  InpostUk: "INPOST_UK",
  /** Javit. */
  Javit: "JAVIT",
  /** ZTO Express China. */
  ZtoDomestic: "ZTO_DOMESTIC",
  /** DHL Global Forwarding Guatemala. */
  DhlGtApi: "DHL_GT_API",
  /** CEVA Package. */
  CevaTracking: "CEVA_TRACKING",
  /** Komon Express. */
  KomonExpress: "KOMON_EXPRESS",
  /** East West Courier Pte Ltd. */
  EastwestcourierFtp: "EASTWESTCOURIER_FTP",
  /** Danniao. */
  Danniao: "DANNIAO",
  /** Spectran. */
  Spectran: "SPECTRAN",
  /** Deliver-iT. */
  DeliverIt: "DELIVER_IT",
  /** Relais Colis. */
  Relaiscolis: "RELAISCOLIS",
  /** GLS Spain. */
  GlsSpainApi: "GLS_SPAIN_API",
  /** PostPlus. */
  Postplus: "POSTPLUS",
  /** Airterra. */
  Airterra: "AIRTERRA",
  /** GIO Express Ecourier. */
  GioEcourierApi: "GIO_ECOURIER_API",
  /** DPD Switzerland. */
  DpdChSftp: "DPD_CH_SFTP",
  /** FedEx®. */
  FedexApi: "FEDEX_API",
  /** INTERSMARTTRANS & SOLUTIONS SL. */
  Intersmarttrans: "INTERSMARTTRANS",
  /** Hermes UK. */
  HermesUkSftp: "HERMES_UK_SFTP",
  /** Exelot Ltd.. */
  ExelotFtp: "EXELOT_FTP",
  /** DHL GLOBAL FORWARDING PANAMÁ. */
  DhlPaApi: "DHL_PA_API",
  /** Vir Transport. */
  VirtransportSftp: "VIRTRANSPORT_SFTP",
  /** Worldnet Logistics. */
  Worldnet: "WORLDNET",
  /** Instabox. */
  InstaboxWebhook: "INSTABOX_WEBHOOK",
  /** Keuhne + Nagel Global. */
  Kng: "KNG",
  /** Flash Express. */
  FlashexpressWebhook: "FLASHEXPRESS_WEBHOOK",
  /** Magyar Posta. */
  MagyarPostaApi: "MAGYAR_POSTA_API",
  /** WeShip. */
  WeshipApi: "WESHIP_API",
  /** Ohi. */
  OhiWebhook: "OHI_WEBHOOK",
  /** MUDITA. */
  Mudita: "MUDITA",
  /** Bluedart. */
  BluedartApi: "BLUEDART_API",
  /** T-cat. */
  TCatApi: "T_CAT_API",
  /** ADS Express. */
  Ads: "ADS",
  /** HR Parcel. */
  HermesIt: "HERMES_IT",
  /** FitzMark. */
  FitzmarkApi: "FITZMARK_API",
  /** Posti API. */
  PostiApi: "POSTI_API",
  /** SMSA Express. */
  SmsaExpressWebhook: "SMSA_EXPRESS_WEBHOOK",
  /** Tamer Logistics. */
  TamergroupWebhook: "TAMERGROUP_WEBHOOK",
  /** Livrapide. */
  Livrapide: "LIVRAPIDE",
  /** Nippon Express. */
  NipponExpress: "NIPPON_EXPRESS",
  /** Better Trucks. */
  Bettertrucks: "BETTERTRUCKS",
  /** FAN COURIER EXPRESS. */
  Fan: "FAN",
  /** USPS Flats (Pitney Bowes). */
  PbUspsflatsFtp: "PB_USPSFLATS_FTP",
  /** Parcel Right. */
  Parcelright: "PARCELRIGHT",
  /** iThink Logistics. */
  Ithinklogistics: "ITHINKLOGISTICS",
  /** Kerry Logistics. */
  KerryExpressThWebhook: "KERRY_EXPRESS_TH_WEBHOOK",
  /** eCoutier. */
  Ecoutier: "ECOUTIER",
  /** SENHONG INTERNATIONAL LOGISTICS. */
  Showl: "SHOWL",
  /** BRT Bartolini API. */
  BrtItApi: "BRT_IT_API",
  /** Rixon Logistics. */
  RixonhkApi: "RIXONHK_API",
  /** DB Schenker. */
  DbschenkerApi: "DBSCHENKER_API",
  /** Ilyang logistics. */
  Ilyanglogis: "ILYANGLOGIS",
  /** Mail Boxes Etc.. */
  MailBoxEtc: "MAIL_BOX_ETC",
  /** WeShip. */
  Weship: "WESHIP",
  /** DHL eCommerce Solutions. */
  DhlGlobalMailApi: "DHL_GLOBAL_MAIL_API",
  /** Activos24. */
  Activos24Api: "ACTIVOS24_API",
  /** ATS Healthcare. */
  Atshealthcare: "ATSHEALTHCARE",
  /** Luwjistik. */
  Luwjistik: "LUWJISTIK",
  /** Gebrüder Weiss. */
  GwWorld: "GW_WORLD",
  /** fairsenden. */
  FairsendenApi: "FAIRSENDEN_API",
  /** SerVIP. */
  ServipWebhook: "SERVIP_WEBHOOK",
  /** Swiship. */
  Swiship: "SWISHIP",
  /** Transport Ambientales. */
  Tanet: "TANET",
  /** SHENZHEN HOTSIN CARGO INT'L FORWARDING CO.,LTD. */
  HotsinCargo: "HOTSIN_CARGO",
  /** Direx. */
  Direx: "DIREX",
  /** HuanTong. */
  Huantong: "HUANTONG",
  /** iMile. */
  ImileApi: "IMILE_API",
  /** Au Express. */
  Auexpress: "AUEXPRESS",
  /** NYT SUPPLY CHAIN LOGISTICS Co.,LTD. */
  Nytlogistics: "NYTLOGISTICS",
  /** DSV Futurewave. */
  DsvReference: "DSV_REFERENCE",
  /** Novofarma. */
  NovofarmaWebhook: "NOVOFARMA_WEBHOOK",
  /** AIT. */
  AitworldwideSftp: "AITWORLDWIDE_SFTP",
  /** Olive. */
  Shopolive: "SHOPOLIVE",
  /** Fast & Furious. */
  FnfZa: "FNF_ZA",
  /** DHL eCommerce Greater China. */
  DhlEcommerceGc: "DHL_ECOMMERCE_GC",
  /** Fetchr. */
  Fetchr: "FETCHR",
  /** Starlinks Global. */
  StarlinksApi: "STARLINKS_API",
  /** YYEXPRESS. */
  Yyexpress: "YYEXPRESS",
  /** Servientrega. */
  Servientrega: "SERVIENTREGA",
  /** HanJin. */
  Hanjin: "HANJIN",
  /** Spanish Seur. */
  SpanishSeurFtp: "SPANISH_SEUR_FTP",
  /** DX (B2B). */
  DxB2BConnum: "DX_B2B_CONNUM",
  /** Helthjem. */
  HelthjemApi: "HELTHJEM_API",
  /** Inexpost. */
  Inexpost: "INEXPOST",
  /** A2B Express Logistics. */
  A2BBa: "A2B_BA",
  /** Rhenus Logistics. */
  RhenusGroup: "RHENUS_GROUP",
  /** Sber Logistics. */
  SberlogisticsRu: "SBERLOGISTICS_RU",
  /** Malca-Amit. */
  MalcaAmit: "MALCA_AMIT",
  /** Professional Parcel Logistics. */
  Ppl: "PPL",
  /** OSM Worldwide. */
  OsmWorldwideSftp: "OSM_WORLDWIDE_SFTP",
  /** ACI Logistix. */
  Acilogistix: "ACILOGISTIX",
  /** Optima Courier. */
  Optimacourier: "OPTIMACOURIER",
  /** Nova Poshta API. */
  NovaPoshtaApi: "NOVA_POSHTA_API",
  /** Loggi. */
  Loggi: "LOGGI",
  /** YiFan Express. */
  Yifan: "YIFAN",
  /** My DynaLogic. */
  Mydynalogic: "MYDYNALOGIC",
  /** Morning Global. */
  Morninglobal: "MORNINGLOBAL",
  /** Concise. */
  ConciseApi: "CONCISE_API",
  /** Falcon Express. */
  Fxtran: "FXTRAN",
  /** Deliver Your Parcel. */
  DeliveryourparcelZa: "DELIVERYOURPARCEL_ZA",
  /** uParcel. */
  Uparcel: "UPARCEL",
  /** Mobi Logistica. */
  MobiBr: "MOBI_BR",
  /** T&W Delivery. */
  LoginextWebhook: "LOGINEXT_WEBHOOK",
  /** EMS. */
  Ems: "EMS",
  /** Speedy. */
  Speedy: "SPEEDY",
  /** Zoom. */
  ZoomRed: "ZOOM_RED",
  /** Navlungo. */
  Navlungo: "NAVLUNGO",
  /** Castle Parcels. */
  Castleparcels: "CASTLEPARCELS",
  /** Weee. */
  Weee: "WEEE",
  /** Packaly. */
  Packaly: "PACKALY",
  /** Yunhuipost. */
  Yunhuipost: "YUNHUIPOST",
  /** YouParcel. */
  Youparcel: "YOUPARCEL",
  /** Leman. */
  Leman: "LEMAN",
  /** Moovin. */
  Moovin: "MOOVIN",
  /** Urb-it. */
  UrbIt: "URB_IT",
  /** Multientrega. */
  Multientregapanama: "MULTIENTREGAPANAMA",
  /** Jusdasr. */
  Jusdasr: "JUSDASR",
  /** Discount Post. */
  Discountpost: "DISCOUNTPOST",
  /** Rhenus Logistics UK. */
  RhenusUk: "RHENUS_UK",
  /** Swiship JP. */
  SwishipJp: "SWISHIP_JP",
  /** GLS USA. */
  GlsUs: "GLS_US",
  /** Southwestern Motor Transport. Inc. */
  Smtl: "SMTL",
  /** Discount Post Emega. */
  Emega: "EMEGA",
  /** EXPRESSONE Slovenia. */
  ExpressoneSv: "EXPRESSONE_SV",
  /** hepsiJET. */
  Hepsijet: "HEPSIJET",
  /** Welivery. */
  Welivery: "WELIVERY",
  /** Bringer Parcel Services. */
  Bringer: "BRINGER",
  /** EasyRoutes. */
  Easyroutes: "EASYROUTES",
  /** MRW. */
  Mrw: "MRW",
  /** RPM. */
  Rpm: "RPM",
  /** DPD Portugal. */
  DpdPrt: "DPD_PRT",
  /** GLS Romania. */
  GlsRomania: "GLS_ROMANIA",
  /** LM Parcel. */
  Lmparcel: "LMPARCEL",
  /** GTA GSM. */
  Gtagsm: "GTAGSM",
  /** DOMINO. */
  Domino: "DOMINO",
  /** eShipper. */
  Eshipper: "ESHIPPER",
  /** Transpak Inc.. */
  Transpak: "TRANSPAK",
  /** Xindus. */
  Xindus: "XINDUS",
  /** Aoyue. */
  Aoyue: "AOYUE",
  /** Easyparcel. */
  Easyparcel: "EASYPARCEL",
  /** EXPRESSONE. */
  Expressone: "EXPRESSONE",
  /** Sendeo Kargo. */
  SendeoKargo: "SENDEO_KARGO",
  /** Speedaf Express. */
  Speedaf: "SPEEDAF",
  /** eTower. */
  Etower: "ETOWER",
  /** GC Express. */
  Gcx: "GCX",
  /** Ninjavan Vietnam. */
  NinjavanVn: "NINJAVAN_VN",
  /** Allegro. */
  Allegro: "ALLEGRO",
  /** Jumppoint. */
  Jumppoint: "JUMPPOINT",
  /** ShipGlobal. */
  ShipglobalUs: "SHIPGLOBAL_US",
  /** Kinisi Transport Pty Ltd. */
  Kinisi: "KINISI",
  /** Oakh Harbour Freight Lines. */
  Oakh: "OAKH",
  /** American West. */
  Awest: "AWEST",
  /** Barsan Global Lojistik. */
  Barsan: "BARSAN",
  /** Energo Logistic. */
  Energologistic: "ENERGOLOGISTIC",
  /** Madrooex. */
  Madrooex: "MADROOEX",
  /** GoBolt. */
  Gobolt: "GOBOLT",
  /** Swiss Universal Express. */
  SwissUniversalExpress: "SWISS_UNIVERSAL_EXPRESS",
  /** IOR Direct Solutions. */
  Iordirect: "IORDIRECT",
  /** xmszm. */
  Xmszm: "XMSZM",
  /** GLS Hungary. */
  GlsHun: "GLS_HUN",
  /** Sendy Express. */
  Sendy: "SENDY",
  /** Brauns Express. */
  Braunsexpress: "BRAUNSEXPRESS",
  /** Grand Slam Express. */
  Grandslamexpress: "GRANDSLAMEXPRESS",
  /** XGS. */
  Xgs: "XGS",
  /** OTS. */
  Otschile: "OTSCHILE",
  /** Pack-Up. */
  PackUp: "PACK_UP",
  /** Parcelstars. */
  Parcelstars: "PARCELSTARS",
  /** Team Express Service LLC. */
  Teamexpressllc: "TEAMEXPRESSLLC",
  /** Asyad Express. */
  Asyadexpress: "ASYADEXPRESS",
  /** TDN. */
  Tdn: "TDN",
  /** Early Bird. */
  Earlybird: "EARLYBIRD",
  /** Cacesa. */
  Cacesa: "CACESA",
  /** Parceljet. */
  Parceljet: "PARCELJET",
  /** MNG Kargo. */
  MngKargo: "MNG_KARGO",
  /** Super Pac Line. */
  Superpackline: "SUPERPACKLINE",
  /** SpeedX. */
  Speedx: "SPEEDX",
  /** Vesyl. */
  Vesyl: "VESYL",
  /** Sky King. */
  Skyking: "SKYKING",
  /** DIR. */
  Dirmensajeria: "DIRMENSAJERIA",
  /** Netlogix. */
  Netlogixgroup: "NETLOGIXGROUP",
  /** ZYEX. */
  Zyou: "ZYOU",
  /** Jawar. */
  Jawar: "JAWAR",
  /** Associate Global Systems. */
  Agsystems: "AGSYSTEMS",
  /** GPS. */
  Gps: "GPS",
  /** PTT Kargo. */
  PttKargo: "PTT_KARGO",
  /** Maergo. */
  Maergo: "MAERGO",
  /** AICS. */
  Arihantcourier: "ARIHANTCOURIER",
  /** VicTas Freight Express. */
  Vtfe: "VTFE",
  /** Yunant. */
  Yunant: "YUNANT",
  /** Urbify. */
  Urbify: "URBIFY",
  /** pack-man. */
  PackMan: "PACK_MAN",
  /** LIEFERGRUN. */
  Liefergrun: "LIEFERGRUN",
  /** Obibox. */
  Obibox: "OBIBOX",
  /** Paikeda. */
  Paikeda: "PAIKEDA",
  /** Scotty. */
  Scotty: "SCOTTY",
  /** Intelcom. */
  IntelcomCa: "INTELCOM_CA",
  /** swe. */
  Swe: "SWE",
  /** Asendia Global. */
  Asendia: "ASENDIA",
  /** DPD Austria. */
  DpdAt: "DPD_AT",
  /** Relay. */
  Relay: "RELAY",
  /** ATA. */
  Ata: "ATA",
  /** SkyExpress Internationals. */
  SkyexpressInternational: "SKYEXPRESS_INTERNATIONAL",
  /** Surat Kargo. */
  SuratKargo: "SURAT_KARGO",
  /** SG LINK. */
  Sglink: "SGLINK",
  /** FleetOptics. */
  Fleetopticsinc: "FLEETOPTICSINC",
  /** shopline. */
  Shopline: "SHOPLINE",
  /** PIGGYSHIP. */
  Piggyship: "PIGGYSHIP",
  /** LogoiX. */
  Logoix: "LOGOIX",
  /** Kolay Gelsin. */
  KolayGelsin: "KOLAY_GELSIN",
  /** Associated Couriers. */
  AssociatedCouriers: "ASSOCIATED_COURIERS",
  /** ups-checker. */
  UpsChecker: "UPS_CHECKER",
  /** Wineshipping. */
  Wineshipping: "WINESHIPPING",
  /** Spedisci online. */
  Spedisci: "SPEDISCI",
  /** Fourkites. */
  Fourkites: "FOURKITES",
  /** Etonas. */
  Etonas: "ETONAS",
  /** Fin Mile. */
  Finmile: "FINMILE",
  /** Uniuni. */
  Uniuni: "UNIUNI",
  /** Rodonaves. */
  Rodonaves: "RODONAVES",
  /** Inpost Italy. */
  InpostIt: "INPOST_IT",
  /** Tforce Freight. */
  TforceFreight: "TFORCE_FREIGHT",
  /** Rich Mom. */
  Richmom: "RICHMOM",
  /** Corriere Franco. */
  Franco: "FRANCO",
  /** Ecparcel. */
  Ecparcel: "ECPARCEL",
  /** Fedex China. */
  FedexChina: "FEDEX_CHINA",
  /** Gofo Express. */
  GofoExpress: "GOFO_EXPRESS",
  /** Shipbob. */
  Shipbob: "SHIPBOB",
  /** Jersey Post Group. */
  JerseypostAtlas: "JERSEYPOST_ATLAS",
  /** Coretrails. */
  Coretrails: "CORETRAILS",
  /** Rhenus Logistics Italy. */
  RhenusItaly: "RHENUS_ITALY",
  /** Jadlog. */
  Jadlog: "JADLOG",
  /** Jitsu. */
  Jitsu: "JITSU",
  /** Yanwen Express. */
  YanwenExpress: "YANWEN_EXPRESS",
  /** Dashlink. */
  Dashlink: "DASHLINK",
  /** Seino Super Express. */
  SeinoSuperExpress: "SEINO_SUPER_EXPRESS",
  /** Floship. */
  Floship: "FLOSHIP",
  /** Metro Supply Chain. */
  Metroscg: "METROSCG",
  /** Sendparcel. */
  Sendparcel: "SENDPARCEL",
  /** P2p. */
  P2P: "P2P",
  /** Cn Express. */
  CnExpress: "CN_EXPRESS",
  /** Cirro Track. */
  Cirrotrack: "CIRROTRACK",
  /** Land Logistics. */
  LandLogistics: "LAND_LOGISTICS",
  /** Veho. */
  Veho: "VEHO",
  /** Medline. */
  Medline: "MEDLINE",
  /** Vdtrack. */
  Vdtrack: "VDTRACK",
  /** Sino Scm. */
  SinoScm: "SINO_SCM",
  /** 3pe Express. */
  _3PeExpress: "3PE_EXPRESS",
  /** Swiftx. */
  Swiftx: "SWIFTX",
  /** Sfyd Express. */
  Sfydexpress: "SFYDEXPRESS",
  /** Toptrans. */
  Toptrans: "TOPTRANS",
} as const;
export type ShipmentCarrier = (typeof ShipmentCarrier)[keyof typeof ShipmentCarrier] | (string & {});

export const shipmentCarrierSchema: EnumSchema<ShipmentCarrier> = s.enumOf<ShipmentCarrier>(ShipmentCarrier);

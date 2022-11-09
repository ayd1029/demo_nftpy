
const routes = [
  // Index.vue created 에서 APP 이면 /app 으로, WEB 이면 /web 으로 이동

  {
    path: '/payment',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/payment/Payment.vue') },
      { path: 'paymentCallback', component: () => import('pages/payment/PaymentCallback.vue') },
    ]
  },
  {
    path: '/paymentMobile',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/payment/PaymentMobile.vue') },
      { path: 'paymentCallback', component: () => import('pages/payment/PaymentCallback.vue') },
    ]
  },
  {
    path: '/introduction',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/introduction/Introduction.vue') },
    ]
  },
  {
    path: '/shop',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/shop/PhoneCase.vue') },
    ]
  },
  {
    path: '/cart',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/cart/CartList.vue') },
    ]
  },
  {
    path: '/notice',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/notice/NoticeList.vue') },
      { path: 'register', component: () => import('pages/notice/Register.vue') },
      { path: 'modify', component: () => import('pages/notice/Modify.vue') },
    ]
  },
  {
    path: '/inquiry',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/inquiry/InquiryList.vue') },
      { path: 'register', component: () => import('src/pages/inquiry/RegisterInquiry.vue') },
    ]
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////





  {
    path: '/link',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/link/Link.vue') },
    ]
  },
  {
    path: '/test',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'twitter', component: () => import('src/pages/test/TestTwitter.vue') },
      { path: 'ipfs', component: () => import('src/pages/test/TestIPFS.vue') },
      // { path: 'home', component: () => import('pages/Index.vue') },
    ]
  },

  {
    path: '/',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      // { path: 'home', component: () => import('pages/Index.vue') },
      { path: 'iPopup', component: () => import('src/pages/token/Detail.vue') },
    ]
  },
  // token info
  {
    path: '/i',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/token/Detail.vue') },
    ]
  },
  // nft minting
  {
    path: '/m',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/minting/MintingDetail.vue') },
    ]
  },
  // recruit
  {
    path: '/r',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/whitelist/WhitelistDetail.vue') },
    ]
  },
  // presale
  {
    path: '/p',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/presale/PresaleDetail.vue') },
    ]
  },
  // whitelist
  {
    path: '/w',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/whitelist/WhitelistDetail.vue') },
    ]
  },
  {
    path: '/app',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      // { path: 'loginApp', component: () => import('pages/app/LoginApp.vue') },
      { path: '', component: () => import('pages/app/LoginApp.vue') },
      { path: 'kakaoLoginRedirect', component: () => import('pages/app/KakaoLoginRedirect.vue') },
    ]
  },
  {
    path: '/web',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Main.vue') },
      // { path: 'home', component: () => import('pages/Index.vue') },
    ]
  },
  {
    path: '/mypage',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/mypage/MyPage.vue') },
    ]
  },
  {
    path: '/join',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/join/Join.vue') },
    ]
  },
  {
    path: '/goods',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'goodsList', component: () => import('src/pages/goods/goodsList.vue') },
      { path: 'phoneCase', component: () => import('src/pages/goods/PhoneCase.vue') },
    ]
  },
  {
    path: '/token',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'register', component: () => import('pages/token/Register.vue') },
      { path: 'createList', component: () => import('pages/token/CreateList.vue') },
      { path: 'modify', component: () => import('pages/token/Modify.vue') },
      { path: 'description', component: () => import('pages/token/Description.vue') },
      { path: 'create', component: () => import('pages/token/Create.vue') },
      { path: 'myList', component: () => import('pages/token/MyList.vue') },
      { path: 'mint', component: () => import('src/pages/token/Mint.vue') },
      { path: 'burn', component: () => import('src/pages/token/Burn.vue') },
      { path: 'requestVerification', component: () => import('src/pages/token/RequestVerification.vue') },
      { path: 'newList', component: () => import('pages/token/NewList.vue') },
      { path: 'popList', component: () => import('pages/token/PopList.vue') },
      { path: 'detail', component: () => import('src/pages/token/Detail.vue') },
      { path: 'info', component: () => import('src/pages/token/Detail.vue') },
    ],
  },
  {
    path: '/nft',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'nftProjectList', component: () => import('pages/nft/NftProjectList.vue') },
      { path: 'myNftProjectList', component: () => import('pages/nft/MyNftProjectList.vue') },
      { path: 'registerNftProject', component: () => import('pages/nft/RegisterNftProject.vue') },
      { path: 'modifyNftProject', component: () => import('pages/nft/ModifyNftProject.vue') },
      { path: 'nftProjectDetail', component: () => import('pages/nft/NftProjectDetail.vue') },
    ]
  },
  {
    path: '/minting',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'mintingList', component: () => import('pages/minting/MintingList.vue') },
      { path: 'detail', component: () => import('pages/minting/MintingDetail.vue') },
      { path: 'myMintingList', component: () => import('pages/minting/MyMintingList.vue') },
      { path: 'register', component: () => import('pages/minting/RegisterMinting.vue') },
      { path: 'modify', component: () => import('pages/minting/ModifyMinting.vue') },
      { path: 'set', component: () => import('pages/minting/SetMinting.vue') },
      { path: 'prepareJsonCreate', component: () => import('pages/minting/PrepareJsonCreate.vue') },
      { path: 'prepareJsonUpload', component: () => import('pages/minting/PrepareJsonUpload.vue') },
      { path: 'prepareImageUpload', component: () => import('pages/minting/PrepareImageUpload.vue') },
      { path: 'information', component: () => import('src/pages/minting/MintingInfomation.vue') },
      { path: 'mintingWithdraw', component: () => import('src/pages/minting/MintingWithdraw.vue') },
      { path: 'mintingHistoryList', component: () => import('pages/minting/MintingHistoryList.vue') },
    ]
  },
  {
    path: '/recruit',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'recruitList', component: () => import('pages/recruit/RecruitList.vue') },
      { path: 'detail', component: () => import('pages/recruit/RecruitDetail.vue') },
      { path: 'myRecruitList', component: () => import('pages/recruit/MyRecruitList.vue') },
      { path: 'register', component: () => import('pages/recruit/RegisterRecruit.vue') },
      { path: 'modify', component: () => import('pages/recruit/ModifyRecruit.vue') },
      { path: 'recruitApplyList', component: () => import('pages/recruit/RecruitApplyList.vue') },
    ]
  },
  {
    path: '/whitelist',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'whitelistList', component: () => import('pages/whitelist/WhitelistList.vue') },
      { path: 'detail', component: () => import('pages/whitelist/WhitelistDetail.vue') },
      { path: 'myWhitelistList', component: () => import('pages/whitelist/MyWhitelistList.vue') },
      { path: 'register', component: () => import('pages/whitelist/RegisterWhitelist.vue') },
      { path: 'modify', component: () => import('pages/whitelist/ModifyWhitelist.vue') },
      { path: 'whitelistApplyList', component: () => import('pages/whitelist/WhitelistApplyList.vue') },
      { path: 'whitelistApplyResultList', component: () => import('src/pages/whitelist/WhitelistApplyResultList.vue') },
    ]
  },
  {
    path: '/presale',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'presaleList', component: () => import('pages/presale/PresaleList.vue') },
      { path: 'myPresaleList', component: () => import('pages/presale/MyPresaleList.vue') },
      { path: 'registerPresale', component: () => import('pages/presale/RegisterPresale.vue') },
      { path: 'modifyPresale', component: () => import('pages/presale/ModifyPresale.vue') },
      { path: 'presaleDetail', component: () => import('pages/presale/PresaleDetail.vue') },
      { path: 'presaleHistoryList', component: () => import('pages/presale/PresaleHistoryList.vue') },
      { path: 'presaleWithdraw', component: () => import('pages/presale/PresaleWithdraw.vue') },
    ]
  },
  {
    path: '/pool',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/pool/MyPoolList.vue') },
      { path: 'register', component: () => import('src/pages/pool/RegisterPool.vue') },
      { path: 'modify', component: () => import('src/pages/pool/ModifyPool.vue') },
      { path: 'requestCreatePool', component: () => import('src/pages/pool/RequestCreatePool.vue') },
    ]
  },
  {
    path: '/airdrop',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/airdrop/MyAirdropList.vue') },
      { path: 'register', component: () => import('src/pages/airdrop/RegisterAirdrop.vue') },
      { path: 'modify', component: () => import('src/pages/airdrop/ModifyAirdrop.vue') },
      { path: 'requestCreateAirdrop', component: () => import('src/pages/airdrop/RequestCreateAirdrop.vue') },
      { path: 'start', component: () => import('src/pages/airdrop/AirdropStart.vue') },
      { path: 'deposit', component: () => import('src/pages/airdrop/AirdropDeposit.vue') },
      { path: 'refix', component: () => import('src/pages/airdrop/AirdropRefix.vue') },
    ]
  },
  {
    path: '/holder',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/holder/HolderList.vue') },
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'adminUserList', component: () => import('pages/admin/AdminUserList.vue') },
      { path: 'adminContractVerifyList', component: () => import('src/pages/admin/AdminContractVerifyList.vue') },
      { path: 'adminCreatePoolList', component: () => import('src/pages/admin/AdminCreatePoolList.vue') },
      { path: 'adminCreateAirdropList', component: () => import('src/pages/admin/AdminCreateAirdropList.vue') },
      { path: 'adminMintingWithdrawList', component: () => import('src/pages/admin/AdminMintingWithdrawList.vue') },
      { path: 'adminPresaleWithdrawList', component: () => import('src/pages/admin/AdminPresaleWithdrawList.vue') },
      { path: 'adminMaintenance', component: () => import('pages/admin/AdminMaintenance.vue') },
      { path: 'adminCreateList', component: () => import('pages/admin/AdminCreateList.vue') },
      { path: 'adminCreate', component: () => import('pages/admin/AdminCreate.vue') },
      { path: 'adminMyList', component: () => import('pages/admin/AdminMyList.vue') },
      { path: 'adminDescription', component: () => import('pages/admin/AdminDescription.vue') },
      { path: 'adminManageToken', component: () => import('src/pages/admin/AdminManageToken.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'privacy', component: () => import('pages/terms/Privacy.vue') },
      { path: 'terms', component: () => import('pages/terms/Terms.vue') },
    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    // component: () => import('layouts/MainLayout.vue'),
    component: () => import('pages/Error404.vue'),
    // children: [
    //   { path: '', component: () => import('pages/Error404.vue') },
    // ]
  }
]

export default routes

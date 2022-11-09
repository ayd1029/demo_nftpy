import { boot } from 'quasar/wrappers'

import LoginModal from 'components/login/LoginModal'
import WalletModal from 'components/login/WalletModal'
import KlipQRCodeModal from 'components/login/KlipQRCodeModal'
import TermsModal from 'components/terms/TermsModal'
import PrivacyModal from 'components/terms/PrivacyModal'
import TokenDetailModal from 'components/token/TokenDetailModal'
import TokenMintlModal from 'components/token/TokenMintModal'
import TokenBurnlModal from 'components/token/TokenBurnModal'
import IframeModal from 'components/common/IframeModal'
import IframeLinkSampleModal from 'components/common/IframeLinkSampleModal'
import TokenContractVerifyModal from 'components/admin/TokenContractVerifyModal'
import PoolModal from 'components/admin/PoolModal'
import AirdropModal from 'components/admin/AirdropModal'
import NoticeDetailModal from 'components/notice/NoticeDetailModal'
import WhitelistModal from 'components/whitelist/WhitelistModal'
import WhitelistApplyDetailModal from 'components/whitelist/WhitelistApplyDetailModal'
import WhitelistApplyResultDetailModal from 'components/whitelist/WhitelistApplyResultDetailModal'
import RecruitApplyDetailModal from 'components/recruit/RecruitApplyDetailModal'
import SwapToKstar from 'components/swap/SwapToKstar'
import SwapPresale from 'components/swap/SwapPresale'
import VueCountdown from '@chenfengyuan/vue-countdown'
import PresaleWithdrawModal from 'components/admin/PresaleWithdrawModal'
import MintingWithdrawModal from 'components/admin/MintingWithdrawModal'
import UserDetailModal from 'components/admin/UserDetailModal'

export default boot(({ app }) => {
  app.component('LoginModal', LoginModal) // 로그인
  app.component('WalletModal', WalletModal) // 월렛
  app.component('KlipQRCodeModal', KlipQRCodeModal) // 클립 QR코드
  app.component('TermsModal', TermsModal) // 이용약관
  app.component('PrivacyModal', PrivacyModal) // 개인정보처리방침
  app.component('TokenDetailModal', TokenDetailModal) // 토큰 상세
  app.component('TokenMintlModal', TokenMintlModal) // 토큰 추가발행
  app.component('TokenBurnlModal', TokenBurnlModal) // 토큰 소각
  app.component('IframeModal', IframeModal) // iframe - 토큰 상세에서 web site 표시
  app.component('IframeLinkSampleModal', IframeLinkSampleModal) // iframe - 링크 팝업 샘플용
  app.component('TokenContractVerifyModal', TokenContractVerifyModal) // 토큰 계약검증
  app.component('PoolModal', PoolModal) // 유동성 풀
  app.component('AirdropModal', AirdropModal) // 에어드랍
  app.component('NoticeDetailModal', NoticeDetailModal) // 공지사항 상세
  app.component('WhitelistModal', WhitelistModal) // 화이트리스트 - 사전판매/민팅 화면에서 호출
  app.component('WhitelistApplyDetailModal', WhitelistApplyDetailModal) // 화이트리스트 신청 상세
  app.component('WhitelistApplyResultDetailModal', WhitelistApplyResultDetailModal) // 화이트리스트 신청 결과 상세
  app.component('RecruitApplyDetailModal', RecruitApplyDetailModal) // 채용 신청 상세
  app.component('SwapToKstar', SwapToKstar) // KSTAR로 스왑
  app.component('SwapPresale', SwapPresale) // 사전판매용 스왑
  app.component('VueCountdown', VueCountdown) // 사전판매 상세 타임카운터
  app.component('PresaleWithdrawModal', PresaleWithdrawModal) // 사전판매 자금 출금 요청 관리자용
  app.component('MintingWithdrawModal', MintingWithdrawModal) // NFT 민팅 자금 출금 요청 관리자용
  app.component('UserDetailModal', UserDetailModal) // 사용자 상세
})

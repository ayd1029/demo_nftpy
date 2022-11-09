<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('terms') }}
      </div>
    </div>
    <q-separator />
    <div class="row justify-center q-pt-sm q-pb-sm">
      <div class="col-12">
        {{ $t('terms') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <font size="1">
      <div v-if="locale === 'ko-KR'">
        <br />제1조(목적) 이 약관은 주식회사 클레이스타(전자상거래 사업자)가 운영하는 클레이스타(이하 “사이트”라 한다)에서 제공하는 인터넷 관련 서비스(이하 “서비스”라 한다)를 이용함에 있어 사이버 몰과 이용자의 권리․의무 및 책임사항을 규정함을 목적으로 합니다.
        <br /> 
        <br />  ※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.」
        <br /> 
        <br />제2조(정의)
        <br /> 
        <br />  ① “사이트”란 업체 회사가 재화 또는 용역(이하 “재화 등”이라 함)을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이트를 운영하는 사업자의 의미로도 사용합니다.
        <br /> 
        <br />  ② “이용자”란 “사이트”에 접속하여 이 약관에 따라 “사이트”가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
        <br /> 
        <br />  ③ ‘회원’이라 함은 “사이트”에 회원등록을 한 자로서, 계속적으로 “사이트”가 제공하는 서비스를 이용할 수 있는 자를 말합니다.
        <br /> 
        <br />  ④ ‘비회원’이라 함은 회원에 가입하지 않고 “사이트”가 제공하는 서비스를 이용하는 자를 말합니다.
        <br /> 
        <br />제3조 (약관 등의 명시와 설명 및 개정) 
        <br /> 
        <br />  ① “사이트”는 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호․모사전송번호․전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보관리책임자 등을 이용자가 쉽게 알 수 있도록 사이트의 초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.
        <br /> 
        <br />  ② “사이트”는 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회․배송책임․환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
        <br /> 
        <br />  ③ “사이트”는 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「전자문서 및 전자거래기본법」, 「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「방문판매 등에 관한 법률」, 「소비자기본법」 등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
        <br /> 
        <br />  ④ “사이트”가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다.  이 경우 “사이트”는 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다. 
        <br /> 
        <br />  ⑤ “사이트”가 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정 전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기간 내에 “사이트”에 송신하여 “사이트”의 동의를 받은 경우에는 개정약관 조항이 적용됩니다.
        <br /> 
        <br />  ⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 「전자상거래 등에서의 소비자 보호지침」 및 관계법령 또는 상관례에 따릅니다.
        <br /> 
        <br />제4조(서비스의 제공 및 변경) 
        <br /> 
        <br />  ① “사이트”는 다음과 같은 업무를 수행합니다.
        <br /> 
        <br />    1. 재화 또는 용역에 대한 정보 제공 및 구매계약의 체결
        <br />    2. 구매계약이 체결된 재화 또는 용역의 배송
        <br />    3. 기타 “사이트”가 정하는 업무
        <br /> 
        <br />  ② “사이트”는 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다. 이 경우에는 변경된 재화 또는 용역의 내용 및 제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시 공지합니다.
        <br /> 
        <br />  ③ “사이트”가 제공하기로 이용자와 계약을 체결한 서비스의 내용을 재화 등의 품절 또는 기술적 사양의 변경 등의 사유로 변경할 경우에는 그 사유를 이용자에게 통지 가능한 주소로 즉시 통지합니다.
        <br /> 
        <br />  ④ 전항의 경우 “사이트”는 이로 인하여 이용자가 입은 손해를 배상합니다. 다만, “사이트”가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.
        <br /> 
        <br />제5조(서비스의 중단) 
        <br /> 
        <br />  ① “사이트”는 컴퓨터 등 정보통신설비의 보수점검․교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
        <br /> 
        <br />  ② “사이트”는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, “사이트”가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.
        <br /> 
        <br />  ③ 사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 “사이트”는 제8조에 정한 방법으로 이용자에게 통지하고 당초 “사이트”에서 제시한 조건에 따라 소비자에게 보상합니다. 다만, “사이트”가 보상기준 등을 고지하지 아니한 경우에는 이용자들의 마일리지 또는 적립금 등을 “사이트”에서 통용되는 통화가치에 상응하는 현물 또는 현금으로 이용자에게 지급합니다.
        <br /> 
        <br />제6조(회원가입) 
        <br /> 
        <br />  ① 이용자는 “사이트”가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
        <br /> 
        <br />  ② “사이트”는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
        <br /> 
        <br />    1. 가입신청자가 이 약관 제7조제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 다만 제7조제3항에 의한 회원자격 상실 후 3년이 경과한 자로서 “사이트”의 회원재가입 승낙을 얻은 경우에는 예외로 한다.
        <br />    2. 등록 내용에 허위, 기재누락, 오기가 있는 경우
        <br />    3. 기타 회원으로 등록하는 것이 “사이트”의 기술상 현저히 지장이 있다고 판단되는 경우
        <br /> 
        <br />  ③ 회원가입계약의 성립 시기는 “사이트”의 승낙이 회원에게 도달한 시점으로 합니다.
        <br /> 
        <br />  ④ 회원은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한 기간 이내에 “사이트”에 대하여 회원정보 수정 등의 방법으로 그 변경사항을 알려야 합니다.
        <br /> 
        <br />제7조(회원 탈퇴 및 자격 상실 등) 
        <br /> 
        <br />  ① 회원은 “사이트”에 언제든지 탈퇴를 요청할 수 있으며 “사이트”는 즉시 회원탈퇴를 처리합니다.
        <br /> 
        <br />  ② 회원이 다음 각 호의 사유에 해당하는 경우, “사이트”는 회원자격을 제한 및 정지시킬 수 있습니다.
        <br /> 
        <br />    1. 가입 신청 시에 허위 내용을 등록한 경우
        <br />    2. “사이트”를 이용하여 구입한 재화 등의 대금, 기타 “사이트”가용에 관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우
        <br />    3. 다른 사람의 “사이트” 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우
        <br />    4. “사이트”를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우
        <br /> 
        <br />  ③ “사이트”가 회원 자격을 제한․정지 시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 “사이트”는 회원자격을 상실시킬 수 있습니다.
        <br /> 
        <br />  ④ “사이트”가 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 회원에게 이를 통지하고, 회원등록 말소 전에 최소한 30일 이상의 기간을 정하여 소명할 기회를 부여합니다.
        <br /> 
        <br />제8조(회원에 대한 통지)
        <br /> 
        <br />  ① “사이트”가 회원에 대한 통지를 하는 경우, 회원이 “사이트”와 미리 약정하여 지정한 전자우편 주소로 할 수 있습니다.
        <br /> 
        <br />  ② “사이트”는 불특정다수 회원에 대한 통지의 경우 1주일이상 “사이트” 게시판에 게시함으로서 개별 통지에 갈음할 수 있습니다. 다만, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별통지를 합니다.
        <br /> 
        <br />제9조(구매신청) 
        <br /> 
        <br />  ① “사이트”가용자는 “사이트”상에서 다음 또는 이와 유사한 방법에 의하여 구매를 신청하며, “사이트”는 이용자가 구매신청을 함에 있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다.
        <br />      1. 재화 등의 검색 및 선택
        <br />      2. 받는 사람의 성명, 주소, 전화번호, 전자우편주소(또는 이동전화번호) 등의 입력
        <br />      3. 약관내용, 청약철회권이 제한되는 서비스, 배송료․설치비 등의 비용부담과 관련한 내용에 대한 확인
        <br />      4. 이 약관에 동의하고 위 3.호의 사항을 확인하거나 거부하는 표시
        <br />         (예, 마우스 클릭)
        <br />      5. 재화 등의 구매신청 및 이에 관한 확인 또는 “사이트”의 확인에 대한 동의
        <br />      6. 결제방법의 선택
        <br /> 
        <br />  ② “사이트”가 제3자에게 구매자 개인정보를 제공·위탁할 필요가 있는 경우 실제 구매신청 시 구매자의 동의를 받아야 하며, 회원가입 시 미리 포괄적으로 동의를 받지 않습니다. 이 때 “사이트”는 제공되는 개인정보 항목, 제공받는 자, 제공받는 자의 개인정보 이용 목적 및 보유‧이용 기간 등을 구매자에게 명시하여야 합니다. 다만 「정보통신망이용촉진 및 정보보호 등에 관한 법률」 제25조 제1항에 의한 개인정보 취급위탁의 경우 등 관련 법령에 달리 정함이 있는 경우에는 그에 따릅니다.
        <br /> 
        <br /> 
        <br />제10조 (계약의 성립)
        <br /> 
        <br />  ①  “사이트”는 제9조와 같은 구매신청에 대하여 다음 각 호에 해당하면 승낙하지 않을 수 있습니다. 다만, 미성년자와 계약을 체결하는 경우에는 법정대리인의 동의를 얻지 못하면 미성년자 본인 또는 법정대리인이 계약을 취소할 수 있다는 내용을 고지하여야 합니다.
        <br /> 
        <br />    1. 신청 내용에 허위, 기재누락, 오기가 있는 경우
        <br />    2. 미성년자가 담배, 주류 등 청소년보호법에서 금지하는 재화 및 용역을 구매하는 경우
        <br />    3. 기타 구매신청에 승낙하는 것이 “사이트” 기술상 현저히 지장이 있다고 판단하는 경우
        <br /> 
        <br />  ② “사이트”의 승낙이 제12조제1항의 수신확인통지형태로 이용자에게 도달한 시점에 계약이 성립한 것으로 봅니다.
        <br /> 
        <br />  ③ “사이트”의 승낙의 의사표시에는 이용자의 구매 신청에 대한 확인 및 판매가능 여부, 구매신청의 정정 취소 등에 관한 정보 등을 포함하여야 합니다.
        <br /> 
        <br />제11조(지급방법) “사이트”에서 구매한 재화 또는 용역에 대한 대금지급방법은 다음 각 호의 방법중 가용한 방법으로 할 수 있습니다. 단, “사이트”는 이용자의 지급방법에 대하여 재화 등의 대금에 어떠한 명목의 수수료도  추가하여 징수할 수 없습니다.
        <br /> 
        <br />    1. 폰뱅킹, 인터넷뱅킹, 메일 뱅킹 등의 각종 계좌이체 
        <br />    2. 선불카드, 직불카드, 신용카드 등의 각종 카드 결제
        <br />    3. 온라인무통장입금
        <br />    4. 전자화폐에 의한 결제
        <br />    5. 수령 시 대금지급
        <br />    6. 마일리지 등 “사이트”가 지급한 포인트에 의한 결제
        <br />    7. “사이트”와 계약을 맺었거나 “사이트”가 인정한 상품권에 의한 결제
        <br />    8. 기타 전자적 지급 방법에 의한 대금 지급 등
        <br /> 
        <br />제12조(수신확인통지․구매신청 변경 및 취소)
        <br /> 
        <br />  ① “사이트”는 이용자의 구매신청이 있는 경우 이용자에게 수신확인통지를 합니다.
        <br /> 
        <br />  ② 수신확인통지를 받은 이용자는 의사표시의 불일치 등이 있는 경우에는 수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를 요청할 수 있고 “사이트”는 배송 전에 이용자의 요청이 있는 경우에는 지체 없이 그 요청에 따라 처리하여야 합니다. 다만 이미 대금을 지불한 경우에는 제15조의 청약철회 등에 관한 규정에 따릅니다.
        <br /> 
        <br />제13조(재화 등의 공급)
        <br /> 
        <br />  ① “사이트”는 이용자와 재화 등의 공급시기에 관하여 별도의 약정이 없는 이상, 이용자가 청약을 한 날부터 7일 이내에 재화 등을 배송할 수 있도록 주문제작, 포장 등 기타의 필요한 조치를 취합니다. 다만, “사이트”가 이미 재화 등의 대금의 전부 또는 일부를 받은 경우에는 대금의 전부 또는 일부를 받은 날부터 3영업일 이내에 조치를 취합니다.  이때 “사이트”는 이용자가 재화 등의 공급 절차 및 진행 사항을 확인할 수 있도록 적절한 조치를 합니다.
        <br /> 
        <br />  ② “사이트”는 이용자가 구매한 재화에 대해 배송수단, 수단별 배송비용 부담자, 수단별 배송기간 등을 명시합니다. 만약 “사이트”가 약정 배송기간을 초과한 경우에는 그로 인한 이용자의 손해를 배상하여야 합니다. 다만 “사이트”가 고의․과실이 없음을 입증한 경우에는 그러하지 아니합니다.
        <br /> 
        <br />제14조(환급) “사이트”는 이용자가 구매신청한 재화 등이 품절 등의 사유로 인도 또는 제공을 할 수 없을 때에는 지체 없이 그 사유를 이용자에게 통지하고 사전에 재화 등의 대금을 받은 경우에는 대금을 받은 날부터 3영업일 이내에 환급하거나 환급에 필요한 조치를 취합니다.
        <br /> 
        <br />제15조(청약철회 등)
        <br /> 
        <br />  ① “사이트”와 재화등의 구매에 관한 계약을 체결한 이용자는 「전자상거래 등에서의 소비자보호에 관한 법률」 제13조 제2항에 따른 계약내용에 관한 서면을 받은 날(그 서면을 받은 때보다 재화 등의 공급이 늦게 이루어진 경우에는 재화 등을 공급받거나 재화 등의 공급이 시작된 날을 말합니다)부터 7일 이내에는 청약의 철회를 할 수 있습니다. 다만, 청약철회에 관하여 「전자상거래 등에서의 소비자보호에 관한 법률」에 달리 정함이 있는 경우에는 동 법 규정에 따릅니다. 
        <br /> 
        <br />  ② 이용자는 재화 등을 배송 받은 경우 다음 각 호의 1에 해당하는 경우에는 반품 및 교환을 할 수 없습니다.
        <br /> 
        <br />    1. 이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된 경우(다만, 재화 등의 내용을 확인하기 위하여 포장 등을 훼손한 경우에는 청약철회를 할 수 있습니다)
        <br />    2. 이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가 현저히 감소한 경우
        <br />    3. 시간의 경과에 의하여 재판매가 곤란할 정도로 재화등의 가치가 현저히 감소한 경우
        <br />    4. 같은 성능을 지닌 재화 등으로 복제가 가능한 경우 그 원본인 재화 등의 포장을 훼손한 경우
        <br /> 
        <br />  ③ 제2항제2호 내지 제4호의 경우에 “사이트”가 사전에 청약철회 등이 제한되는 사실을 소비자가 쉽게 알 수 있는 곳에 명기하거나 시용상품을 제공하는 등의 조치를 하지 않았다면 이용자의 청약철회 등이 제한되지 않습니다.
        <br /> 
        <br />  ④ 이용자는 제1항 및 제2항의 규정에 불구하고 재화 등의 내용이 표시·광고 내용과 다르거나 계약내용과 다르게 이행된 때에는 당해 재화 등을 공급받은 날부터 3월 이내, 그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내에 청약철회 등을 할 수 있습니다.
        <br /> 
        <br />제16조(청약철회 등의 효과)
        <br /> 
        <br />  ① “사이트”는 이용자로부터 재화 등을 반환받은 경우 3영업일 이내에 이미 지급받은 재화 등의 대금을 환급합니다. 이 경우 “사이트”가 이용자에게 재화등의 환급을 지연한때에는 그 지연기간에 대하여 「전자상거래 등에서의 소비자보호에 관한 법률 시행령」제21조의2에서 정하는 지연이자율을 곱하여 산정한 지연이자를 지급합니다.
        <br /> 
        <br />  ② “사이트”는 위 대금을 환급함에 있어서 이용자가 신용카드 또는 전자화폐 등의 결제수단으로 재화 등의 대금을 지급한 때에는 지체 없이 당해 결제수단을 제공한 사업자로 하여금 재화 등의 대금의 청구를 정지 또는 취소하도록 요청합니다.
        <br /> 
        <br />  ③ 청약철회 등의 경우 공급받은 재화 등의 반환에 필요한 비용은 이용자가 부담합니다. “사이트”는 이용자에게 청약철회 등을 이유로 위약금 또는 손해배상을 청구하지 않습니다. 다만 재화 등의 내용이 표시·광고 내용과 다르거나 계약내용과 다르게 이행되어 청약철회 등을 하는 경우 재화 등의 반환에 필요한 비용은 “사이트”가 부담합니다.
        <br /> 
        <br />  ④ 이용자가 재화 등을 제공받을 때 발송비를 부담한 경우에 “사이트”는 청약철회 시 그 비용을  누가 부담하는지를 이용자가 알기 쉽도록 명확하게 표시합니다.
        <br /> 
        <br />제17조(개인정보보호)
        <br /> 
        <br />  ① “사이트”는 이용자의 개인정보 수집시 서비스제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다.
        <br /> 
        <br />  ② “사이트”는 회원가입시 구매계약이행에 필요한 정보를 미리 수집하지 않습니다. 다만, 관련 법령상 의무이행을 위하여 구매계약 이전에 본인확인이 필요한 경우로서 최소한의 특정 개인정보를 수집하는 경우에는 그러하지 아니합니다.
        <br /> 
        <br />  ③ “사이트”는 이용자의 개인정보를 수집·이용하는 때에는 당해 이용자에게 그 목적을 고지하고 동의를 받습니다.
        <br /> 
        <br />  ④ “사이트”는 수집된 개인정보를 목적외의 용도로 이용할 수 없으며, 새로운 이용목적이 발생한 경우 또는 제3자에게 제공하는 경우에는 이용·제공단계에서 당해 이용자에게 그 목적을 고지하고 동의를 받습니다. 다만, 관련 법령에 달리 정함이 있는 경우에는 예외로 합니다.
        <br /> 
        <br />  ⑤ “사이트”가 제3항과 제4항에 의해 이용자의 동의를 받아야 하는 경우에는 개인정보관리 책임자의 신원(소속, 성명 및 전화번호, 기타 연락처), 정보의 수집목적 및 이용목적, 제3자에 대한 정보제공 관련사항(제공받은자, 제공목적 및 제공할 정보의 내용) 등 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 제22조제2항이 규정한 사항을 미리 명시하거나 고지해야 하며 이용자는 언제든지 이 동의를 철회할 수 있습니다.
        <br /> 
        <br />  ⑥ 이용자는 언제든지 “사이트”가 가지고 있는 자신의 개인정보에 대해 열람 및 오류정정을 요구할 수 있으며 “사이트”는 이에 대해 지체 없이 필요한 조치를 취할 의무를 집니다. 이용자가 오류의 정정을 요구한 경우에는 “사이트”는 그 오류를 정정할 때까지 당해 개인정보를 이용하지 않습니다.
        <br /> 
        <br />  ⑦ “사이트”는 개인정보 보호를 위하여 이용자의 개인정보를 취급하는 자를  최소한으로 제한하여야 하며 신용카드, 은행계좌 등을 포함한 이용자의 개인정보의 분실, 도난, 유출, 동의 없는 제3자 제공, 변조 등으로 인한 이용자의 손해에 대하여 모든 책임을 집니다.
        <br /> 
        <br />  ⑧ “사이트” 또는 그로부터 개인정보를 제공받은 제3자는 개인정보의 수집목적 또는 제공받은 목적을 달성한 때에는 당해 개인정보를 지체 없이 파기합니다.
        <br /> 
        <br />  ⑨ “사이트”는 개인정보의 수집·이용·제공에 관한 동의란을 미리 선택한 것으로 설정해두지 않습니다. 또한 개인정보의 수집·이용·제공에 관한 이용자의 동의거절시 제한되는 서비스를 구체적으로 명시하고, 필수수집항목이 아닌 개인정보의 수집·이용·제공에 관한 이용자의 동의 거절을 이유로 회원가입 등 서비스 제공을 제한하거나 거절하지 않습니다.
        <br /> 
        <br />제18조(“사이트”의 의무)
        <br /> 
        <br />  ① “사이트”는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 재화․용역을 제공하는데 최선을 다하여야 합니다.
        <br /> 
        <br />  ② “사이트”는 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보(신용정보 포함)보호를 위한 보안 시스템을 갖추어야 합니다.
        <br /> 
        <br />  ③ “사이트”가 상품이나 용역에 대하여 「표시․광고의 공정화에 관한 법률」 제3조 소정의 부당한 표시․광고행위를 함으로써 이용자가 손해를 입은 때에는 이를 배상할 책임을 집니다.
        <br /> 
        <br />  ④ “사이트”는 이용자가 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다.
        <br /> 
        <br />제19조(회원의 ID 및 비밀번호에 대한 의무)
        <br /> 
        <br />  ① 제17조의 경우를 제외한 ID와 비밀번호에 관한 관리책임은 회원에게 있습니다.
        <br /> 
        <br />  ② 회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.
        <br /> 
        <br />  ③ 회원이 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 “사이트”에 통보하고 “사이트”의 안내가 있는 경우에는 그에 따라야 합니다.
        <br /> 
        <br />제20조(이용자의 의무) 이용자는 다음 행위를 하여서는 안 됩니다.
        <br /> 
        <br />    1. 신청 또는 변경시 허위 내용의 등록
        <br />    2. 타인의 정보 도용
        <br />    3. “사이트”에 게시된 정보의 변경
        <br />    4. “사이트”가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시
        <br />    5. “사이트” 기타 제3자의 저작권 등 지적재산권에 대한 침해
        <br />    6. “사이트” 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
        <br />    7. 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 몰에 공개 또는 게시하는 행위
        <br /> 
        <br />제21조(연결“사이트”와 피연결“사이트” 간의 관계)
        <br /> 
        <br />  ① 상위 “사이트”와 하위 “사이트”가 하이퍼링크(예: 하이퍼링크의 대상에는 문자, 그림 및 동화상 등이 포함됨)방식 등으로 연결된 경우, 전자를 연결 “사이트”(웹 사이트)이라고 하고 후자를 피연결 “사이트”(웹사이트)이라고 합니다.
        <br /> 
        <br />  ② 연결“사이트”는 피연결“사이트”가 독자적으로 제공하는 재화 등에 의하여 이용자와 행하는 거래에 대해서 보증 책임을 지지 않는다는 뜻을 연결“사이트”의 초기화면 또는 연결되는 시점의 팝업화면으로 명시한 경우에는 그 거래에 대한 보증 책임을 지지 않습니다.
        <br /> 
        <br />제22조(저작권의 귀속 및 이용제한)
        <br /> 
        <br />  ① “사이트”가 작성한 저작물에 대한 저작권 기타 지적재산권은 “사이트”에 귀속합니다.
        <br /> 
        <br />  ② 이용자는 “사이트”를 이용함으로써 얻은 정보 중 “사이트”에게 지적재산권이 귀속된 정보를 “사이트”의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
        <br /> 
        <br />  ③ “사이트”는 약정에 따라 이용자에게 귀속된 저작권을 사용하는 경우 당해 이용자에게 통보하여야 합니다.
        <br /> 
        <br />제23조(분쟁해결)
        <br /> 
        <br />  ① “사이트”는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치․운영합니다.
        <br /> 
        <br />  ② “사이트”는 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다.
        <br /> 
        <br />  ③ “사이트”와 이용자 간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.
        <br /> 
        <br />제24조(재판권 및 준거법)
        <br /> 
        <br />  ① “사이트”와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 “사이트”의 주소에 의하고, 주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다. 다만, 제소 당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다.
        <br /> 
        <br />  ② “사이트”와 이용자 간에 제기된 전자상거래 소송에는 한국법을 적용합니다.
        <br />
        <br />제 25조 프로젝트 정보의 제공·확인
        <br /> 
        <br />  ① 회원이 게재된 내용에 의존하여 판단을 한 경우 이로부터 발생하는 결과에 대하여 회사는 회사의 고의 또는 과실이 없는 이상 책임을 지지 않습니다.
        <br /> 
        <br />  ② 사전판매 모집을 시작하기 전에 홈페이지에 발행인이 게재하는 토큰의 백서, 도큐먼트, 로드맵 등 판단을 위해 필요한 정보가 게재됩니다.
      </div>
      <div v-else>
        <br />Article 1 (Purpose) These terms and conditions aim to stipulate the rights, obligations, and responsibilities of cyber malls and users in the use of Internet-related services Klaystar(hereinafter referred to as "Site") operated by Oneon Inc. (E-commerce operator).
        <br />
        <br />「 "These terms and conditions apply mutatis mutandis to e-commerce using PC communication, wireless, etc. as long as they are not contrary to their nature.」
        <br />
        <br />Article 2 (Definition)
        <br />
        <br />① "Site" refers to a virtual business site set up by a company to trade goods, etc. using information and communication facilities such as computers, in order to provide goods or services (hereinafter referred to as "goods, etc.") to users, and is also used as a business operator operating the site.
        <br />
        <br />② "User" refers to members and non-members who access the "site" and receive services provided by the "site" under these terms and conditions.
        <br />
        <br />③ The term "member" refers to a person who has registered as a member of the "site" and can continue to use the services provided by the "site".
        <br />
        <br />④ Non-member refers to a person who does not sign up for a member and uses the service provided by the site.
        <br />
        <br />Article 3 (Specification, explanation, and amendment of terms and conditions, etc.)
        <br />
        <br />① "Site" posts the contents of these terms and conditions, the name of the representative, the address of the office (including the address where consumers can handle complaints), the phone number, the copy transmission number, the e-mail address, the business registration number, the mail order report number, and the personal information management manager. However, the contents of the terms and conditions can be viewed through the connection screen.
        <br />
        <br />② Before the user agrees to the terms and conditions, the "site" should provide a separate connection screen or pop-up screen so that the user can understand important contents such as subscription withdrawal, delivery responsibility, and refund conditions.
        <br />
        <br />③ The "site" may amend these terms and conditions to the extent that they do not violate related laws such as the "Consumer Protection Act in Electronic Commerce, the Framework Act on Electronic Documents and Electronic Transactions," the "Electronic Signature Act," the "Information and Communication Network Promotion and Information Protection," and the "Basic Consumer Act."
        <br />
        <br />④ If the "site" revises the terms and conditions, the date of application and the reason for the revision will be specified and announced on the initial page of the mall along with the current terms and conditions from 7 days before the application date to the day before the application date. However, if the terms and conditions are changed unfavorably to the user, it will be notified with a preliminary grace period of at least 30 days. In this case, the "site" clearly compares the contents before and after the revision to make it easier for users to understand.
        <br />
        <br />⑤ If the "site" revises the terms and conditions, the revised terms and conditions apply only to contracts concluded after the application date, and the terms and conditions before the amendment apply to contracts already concluded before that. However, if a user who has already signed a contract transmits the intention to be subject to the revised terms and conditions to the "site" within the notice period of the revised terms and conditions under paragraph (3) and obtains consent from the "site", the revised terms and conditions apply.
        <br />
        <br />⑥ Matters not stipulated in these terms and conditions and interpretation of these terms and conditions shall be governed by the Consumer Protection Act in Electronic Commerce, the Act on Regulation of Terms and Conditions, the Consumer Protection Guidelines in Electronic Commerce, etc. and related laws or correlations.
        <br />
        <br />Article 4 (Providing and Changing Services)
        <br />
        <br />① The "site" performs the following tasks.
        <br />
        <br />1. Provision of information on goods or services and conclusion of a purchase contract.
        <br />2. Delivery of goods or services to which a purchase contract has been concluded.
        <br />3. Other tasks determined by "site".
        <br />
        <br />② The "site" may change the contents of the goods or services to be provided by a contract concluded in the future in the event of sold out of goods or services or changes in technical specifications. In this case, the contents of the changed goods or services and the date of provision shall be specified and immediately notified to the place where the contents of the current goods or services have been posted.
        <br />
        <br />③ If the contents of the service that has signed a contract with the user to be provided by the "site" are changed due to reasons such as sold out of goods or changes in technical specifications, the reason shall be immediately notified to the user.
        <br />
        <br />④ In the case of the preceding paragraph, the "site" compensates the user for damages caused by this. However, this is not the case if the "site" proves that there is no intention or negligence.
        <br />
        <br />Article 5 (Suspension of Service)
        <br />
        <br />① The "site" may temporarily suspend the provision of services in the event of reasons such as maintenance inspection, replacement and failure of information and communication facilities such as computers, or communication failure.
        <br />
        <br />② The "site" compensates the user or a third party for damages caused by the temporary suspension of the provision of services due to the reasons referred to paragraph (1). However, this is not the case if the "site" proves that there is no intention or negligence.
        <br />
        <br />③ If the service cannot be provided due to the conversion of business items, abandonment of business, or integration between companies, the "site" notifies the user in the manner prescribed in Article 8 and compensates the consumer according to the conditions originally suggested by the "site". However, if the "site" does not notify the compensation criteria, etc., the users' mileage or reserves will be paid to the user in kind or cash corresponding to the currency value commonly used on the "site".
        <br />
        <br />Article 6 (Membership)
        <br />
        <br />① Users apply for membership by filling out their membership information according to the subscription form set by the "site" and expressing their intention to agree to these terms and conditions.
        <br />
        <br />② "Site" shall be registered as a member unless it falls under any of the following subparagraphs among users who have applied to join as a member as shown in paragraph 1.
        <br />
        <br />1. If an applicant for membership has previously lost his/her membership pursuant to Article 7 (3) of this Agreement, exceptions shall be made where three years have elapsed since the loss of membership under Article 7 (3) and re-approval of the "site" is obtained.
        <br />2. Where there is a falsehood, omission, or error in the registration,
        <br />3. In a case where it is determined that registering as another member significantly hinders the technology of the "site",
        <br />
        <br />③ The time when the membership contract is established is when the consent of the "site" reaches the member.
        <br />
        <br />④ If there is a change in the registered matters at the time of membership registration, a member must notify the "site" of the changes by modifying the membership information within a considerable period of time.
        <br />
        <br />Article 7 (withdrawal of membership, loss of qualification, etc.)
        <br />
        <br />① Members can request withdrawal from the "site" at any time, and the "site" processes withdrawal immediately.
        <br />
        <br />② If a member falls under any of the following reasons, the "site" may restrict and suspend membership qualifications.
        <br />
        <br />1. Where false information is registered at the time of application for subscription.
        <br />2. In a case where the payment of goods, etc. purchased using the "site" or other debts borne by the member regarding the use of the "site" are not paid on the due date.
        <br />3. In the case of threatening the e-commerce order, such as interfering with the use of another person's "site" or stealing the information.
        <br />4. In the case of prohibiting statutes or these terms and conditions using the "site" or committing an act contrary to public order and morals,
        <br />
        <br />③ After "site" restricts or suspends membership, "site" may lose membership if the same act is repeated more than twice or the reason is not corrected within 30 days.
        <br />
        <br />④ If the "site" loses its membership, the membership registration is canceled. In this case, the member is notified of this and an opportunity to explain for at least 30 days before the cancellation of the membership registration is given.
        <br />
        <br />Article 8 (Notification to Members)
        <br />
        <br />① If the "site" notifies the member, the member may make an agreement with the "site" in advance to the designated e-mail address.
        <br />
        <br />② "Site" can be replaced by individual notifications by posting on the "Site" bulletin board for more than a week for notifications to unspecified members. However, individual notifications are given to matters that have a significant impact on the member's transaction.
        <br />
        <br />Article 9 (Application for Purchase)
        <br />
        <br />① The "site" user shall apply for purchase on the "site" in the following or similar manner, and the "site" shall provide each of the following information in an easy-to-understand manner when the user applies for purchase.
        <br />1. Search and select goods, etc.
        <br />2. Enter the recipient's name, address, phone number, e-mail address (or mobile phone number), etc.
        <br />3. Confirmation of the contents related to the cost burden, such as terms and conditions, services with limited subscription withdrawal rights, delivery fees, installation costs, etc.
        <br />4. Indication of agreeing to these terms and conditions and confirming or rejecting the matters under subparagraph 3.
        <br />(Yes, click the mouse)
        <br />5. Application for purchase of goods, etc. and confirmation thereof or consent to confirmation of "site"
        <br />6. Choice of payment method.
        <br />
        <br />② If the "site" needs to provide or entrust the buyer's personal information to a third party, the buyer's consent must be obtained when applying for an actual purchase, and comprehensive consent is not obtained in advance when signing up as a member. At this time, the "site" shall specify to the buyer the personal information items provided, the purpose of using the personal information of the recipient, the recipient, and the period of retention and use. However, if there is a different provision in the relevant statutes, such as entrustment of personal information handling pursuant to Article 25 (1) of the Information and Communication Network Utilization and Information Protection, etc. Act, it shall be followed.
        <br />
        <br />Article 10 (The establishment of a contract)
        <br />
        <br />① The "site" may not accept the purchase application as in Article 9 if it falls under any of the following subparagraphs. However, in the case of signing a contract with a minor, if the consent of the legal representative is not obtained, the minor himself or the legal representative must notify that the contract may be canceled.
        <br />
        <br />1. Where there is a falsehood, omission, or error in the contents of the application,
        <br />2. In the case where a minor purchases goods and services prohibited by the Youth Protection Act, such as cigarettes and alcohol, etc.
        <br />3. In a case where it is determined that consent to other purchase applications is significantly hindered by the "site" technology.
        <br />
        <br />② The contract is deemed to have been established at the time when the consent of the "site" reaches the user in the form of a notification of receipt confirmation under Article 12 (1).
        <br />
        <br />③ The expression of consent to the "site" shall include information on the confirmation and sale of the user's purchase application, cancellation of correction of the purchase application, etc.
        <br />
        <br />Article 11 (Payment Method) The payment method for goods or services purchased on the "site" may be made in any of the following ways. However, the "site" cannot collect any nominal fee for the payment method of the user, such as goods.
        <br />
        <br />1. Telephone banking, internet banking, e-mail banking, and other account transfers.
        <br />2. Payment of various cards such as prepaid card, debit card, credit card, etc.
        <br />3. Deposit without a bankbook online.
        <br />4. Payment by electronic money.
        <br />5. Payment upon receipt.
        <br />6. Payment based on points paid by "site" such as mileage.
        <br />7. Payment based on gift certificates that have signed a contract with "site" or recognized by "site"
        <br />8. Payment, etc. by other electronic payment methods.
        <br />
        <br />Article 12 (Notification of receipt confirmation, change of purchase application, and cancellation)
        <br />
        <br />① The "site" notifies the user of the receipt confirmation if there is a user's purchase application.
        <br />
        <br />② If there is a disagreement in the expression of intention, the user who has received the notification can immediately request the change or cancellation of the purchase application, and if the user requests it before delivery, the "site" must be processed according to the user's request before delivery. However, if the payment has already been made, the provisions on withdrawal of subscription, etc. under Article 15 shall be followed.
        <br />
        <br />Article 13 (Supply of goods, etc.)
        <br />
        <br />① "Site" takes other necessary measures such as custom production and packaging so that goods can be delivered within seven days from the date of subscription, unless there is a separate agreement with the user regarding the timing of supply of goods. However, if the "site" has already received all or part of the payment for goods, etc., measures shall be taken within three business days from the date of receipt of all or part of the payment. At this time, the "site" takes appropriate measures so that users can check the supply procedure and progress of goods.
        <br />
        <br />② The "site" specifies the delivery method, the person responsible for the delivery cost by means, and the delivery period by means for the goods purchased by the user. If the "site" exceeds the agreed delivery period, the user must compensate for the damage caused by it. However, this is not the case if the "site" proves that there is no intention or negligence.
        <br />
        <br />Article 14 (Refund) "site" shall notify the user of the reason without delay if the goods requested by the user cannot be delivered or provided due to sold out, etc., and refund or take necessary measures within three business days from the date of receipt of the payment.
        <br />
        <br />Article 15 (withdrawal of subscription, etc.)
        <br />
        <br />① Users who have signed a contract on the purchase of goods, etc. with "site" may withdraw their subscription within seven days from the date of receipt of a written contract under Article 13(2) of the Consumer Protection in Electronic Commerce, etc. Act (referring to the date of supply of goods, etc.). However, if there is a different provision in the Consumer Protection in Electronic Commerce, etc. Act regarding the withdrawal of subscription, the provisions of the same Act shall be followed.
        <br />
        <br />② Users cannot return or exchange goods, etc., if they receive them, if they fall under any of the following subparagraphs.
        <br />
        <br />1. If goods, etc., are lost or damaged due to responsible reasons for the user (however, if the packaging, etc. is damaged to check the contents of goods, etc., the subscription may be withdrawn).
        <br />2. In the case where the value of goods, etc. is significantly reduced due to the user's use or some consumption.
        <br />3. In a case where the value of goods, etc. has significantly decreased to the extent that resale is difficult over time.
        <br />4. In the case where it is possible to reproduce goods, etc. with the same performance, the packaging of the original goods, etc. is damaged.
        <br />
        <br />③ In the case of Paragraphs 2 through 4, the withdrawal of subscription by users is not restricted unless the "site" specifies where consumers can easily see that subscription withdrawal is restricted in advance or provides trial products.
        <br />
        <br />④ Notwithstanding the provisions of paragraphs (1) and (2), users may withdraw their subscription within three months from the date of supply or 30 days from the date of receipt of the goods, etc., or within the date of knowledge or knowledge.
        <br />
        <br />Article 16 (Effect of Withdrawal of Subscription, etc.)
        <br /> 
        <br />  ① "Site" refunds the amount of goods already paid within three business days if goods, etc. are returned from the user. In this case, when the "site" delays the refund of goods, etc. to the user, the delayed interest calculated by multiplying the delayed interest rate by Article 21-2 of the Enforcement Decree of the Consumer Protection in Electronic Commerce, etc. Act shall be paid.
        <br /> 
        <br />  ② In refunding the above payment, "site" asks the business operator who provided the payment method to suspend or cancel the claim for goods, etc. without delay when the user pays for goods, etc. by payment method such as credit card or electronic money.
        <br /> 
        <br />  ③ In the case of subscription withdrawal, etc., the user bears the expenses necessary for the return of the supplied goods. The "site" does not claim penalties or damages from users for reasons such as withdrawal of subscription. However, if the contents of goods, etc., are different from the contents of the display or advertisement, or if the subscription is withdrawn due to different implementation from the contract, the "site" will bear the costs required for the return of goods, etc.
        <br /> 
        <br />  ④ When a user pays for shipping when receiving goods, etc., the "site" clearly marks who pays for the subscription withdrawal so that it is easy for the user to understand.
        <br /> 
        <br />Article 17 (Personal Information Protection)
        <br /> 
        <br />  ① "Site" collects minimal personal information to the extent necessary to provide services when collecting users' personal information.
        <br /> 
        <br />  ② The "site" does not collect information necessary for the execution of the purchase contract in advance when signing up as a member. However, this is not the case if identification is required before the purchase contract to fulfill the obligations under the relevant laws and regulations, and minimum specific personal information is collected.
        <br /> 
        <br />  ③ When collecting and using the user's personal information, the "site" notifies the user of the purpose and obtains consent.
        <br /> 
        <br />  ④ The "site" cannot use the collected personal information for purposes other than its purpose, and if a new purpose of use occurs or is provided to a third party, the user is notified of the purpose and consent is obtained at the stage of use and provision. However, exceptions are made if there are other provisions in the relevant laws and regulations.
        <br /> 
        <br />  ⑤ If the "site" requires the consent of the user pursuant to paragraphs 3 and 4, the person in charge of personal information management (affiliated, name, phone number, other contact number), purpose of collection and use of information, and information provision to third parties.
        <br /> 
        <br />  ⑥ Users can at any time request access to and correction of their personal information held by the "site", and the "site" is obligated to take necessary measures without delay. If the user requests correction of the error, the "site" will not use the personal information until the error is corrected.
        <br /> 
        <br />  ⑦ In order to protect personal information, the "site" should limit the number of people handling the user's personal information to a minimum, and is fully responsible for the loss, theft, leakage, third party provision, and modulation of the user's personal information, including credit cards and bank accounts.
        <br /> 
        <br />  ⑧ The "site" or a third party who has received personal information from it shall destroy the personal information without delay when the purpose of collecting or receiving personal information is achieved.
        <br /> 
        <br />  ⑨ The "site" does not set the consent column for the collection, use, and provision of personal information as selected in advance. In addition, services restricted when users refuse consent to collect, use, and provide personal information are specifically specified, and services such as membership are not restricted or rejected due to the user's refusal to collect, use, and provide personal information.
        <br /> 
        <br />Article 18 (Duties of the "site")
        <br /> 
        <br />  ① The "site" shall not engage in acts prohibited by laws and conditions or contrary to public order and morals, and shall do its best to provide goods and services continuously and stably as prescribed by these terms and conditions.
        <br /> 
        <br />  ② The "site" should have a security system to protect users' personal information (including credit information) so that users can safely use Internet services.
        <br /> 
        <br />  ③ "Site" shall be responsible for compensation if a user suffers damage due to unfair labeling and advertising activities prescribed in Article 3 of the Fair Labeling and Advertising Act on goods or services.
        <br /> 
        <br />  ④ "Site" does not send advertising e-mails for profit that users do not want.
        <br /> 
        <br />Article 19 (Duties to the member's ID and password)
        <br /> 
        <br />  ① Except for the case of Article 17, the member is responsible for managing the ID and password.
        <br /> 
        <br />  ② Members should not allow third parties to use their IDs and passwords.
        <br /> 
        <br />  ③ If a member recognizes that his or her ID and password have been stolen or is being used by a third party, notify the "site" immediately and follow the "site" guidance.
        <br /> 
        <br />Article 20 (User's Duty) Users shall not do the following:
        <br /> 
        <br />    1. Registration of false information upon application or change.
        <br />    2. Stealing information from others.
        <br />    3. Change of information posted on "site".
        <br />    4. Transmission or posting of information (computer programs, etc.) other than information determined by "site"
        <br />    5. Infringement of intellectual property rights such as copyrights of "site" and other third parties.
        <br />    6. "site" or other acts that damage the reputation of a third party or interfere with business.
        <br />    7. The act of disclosing or posting obscene or violent messages, images, voices, and other information contrary to public order in the mall.
        <br /> 
        <br />Article 21 (Relationship between a connection "site" and a connection "site")
        <br /> 
        <br />  ① If the top "site" and the bottom "site" are connected by hyperlinks (e.g., the target of hyperlinks includes text, pictures, and moving pictures), the former is called a "site" (website) and the latter is called a "site" (website).
        <br /> 
        <br />  ② Connection "site" shall not be guaranteed for the transaction if it is specified as the initial screen of "site" or the pop-up screen at the time of connection, meaning that it is not responsible for the transaction with the user by goods provided independently by the linked "site".
        <br /> 
        <br />Article 22 (Limitation of the attribution and use of copyrights)
        <br /> 
        <br />  ① Copyrights and other intellectual property rights for works created by "site" belong to "site".
        <br /> 
        <br />  ② Users shall not reproduce, transmit, publish, distribute, broadcast, or allow third parties to use information to which intellectual property rights belong to the "site" among the information obtained by using the "site" without prior consent from the "site".
        <br /> 
        <br />  ③ The "site" shall notify the relevant user of the use of copyright attributable to the user according to the agreement.
        <br /> 
        <br />Article 23 (Dispute Resolution)
        <br /> 
        <br />  ① The "site" establishes and operates a damage compensation handling organization to reflect legitimate opinions or complaints raised by users and to compensate for the damage.
        <br /> 
        <br />  ② The "site" first handles complaints and opinions submitted from users. However, if it is difficult to process quickly, the user will be notified of the reason and processing schedule immediately.
        <br /> 
        <br />  ③ If a user applies for damage relief in connection with an e-commerce dispute between the "site" and the user, it may be subject to mediation by the Fair Trade Commission or the dispute mediation agency commissioned by the Mayor/Province Governor.
        <br /> 
        <br />Article 24 (judicial authority and governing law)
        <br /> 
        <br />  ① The lawsuit regarding the e-commerce dispute between the "site" and the user shall be governed by the address of the "site" at the time of filing, and if there is no address, it shall be under the exclusive jurisdiction of the district court having jurisdiction over the residence. However, if the address or residence of the user is not clear at the time of filing a lawsuit or if a foreign resident is present, it shall be filed with the competent court under the Civil Procedure Act.
        <br /> 
        <br />  ② Korean law applies to e-commerce lawsuits filed between "site" and users.
        <br /> 
        <br />Article 25 (Provision and verification of project information)
        <br /> 
        <br />  ① If a member makes a judgment based on the contents posted, the company shall not be responsible for the consequences thereof unless there is intention or negligence of the company.
        <br /> 
        <br />  ② Before the pre-sale recruitment begins, information necessary for judgment, such as white papers, documentation, and roadmap of tokens posted by issuers, will be posted on the website.
      </div>
    </font>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>

</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Create',
  data () {
    return {
      key: '', // 결제창 호출시 상점 파라미터(merchantData)로 설정한 값 중의 key의 value
    }
  },
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  components: {
  },
  computed: {
  },
  created: function () {
  },
  mounted: function () {},
  methods: {
  },
})
</script>

<style scoped>
</style>

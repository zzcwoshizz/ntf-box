export default {
  common: {
    connecting: '连接中',
    connectWallet: '连接钱包',
    login: '登录',
    logging: '登录中'
  },
  errorMessage: {
    N01: 'Token验证失败',
    N02: '邮箱已订阅',
    N03: '签名不得为空',
    N04: '签名验证失败',
    N05: '参数错误',
    N06: 'Token过期',
    N07: '订单信息错误',
    N08: '插入订单错误',
    N09: '订单类型错误',
    N10: '订单已存在',
    N11: '请选择物品',
    N12: '订单不存在',
    N13: '长度为0',
    N14: '物品信息获取失败',
    N15: '合约错误'
  },
  header: {
    home: '首页',
    ranking: '排行榜',
    activity: '实时记录',
    market: '市场',
    help: '帮助中心',
    record: '成交记录',
    items: '我的物品',
    sell: '卖出物品',
    transfer: '转赠物品',
    setting: '设置',
    myAccount: '我的账户'
  },
  footer: {
    aboutUs: '关于我们',
    myItems: '我的物品',
    myActivity: '我的记录',
    gift: '赠送物品',
    learnMore: '了解更多',
    activity: '全站记录',
    helpCenter: '帮助中心',
    ranking: '排行榜列表'
  },
  home: {
    title: '去中心化非同质化资产交易平台',
    desc: '致力于成为一个高效便捷的非同质化资产交易平台',
    buyNow: '立即购买',
    subscribe: '订阅',
    hot: '热门',
    newest: '最新',
    intro: {
      title: 'Finannel建立的初衷和的愿景',
      desc:
        'Finannel这个名字的由来，是取自于Finance和Channel。寓意也希望非同质化的概念被更多的人了解、使用、甚至普及给更多的人。NFT存在可以便捷我们的生活，现在我们只是迈出了一小步，会通过不断的探索与创新，让愿景不再只是愿景.'
    },
    help: {
      title: '新手帮助，帮助您更快的解决问题',
      desc: '搜索您想询问的关键字，我们会为您匹配相关的答案',
      placeholder: '为什么我需要支付gas',
      submit: '寻求帮助'
    }
  },
  asset: {
    filter: {
      title: 'DAPP集合'
    },
    content: {
      title: '所有物品',
      desc: '共有 {count} 个',
      selectType: '选择类型',
      sort: '排序',
      cancel: '取消',
      transfer: '转赠',
      sell: '卖出',
      selectedCount: '共选中 {count} 个'
    },
    itemOrder: {
      0: '最新创建',
      1: '即将过期',
      2: '价格最低',
      3: '价格最高'
    },
    orderType: {
      0: '所有物品',
      1: '单个售卖',
      2: '捆绑售卖'
    },
    types: {
      HOT: '热门',
      NEW: '最新',
      VIRTUAL_WORLDS: '虚拟世界',
      DOMAIN_NAMES: '网站域名',
      BLOCKCHAIN_ART: '数字艺术',
      TRADING_CARDS: '卡牌交易',
      COLLECTIBLES: '收藏品',
      SPORTS: '体育',
      UTILITY: '实用',
      GAME: '游戏'
    },
    detail: {
      holders: '持有者',
      inputPrice: '请输入价格（ETH）',
      modifyPrice: '修改价格',
      sell: '卖出',
      cancel: '下架物品',
      gift: '赠送',
      buy: '立即购买',
      born: '出生于 {time}',
      holdAddress: '持有地址',
      features: '物品属性',
      activityRecord: '全网记录',
      more: '更多'
    }
  },
  activity: {
    goToMarket: '跳转到市场',
    selectType: '选择类型',
    realtime: '* 实时更新',
    buy: '购买',
    sell: '卖出',
    transfer: '转赠',
    offShelf: '下架',
    modifyPrice: '{address} 修改了价钱',
    columns: {
      time: '时间',
      commodity: '项目',
      changeDetail: '流转详情',
      price: '价格（ETH）',
      txid: 'Txid'
    }
  },
  publish: {
    price: '最新价',
    saleMethod: '售卖方式',
    fixPrice: '固定价格',
    priceLabel: '价格',
    inputPrice: '请输入价格（ETH）',
    otherSetting: '其他设置',
    timeLabel: '过期时间',
    inputTime: '过期日期（默认永不过期）',
    preview: {
      title: '订单信息',
      goods: '物品',
      count: '{count} 个',
      price: '价格',
      end: '结束区块',
      endDesc: '成交 / 下架 视为结束',
      submit: '确定并发布',
      tipTitle: '手续费',
      tipHtml: '上架商品是免费的。.<br />购买或者拍卖，平台收取1.5%的手续费。'
    }
  },
  ranking: {
    title: 'DAPP 排行榜',
    columns: {
      dapp: 'DAPP',
      transactions: '交易数',
      avgPrice: '平均价（ETH）',
      assets: '物品数',
      owners: '持有者',
      total: '交易总额（USDT）',
      rate: '周转率'
    }
  },
  transfer: {
    amountLabel: '数量',
    inputAmount: '请输入转账数量',
    addressLabel: '钱包地址或者ENS NAME',
    inputAddress: '请输入地址',
    tip: '“{name}” 将会转赠给 {address}',
    submit: '转赠'
  },
  help: {
    title: '帮助中心',
    messages: '{count} 条',
    inputKeys: '请输入关键词'
  },
  account: {
    goToMarket: '跳转到市场',
    emailModal: {
      title: '设置邮箱',
      inputEmail: '请输入您的邮箱'
    },
    nameModal: {
      title: '设置昵称',
      inputName: '请输入您的昵称'
    },
    setUp: '设置',
    emailDesc: '方便给您交易提醒，订阅最新消息',
    nameDesc: '拥有独特的昵称，更方便交易查询',
    subscribe: '订阅',
    reminder: '上新提醒',
    security: '交易提醒'
  },
  project: {
    projectData: {
      holder: '持有者',
      avgPrice: '平均价',
      turnover: '流转数'
    },
    projectInfo: {
      website: '官网',
      intro: '简介',
      ranking: '排行',
      category: '分类'
    }
  }
}

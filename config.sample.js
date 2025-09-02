// 配置文件示例 - 请复制为 config.js 并填入真实配置
window.AppConfig = {
  // Supabase 配置 - 请替换为您的实际配置
  SUPABASE_URL: 'your-supabase-url',
  SUPABASE_ANON_KEY: 'your-supabase-anon-key',
  
  // 业务配置 - 请根据实际情况修改
  WHATSAPP_NUMBER: 'your-whatsapp-number',
  ADMIN_PASSWORD: 'your-admin-password',
  SELF_PICKUP_ADDRESS: 'your-pickup-address',
  PRODUCT_IMAGE_BASE_URL: 'your-product-image-base-url',
  
  // 会员功能开关配置
  MEMBER_FEATURES: {
    ENABLED: true,              // 总开关
    POINTS_SYSTEM: true,        // 积分功能
    LOGIN_REQUIRED: false,      // 登录功能
    ORDER_HISTORY: true,        // 订单历史查看
    AUTO_MERGE_ORDERS: true     // 自动合并订单
  },
  
  // WhatsApp 手机号验证规则
  PHONE_VALIDATION: {
    REQUIRED_PREFIX: '601',     // 必须以601开头
    MIN_LENGTH: 11,             // 最小长度
    MAX_LENGTH: 12              // 最大长度
  }
};
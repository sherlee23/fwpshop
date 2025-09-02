// FengWei Pai 锋味派美食团购系统 - 生产配置文件
// 此文件包含实际的配置信息，可直接部署使用
window.AppConfig = {
  // Supabase 数据库配置
  SUPABASE_URL: 'https://edfnhhthztskuuosuasw.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkZm5oaHRoenRza3V1b3N1YXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTYxMTYsImV4cCI6MjA2NTU3MjExNn0.O3g2gjvsWagmWgmzoeJA8mPampvLYJr-KgqVwXsKoAo',
  
  // 业务配置信息
  WHATSAPP_NUMBER: '60162327792',
  ADMIN_PASSWORD: 'fengweipaiadmin',
  SELF_PICKUP_ADDRESS: '667, Jalan 24, Taman Perindustrian Ehsan Jaya, Kepong, 52100, Kuala Lumpur.',
  PRODUCT_IMAGE_BASE_URL: 'https://edfnhhthztskuuosuasw.supabase.co/storage/v1/object/public/product-photos/',
  
  // 会员系统功能开关配置
  MEMBER_FEATURES: {
    ENABLED: true,              // 会员系统总开关
    POINTS_SYSTEM: true,        // 积分功能开关
    LOGIN_REQUIRED: false,      // 登录功能开关
    ORDER_HISTORY: true,        // 订单历史查看开关
    AUTO_MERGE_ORDERS: true     // 自动合并订单开关
  },
  
  // 马来西亚手机号码验证规则 - 支持数据库现有格式 (0162327792)
  PHONE_VALIDATION: {
    ALLOW_LOCAL_FORMAT: true,   // 允许本地格式 (0162327792) - 兼容现有数据
    ALLOW_INTL_FORMAT: true,    // 允许国际格式 (60162327792)
    CONVERT_TO_INTL: false,     // 保持原格式存储，兼容现有数据库
    LOCAL_PREFIX: '0',          // 本地格式前缀
    INTL_PREFIX: '60',          // 国际格式前缀
    MIN_LENGTH: 10,             // 最小长度 (本地格式: 0162327792)
    MAX_LENGTH: 12              // 最大长度 (国际格式: 60162327792)
  },
  
  // 系统设置
  SYSTEM_SETTINGS: {
    DEFAULT_LANGUAGE: 'zh-CN',
    CURRENCY: 'RM',
    TIMEZONE: 'Asia/Kuala_Lumpur',
    DATE_FORMAT: 'DD/MM/YYYY',
    TIME_FORMAT: '24h'
  }
};

// 配置验证函数
window.AppConfig.validate = function() {
  const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
  const missing = required.filter(key => !this[key] || this[key].includes('your-'));
  
  if (missing.length === 0) {
    console.log('✅ 配置文件验证通过 - 所有必要配置项已正确设置');
    console.log('📱 手机号验证: 支持本地格式 (0162327792) 和国际格式 (60162327792)');
  } else {
    console.warn('⚠️ 配置文件警告: 以下配置项需要更新:', missing);
  }
  
  return missing.length === 0;
};

// 自动验证配置
if (typeof window !== 'undefined') {
  window.AppConfig.validate();
}
// FengWei Pai 锋味派美食团购系统 - 配置文件模板
// 使用方法: 复制此文件为 config.js 并填入实际的配置信息
window.AppConfig = {
  // Supabase 数据库配置 - 请替换为您的实际配置
  SUPABASE_URL: 'https://your-project-id.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQwOTk1MjAwLCJleHAiOjE5NTY1NzEyMDB9.your-actual-anon-key',
  
  // 业务配置信息 - 请根据实际情况修改
  WHATSAPP_NUMBER: '60123456789',           // 客服WhatsApp号码 (马来西亚格式)
  ADMIN_PASSWORD: 'fengweipai2024',         // 管理后台密码
  SELF_PICKUP_ADDRESS: '吉隆坡某某地区某某街道123号', // 自取地址
  PRODUCT_IMAGE_BASE_URL: 'https://your-cdn-domain.com/images/', // 产品图片CDN地址
  
  // 会员系统功能开关配置
  MEMBER_FEATURES: {
    ENABLED: true,              // 会员系统总开关
    POINTS_SYSTEM: true,        // 积分功能开关
    LOGIN_REQUIRED: false,      // 登录功能开关
    ORDER_HISTORY: true,        // 订单历史查看开关
    AUTO_MERGE_ORDERS: true     // 自动合并订单开关
  },
  
  // 马来西亚手机号码验证规则 - 支持数据库现有格式
  PHONE_VALIDATION: {
    ALLOW_LOCAL_FORMAT: true,   // 允许本地格式 (0162327792) - 推荐开启
    ALLOW_INTL_FORMAT: true,    // 允许国际格式 (60162327792)
    CONVERT_TO_INTL: false,     // 是否转换为国际格式存储 (建议保持false，兼容现有数据)
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
  
  if (missing.length > 0) {
    console.warn('⚠️ 配置文件警告: 以下配置项需要更新:', missing);
    console.warn('📝 请编辑 config.js 文件，填入实际的配置信息');
    console.info('💡 支持的手机号格式: 0162327792 (本地) 或 60162327792 (国际)');
  }
  
  return missing.length === 0;
};

// 自动验证配置
if (typeof window !== 'undefined') {
  window.AppConfig.validate();
}
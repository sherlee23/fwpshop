# 锋味派美食团购系统 - 部署指南

## 📋 部署前准备

### 系统要求
- Web 服务器 (Apache/Nginx/任何静态文件服务器)
- 支持 HTTPS (推荐)
- 现代浏览器支持 (Chrome, Firefox, Safari, Edge)

### 必要文件清单
- ✅ `index.html` - 主应用文件
- ✅ `style.css` - 样式文件
- ✅ `config.js` - **生产配置文件 (已包含完整配置)**
- ✅ `config.sample.js` - 配置模板 (仅供参考)
- ✅ `README.md` - 项目说明
- ✅ `DEPLOYMENT.md` - 本部署指南

## 🚀 快速部署 (推荐)

### 方式一：直接部署 (零配置)
应用已包含完整的生产配置，可立即部署使用：

```bash
# 1. 上传所有文件到 Web 服务器根目录
# 2. 确保 index.html 可通过浏览器访问
# 3. 完成！应用即可正常使用
```

**访问应用**: `https://your-domain.com`

## 🔧 配置文件详解

### config.js - 生产配置文件
**状态**: ✅ 已完成配置，可直接使用

```javascript
window.AppConfig = {
  // Supabase 数据库配置 (已配置)
  SUPABASE_URL: 'https://edfnhhthztskuuosuasw.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  
  // 业务配置 (已配置)
  WHATSAPP_NUMBER: '60162327792',           // 客服 WhatsApp 号码
  ADMIN_PASSWORD: 'fengweipaiadmin',        // 管理后台密码
  SELF_PICKUP_ADDRESS: '667, Jalan 24, Taman Perindustrian Ehsan Jaya, Kepong, 52100, Kuala Lumpur.',
  PRODUCT_IMAGE_BASE_URL: 'https://edfnhhthztskuuosuasw.supabase.co/storage/v1/object/public/product-photos/',
  
  // 会员系统功能开关 (已配置)
  MEMBER_FEATURES: {
    ENABLED: true,              // 会员系统总开关
    POINTS_SYSTEM: true,        // 积分功能开关
    LOGIN_REQUIRED: false,      // 登录功能开关
    ORDER_HISTORY: true,        // 订单历史查看开关
    AUTO_MERGE_ORDERS: true     // 自动合并订单开关
  },
  
  // 马来西亚手机号验证 (已优化 - 支持 0162327792 格式)
  PHONE_VALIDATION: {
    ALLOW_LOCAL_FORMAT: true,   // 支持本地格式 (0162327792)
    ALLOW_INTL_FORMAT: true,    // 支持国际格式 (60162327792)
    CONVERT_TO_INTL: false,     // 保持原格式，兼容现有数据库
    LOCAL_PREFIX: '0',          // 本地格式前缀
    INTL_PREFIX: '60',          // 国际格式前缀
    MIN_LENGTH: 10,             // 最小长度
    MAX_LENGTH: 12              // 最大长度
  }
};
```

## 📁 部署步骤详解

### 步骤 1: 文件准备
```bash
# 确保以下文件存在于部署目录:
├── index.html          # 主应用文件
├── style.css           # 样式文件
├── config.js           # 生产配置 (已完成)
├── config.sample.js    # 配置模板 (可选)
├── README.md           # 项目说明 (可选)
└── DEPLOYMENT.md       # 部署指南 (可选)
```

### 步骤 2: Web 服务器配置

#### Apache (.htaccess)
```apache
# 启用 HTTPS 重定向
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# 设置缓存策略
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType text/html "access plus 1 hour"
</IfModule>
```

#### Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;
    root /path/to/fwpshop;
    index index.html;
    
    # SSL 配置
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 步骤 3: 验证部署
1. **访问应用**: 打开浏览器访问 `https://your-domain.com`
2. **检查配置**: 打开浏览器控制台，应看到 "✅ 配置文件验证通过" 消息
3. **测试功能**: 
   - 浏览商品分类 (导航栏吸顶)
   - 添加商品到购物车
   - 测试手机号验证 (支持 0162327792 和 60162327792)
   - 测试订单提交流程

## 🛠️ 自定义配置 (可选)

如需修改配置，编辑 `config.js` 文件:

### 修改 Supabase 配置
```javascript
SUPABASE_URL: 'https://your-new-project.supabase.co',
SUPABASE_ANON_KEY: 'your-new-anon-key',
```

### 修改业务信息
```javascript
WHATSAPP_NUMBER: '60123456789',           // 新的 WhatsApp 号码
ADMIN_PASSWORD: 'your-new-password',       // 新的管理员密码
SELF_PICKUP_ADDRESS: '您的新地址',         // 新的自取地址
```

### 调整会员功能
```javascript
MEMBER_FEATURES: {
  ENABLED: false,             // 关闭会员系统
  POINTS_SYSTEM: false,       // 关闭积分功能
  LOGIN_REQUIRED: true,       // 启用登录要求
  ORDER_HISTORY: false,       // 关闭订单历史
  AUTO_MERGE_ORDERS: false    // 关闭自动合并订单
}
```

## 🔒 安全配置

### 1. 管理员访问
- 默认管理员密码: `fengweipaiadmin`
- 建议部署后立即修改密码
- 访问管理界面: 在应用中点击"管理"按钮

### 2. Supabase 安全设置
- 使用的是 `anon` 密钥，已限制权限
- 不包含 `service_role` 密钥，确保安全
- 建议在 Supabase 后台配置 RLS (Row Level Security)

### 3. HTTPS 配置
- 强烈建议启用 HTTPS
- 可使用 Let's Encrypt 免费 SSL 证书
- 配置 HSTS 头增强安全性

## 📱 马来西亚手机号支持

### 支持的格式
- ✅ 本地格式: `0162327792` (与数据库现有数据完全兼容)
- ✅ 国际格式: `60162327792`

### 验证规则
- 支持马来西亚主要运营商前缀
- 自动格式验证和错误提示
- 与现有数据库数据完全兼容

### 运营商支持
```
Maxis: 012, 014, 017, 019
Celcom: 013, 019
Digi: 010, 011, 014, 016
U Mobile: 011, 018
Tune Talk: 014
```

## 🗄️ 数据库设置

### Supabase 表结构
确保 Supabase 数据库包含以下表：

#### products 表
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    image_url TEXT,
    description TEXT,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### orders 表
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(20) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    items JSONB NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    member_id INTEGER REFERENCES members(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### members 表
```sql
CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    points INTEGER DEFAULT 0,
    total_orders INTEGER DEFAULT 0,
    total_amount DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 🚨 故障排除

### 常见问题

#### 1. 页面显示空白
**原因**: `config.js` 文件缺失或配置错误
**解决**: 确保 `config.js` 文件存在且配置正确

#### 2. 手机号验证失败
**原因**: 手机号格式不符合马来西亚规则
**解决**: 
- 本地格式: 确保以 `0` 开头，10 位数字 (如: 0162327792)
- 国际格式: 确保以 `60` 开头，12 位数字 (如: 60162327792)

#### 3. 数据库连接错误
**原因**: Supabase 配置错误
**解决**: 检查 `config.js` 中的 `SUPABASE_URL` 和 `SUPABASE_ANON_KEY`

#### 4. 管理界面无法访问
**原因**: 管理员密码错误
**解决**: 检查 `config.js` 中的 `ADMIN_PASSWORD` 设置

### 调试模式
打开浏览器控制台查看详细错误信息和配置验证结果。

## 📞 技术支持

### 配置验证
应用启动时会自动验证配置，控制台会显示：
- ✅ 配置文件验证通过
- 📱 手机号验证支持格式提示
- ⚠️ 配置问题警告（如有）

### 日志监控
- 浏览器控制台: 查看前端日志
- Supabase 控制台: 查看数据库操作日志
- 服务器日志: 查看访问和错误日志

## 🎯 部署检查清单

- [ ] 所有文件已上传到服务器
- [ ] `config.js` 文件存在且配置正确
- [ ] HTTPS 已配置和启用
- [ ] 域名解析正确指向服务器
- [ ] 浏览器能正常访问应用
- [ ] 控制台显示配置验证通过
- [ ] 手机号验证功能正常
- [ ] 订单提交流程正常
- [ ] 管理界面可正常访问
- [ ] Supabase 数据库连接正常

完成上述检查后，锋味派美食团购系统即可投入生产使用！

---

**部署完成后的功能特性:**
- ✅ 支持马来西亚本地手机号格式 (0162327792)
- ✅ 分类导航栏吸顶功能
- ✅ 完整会员系统和订单管理
- ✅ 智能订单合并功能
- ✅ 响应式设计，支持移动设备
- ✅ 完整的管理后台功能
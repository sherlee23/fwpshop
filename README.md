# 锋味派美食团购系统 - 升级文档

## 升级概览

本次升级主要包含以下功能：

1. ✅ **分类导航栏吸顶** - 商品分类导航栏跟随页面滚动始终显示在header下方
2. ✅ **会员机制** - 基于手机号的会员系统，支持WhatsApp格式验证
3. ✅ **订单自动合并** - 未完成订单自动合并功能
4. ✅ **会员功能模块化开关** - 后台可配置会员功能开关
5. ✅ **配置文件分拆** - 敏感配置独立存储
6. ✅ **会员自动生成** - 首次下单自动创建会员
7. ✅ **安全增强** - 敏感信息保护
8. ✅ **错误处理** - 完善的错误监测机制

## 数据库架构

### 新增会员表 (members)

需要在Supabase中创建以下表结构：

```sql
-- 创建会员表
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

-- 为手机号创建索引以提高查询性能
CREATE INDEX idx_members_phone ON members(phone);

-- 创建更新触发器
CREATE OR REPLACE FUNCTION update_members_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_members_updated_at
    BEFORE UPDATE ON members
    FOR EACH ROW
    EXECUTE FUNCTION update_members_updated_at();
```

### 更新订单表 (orders)

为现有订单表添加会员关联字段：

```sql
-- 为订单表添加会员ID字段
ALTER TABLE orders ADD COLUMN member_id INTEGER REFERENCES members(id);

-- 为member_id创建索引
CREATE INDEX idx_orders_member_id ON orders(member_id);

-- 添加更新时间字段（如果不存在）
ALTER TABLE orders ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- 创建更新触发器
CREATE TRIGGER trigger_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_members_updated_at();
```

## 配置文件设置

### 1. 创建配置文件

复制 `config.sample.js` 为 `config.js` 并填入实际配置：

```bash
cp config.sample.js config.js
```

### 2. 配置内容说明

```javascript
window.AppConfig = {
  // Supabase 配置
  SUPABASE_URL: 'your-supabase-url',
  SUPABASE_ANON_KEY: 'your-supabase-anon-key',
  
  // 业务配置
  WHATSAPP_NUMBER: '60162327792',
  ADMIN_PASSWORD: 'your-admin-password',
  SELF_PICKUP_ADDRESS: 'your-pickup-address',
  
  // 会员功能开关
  MEMBER_FEATURES: {
    ENABLED: true,              // 总开关
    POINTS_SYSTEM: true,        // 积分功能
    LOGIN_REQUIRED: false,      // 登录功能
    ORDER_HISTORY: true,        // 订单历史
    AUTO_MERGE_ORDERS: true     // 自动合并订单
  },
  
  // 手机号验证规则
  PHONE_VALIDATION: {
    REQUIRED_PREFIX: '601',     // 马来西亚手机号前缀
    MIN_LENGTH: 11,             // 最小长度
    MAX_LENGTH: 12              // 最大长度
  }
};
```

## 功能特性详解

### 1. 分类导航栏吸顶

- 分类导航栏设置为 `sticky` 定位
- 始终显示在页面顶部 header 下方
- 响应式设计，移动端友好
- 平滑的滚动体验

### 2. 会员系统

#### 手机号验证
- 强制WhatsApp格式：以601开头
- 长度验证：11-12位数字
- 实时验证与错误提示
- 格式化显示：+60 1X-XXX XXXX

#### 自动会员创建
- 首次下单自动生成会员档案
- 记录会员基础信息
- 统计订单数量和消费金额

#### 订单合并功能
- 检测相同手机号的未完成订单
- 自动合并商品项目
- 累计订单总金额
- 避免重复订单

### 3. 后台管理功能

#### 会员管理界面
- 会员列表查看
- 搜索功能（姓名/手机号）
- 会员统计信息显示
- 实时数据刷新

#### 系统设置界面
- 会员功能开关控制
- 可视化配置界面
- 实时配置生效
- 设置持久化存储

### 4. 安全与维护

#### 配置文件安全
- 敏感配置独立存储
- `.gitignore` 自动忽略
- 示例配置文件提供
- 环境变量支持

#### 错误处理
- 完善的异常捕获
- 用户友好的错误提示
- 详细的日志记录
- 优雅降级机制

## 部署说明

### 1. 文件结构
```
/
├── index.html          # 主应用文件
├── style.css          # 样式文件
├── config.js          # 实际配置（需要创建，不提交）
├── config.sample.js   # 配置示例文件
├── .gitignore         # Git忽略配置
└── README.md          # 本文档
```

### 2. 部署步骤

1. **准备配置文件**
   ```bash
   cp config.sample.js config.js
   # 编辑 config.js 填入实际配置
   ```

2. **创建数据库表**
   - 在Supabase控制台执行上述SQL脚本
   - 确保表权限正确设置

3. **部署应用**
   - 上传所有文件到服务器
   - 确保 config.js 不被公开访问
   - 配置CDN或静态文件服务

### 3. 验证部署

访问应用并验证以下功能：

- [ ] 页面正常加载
- [ ] 分类导航栏吸顶效果
- [ ] 手机号验证功能
- [ ] 会员自动创建
- [ ] 订单合并功能
- [ ] 后台管理界面
- [ ] 系统设置功能

## 技术栈

- **前端**: React 17, TailwindCSS
- **后端**: Supabase (PostgreSQL)
- **文件存储**: Supabase Storage
- **部署**: 静态文件托管

## 支持与维护

### 常见问题

1. **配置文件未加载**
   - 检查 config.js 文件是否存在
   - 确认文件路径正确
   - 查看浏览器控制台错误

2. **会员功能不工作**
   - 确认数据库表已创建
   - 检查会员功能开关设置
   - 验证Supabase权限配置

3. **手机号验证失败**
   - 检查手机号格式要求
   - 确认验证规则配置
   - 测试不同号码格式

### 更新日志

#### v2.0.0 (当前版本)
- ✅ 新增分类导航栏吸顶功能
- ✅ 实现完整会员系统
- ✅ 添加订单自动合并
- ✅ 新增后台配置管理
- ✅ 配置文件独立化
- ✅ 安全性增强
- ✅ 错误处理完善

## 联系支持

如有问题或需要技术支持，请联系开发团队。